import React from 'react'
import { View } from 'tamagui'
import { Text } from 'tamagui'

import { ThinkingMessageBlock } from '@/types/message'

import ReactNativeMarkdown from '../../markdown/ReactNativeMarkdown'

interface Props {
  block: ThinkingMessageBlock
}

const thinkContent = '<think>'

const ThinkingBlock: React.FC<Props> = ({ block }) => {
  return (
    <View>
      <Text>{thinkContent}</Text>
      <ReactNativeMarkdown block={block} />
      <Text>{thinkContent}</Text>
    </View>
  )
}

export default ThinkingBlock
