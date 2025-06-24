import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'tamagui'

import { Message } from '@/types/message'

import MessageBlockRenderer from './blocks'

interface Props {
  message: Message
}

const MessageContent: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user'

  return (
    <View style={[styles.container, isUser ? styles.userMessage : styles.assistantMessage]}>
      <MessageBlockRenderer message={message} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'green',
    width: '50%'
  },
  assistantMessage: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    backgroundColor: 'transparent'
  }
})

export default React.memo(MessageContent)
