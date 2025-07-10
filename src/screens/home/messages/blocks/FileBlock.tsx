import { memo } from 'react'
import React from 'react'
import { View } from 'tamagui'

import FileItem from '@/components/message-input/preview-items/FileItem'
import { FileMessageBlock } from '@/types/message'

interface Props {
  block: FileMessageBlock
}

const FileBlock: React.FC<Props> = ({ block }) => {
  return (
    <View>
      <FileItem file={block.file} />
    </View>
  )
}

export default memo(FileBlock)
