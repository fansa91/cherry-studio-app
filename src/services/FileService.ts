import { Directory, File, Paths } from 'expo-file-system/next'

import { FileType } from '@/types/file'
const fileStorageDir = new Directory(Paths.cache, 'Files')

export async function uploadFiles(files: FileType[]): Promise<FileType[]> {
  if (!fileStorageDir.exists) {
    fileStorageDir.create({ intermediates: true, overwrite: true })
  }

  const filePromises = files.map(async file => {
    try {
      const sourceFile = new File(file.path)
      const destinationFile = new File(fileStorageDir, `${file.id}.${file.ext}`)
      sourceFile.copy(destinationFile)
      return {
        ...file,
        path: destinationFile.uri
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      throw new Error(`Failed to upload file: ${file.name}`)
    }
  })
  const uploadedFiles = await Promise.all(filePromises)

  return uploadedFiles
}
