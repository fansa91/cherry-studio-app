import React from 'react'
import { Text, View, XStack } from 'tamagui'

import { Assistant } from '@/types/assistant'
import { Message } from '@/types/message'

interface MessageHeaderProps {
  message: Message
  assistant: Assistant
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ message, assistant }) => {
  return (
    <View>
      <XStack gap={10} alignItems="center" marginBottom={10}>
        <Text height={24} width={24}>
          {assistant.emoji}
        </Text>
        <Text fontSize={14} fontWeight="bold">
          {assistant.name}
        </Text>
        <Text fontSize={10}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
        </Text>
      </XStack>
    </View>
  )
}

export default React.memo(MessageHeader)
