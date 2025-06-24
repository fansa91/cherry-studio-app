import { sortBy } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Text, YStack } from 'tamagui'

import { SettingGroup, SettingRow } from '@/components/settings'
import { ModelSelect } from '@/components/settings/providers/ModelSelect'
import { isEmbeddingModel } from '@/config/models/embedding'
import { useAllProviders } from '@/hooks/useProviders'
import { Assistant, Model } from '@/types/assistant'
import { getModelUniqId } from '@/utils/model'

import { CustomSlider } from '../ui/CustomSlider'
import { CustomSwitch } from '../ui/Switch'
import { ReasoningSelect } from './ReasoningSelect'

interface ModelTabContentProps {
  assistant?: Assistant | null
  onAssistantChange?: (assistant: Partial<Assistant>) => void // 新增：传递更改回父组件
}

export function ModelTabContent({ assistant, onAssistantChange }: ModelTabContentProps) {
  const { t } = useTranslation()
  const { providers } = useAllProviders()

  // 状态管理
  const [selectedModel, setSelectedModel] = useState<Model | undefined>(assistant?.model)
  const [temperature, setTemperature] = useState(assistant?.settings?.temperature || 0.7)
  const [topP, setTopP] = useState(assistant?.settings?.topP || 0.8)
  const [context, setContext] = useState(assistant?.settings?.contextCount || 15)
  const [streamOutput, setStreamOutput] = useState(assistant?.settings?.streamOutput || false)
  const [enableMaxTokens, setEnableMaxTokens] = useState(assistant?.settings?.enableMaxTokens || false)
  const [maxTokens, setMaxTokens] = useState(assistant?.settings?.maxTokens || 2048)
  const [reasoning, setReasoning] = useState(assistant?.settings?.reasoning_effort || '')

  const selectOptions = providers
    .filter(p => p.models && p.models.length > 0)
    .map(p => ({
      label: p.isSystem ? t(`provider.${p.id}`) : p.name,
      title: p.name,
      options: sortBy(p.models, 'name')
        .filter(m => !isEmbeddingModel(m))
        .map(m => ({
          label: `${m.name}`,
          value: getModelUniqId(m),
          model: m
        }))
    }))

  const handleModelChange = (value: string) => {
    if (!value) {
      setSelectedModel(undefined)
      return
    }

    let modelToSet: Model | undefined

    for (const group of selectOptions) {
      const foundOption = group.options.find(opt => opt.value === value)

      if (foundOption) {
        modelToSet = foundOption.model
        break
      }
    }

    setSelectedModel(modelToSet)
  }

  const handleTemperatureChange = (value: number[]) => {
    setTemperature(value[0] / 10)
  }

  const handleTopPChange = (value: number[]) => {
    setTopP(value[0] / 10)
  }

  const handleContextChange = (value: number[]) => {
    setContext(value[0])
  }

  const handleMaxTokensChange = (value: string) => {
    const numValue = parseInt(value, 10)

    if (!isNaN(numValue) && numValue > 0) {
      setMaxTokens(numValue)
    }
  }

  return (
    <YStack flex={1} gap={30}>
      <ModelSelect
        value={selectedModel ? getModelUniqId(selectedModel) : undefined}
        onValueChange={handleModelChange}
        selectOptions={selectOptions}
        placeholder={t('settings.models.empty')}
      />

      <SettingGroup>
        <SettingRow>
          <CustomSlider
            label={t('assistants.settings.temperature')}
            value={temperature}
            max={10}
            multiplier={10}
            onValueChange={handleTemperatureChange}
          />
        </SettingRow>
        <SettingRow>
          <CustomSlider
            label={t('assistants.settings.top_p')}
            value={topP}
            max={10}
            multiplier={10}
            onValueChange={handleTopPChange}
          />
        </SettingRow>
        <SettingRow>
          <CustomSlider
            label={t('assistants.settings.context')}
            value={context}
            max={30}
            onValueChange={handleContextChange}
          />
        </SettingRow>
      </SettingGroup>

      <SettingGroup>
        <SettingRow>
          <Text>{t('assistants.settings.stream_output')}</Text>
          <CustomSwitch checked={streamOutput} onCheckedChange={setStreamOutput} />
        </SettingRow>
        <SettingRow>
          <Text>{t('assistants.settings.max_tokens')}</Text>
          <CustomSwitch checked={enableMaxTokens} onCheckedChange={setEnableMaxTokens} />
        </SettingRow>
        {enableMaxTokens && (
          <SettingRow>
            <Text>{t('assistants.settings.max_tokens_value')}</Text>
            <Input
              minWidth={80}
              height={25}
              fontSize={12}
              value={maxTokens.toString()}
              onChangeText={handleMaxTokensChange}
              keyboardType="numeric"
            />
          </SettingRow>
        )}
        <SettingRow>
          <Text>{t('assistants.settings.reasoning')}</Text>
          <ReasoningSelect assistant={assistant} />
        </SettingRow>
      </SettingGroup>
    </YStack>
  )
}
