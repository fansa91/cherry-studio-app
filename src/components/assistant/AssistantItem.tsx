import { useNavigation } from '@react-navigation/native'
import { Trash2 } from '@tamagui/lucide-icons'
import { FC, useRef } from 'react' // Added useRef
import React from 'react'
import { Animated } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable'
import { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { Button, Text, XStack, YStack } from 'tamagui'

import { Assistant } from '@/types/assistant'
import { NavigationProps } from '@/types/naviagate'

interface AssistantItemProps {
  assistant: Assistant
}

function RenderRightActions(progress: SharedValue<number>, swipeableMethods: SwipeableMethods, assistant: Assistant) {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [80, 0])

    return {
      transform: [{ translateX }]
    }
  })

  const handleDelete = () => {
    console.log('Delete assistant:', assistant.name)
    swipeableMethods.close()
  }

  return (
    <Animated.View style={[{ width: 80 }, animatedStyle]}>
      <RectButton
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={handleDelete}>
        <Trash2 color="#C94040" size={20} />
      </RectButton>
    </Animated.View>
  )
}

const AssistantItem: FC<AssistantItemProps> = ({ assistant }) => {
  const swipeableRef = useRef(null)
  const navigation = useNavigation<NavigationProps>()

  const renderRightActions = (
    progress: SharedValue<number>,
    _: SharedValue<number>,
    swipeableMethods: SwipeableMethods
  ) => {
    return RenderRightActions(progress, swipeableMethods, assistant)
  }

  const editAssistant = () => {
    navigation.navigate('AssistantDetailScreen', { assistantId: assistant.id })
  }

  // get the newest update time from assistant's topics
  const updateTime = new Date(
    assistant.topics?.reduce((latest, topic) => {
      const topicUpdateTime = new Date(topic.updatedAt).getTime()
      return topicUpdateTime > latest ? topicUpdateTime : latest
    }, 0) ?? Date.now()
  ).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <ReanimatedSwipeable ref={swipeableRef} renderRightActions={renderRightActions} friction={2} rightThreshold={40}>
      <XStack
        borderRadius={30}
        backgroundColor="$gray2"
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={3}
        paddingHorizontal={20}
        onPress={editAssistant}>
        <XStack gap={14} flex={1} width="60%">
          <Text fontSize={22}>{assistant.emoji}</Text>
          <YStack gap={2} flex={1}>
            <Text width="90%" numberOfLines={1} ellipsizeMode="tail">
              {assistant.name}
            </Text>
            <Text fontSize={12}>{updateTime}</Text>
          </YStack>
        </XStack>
        <Button disabled circular backgroundColor="$gray8" size={20}>
          <Text>{assistant.topics?.length ?? 1}</Text>
        </Button>
      </XStack>
    </ReanimatedSwipeable>
  )
}

export default AssistantItem
