import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { LoaderCircle } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Text, XStack, YStack } from 'tamagui'

import { SettingContainer, SettingRow } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { CustomSwitch } from '@/components/ui/Switch'
import { RootStackParamList } from '@/types/naviagate'

type NamingModelSettingsRouteProp = RouteProp<RootStackParamList, 'NamingModelSettingsScreen'>

export default function NamingModelSettingsScreen() {
  const { t } = useTranslation()
  const [autoNaming, setAutoNaming] = useState(true)
  const [prompt, setPrompt] = useState('')

  const route = useRoute<NamingModelSettingsRouteProp>()
  const navigation = useNavigation()

  const handlePromptChange = (value: string) => {
    setPrompt(value)
  }

  return (
    <SafeAreaContainer>
      <HeaderBar title={t('settings.models.topic_naming_model')} onBackPress={() => navigation.goBack()} />
      <SettingContainer>
        <YStack flex={1} paddingTop={24} gap={8}>
          <SettingRow>
            <Text>{t('settings.models.topic_naming_settings.hint.autonaming')}</Text>
            <CustomSwitch checked={autoNaming} onCheckedChange={setAutoNaming}></CustomSwitch>
          </SettingRow>

          <XStack paddingHorizontal={10} height={20} justifyContent="space-between">
            <Text>{t('settings.models.topic_naming_settings.hint.prompt')}</Text>
            <LoaderCircle size={12} />
          </XStack>
          <Input flex={1} maxHeight={'60%'} value={prompt} onChangeText={handlePromptChange} />
        </YStack>
      </SettingContainer>
    </SafeAreaContainer>
  )
}
