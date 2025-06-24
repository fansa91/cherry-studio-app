import BottomSheet from '@gorhom/bottom-sheet'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Eye, EyeOff, ShieldCheck } from '@tamagui/lucide-icons'
import { sortBy } from 'lodash'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, Stack, useTheme, XStack, YStack } from 'tamagui'

import ExternalLink from '@/components/ExternalLink'
import { SettingContainer, SettingGroupTitle, SettingHelpText } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import { ApiCheckSheet } from '@/components/settings/providers/ApiCheckSheet'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { isEmbeddingModel } from '@/config/models/embedding'
import { useProvider } from '@/hooks/useProviders'
import { checkApi } from '@/services/ApiService'
import { Model } from '@/types/assistant'
import { NavigationProps, RootStackParamList } from '@/types/naviagate'
import { getModelUniqId } from '@/utils/model'

type ProviderSettingsRouteProp = RouteProp<RootStackParamList, 'ApiServiceScreen'>

export default function ApiServiceScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()
  const route = useRoute<ProviderSettingsRouteProp>()

  const { providerId } = route.params
  const { provider } = useProvider(providerId)

  const [showApiKey, setShowApiKey] = useState(false)
  const [selectedModel, setSelectedModel] = useState<Model | undefined>()
  const [apiKey, setApiKey] = useState(provider?.apiKey || '')
  const [apiHost, setApiHost] = useState(provider?.apiHost || '')

  const bottomSheetRef = useRef<BottomSheet>(null)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

  const selectOptions = !provider?.models?.length
    ? []
    : [
        {
          label: provider.isSystem ? t(`provider.${provider.id}`) : provider.name,
          title: provider.name,
          options: sortBy(provider.models, 'name')
            .filter(model => !isEmbeddingModel(model))
            .map(model => ({
              label: model.name,
              value: getModelUniqId(model),
              model
            }))
        }
      ]

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand()
    setIsBottomSheetOpen(true)
  }

  const handleBottomSheetClose = () => {
    setIsBottomSheetOpen(false)
  }

  const handleModelChange = (value: string) => {
    if (!value) {
      setSelectedModel(undefined)
      return
    }

    const allOptions = selectOptions.flatMap(group => group.options)
    const foundOption = allOptions.find(opt => opt.value === value)
    setSelectedModel(foundOption?.model)
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

  const handleBackPress = () => {
    navigation.goBack()
  }

  // 模型检测处理
  const handleStartModelCheck = async () => {
    if (!selectedModel) return

    try {
      await checkApi(provider, selectedModel)
    } catch (error) {
      console.error('Model check failed:', error)
    }
  }

  return (
    <SafeAreaContainer
      style={{
        flex: 1,
        backgroundColor: theme.background.val
      }}>
      <HeaderBar title={t('settings.provider.api_service')} onBackPress={handleBackPress} />

      <SettingContainer>
        {/* API Key 配置 */}
        <YStack gap={8}>
          <XStack paddingHorizontal={10} height={20} justifyContent="space-between" alignItems="center">
            <SettingGroupTitle>{t('settings.provider.api_key')}</SettingGroupTitle>
            <Button
              size={16}
              icon={<ShieldCheck size={16} />}
              backgroundColor="$colorTransparent"
              circular
              onPress={handleOpenBottomSheet}
            />
          </XStack>

          <XStack paddingVertical={8} gap={8} position="relative">
            <Input
              flex={1}
              placeholder={t('settings.provider.api_key.placeholder')}
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
            <SettingHelpText>{t('settings.provider.api_key.tip')}</SettingHelpText>
            {/* todo */}
            <ExternalLink href="" size={12}>
              {t('settings.provider.api_key.get')}
            </ExternalLink>
          </XStack>
        </YStack>

        {/* API Host 配置 */}
        <YStack gap={8}>
          <XStack paddingHorizontal={10} height={20} alignItems="center">
            <SettingGroupTitle>{t('settings.provider.api_host')}</SettingGroupTitle>
          </XStack>
          <Input
            placeholder={t('settings.provider.api_host.placeholder')}
            value={apiHost}
            onChangeText={handleApiHostChange}
          />
        </YStack>
      </SettingContainer>

      <ApiCheckSheet
        bottomSheetRef={bottomSheetRef}
        isOpen={isBottomSheetOpen}
        onClose={handleBottomSheetClose}
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
        selectOptions={selectOptions}
        apiKey={apiKey}
        onStartModelCheck={handleStartModelCheck}
      />
    </SafeAreaContainer>
  )
}
