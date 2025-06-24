import { FC, memo } from 'react'
import React from 'react'
import { View, YStack } from 'tamagui'

import { Assistant } from '@/types/assistant'
import { Message } from '@/types/message'

import MessageContent from './MessageContent'
import MessageHeader from './MessageHeader'

interface MessageItemProps {
  message: Message
  assistant: Assistant
}

const MessageItem: FC<MessageItemProps> = ({ assistant, message }) => {
  return (
    <View flex={1}>
      <YStack flex={1}>
        {message.role === 'assistant' && <MessageHeader assistant={assistant} message={message} />}
        <MessageContent message={message} />
      </YStack>
    </View>
  )
}

export default memo(MessageItem)
