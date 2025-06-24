import { isEmpty } from 'lodash'
import { FC, memo, useMemo } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Markdown from 'react-native-markdown-display'
import { useThemeName, View } from 'tamagui'

import { MainTextMessageBlock, ThinkingMessageBlock, TranslationMessageBlock } from '@/types/message'
import { escapeBrackets, removeSvgEmptyLines } from '@/utils/formats'

interface Props {
  block: MainTextMessageBlock | TranslationMessageBlock | ThinkingMessageBlock
}

const ReactNativeMarkdown: FC<Props> = ({ block }) => {
  const { t } = useTranslation()
  const theme = useThemeName()
  const textColor = theme === 'dark' ? 'white' : 'black'

  const messageContent = useMemo(() => {
    const empty = isEmpty(block.content)
    const paused = block.status === 'paused'
    const content = empty && paused ? t('message.chat.completion.paused') : block.content
    return removeSvgEmptyLines(escapeBrackets(content))
  }, [block, t])

  const style = {
    text: {
      color: textColor,
      fontSize: 12
    },
    body: {
      backgroundColor: 'transparent'
    },
    blockquote: {
      backgroundColor: 'transparent'
    },
    code_inline: {
      color: textColor,
      backgroundColor: 'transparent'
    },
    code_block: {
      color: textColor,
      // todo background not working
      backgroundColor: 'transparent'
    }
  }
  return (
    <View>
      <Markdown style={style}>{messageContent}</Markdown>
    </View>
  )
}

export default memo(ReactNativeMarkdown)
