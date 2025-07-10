import { useNavigation } from '@react-navigation/native'
import { Settings2 } from '@tamagui/lucide-icons'
import { sortBy } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text, useTheme, XStack, YStack } from 'tamagui'

import { SettingHelpText } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import { ModelSelect } from '@/components/settings/providers/ModelSelect'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { isEmbeddingModel } from '@/config/models/embedding'
import { useAssistant } from '@/hooks/useAssistant'
import { useAllProviders } from '@/hooks/useProviders'
import { NavigationProps } from '@/types/naviagate'
import { getModelUniqId } from '@/utils/model'

export default function AssistantSettingsScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()

  const { assistant: defaultAssistant, updateAssistant: updateDefaultAssistant } = useAssistant('default')
  const { assistant: topicNamingAssistant, updateAssistant: updateTopicNamingAssistant } = useAssistant('topic_naming')
  const { assistant: translateAssistant, updateAssistant: updateTranslateAssistant } = useAssistant('translate')

  const { providers } = useAllProviders()
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

  const handleDefaultAssistantChange = async (model: string) => {
    if (!defaultAssistant) return

    const updatedAssistant = {
      ...defaultAssistant,
      model: selectOptions.flatMap(o => o.options).find(opt => opt.value === model)?.model
    }

    await updateDefaultAssistant(updatedAssistant)
  }

  const handleTopicNamingModelChange = async (model: string) => {
    if (!topicNamingAssistant) return

    const updatedAssistant = {
      ...topicNamingAssistant,
      model: selectOptions.flatMap(o => o.options).find(opt => opt.value === model)?.model
    }

    await updateTopicNamingAssistant(updatedAssistant)
  }

  const handleTranslateModelChange = async (model: string) => {
    if (!translateAssistant) return

    const updatedAssistant = {
      ...translateAssistant,
      model: selectOptions.flatMap(o => o.options).find(opt => opt.value === model)?.model
    }

    await updateTranslateAssistant(updatedAssistant)
  }

  return (
    <SafeAreaContainer>
      <HeaderBar title={t('settings.assistant.title')} onBackPress={() => navigation.goBack()} />
      <YStack padding="$4" backgroundColor="$background" flex={1} gap={24}>
        <YStack gap={8}>
          {/* todo 这是默认助手设置，是否应该放在此处？ */}
          <XStack justifyContent="space-between" height={20}>
            <Text>{t('settings.assistant.default_assistant.name')}</Text>
            <Button
              size={14}
              icon={<Settings2 size={14} />}
              backgroundColor="$colorTransparent"
              onPress={() => navigation.navigate('AssistantDetailScreen', { assistantId: 'default' })}
            />
          </XStack>
          <XStack>
            <ModelSelect
              value={defaultAssistant?.model ? getModelUniqId(defaultAssistant.model) : undefined}
              onValueChange={handleDefaultAssistantChange}
              selectOptions={selectOptions}
              placeholder={t('settings.assistant.empty')}
            />
          </XStack>
          <SettingHelpText>{t('settings.assistant.default_assistant.description')}</SettingHelpText>
        </YStack>

        <YStack gap={8}>
          <XStack justifyContent="space-between" height={20}>
            <Text>{t('settings.assistant.topic_naming_assistant.name')}</Text>
            <Button
              size={14}
              icon={<Settings2 size={14} />}
              onPress={() => navigation.navigate('AssistantDetailScreen', { assistantId: 'topic_naming' })}
              backgroundColor="$colorTransparent"
            />
          </XStack>
          <XStack>
            <ModelSelect
              value={topicNamingAssistant?.model ? getModelUniqId(topicNamingAssistant.model) : undefined}
              onValueChange={handleTopicNamingModelChange}
              selectOptions={selectOptions}
              placeholder={t('settings.assistant.empty')}
            />
          </XStack>
          <SettingHelpText>{t('settings.assistant.topic_naming_assistant.description')}</SettingHelpText>
        </YStack>

        <YStack gap={8}>
          <XStack justifyContent="space-between" height={20}>
            <Text>{t('settings.assistant.translate_assistant.name')}</Text>
            <Button
              size={14}
              icon={<Settings2 size={14} />}
              backgroundColor="$colorTransparent"
              onPress={() => navigation.navigate('AssistantDetailScreen', { assistantId: 'translate' })}
            />
          </XStack>
          <XStack>
            <ModelSelect
              value={translateAssistant?.model ? getModelUniqId(translateAssistant.model) : undefined}
              onValueChange={handleTranslateModelChange}
              selectOptions={selectOptions}
              placeholder={t('settings.assistant.empty')}
            />
          </XStack>
          <SettingHelpText>{t('settings.assistant.translate_assistant.description')}</SettingHelpText>
        </YStack>
      </YStack>
    </SafeAreaContainer>
  )
}
