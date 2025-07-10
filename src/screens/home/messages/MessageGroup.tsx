import { FC } from 'react'
import React from 'react'
import { Tabs, Text, View, XStack } from 'tamagui'

import { MultiModalIcon } from '@/components/icons/MultiModelIcon'
import { Assistant } from '@/types/assistant'
import { GroupedMessage } from '@/types/message'

import MessageItem from './Message'
import MessageFooter from './MessageFooter'
import MessageHeader from './MessageHeader'
interface MessageGroupProps {
  assistant: Assistant
  item: [string, GroupedMessage[]]
}

const MessageGroup: FC<MessageGroupProps> = ({ assistant, item }) => {
  const [key, messagesInGroup] = item

  const renderUserMessage = () => {
    return <MessageItem message={messagesInGroup[0]} />
  }

  const renderAssistantMessages = () => {
    if (messagesInGroup.length === 1) {
      return (
        <View>
          <MessageHeader assistant={assistant} message={messagesInGroup[0]} />
          <MessageItem message={messagesInGroup[0]} />
          <MessageFooter assistant={assistant} message={messagesInGroup[0]} />
        </View>
      )
    }

    return (
      <View>
        <MessageHeader assistant={assistant} message={messagesInGroup[0]} />
        <View flexDirection="row" ai="center" gap="$2">
          <Tabs defaultValue={'0'} orientation="horizontal" flexDirection="column" f={1}>
            <Tabs.List>
              <XStack flex={1} gap={8}>
                <MultiModalIcon size={18} />
                {messagesInGroup.map((_message, index) => (
                  // todo: change tab style
                  <Tabs.Tab
                    paddingHorizontal={5}
                    paddingVertical={1}
                    borderRadius={48}
                    height={20}
                    justifyContent="center"
                    alignItems="center"
                    key={index}
                    value={index.toString()}
                    f={1}>
                    <Text fontSize={10} lineHeight={20}>
                      @{_message.model?.name}({_message.model?.provider})
                    </Text>
                  </Tabs.Tab>
                ))}
              </XStack>
            </Tabs.List>

            {messagesInGroup.map((message, index) => (
              <Tabs.Content key={index} value={index.toString()}>
                <MessageItem message={message} />
                <MessageFooter assistant={assistant} message={message} />
              </Tabs.Content>
            ))}
          </Tabs>
        </View>
      </View>
    )
  }

  return (
    <View>
      {key.includes('user') && renderUserMessage()}
      {key.includes('assistant') && renderAssistantMessages()}
    </View>
  )
}

export default MessageGroup
