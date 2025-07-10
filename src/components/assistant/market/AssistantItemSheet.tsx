import BottomSheet from '@gorhom/bottom-sheet'
import { BookmarkMinus } from '@tamagui/lucide-icons'
import { BlurView } from 'expo-blur'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Markdown from 'react-native-markdown-display'
import { Button, Text, useTheme, View, XStack, YStack } from 'tamagui'

import { ISheet } from '@/components/ui/Sheet'
import { useSize } from '@/hooks/useSize'
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
  const { height } = useSize()
  const theme = useTheme()

  return (
    <ISheet
      enableDynamicSizing={false}
      bottomSheetRef={bottomSheetRef}
      footer={
        // 按钮区域
        <BlurView intensity={100} style={{ backgroundColor: theme.background075.val }}>
          <XStack justifyContent="center" alignItems="center" paddingHorizontal={20} padding={10} gap={20}>
            <BookmarkMinus size={24} />
            <Button backgroundColor="$foregroundGreen" borderRadius={40} height={42} width="70%">
              {t('assistants.market.button.chat')}
            </Button>
          </XStack>
        </BlurView>
      }
      header={
        <YStack justifyContent="center" alignItems="center" paddingVertical={10} top={0}>
          <Text fontSize={84}>{assistant.emoji?.replace(/\r\n/g, '')}</Text>
          <XStack gap={20}>
            {assistant.group &&
              assistant.group.map((group, index) => (
                <GroupTag key={index} group={group} paddingHorizontal={16} borderWidth={1} borderColor="$color12" />
              ))}
          </XStack>
        </YStack>
      }
      maxDynamicContentSize={height * 0.75}
      snapPoints={snapPoints}
      isOpen={isOpen}
      onClose={onClose}>
      <YStack flex={1} paddingTop={10}>
        <View flex={1} paddingHorizontal={20} maxHeight="100%">
          <YStack alignItems="center" gap={10} paddingVertical={10}>
            <Text style={{}}>{assistant.description}</Text>
            <Text>
              <Markdown
                style={{
                  text: {
                    color: theme.color.val
                  },
                  list_item: {
                    color: theme.color.val
                  }
                }}>
                {assistant.prompt}
              </Markdown>
            </Text>
          </YStack>
        </View>
      </YStack>
    </ISheet>
  )
}
