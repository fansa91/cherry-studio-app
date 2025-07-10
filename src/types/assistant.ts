import OpenAI from 'openai'

import { Message } from './message'

export type Assistant = {
  id: string
  name: string
  prompt: string
  topics: Topic[]
  type: string
  emoji?: string
  description?: string
  model?: Model
  defaultModel?: Model
  settings?: Partial<AssistantSettings>
  /** enableWebSearch 代表使用模型内置网络搜索功能 */
  enableWebSearch?: boolean
  enableGenerateImage?: boolean
  knowledgeRecognition?: 'off' | 'on'
  tags?: string[] // 助手标签
  group?: string[] // 助手分组
}

export type AssistantSettings = {
  contextCount: number
  temperature: number
  topP: number
  maxTokens: number | undefined
  enableMaxTokens: boolean
  streamOutput: boolean
  defaultModel?: Model
  customParameters?: AssistantSettingCustomParameters[]
  reasoning_effort?: ReasoningEffortOptions
  qwenThinkMode?: boolean
  toolUseMode?: 'function' | 'prompt'
}
export type AssistantSettingCustomParameters = {
  name: string
  value: string | number | boolean | object
  type: 'string' | 'number' | 'boolean' | 'json'
}

export type ReasoningEffortOptions = 'low' | 'medium' | 'high' | 'auto'

export type Topic = {
  id: string
  assistantId: string
  name: string
  createdAt: string
  updatedAt: string
  messages: Message[]
  pinned?: boolean
  prompt?: string
  isNameManuallyEdited?: boolean
}

export type Model = {
  id: string
  provider: string
  name: string
  group: string
  owned_by?: string
  description?: string
  type?: ModelType[]
}

export type ModelType = 'text' | 'vision' | 'embedding' | 'reasoning' | 'function_calling' | 'web_search'

export type Usage = OpenAI.Completions.CompletionUsage & {
  thoughts_tokens?: number
}

export type Metrics = {
  completion_tokens: number
  time_completion_millsec: number
  time_first_token_millsec?: number
  time_thinking_millsec?: number
}

export type Provider = {
  id: string
  type: ProviderType
  name: string
  apiKey: string
  apiHost: string
  apiVersion?: string
  models: Model[]
  enabled?: boolean
  checked?: boolean
  isSystem?: boolean
  isAuthed?: boolean
  rateLimit?: number
  isNotSupportArrayContent?: boolean
  notes?: string
  extra_headers?: Record<string, string>
}

export type ProviderType =
  | 'openai'
  | 'openai-response'
  | 'anthropic'
  | 'gemini'
  | 'qwenlm'
  | 'azure-openai'
  | 'vertexai'
