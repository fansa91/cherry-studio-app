import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextArea, XStack, YStack } from 'tamagui'

import { sendMessage as _sendMessage } from '@/services/MessagesService'
import { getUserMessage } from '@/services/MessagesService'
import { Assistant, Topic } from '@/types/assistant'
import { MessageInputBaseParams } from '@/types/message'

import { AddFileButton } from './AddFileButton'
import { MentionButton } from './MentionButton'
import { SendButton } from './SendButton'
import { ThinkButton } from './ThinkButton'
import { VoiceButton } from './VoiceButton'
import { WebsearchButton } from './WebsearchButton'
interface MessageInputProps {
  assistant: Assistant
  topic: Topic
}

export const MessageInput: React.FC<MessageInputProps> = ({ assistant, topic }) => {
  const { t } = useTranslation()
  const [text, setText] = useState('')

  const sendMessage = async () => {
    if (isEmpty(text.trim())) {
      return
    }

    try {
      const baseUserMessage: MessageInputBaseParams = { assistant, topic, content: text }

      const { message, blocks } = getUserMessage(baseUserMessage)

      await _sendMessage(message, blocks, assistant, topic.id)

      setText('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <YStack gap={10}>
      {/* message */}
      <XStack>
        <TextArea
          placeholder={t('inputs.placeholder')}
          borderWidth={0}
          backgroundColor="$colorTransparent"
          flex={1}
          value={text}
          onChangeText={setText}
        />
      </XStack>
      {/* button */}
      <XStack justifyContent="space-between" alignItems="center">
        <XStack gap={5} alignItems="center">
          <MentionButton />
          <AddFileButton />
          <WebsearchButton />
          <ThinkButton />
        </XStack>
        <XStack gap={5} alignItems="center">
          <VoiceButton />
          <SendButton onSend={sendMessage} />
        </XStack>
      </XStack>
    </YStack>
  )
}
