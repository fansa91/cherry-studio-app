import React from 'react'
import { useTranslation } from 'react-i18next'
import { Input, TextArea, YStack } from 'tamagui'

import { SettingRowTitle } from '@/components/settings'
import { Assistant } from '@/types/assistant'

interface PromptTabContentProps {
  assistant: Assistant
  updateAssistant: (assistant: Assistant) => void
}
export function PromptTabContent({ assistant, updateAssistant }: PromptTabContentProps) {
  const { t } = useTranslation()

  return (
    <YStack flex={1} gap={30}>
      <YStack width="100%" gap={8}>
        <SettingRowTitle paddingHorizontal={10}>{t('common.name')}</SettingRowTitle>
        <Input
          padding={15}
          placeholder={t('assistants.name')}
          value={assistant?.name}
          onChangeText={name => updateAssistant({ ...assistant, name })}
        />
      </YStack>
      <YStack width="100%" gap={8} flex={1}>
        <SettingRowTitle paddingHorizontal={10}>{t('common.prompt')}</SettingRowTitle>
        <TextArea
          flex={1}
          padding={15}
          placeholder={t('common.prompt')}
          value={assistant?.prompt}
          multiline
          onChangeText={prompt => updateAssistant({ ...assistant, prompt })}
        />
      </YStack>
    </YStack>
  )
}
