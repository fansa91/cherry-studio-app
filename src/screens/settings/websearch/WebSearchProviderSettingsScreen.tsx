import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Eye, EyeOff, ShieldCheck } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, Stack, useTheme, XStack, YStack } from 'tamagui'

import ExternalLink from '@/components/ExternalLink'
import { SettingContainer, SettingGroupTitle, SettingHelpText } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { useWebsearchProvider } from '@/hooks/useWebsearchProviders'
import { RootStackParamList } from '@/types/naviagate'

type WebsearchProviderSettingsRouteProp = RouteProp<RootStackParamList, 'WebSearchProviderSettingsScreen'>

export default function WebSearchProviderSettingsScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()

  const route = useRoute<WebsearchProviderSettingsRouteProp>()
  const { provider } = useWebsearchProvider(route.params.providerId)
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState(provider.apiKey || '')
  const [apiHost, setApiHost] = useState(provider.apiHost || '')

  const handleBackPress = () => {
    navigation.goBack()
  }

  const toggleApiKeyVisibility = () => {
    setShowApiKey(prevShowApiKey => !prevShowApiKey)
  }

  const handleApiKeyChange = (text: string) => {
    setApiKey(text)
  }

  const handleApiHostChange = (text: string) => {
    setApiHost(text)
  }

  return (
    <SafeAreaContainer style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar title={provider.name} onBackPress={handleBackPress} />

      <SettingContainer>
        {/* API Key 配置 */}
        {provider.type === 'api' && (
          <YStack gap={8}>
            <XStack paddingHorizontal={10} height={20} justifyContent="space-between" alignItems="center">
              <SettingGroupTitle>{t('settings.websearch.api_key')}</SettingGroupTitle>
              <Button size={16} icon={<ShieldCheck size={16} />} backgroundColor="$colorTransparent" circular />
            </XStack>

            <XStack paddingVertical={8} gap={8} position="relative">
              <Input
                flex={1}
                placeholder={t('settings.websearch.api_key.placeholder')}
                secureTextEntry={!showApiKey}
                paddingRight={48}
                value={apiKey}
                onChangeText={handleApiKeyChange}
              />
              <Stack
                position="absolute"
                right={10}
                top="50%"
                height={16}
                width={16}
                alignItems="center"
                justifyContent="center"
                zIndex={1}
                onPress={toggleApiKeyVisibility}
                cursor="pointer">
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </Stack>
            </XStack>

            <XStack justifyContent="space-between">
              <SettingHelpText>{t('settings.websearch.api_key.tip')}</SettingHelpText>
              {/* todo */}
              <ExternalLink href="" size={12}>
                {t('settings.websearch.api_key.get')}
              </ExternalLink>
            </XStack>
          </YStack>
        )}

        {/* API Host 配置 */}
        <YStack gap={8}>
          <XStack paddingHorizontal={10} height={20} alignItems="center" justifyContent="space-between">
            <SettingGroupTitle>{t('settings.websearch.api_host')}</SettingGroupTitle>
            {/* todo */}
            <ExternalLink href="" size={12}>
              {t('common.visit')}
            </ExternalLink>
          </XStack>
          <Input
            placeholder={t('settings.websearch.api_host.placeholder')}
            value={apiHost}
            onChangeText={handleApiHostChange}
          />
        </YStack>
      </SettingContainer>
    </SafeAreaContainer>
  )
}
