import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, useTheme, XStack, YStack } from 'tamagui'

import { SettingContainer } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { languagesOptions } from '@/config/languages'
import { RootStackParamList } from '@/types/naviagate'

type TranslateLanguageChooseRouteProp = RouteProp<RootStackParamList, 'TranslateLanguageChooseScreen'>

export default function TranslateLanguageChooseScreen() {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const theme = useTheme()
  const route = useRoute<TranslateLanguageChooseRouteProp>()

  const [currentLanguage, setCurrentLanguage] = useState('')

  const changeLanguage = (language: string) => {
    setCurrentLanguage(language)
  }

  return (
    <SafeAreaContainer>
      <HeaderBar
        title={t('settings.models.translate_model_setting.language_choose.title')}
        onBackPress={() => navigation.goBack()}
      />
      <SettingContainer>
        <YStack flex={1} paddingHorizontal={16} space={12}>
          {languagesOptions.map(opt => (
            <XStack
              key={opt.value}
              onPress={() => changeLanguage(opt.value)}
              alignItems="center"
              justifyContent="space-between"
              padding={16}
              borderRadius={8}
              backgroundColor={theme['$color3']}
              hoverStyle={{ backgroundColor: theme['$color4'] }}
              pressStyle={{ opacity: 0.7 }}>
              <XStack alignItems="center" gap={8}>
                <Text fontSize={16}>{opt.flag}</Text>
                <Text fontSize={16}>{opt.label}</Text>
              </XStack>

              <XStack
                width={20}
                height={20}
                borderRadius={10}
                borderWidth={2}
                borderColor={currentLanguage === opt.value ? theme.color.val : theme['$color8']}
                alignItems="center"
                justifyContent="center">
                {currentLanguage === opt.value && (
                  <XStack width={10} height={10} borderRadius={5} backgroundColor={theme.color.val} />
                )}
              </XStack>
            </XStack>
          ))}
        </YStack>
      </SettingContainer>
    </SafeAreaContainer>
  )
}
