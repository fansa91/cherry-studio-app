import { DrawerContentComponentProps, DrawerItemList, useDrawerStatus } from '@react-navigation/drawer'
import { FlashList } from '@shopify/flash-list'
import { Settings } from '@tamagui/lucide-icons'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar, Button, Text, View, XStack, YStack } from 'tamagui'

import { MenuTabContent } from '@/components/menu/MenuTabContent'
import { Topic } from '@/types/assistant'
import { runAsyncFunction } from '@/utils'

import { getTopics } from '../../../db/queries/topics.queries'
import TopicItem from '../topic/TopicItem'

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { t } = useTranslation()
  const [topics, setTopics] = useState<Topic[]>([])
  const isDrawerOpen = useDrawerStatus() === 'open'

  const refreshTopics = () => {
    runAsyncFunction(async () => {
      try {
        const topicsData = await getTopics()
        setTopics(topicsData)
      } catch (error) {
        console.error('Failed to fetch topics:', error)
      }
    })
  }

  const handleTopicSeeAll = () => {
    props.navigation.navigate('Main', { screen: 'TopicScreen' })
    console.log('Navigate to all topics')
  }

  const renderItem = ({ item }: { item: Topic }) => <TopicItem topic={item} onTopicDeleted={refreshTopics} />

  useEffect(() => {
    if (isDrawerOpen) {
      runAsyncFunction(async () => {
        try {
          const topicsData = await getTopics()
          setTopics(topicsData)
        } catch (error) {
          console.error('Failed to fetch topics:', error)
        }
      })
    }
  }, [isDrawerOpen])

  return (
    <YStack flex={1} backgroundColor="transparent">
      <YStack gap={10} flex={1}>
        <YStack paddingHorizontal={20} paddingTop={50} paddingBottom={10}>
          <DrawerItemList {...props} />
        </YStack>

        <YStack backgroundColor="$background" padding="$2" flex={1}>
          <MenuTabContent
            searchPlaceholder={t('common.search_placeholder')}
            title={t('menu.topic.recent')}
            onSeeAllPress={handleTopicSeeAll}>
            <View style={{ flex: 1, minHeight: 200 }}>
              <FlashList
                ItemSeparatorComponent={() => <YStack height={20} />}
                data={topics}
                renderItem={renderItem}
                estimatedItemSize={50}
              />
            </View>
          </MenuTabContent>
        </YStack>
      </YStack>

      <XStack paddingHorizontal={20} paddingBottom={40} justifyContent="space-between" alignItems="center">
        <XStack gap={10} alignItems="center">
          <Avatar circular size={48}>
            <Avatar.Image accessibilityLabel="Cam" src={require('@/assets/images/favicon.png')} />
            <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
          </Avatar>
          <Text>{t('common.cherry_studio')}</Text>
        </XStack>
        <Button
          icon={<Settings size={24} />}
          chromeless
          onPress={() => {
            props.navigation.navigate('Main', { screen: 'SettingsScreen' })
            props.navigation.closeDrawer()
          }}
        />
      </XStack>
    </YStack>
  )
}
