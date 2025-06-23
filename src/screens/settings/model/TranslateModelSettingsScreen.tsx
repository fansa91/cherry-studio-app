import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ChevronRight } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Text, XStack, YStack } from 'tamagui'

import { SettingContainer, SettingGroup, SettingGroupTitle, SettingRow } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { CustomSwitch } from '@/components/ui/Switch'
import { RootStackParamList } from '@/types/naviagate'

type TranslateModelSettingsRouteProp = RouteProp<RootStackParamList, 'TranslateModelSettingsScreen'>

export default function TranslateModelSettingsScreen() {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const [specifyLanguage, setSpecifyLanguage] = useState(false)
  const [sourceLanguage, setSourceLanguage] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('')
  const [prompt, setPrompt] = useState('')
  const route = useRoute<TranslateModelSettingsRouteProp>()

  const handlePromptChange = (value: string) => {
    setPrompt(value)
  }

  let content

  if (specifyLanguage) {
    content = (
      <SettingGroup>
        <SettingRow>
          <XStack justifyContent="space-between" flex={1}>
            <Text>{t('settings.models.translate_model_setting.hint.specify_language')}</Text>
            <CustomSwitch checked={specifyLanguage} onCheckedChange={setSpecifyLanguage}></CustomSwitch>
          </XStack>
        </SettingRow>

        <SettingRow onPress={() => navigation.navigate('TranslateLanguageChooseScreen')}>
          <XStack justifyContent="space-between" flex={1}>
            <Text>{t('settings.models.translate_model_setting.hint.target_language')}</Text>
            <XStack>
              <Text>{targetLanguage}</Text>
              <ChevronRight size={24} color="$colorFocus" />
            </XStack>
          </XStack>
        </SettingRow>
        <SettingRow onPress={() => navigation.navigate('TranslateLanguageChooseScreen')}>
          <XStack justifyContent="space-between" flex={1}>
            <Text>{t('settings.models.translate_model_setting.hint.local_language')}</Text>
            <XStack>
              <Text>{sourceLanguage}</Text>
              <ChevronRight size={24} color="$colorFocus" />
            </XStack>
          </XStack>
        </SettingRow>
      </SettingGroup>
    )
  } else {
    content = (
      <SettingGroup>
        <SettingRow>
          <XStack justifyContent="space-between" flex={1}>
            <Text>{t('settings.models.translate_model_setting.hint.specify_language')}</Text>
            <CustomSwitch checked={specifyLanguage} onCheckedChange={setSpecifyLanguage}></CustomSwitch>
          </XStack>
        </SettingRow>
      </SettingGroup>
    )
  }

  return (
    <SafeAreaContainer>
      <HeaderBar title={t('settings.models.translate_model')} onBackPress={() => navigation.goBack()} />
      <SettingContainer>
        <YStack flex={1} paddingTop={24} gap={8}>
          <XStack height={20}>
            <SettingGroupTitle>{t('settings.models.translate_model_setting.hint.assistant')}</SettingGroupTitle>
          </XStack>
          {content}
          {specifyLanguage && (
            <YStack flex={1}>
              <XStack paddingHorizontal={10} height={20} justifyContent="space-between">
                <Text>{t('settings.models.translate_model_setting.hint.prompt')}</Text>
              </XStack>
              <Input flex={1} maxHeight={'60%'} value={prompt} onChangeText={handlePromptChange} />
            </YStack>
          )}
        </YStack>
      </SettingContainer>
    </SafeAreaContainer>
  )
}
