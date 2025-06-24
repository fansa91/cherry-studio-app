import { useNavigation } from '@react-navigation/native'
import { Settings2 } from '@tamagui/lucide-icons'
import { sortBy } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text, useTheme, XStack, YStack } from 'tamagui'

import { SettingHelpText } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import { ModelSelect } from '@/components/settings/providers/ModelSelect'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { isEmbeddingModel } from '@/config/models/embedding'
import { useProviders } from '@/hooks/useProviders'
import { Model } from '@/types/assistant'
import { getModelUniqId } from '@/utils/model'

export default function ModelSettingsScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()
  const [selectedModel, setSelectedModel] = useState<Model | undefined>()
  const [selectedTopicNamingModel, setSelectedTopicNamingModel] = useState<Model | undefined>()
  const [selectedTranslateModel, setSelectedTranslateModel] = useState<Model | undefined>()
  const [selectedQuickAssistant, setSelectedQuickAssistant] = useState<Model | undefined>()

  const { providers } = useProviders()
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

  const handleModelChange = (value: string, setter: React.Dispatch<React.SetStateAction<Model | undefined>>) => {
    if (!value) {
      setter(undefined)
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

    setter(modelToSet)
  }

  return (
    <SafeAreaContainer>
      <HeaderBar title={t('settings.models.default_model')} onBackPress={() => navigation.goBack()} />
      <YStack padding="$4" backgroundColor="$background" flex={1} gap={24}>
        <YStack gap={8}>
          <XStack justifyContent="space-between" height={20}>
            <Text>{t('settings.models.default_assistant_model')}</Text>
            <Button
              size={14}
              icon={<Settings2 size={14} />}
              backgroundColor="$colorTransparent"
              onPress={() => navigation.navigate('DefaultAssistantSettingsScreen')}
            />
          </XStack>
          <XStack>
            <ModelSelect
              value={selectedModel ? getModelUniqId(selectedModel) : undefined}
              onValueChange={val => handleModelChange(val, setSelectedModel)}
              selectOptions={selectOptions}
              placeholder={t('settings.models.empty')}
            />
          </XStack>
          <SettingHelpText>{t('settings.models.default_assistant_model_description')}</SettingHelpText>
        </YStack>

        <YStack gap={8}>
          <XStack justifyContent="space-between" height={20}>
            <Text>{t('settings.models.topic_naming_model')}</Text>
            <Button
              size={14}
              icon={<Settings2 size={14} />}
              onPress={() => navigation.navigate('NamingModelSettingsScreen')}
              backgroundColor="$colorTransparent"
            />
          </XStack>
          <XStack>
            <ModelSelect
              value={selectedTopicNamingModel ? getModelUniqId(selectedTopicNamingModel) : undefined}
              onValueChange={val => handleModelChange(val, setSelectedTopicNamingModel)}
              selectOptions={selectOptions}
              placeholder={t('settings.models.empty')}
            />
          </XStack>
          <SettingHelpText>{t('settings.models.topic_naming_model_description')}</SettingHelpText>
        </YStack>

        <YStack gap={8}>
          <XStack justifyContent="space-between" height={20}>
            <Text>{t('settings.models.translate_model')}</Text>
            <Button
              size={14}
              icon={<Settings2 size={14} />}
              backgroundColor="$colorTransparent"
              onPress={() => navigation.navigate('TranslateModelSettingsScreen')}
            />
          </XStack>
          <XStack>
            <ModelSelect
              value={selectedTranslateModel ? getModelUniqId(selectedTranslateModel) : undefined}
              onValueChange={val => handleModelChange(val, setSelectedTranslateModel)}
              selectOptions={selectOptions}
              placeholder={t('settings.models.empty')}
            />
          </XStack>
          <SettingHelpText>{t('settings.models.translate_model_description')}</SettingHelpText>
        </YStack>

        <YStack gap={8}>
          <XStack justifyContent="space-between" height={20}>
            <Text>{t('settings.models.quick_assistant')}</Text>
          </XStack>
          <XStack>
            <ModelSelect
              value={selectedQuickAssistant ? getModelUniqId(selectedQuickAssistant) : undefined}
              onValueChange={val => handleModelChange(val, setSelectedQuickAssistant)}
              selectOptions={selectOptions}
              placeholder={t('settings.models.empty')}
            />
          </XStack>
          <SettingHelpText>{t('settings.models.quick_assistant_description')}</SettingHelpText>
        </YStack>
      </YStack>
    </SafeAreaContainer>
  )
}
