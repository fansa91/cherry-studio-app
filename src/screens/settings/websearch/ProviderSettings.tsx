import React from 'react'
import { useTranslation } from 'react-i18next'
import { YStack } from 'tamagui'

import { SettingGroup, SettingGroupTitle } from '@/components/settings'
import { WebsearchProviderRow } from '@/components/settings/websearch/WebsearchProviderRow'
import { useWebsearchProviders } from '@/hooks/useWebsearchProviders'

export default function ProviderSettings() {
  const { t } = useTranslation()
  const { freeProviders, apiProviders } = useWebsearchProviders()

  return (
    <YStack gap={24}>
      <YStack gap={8}>
        <SettingGroupTitle>{t('settings.websearch.provider.free.title')}</SettingGroupTitle>
        <SettingGroup>
          {freeProviders.map((provider, index) => (
            <WebsearchProviderRow
              key={index}
              provider={provider}
              need_config={provider.id === 'searxng' ? true : false}
            />
          ))}
        </SettingGroup>
      </YStack>
      <YStack gap={8}>
        <SettingGroupTitle>{t('settings.websearch.provider.api.title')}</SettingGroupTitle>
        <SettingGroup>
          {apiProviders.map((provider, index) => (
            <WebsearchProviderRow key={index} provider={provider} need_config={true} />
          ))}
        </SettingGroup>
      </YStack>
    </YStack>
  )
}
