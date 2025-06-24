import { useNavigation } from '@react-navigation/native'
import { ArrowLeftRight, PenLine } from '@tamagui/lucide-icons'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import { Input, Text, XStack, YStack } from 'tamagui'

import { DefaultProviderIcon } from '@/components/icons/DefaultProviderIcon'
import { SettingContainer, SettingGroup, SettingGroupTitle, SettingRow } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import { AvatarEditButton } from '@/components/ui/AvatarEditButton'
import { CustomSlider } from '@/components/ui/CustomSlider'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { CustomSwitch } from '@/components/ui/Switch'
import { RootState, useAppDispatch } from '@/store'
import { updateDefaultAssistant } from '@/store/assistant'

export default function DefaultAssistantSettingsScreen() {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const defaultAssistant = useSelector((state: RootState) => state.assistant.defaultAssistant) // 修正 state.assistant 为 state.assistants
  const dispatch = useAppDispatch()

  // 添加一个状态来控制prompt输入框是否可编辑
  const [isPromptEditable, setIsPromptEditable] = useState(false)

  const [settings, setSettings] = useState({
    temperature: defaultAssistant?.settings?.temperature || 0.7,
    topP: defaultAssistant?.settings?.topP || 0.8,
    contextCount: defaultAssistant?.settings?.contextCount || 15,
    enableMaxTokens: defaultAssistant?.settings?.enableMaxTokens || false,
    maxTokens: defaultAssistant?.settings?.maxTokens || 2048,
    assistantName: defaultAssistant?.name || '',
    prompt: defaultAssistant?.prompt || ''
  })

  // 使用 useEffect 来同步 defaultAssistant 的变化到本地状态
  useEffect(() => {
    if (defaultAssistant) {
      setSettings({
        temperature: defaultAssistant.settings?.temperature || 0.7,
        topP: defaultAssistant.settings?.topP || 0.8,
        contextCount: defaultAssistant.settings?.contextCount || 15,
        enableMaxTokens: defaultAssistant.settings?.enableMaxTokens || false,
        maxTokens: defaultAssistant.settings?.maxTokens || 2048,
        assistantName: defaultAssistant.name || '',
        prompt: defaultAssistant.prompt || ''
      })
    }
  }, [defaultAssistant])

  const handleTemperatureChange = (value: number[]) => {
    setSettings(prev => ({ ...prev, temperature: value[0] / 10 }))
  }

  const handleTopPChange = (value: number[]) => {
    setSettings(prev => ({ ...prev, topP: value[0] / 10 }))
  }

  const handleContextChange = (value: number[]) => {
    setSettings(prev => ({ ...prev, contextCount: value[0] }))
  }

  const handleMaxTokensChange = (value: string) => {
    const numValue = parseInt(value, 10)

    if (!isNaN(numValue) && numValue > 0) {
      setSettings(prev => ({ ...prev, maxTokens: numValue }))
    }
  }

  const handleEnableMaxTokensChange = (checked: boolean) => {
    setSettings(prev => ({ ...prev, enableMaxTokens: checked }))
  }

  const handleAssistantNameChange = (text: string) => {
    setSettings(prev => ({ ...prev, assistantName: text }))
  }

  const handlePromptChange = (text: string) => {
    setSettings(prev => ({ ...prev, prompt: text }))
  }

  // 使用useEffect来将本地状态同步到Redux store，但避免无限循环
  useEffect(() => {
    // 创建一个标志来防止初始渲染时的更新
    const isInitialRender =
      defaultAssistant?.name === settings.assistantName &&
      defaultAssistant?.prompt === settings.prompt &&
      defaultAssistant?.settings?.temperature === settings.temperature &&
      defaultAssistant?.settings?.topP === settings.topP &&
      defaultAssistant?.settings?.contextCount === settings.contextCount &&
      defaultAssistant?.settings?.enableMaxTokens === settings.enableMaxTokens &&
      defaultAssistant?.settings?.maxTokens === settings.maxTokens

    // 只有当设置真正改变时才更新
    if (!isInitialRender) {
      const newAssistant = {
        ...defaultAssistant,
        name: settings.assistantName,
        prompt: settings.prompt,
        settings: {
          ...defaultAssistant.settings,
          temperature: settings.temperature,
          topP: settings.topP,
          contextCount: settings.contextCount,
          enableMaxTokens: settings.enableMaxTokens,
          maxTokens: settings.maxTokens
        }
      }
      dispatch(updateDefaultAssistant({ assistant: newAssistant }))
    }
  }, [settings, dispatch, defaultAssistant])

  return (
    <SafeAreaContainer>
      <HeaderBar title={t('settings.models.default_assistant_model')} onBackPress={() => navigation.goBack()} />
      <SettingContainer>
        <YStack flex={1} paddingTop={24} paddingHorizontal={10}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <XStack justifyContent="center" alignItems="center">
              <AvatarEditButton
                content={defaultAssistant.emoji || <DefaultProviderIcon />}
                editIcon={defaultAssistant.emoji ? <ArrowLeftRight size={24} /> : <PenLine size={24} />}
                onEditPress={() => {
                  // TODO: Implement avatar edit logic
                }}
                onAvatarPress={() => {
                  // TODO: Implement avatar selection logic
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
                  value={settings.assistantName}
                  onChangeText={handleAssistantNameChange}
                />
              </XStack>

              <XStack height={20}>
                <SettingGroupTitle>{t('settings.models.default_assistant_settings.hint.prompt')}</SettingGroupTitle>
              </XStack>

              <XStack paddingVertical={8} gap={8} position="relative">
                <Input
                  flex={1}
                  multiline={true}
                  verticalAlign={'top'}
                  value={settings.prompt}
                  editable={isPromptEditable}
                  onPress={() => setIsPromptEditable(true)}
                  onBlur={() => setIsPromptEditable(false)}
                  onChangeText={handlePromptChange}></Input>
              </XStack>

              <XStack height={20}>
                <SettingGroupTitle>{t('settings.models.default_assistant_settings.hint.params')}</SettingGroupTitle>
              </XStack>

              <SettingGroup>
                <SettingRow>
                  <CustomSlider
                    label={t('assistants.settings.temperature')}
                    value={settings.temperature}
                    max={10}
                    multiplier={10}
                    onValueChange={handleTemperatureChange}
                  />
                </SettingRow>
                <SettingRow>
                  <CustomSlider
                    label={t('assistants.settings.top_p')}
                    value={settings.topP}
                    max={10}
                    multiplier={10}
                    onValueChange={handleTopPChange}
                  />
                </SettingRow>
                <SettingRow>
                  <CustomSlider
                    label={t('assistants.settings.context')}
                    value={settings.contextCount}
                    max={30}
                    onValueChange={handleContextChange}
                  />
                </SettingRow>
                <SettingRow>
                  <Text>{t('assistants.settings.max_tokens')}</Text>
                  <CustomSwitch checked={settings.enableMaxTokens} onCheckedChange={handleEnableMaxTokensChange} />
                </SettingRow>
                {settings.enableMaxTokens && (
                  <SettingRow>
                    <Text>{t('assistants.settings.max_tokens_value')}</Text>
                    <Input
                      minWidth={80}
                      height={25}
                      fontSize={12}
                      value={settings.maxTokens.toString()}
                      onChangeText={handleMaxTokensChange}
                      keyboardType="numeric"
                    />
                  </SettingRow>
                )}
              </SettingGroup>
            </YStack>
          </KeyboardAwareScrollView>
        </YStack>
      </SettingContainer>
    </SafeAreaContainer>
  )
}
