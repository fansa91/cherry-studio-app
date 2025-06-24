import { File } from '@tamagui/lucide-icons'
import { memo } from 'react'
import React from 'react'
import { Text, View, XStack, YStack } from 'tamagui'

import { FileMessageBlock } from '@/types/message'
import { formatFileSize } from '@/utils/file'

interface Props {
  block: FileMessageBlock
}

const FileBlock: React.FC<Props> = ({ block }) => {
  return (
    <View>
      <XStack key={block.file.id} gap={12} alignItems="center" justifyContent="center">
        <File />
        <YStack gap={2}>
          <Text>{block.file.name}</Text>
          <Text>{formatFileSize(block.file.size)}</Text>
        </YStack>
      </XStack>
    </View>
  )
}

export default memo(FileBlock)
