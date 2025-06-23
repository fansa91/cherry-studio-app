import BottomSheet from '@gorhom/bottom-sheet'
import { BookmarkMinus } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Markdown from 'react-native-markdown-display'
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui'

import { ISheet } from '@/components/ui/Sheet'
import { Assistant } from '@/types/assistant'

import GroupTag from './GroupTag'

interface AssistantItemSheetProps {
  assistant: Assistant
  bottomSheetRef: React.RefObject<BottomSheet | null>
  isOpen: boolean
  onClose: () => void
}

export default function AssistantItemSheet({ assistant, bottomSheetRef, isOpen, onClose }: AssistantItemSheetProps) {
  const { t } = useTranslation()
  const snapPoints = ['75%']

  return (
    <ISheet bottomSheetRef={bottomSheetRef} snapPoints={snapPoints} isOpen={isOpen} onClose={onClose}>
      <YStack flex={1} paddingTop={10} paddingBottom={30}>
        {/* ScrollView 区域 - 占据剩余空间 */}
        {/* todo: fix scrollview 空间问题，有些assistant描述会超出，但无法控制高度 */}
        <ScrollView flex={1} paddingHorizontal={20} showsVerticalScrollIndicator={false} maxHeight="100%">
          <YStack alignItems="center" gap={10} paddingVertical={10}>
            <Text fontSize={84}>{assistant.emoji?.replace(/\r\n/g, '')}</Text>
            <XStack gap={20}>
              {assistant.group &&
                assistant.group.map((group, index) => (
                  <GroupTag key={index} group={group} paddingHorizontal={16} borderWidth={1} borderColor="$color12" />
                ))}
            </XStack>
            <Text>{assistant.description}</Text>
            <Text>
              <Markdown>{assistant.prompt}</Markdown>
            </Text>
          </YStack>
        </ScrollView>

        {/* 按钮区域 */}
        <XStack justifyContent="center" alignItems="center" paddingHorizontal={20} paddingTop={10} gap={20}>
          <BookmarkMinus size={24} />
          <Button backgroundColor="$foregroundGreen" borderRadius={40} height={42} width="70%">
            {t('assistants.market.button.chat')}
          </Button>
        </XStack>
      </YStack>
    </ISheet>
  )
}
