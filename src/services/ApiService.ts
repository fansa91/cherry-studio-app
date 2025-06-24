import { findLast, isEmpty, takeRight } from 'lodash'

import AiProvider from '@/aiCore'
import { CompletionsParams } from '@/aiCore/middleware/schemas'
import { isEmbeddingModel } from '@/config/models/embedding'
import {
  isReasoningModel,
  isSupportedReasoningEffortModel,
  isSupportedThinkingTokenModel
} from '@/config/models/reasoning'
import i18n from '@/i18n'
import { Assistant, Model, Provider } from '@/types/assistant'
import { Chunk, ChunkType } from '@/types/chunk'
import { Message } from '@/types/message'

import { getAssistantById, getAssistantProvider, getAssistantSettings, getDefaultModel } from './AssistantService'
import {
  filterContextMessages,
  filterEmptyMessages,
  filterUsefulMessages,
  filterUserRoleStartMessages
} from './MessagesService'

const BASE_URL = 'http://localhost:8081'

export async function fetchChatCompletion({
  messages,
  assistant,
  onChunkReceived
}: {
  messages: Message[]
  assistant: Assistant
  onChunkReceived: (chunk: Chunk) => void
  // TODO
  // onChunkStatus: (status: 'searching' | 'processing' | 'success' | 'error') => void
}) {
  console.log('fetchChatCompletion', messages, assistant)

  const provider = getAssistantProvider(assistant)
  const AI = new AiProvider(provider)

  // Make sure that 'Clear Context' works for all scenarios including external tool and normal chat.
  messages = filterContextMessages(messages)

  const lastUserMessage = findLast(messages, m => m.role === 'user')
  const lastAnswer = findLast(messages, m => m.role === 'assistant')

  // if (!lastUserMessage) {
  //   console.error('fetchChatCompletion returning early: Missing lastUserMessage or lastAnswer')
  //   return
  // }

  // try {
  // NOTE: The search results are NOT added to the messages sent to the AI here.
  // They will be retrieved and used by the messageThunk later to create CitationBlocks.
  // const { mcpTools } = await fetchExternalTool(lastUserMessage, assistant, onChunkReceived, lastAnswer)
  const model = assistant.model || getDefaultModel()

  const { maxTokens, contextCount } = getAssistantSettings(assistant)

  const filteredMessages = filterUsefulMessages(messages)

  const _messages = filterUserRoleStartMessages(
    filterEmptyMessages(filterContextMessages(takeRight(filteredMessages, contextCount + 2))) // 取原来几个provider的最大值
  )

  const enableReasoning =
    ((isSupportedThinkingTokenModel(model) || isSupportedReasoningEffortModel(model)) &&
      assistant.settings?.reasoning_effort !== undefined) ||
    (isReasoningModel(model) && (!isSupportedThinkingTokenModel(model) || !isSupportedReasoningEffortModel(model)))

  // const enableWebSearch =
  //   (assistant.enableWebSearch && isWebSearchModel(model)) ||
  //   isOpenRouterBuiltInWebSearchModel(model) ||
  //   model.id.includes('sonar') ||
  //   false

  // const enableGenerateImage =
  //   isGenerateImageModel(model) && (isSupportedDisableGenerationModel(model) ? assistant.enableGenerateImage : true)

  // --- Call AI Completions ---
  onChunkReceived({ type: ChunkType.LLM_RESPONSE_CREATED })

  // if (enableWebSearch) {
  //   onChunkReceived({ type: ChunkType.LLM_WEB_SEARCH_IN_PROGRESS })
  // }

  await AI.completions(
    {
      callType: 'chat',
      messages: _messages,
      assistant,
      onChunk: onChunkReceived,
      // mcpTools: mcpTools,
      maxTokens,
      streamOutput: assistant.settings?.streamOutput || false,
      enableReasoning
      // enableWebSearch,
      // enableGenerateImage
    },
    {
      streamOutput: assistant.settings?.streamOutput || false
    }
  )
}

export async function checkApi(provider: Provider, model: Model) {
  try {
    const url = `${BASE_URL}/api/provider/check`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        provider,
        model
      })
    }

    const response = await fetch(url, options)
    const data = await response.json()

    // 检查响应状态和数据
    if (!response.ok || !data.success) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('Error in checkApi:', error)
    throw error
  }
}

export async function fetchModels(provider: Provider): Promise<Model[]> {
  try {
    const url = `${BASE_URL}/api/models`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ provider })
    })
    const { models } = await response.json()
    return models
  } catch (error) {
    console.error('Error in fetchModels:', error)
    throw error
  }
}

export function checkApiProvider(provider: Provider): void {
  if (provider.id !== 'ollama' && provider.id !== 'lmstudio') {
    if (!provider.apiKey) {
      throw new Error(i18n.t('message.error.enter.api.key'))
    }
  }

  if (!provider.apiHost) {
    throw new Error(i18n.t('message.error.enter.api.host'))
  }

  if (isEmpty(provider.models)) {
    throw new Error(i18n.t('message.error.enter.model'))
  }
}

export async function mockCheckApi(provider: Provider, model: Model): Promise<void> {
  checkApiProvider(provider)

  const ai = new AiProvider(provider)

  const assistant = await getAssistantById('1')
  assistant.model = model

  try {
    if (isEmbeddingModel(model)) {
      const result = await ai.getEmbeddingDimensions(model)

      if (result === 0) {
        throw new Error(i18n.t('message.error.enter.model'))
      }
    } else {
      const params: CompletionsParams = {
        callType: 'check',
        messages: 'hi',
        assistant,
        streamOutput: true
      }

      // Try streaming check first
      const result = await ai.completions(params)

      if (!result.getText()) {
        throw new Error('No response received')
      }

      console.log('Check API response:', result.getText())
    }
  } catch (error: any) {
    if (error.message.includes('stream')) {
      const params: CompletionsParams = {
        callType: 'check',
        messages: 'hi',
        assistant,
        streamOutput: false
      }
      const result = await ai.completions(params)

      if (!result.getText()) {
        throw new Error('No response received')
      }
    } else {
      throw error
    }
  }
}
