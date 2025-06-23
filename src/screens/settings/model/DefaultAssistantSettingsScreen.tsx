import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeftRight, PenLine } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, ScrollView, Text, XStack, YStack } from 'tamagui'

import { SettingContainer, SettingGroup, SettingGroupTitle, SettingRow } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import { AvatarEditButton } from '@/components/ui/AvatarEditButton'
import { CustomSlider } from '@/components/ui/CustomSlider'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { DefaultProviderIcon } from '@/components/ui/SvgIcons'
import { CustomSwitch } from '@/components/ui/Switch'
import { useAssistant } from '@/hooks/use-assistant'
import { RootStackParamList } from '@/types/naviagate'

type DefaultAssistantSettingsRouteProp = RouteProp<RootStackParamList, 'DefaultAssistantSettingsScreen'>

export default function DefaultAssistantSettingsScreen() {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const route = useRoute<DefaultAssistantSettingsRouteProp>()

  const { assistant } = useAssistant('37b0e75f-f940-4f50-925a-bc4a38132844')

  const [temperature, setTemperature] = useState(assistant?.settings?.temperature || 0.7)
  const [topP, setTopP] = useState(assistant?.settings?.topP || 0.8)
  const [context, setContext] = useState(assistant?.settings?.contextCount || 15)
  const [enableMaxTokens, setEnableMaxTokens] = useState(assistant?.settings?.enableMaxTokens || false)
  const [maxTokens, setMaxTokens] = useState(assistant?.settings?.maxTokens || 2048)
  const [assistantName, setAssistantName] = useState('')
  const [prompt, setPrompt] = useState('')

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

  const handleAssistantNameChange = (text: string) => {
    setAssistantName(text)
  }

  const handlePromptChange = (text: string) => {
    setPrompt(text)
  }

  return (
    <SafeAreaContainer>
      <HeaderBar title={t('settings.models.default_assistant_model')} onBackPress={() => navigation.goBack()} />
      <SettingContainer>
        <YStack flex={1} paddingTop={24} paddingHorizontal={10}>
          <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <XStack justifyContent="center" alignItems="center">
              <AvatarEditButton
                content={'😈' || <DefaultProviderIcon />}
                editIcon={'😈' ? <ArrowLeftRight size={24} /> : <PenLine size={24} />}
                onEditPress={() => {
                  console.log('edit press')
                }}
                onAvatarPress={() => {
                  console.log('avatar press')
                }}
              />
            </XStack>
            <YStack gap={8}>
              <XStack height={20}>
                <Text>{' * '}</Text>
                <SettingGroupTitle>{t('settings.models.default_assistant_settings.hint.name')}</SettingGroupTitle>
              </XStack>

              <XStack paddingVertical={8} gap={8} position="relative">
                <Input
                  flex={1}
                  placeholder={t('settings.models.default_assistant_settings.hint.placeholder')}
                  value={assistantName}
                  onChangeText={handleAssistantNameChange}
                />
              </XStack>

              <XStack height={20}>
                <SettingGroupTitle>{t('settings.models.default_assistant_settings.hint.prompt')}</SettingGroupTitle>
              </XStack>

              <XStack paddingVertical={8} gap={8} position="relative">
                <Input flex={1} value={prompt} onChangeText={handlePromptChange}></Input>
              </XStack>

              <XStack height={20}>
                <SettingGroupTitle>{t('settings.models.default_assistant_settings.hint.params')}</SettingGroupTitle>
              </XStack>

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
              </SettingGroup>
            </YStack>
          </ScrollView>
        </YStack>
      </SettingContainer>
    </SafeAreaContainer>
  )
}
