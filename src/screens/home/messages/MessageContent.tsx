import React from 'react'
import { StyleSheet } from 'react-native'
import { useThemeName, View } from 'tamagui'

import { useMessageBlocks } from '@/hooks/useMessageBlocks'
import { Message, MessageBlockType } from '@/types/message'

import MessageBlockRenderer from './blocks'

interface Props {
  message: Message
}

const MessageContent: React.FC<Props> = ({ message }) => {
  const theme = useThemeName()
  const isDark = theme === 'dark'

  const isUser = message.role === 'user'
  const { processedBlocks } = useMessageBlocks(message.id)

  const mediaBlocks = processedBlocks.filter(
    block => block.type === MessageBlockType.IMAGE || block.type === MessageBlockType.FILE
  )
  const contentBlocks = processedBlocks.filter(
    block => block.type !== MessageBlockType.IMAGE && block.type !== MessageBlockType.FILE
  )

  const userMessageBackgroundColor = isDark ? 'rgba(0, 83, 45, 1)' : 'rgba(0, 185, 107, 1)'

  return (
    <View style={isUser ? styles.userContainer : styles.assistantContainer}>
      {mediaBlocks.length > 0 && <MessageBlockRenderer blocks={mediaBlocks} />}
      {contentBlocks.length > 0 && (
        <View
          style={[
            styles.contentWrapper,
            isUser ? styles.userMessageContent : styles.assistantMessageContent,
            isUser && { backgroundColor: userMessageBackgroundColor },
            mediaBlocks.length > 0 && { marginTop: 8 }
          ]}>
          <MessageBlockRenderer blocks={contentBlocks} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  userContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  },
  assistantContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  contentWrapper: {
    paddingHorizontal: 20,
    // paddingVertical: 5,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  userMessageContent: {
    flex: 1
  },
  assistantMessageContent: {
    backgroundColor: 'transparent'
  }
})

export default React.memo(MessageContent)
