import { FC, memo } from 'react'
import React from 'react'
import { View, YStack } from 'tamagui'

import { Message } from '@/types/message'

import MessageContent from './MessageContent'

interface MessageItemProps {
  message: Message
}

const MessageItem: FC<MessageItemProps> = ({ message }) => {
  return (
    <View flex={1}>
      <YStack flex={1}>
        <MessageContent message={message} />
      </YStack>
    </View>
  )
}

export default memo(MessageItem)
