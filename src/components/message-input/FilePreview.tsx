import { CircleX, File } from '@tamagui/lucide-icons'
import React from 'react'
import { Button, Text, XStack, YStack } from 'tamagui'

import { FileType } from '@/types/file'
import { formatFileSize } from '@/utils/file'

interface FilePreviewProps {
  files: FileType[]
  setFiles: (files: FileType[]) => void
}

const FilePreview: React.FC<FilePreviewProps> = ({ files, setFiles }) => {
  return (
    <XStack>
      {files.map(file => {
        return (
          <XStack key={file.id} gap={12} alignItems="center" justifyContent="center">
            <File />
            <YStack gap={2}>
              <Text>{file.name}</Text>
              <Text>{formatFileSize(file.size)}</Text>
            </YStack>
            <Button
              chromeless
              size={24}
              icon={<CircleX />}
              onPress={() => {
                setFiles(files.filter(f => f.id !== file.id))
              }}
            />
          </XStack>
        )
      })}
    </XStack>
  )
}

export default FilePreview
