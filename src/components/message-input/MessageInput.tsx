import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextArea, XStack, YStack } from 'tamagui'

import { uploadFiles } from '@/services/FileService'
import { sendMessage as _sendMessage } from '@/services/MessagesService'
import { getUserMessage } from '@/services/MessagesService'
import { Assistant, Topic } from '@/types/assistant'
import { FileType } from '@/types/file'
import { MessageInputBaseParams } from '@/types/message'

import { AddFileButton } from './AddFileButton'
import FilePreview from './FilePreview'
import { MentionButton } from './MentionButton'
import { SendButton } from './SendButton'
import { ThinkButton } from './ThinkButton'
import { VoiceButton } from './VoiceButton'
import { WebsearchButton } from './WebsearchButton'
interface MessageInputProps {
  assistant: Assistant
  topic: Topic
  setHasMessages: (hasMessages: boolean) => void
}

export const MessageInput: React.FC<MessageInputProps> = ({ assistant, topic, setHasMessages }) => {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const [files, setFiles] = useState<FileType[]>([])

  const sendMessage = async () => {
    if (isEmpty(text.trim())) {
      return
    }

    setText('')
    setFiles([])
    setHasMessages(true)

    try {
      const baseUserMessage: MessageInputBaseParams = { assistant, topic, content: text }

      if (files.length > 0) {
        const uploadedFiles = await uploadFiles(files)
        baseUserMessage.files = uploadedFiles
      }

      const { message, blocks } = getUserMessage(baseUserMessage)

      await _sendMessage(message, blocks, assistant, topic.id)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <YStack gap={10}>
      {files.length > 0 && <FilePreview files={files} setFiles={setFiles} />}
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
          <AddFileButton files={files} setFiles={setFiles} />
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
