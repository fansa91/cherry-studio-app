import { FC, memo, useMemo } from 'react'
import React from 'react'
import { View, XStack } from 'tamagui'

import { useMessageBlocks } from '@/hooks/useMessageBlocks'
import {
  ImageMessageBlock,
  MainTextMessageBlock,
  Message,
  MessageBlock,
  MessageBlockStatus,
  MessageBlockType
} from '@/types/message'

import FileBlock from './FileBlock'
import ImageBlock from './ImageBlock'
import MainTextBlock from './MainTextBlock'
import PlaceholderBlock from './PlaceholderBlock'
import ThinkingBlock from './ThinkingBlock'

interface MessageBlockRendererProps {
  message: Message
}

const filterImageBlockGroups = (blocks: MessageBlock[]): (MessageBlock[] | MessageBlock)[] => {
  return blocks.reduce((acc: (MessageBlock[] | MessageBlock)[], currentBlock) => {
    if (currentBlock.type === MessageBlockType.IMAGE) {
      const prevGroup = acc[acc.length - 1]

      if (Array.isArray(prevGroup) && prevGroup[0].type === MessageBlockType.IMAGE) {
        prevGroup.push(currentBlock)
      } else {
        acc.push([currentBlock])
      }
    } else {
      acc.push(currentBlock)
    }

    return acc
  }, [])
}

const MessageBlockRenderer: FC<MessageBlockRendererProps> = ({ message }) => {
  const { processedBlocks } = useMessageBlocks(message.id)

  const groupedBlocks = useMemo(() => filterImageBlockGroups(processedBlocks), [processedBlocks])

  return (
    <View flex={1}>
      {groupedBlocks.map(block => {
        if (Array.isArray(block)) {
          const groupKey = block.map(imageBlock => imageBlock.id).join('-')
          return (
            <View key={groupKey}>
              <XStack>
                {block.map(imageBlock => (
                  <ImageBlock key={imageBlock.id} block={imageBlock as ImageMessageBlock} />
                ))}
              </XStack>
            </View>
          )
        }

        let blockComponent: React.ReactNode = null

        switch (block.type) {
          case MessageBlockType.UNKNOWN:
            if (block.status === MessageBlockStatus.PROCESSING) {
              blockComponent = <PlaceholderBlock key={block.id} block={block} />
            }

            break
          case MessageBlockType.MAIN_TEXT:

          case MessageBlockType.CODE: {
            const mainTextBlock = block as MainTextMessageBlock
            const citationBlockId = mainTextBlock.citationReferences?.[0]?.citationBlockId
            blockComponent = (
              <MainTextBlock
                key={block.id}
                block={mainTextBlock}
                // Pass only the ID string
                citationBlockId={citationBlockId}
              />
            )
            break
          }

          case MessageBlockType.IMAGE:
            blockComponent = <ImageBlock key={block.id} block={block} />
            break
          case MessageBlockType.FILE:
            blockComponent = <FileBlock key={block.id} block={block} />
            break
          case MessageBlockType.THINKING:
            blockComponent = <ThinkingBlock key={block.id} block={block} />
            break
          default:
            console.warn('Unsupported block type in MessageBlockRenderer:', (block as any).type, block)
            break
        }

        return <View key={block.type === MessageBlockType.UNKNOWN ? 'placeholder' : block.id}>{blockComponent}</View>
      })}
    </View>
  )
}

export default memo(MessageBlockRenderer)
