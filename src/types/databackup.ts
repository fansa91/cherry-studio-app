import { WebSearchState } from '@/store/websearch'

import { Assistant, Provider } from './assistant'
import { Message, MessageBlock } from './message'

export type WebDavConfig = {
  webdavHost: string
  webdavUser: string
  webdavPass: string
  webdavPath: string
  fileName?: string
  skipBackupFile?: boolean
}

export type WebDAVSyncState = {
  lastSyncTime: number | null
  syncing: boolean
  lastSyncError: string | null
}

export type NutStore = {
  nutstoreToken: string
  nutstorePath: string
  nutstoreAutoSync: boolean
  nutstoreSyncInterval: number
  nutstoreSyncState: WebDAVSyncState
}

export type BackupData = {
  time: number
  version: number
  indexedDB: {
    // files: Omit<FileType, 'md5' | 'count' | 'mime_type'>[]
    topics: {
      id: string
      messages: Message[]
    }[]
    message_blocks: MessageBlock[]
  }
  redux: BackupReduxData
}

export type BackupReduxData = {
  assistants: {
    defaultAssistant: Assistant
    assistants: Assistant[]
  }
  llm: {
    providers: Provider[]
  }
  websearch: WebSearchState
}
