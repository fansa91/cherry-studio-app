import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { Image, ScrollView, styled, Text, View, XStack, YStack } from 'tamagui'

import AssistantItemCard from '@/components/assistant/AssistantItemCard'
import { HeaderBar } from '@/components/header-bar'
import { MessageInput } from '@/components/message-input/MessageInput'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { getSystemAssistants } from '@/mock'
import { getAssistantById } from '@/services/AssistantService'
import { createNewTopic, getNewestTopic } from '@/services/TopicService'
import { Assistant, Topic } from '@/types/assistant'
import { NavigationProps, RootStackParamList } from '@/types/naviagate'
import { runAsyncFunction } from '@/utils'

import { getTopicById } from '../../../db/queries/topics.queries'
import Messages from './messages/Messages'
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>

const HomeScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<NavigationProps>()
  const [assistant, setAssistant] = useState<Assistant | null>(null)
  const [topic, setTopic] = useState<Topic | null>(null)
  const systemAssistants = useMemo(() => getSystemAssistants(), [])
  const [hasMessages, setHasMessages] = useState(false)
  const route = useRoute<HomeScreenRouteProp>()

  const { topicId } = route.params || {}

  useEffect(() => {
    runAsyncFunction(async () => {
      const assistantData = await getAssistantById('1')
      setAssistant(assistantData)

      if (!topicId) {
        let newTopic = await getNewestTopic()

        if (!newTopic) {
          newTopic = await createNewTopic(assistantData)
        }

        setTopic(newTopic)
        setHasMessages(false)
        return
      }

      const topicData = await getTopicById(topicId)

      if (topicData) {
        setTopic(topicData)
        setHasMessages(topicData.messages.length > 0)
      } else {
        console.warn(`Topic with ID ${topicId} not found.`)
      }
    })
  }, [topicId])

  const handlePress = () => {
    navigation.navigate('AssistantMarketScreen')
  }

  return (
    <SafeAreaContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <YStack paddingHorizontal={12} backgroundColor="$background" flex={1} onPress={Keyboard.dismiss}>
          {assistant && <HeaderBar assistant={assistant} />}

          {/* assistant market(Temporary) */}
          {!hasMessages && (
            <YStack gap={17} paddingHorizontal={20} paddingTop={40}>
              <XStack justifyContent="space-between">
                <Text>{t('assistants.market.popular')}</Text>
                <Text onPress={handlePress}>{t('common.see_all')}</Text>
              </XStack>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <XStack gap={20}>
                  {systemAssistants.slice(0, 3).map(assistant => (
                    <AssistantItemCard
                      key={assistant.id}
                      assistant={assistant}
                      setIsBottomSheetOpen={() => {}}
                      onAssistantPress={() => {}}
                    />
                  ))}
                </XStack>
              </ScrollView>
            </YStack>
          )}

          {/* 主要内容区域 */}
          {!hasMessages && (
            <ContentContainer>
              <Image
                source={require('@/assets/images/adaptive-icon.png')}
                width={100}
                height={100}
                resizeMode="contain"
                borderRadius={50}
                overflow="hidden"
              />

              <YStack alignItems="center" space="$2">
                <Text fontSize="$3" color="$color11" textAlign="center" maxWidth={300}>
                  {t('chat.welcome')}
                </Text>
              </YStack>
            </ContentContainer>
          )}

          {hasMessages && assistant && topic && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Messages key={topic.id} assistant={assistant} topic={topic} />
            </ScrollView>
          )}

          <InputContainer>
            {assistant && topic && <MessageInput assistant={assistant} topic={topic} setHasMessages={setHasMessages} />}
          </InputContainer>
        </YStack>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  )
}

const ContentContainer = styled(YStack, {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
})

const InputContainer = styled(View, {
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: '$gray2',
  borderRadius: 12
})

export default HomeScreen
