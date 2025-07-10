import { WebSearchResponse } from '@/types/websearch'

import { KnowledgeReference } from './knowledge'
import { MCPTool, MCPToolResponse } from './mcp'

export type LanguageVarious =
  | 'zh-CN'
  | 'zh-TW'
  | 'en-US'
  | 'ru-RU'
  | 'ja-JP'
  | 'ko-KR'
  | 'es-ES'
  | 'de-DE'
  | 'fr-FR'
  | 'id-ID'
export enum ThemeMode {
  light = 'light',
  dark = 'dark',
  auto = 'auto'
}

export type ExternalToolResult = {
  mcpTools?: MCPTool[]
  toolUse?: MCPToolResponse[]
  webSearch?: WebSearchResponse
  knowledge?: KnowledgeReference[]
}
