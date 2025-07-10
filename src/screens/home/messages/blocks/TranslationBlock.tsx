import { FC } from 'react'
import React from 'react'
import { Separator, View } from 'tamagui'

import { TranslationMessageBlock } from '@/types/message'

import ReactNativeMarkdown from '../../markdown/ReactNativeMarkdown'

interface Props {
  block: TranslationMessageBlock
}

const TranslationBlock: FC<Props> = ({ block }) => {
  return (
    <View>
      <Separator />
      <ReactNativeMarkdown block={block} />
    </View>
  )
}

export default TranslationBlock
