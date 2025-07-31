import { useNavigation } from '@react-navigation/native'
import { PenSquare } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'tamagui'

import { SettingContainer } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import { GroupedTopicList } from '@/components/topic/GroupTopicList'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { SearchInput } from '@/components/ui/SearchInput'
import { useTopics } from '@/hooks/useTopic'
import { getDefaultAssistant } from '@/services/AssistantService'
import { createNewTopic } from '@/services/TopicService'
import { NavigationProps } from '@/types/naviagate'

export default function TopicScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()
  const { topics, isLoading } = useTopics()

  const handleAddNewTopic = async () => {
    const defaultAssistant = await getDefaultAssistant()
    const newTopic = await createNewTopic(defaultAssistant)
    navigation.navigate('ChatScreen', { topicId: newTopic.id })
  }

  if (isLoading) {
    return (
      <SafeAreaContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </SafeAreaContainer>
    )
  }

  return (
    <SafeAreaContainer style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar
        title={t('topics.title.recent')}
        onBackPress={() => navigation.goBack()}
        rightButton={{
          icon: <PenSquare size={24} />,
          onPress: handleAddNewTopic
        }}
      />
      <SettingContainer>
        <SearchInput placeholder={t('common.search_placeholder')} />
        <GroupedTopicList topics={topics} />
      </SettingContainer>
    </SafeAreaContainer>
  )
}
