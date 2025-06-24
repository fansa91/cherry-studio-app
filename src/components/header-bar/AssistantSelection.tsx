import { BookmarkMinus, ChevronDown, Settings2 } from '@tamagui/lucide-icons'
import { BlurView } from 'expo-blur' // 导入 BlurView
import React, { useState } from 'react'
import { Button, Popover, Text, useWindowDimensions, View, XStack, YStack } from 'tamagui'

import { Assistant } from '@/types/assistant'

interface AssistantSelectionProps {
  assistant: Assistant
}

export const AssistantSelection: React.FC<AssistantSelectionProps> = ({ assistant }) => {
  const [open, setOpen] = useState(false)
  const { width } = useWindowDimensions()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button chromeless iconAfter={<ChevronDown size={16} rotation={open ? 180 : 0} animation="quick" />}>
          {assistant.name}
        </Button>
      </Popover.Trigger>

      <Popover.Content
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        animation="quick"
        style={{ width: width }}
        padding={0}
        backgroundColor="transparent"
        elevation={0}>
        <BlurView
          intensity={20} // 改变模糊程度
          tint="default"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 10
          }}>
          <YStack width="100%">
            <View>
              <YStack gap={20} padding={20} borderWidth={0}>
                <XStack justifyContent="space-between" alignItems="center">
                  <XStack gap={10} alignItems="center">
                    <Text fontSize={35}>{assistant.emoji}</Text>
                    <YStack>
                      <Text fontSize={18}>{assistant.name}</Text>
                      {assistant.model && <Text>@{assistant.model?.name}</Text>}
                    </YStack>
                  </XStack>
                  <XStack
                    gap={15}
                    borderRadius={26}
                    paddingVertical={5}
                    paddingHorizontal={15}
                    backgroundColor="rgba(255, 255, 255, 0.1)"
                    borderColor="rgba(240, 244, 250, 0.2)"
                    borderWidth={0.5}>
                    <BookmarkMinus size={15} />
                    <Settings2 size={15} />
                  </XStack>
                </XStack>
                <XStack>
                  <Text fontSize={16} numberOfLines={3} ellipsizeMode="tail">
                    {assistant.prompt}
                  </Text>
                </XStack>
              </YStack>
            </View>
          </YStack>
        </BlurView>
      </Popover.Content>
    </Popover>
  )
}
