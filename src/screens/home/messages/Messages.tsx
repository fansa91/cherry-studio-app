import { FlashList } from '@shopify/flash-list'
import { FC } from 'react'
import React from 'react'
import { View } from 'tamagui'

import { useMessages } from '@/hooks/useMessages'
import { Assistant, Topic } from '@/types/assistant'
import { Message } from '@/types/message'

import MessageItem from './Message'

interface MessagesProps {
  assistant: Assistant
  topic: Topic
  setActiveTopic?: (topic: Topic) => void
  onComponentUpdate?(): void
  onFirstUpdate?(): void
}

const Messages: FC<MessagesProps> = ({ assistant, topic, setActiveTopic, onComponentUpdate, onFirstUpdate }) => {
  const { processedMessages } = useMessages(topic.id)

  const renderMessage = ({ item }: { item: Message }) => {
    return <MessageItem assistant={assistant} message={item} />
  }

  return (
    <View style={{ flex: 1, minHeight: 200 }}>
      <FlashList
        data={processedMessages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        estimatedItemSize={60}
      />
    </View>
  )
}

export default Messages
