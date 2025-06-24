// components/TopEntry.tsx
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerActions, ParamListBase, useNavigation } from '@react-navigation/native'
import React from 'react'
import { XStack } from 'tamagui'

import { Assistant } from '@/types/assistant'

import { AssistantSelection } from './AssistantSelection'
import { MenuButton } from './MenuButton'
import { NewTopicButton } from './NewTopicButton'

interface HeaderBarProps {
  assistant: Assistant
}

export const HeaderBar = ({ assistant }: HeaderBarProps) => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  return (
    <>
      <XStack paddingHorizontal="$4" alignItems="center" height={44} justifyContent="space-between">
        <XStack alignItems="center" minWidth={40}>
          <MenuButton onMenuPress={handleMenuPress} />
        </XStack>
        <XStack flex={1} justifyContent="center" alignItems="center">
          <AssistantSelection assistant={assistant} />
        </XStack>
        <XStack alignItems="center" minWidth={40} justifyContent="flex-end">
          <NewTopicButton assistant={assistant} />
        </XStack>
      </XStack>
    </>
  )
}
