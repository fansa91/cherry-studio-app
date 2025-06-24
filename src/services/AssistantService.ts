import { DEFAULT_CONTEXTCOUNT, DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE } from '@/constants'
import i18n from '@/i18n'
import { INITIAL_PROVIDERS } from '@/mock'
import { Assistant, AssistantSettings, Model, Provider, Topic } from '@/types/assistant'
import { uuid } from '@/utils'

import { getAssistantById as _getAssistantById } from '../../db/queries/assistants.queries'

export function getDefaultAssistant(): Assistant {
  return {
    id: 'default',
    name: i18n.t('chat.default.name'),
    emoji: '😀',
    prompt: '',
    topics: [getDefaultTopic('default')],
    type: 'assistant',
    settings: {
      temperature: DEFAULT_TEMPERATURE,
      contextCount: DEFAULT_CONTEXTCOUNT,
      enableMaxTokens: false,
      maxTokens: 0,
      streamOutput: true,
      topP: 1,
      toolUseMode: 'prompt',
      customParameters: []
    }
  }
}

export async function getAssistantById(assistantId: string): Promise<Assistant> {
  // todo get from store
  const assistant = await _getAssistantById(assistantId)

  if (!assistant) {
    console.error(`Assistant with ID ${assistantId} not found`)
    throw new Error(`Assistant with ID ${assistantId} not found`)
  }

  return assistant
}

export function getAssistantProvider(assistant: Assistant): Provider {
  // todo
  // const providers = store.getState().llm.providers
  const providers = INITIAL_PROVIDERS
  const provider = providers.find(p => p.id === assistant.model?.provider)
  return provider || getDefaultProvider()
}

export function getDefaultTopic(assistantId: string): Topic {
  // todo
  return {
    id: uuid(),
    assistantId,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: i18n.t('chat.default.topic.name'),
    isNameManuallyEdited: false
  }
}

export function getDefaultProvider() {
  return getProviderByModel(getDefaultModel())
}

export function getDefaultModel() {
  // todo
  return INITIAL_PROVIDERS[0].models[0]
}

export function getProviderByModel(model?: Model): Provider {
  // todo
  const providers = INITIAL_PROVIDERS
  const providerId = model ? model.provider : getDefaultProvider().id
  return providers.find(p => p.id === providerId) as Provider
}

export const getAssistantSettings = (assistant: Assistant): AssistantSettings => {
  const contextCount = assistant?.settings?.contextCount ?? DEFAULT_CONTEXTCOUNT

  const getAssistantMaxTokens = () => {
    if (assistant.settings?.enableMaxTokens) {
      const maxTokens = assistant.settings.maxTokens

      if (typeof maxTokens === 'number') {
        return maxTokens > 0 ? maxTokens : DEFAULT_MAX_TOKENS
      }

      return DEFAULT_MAX_TOKENS
    }

    return undefined
  }

  return {
    contextCount: contextCount === 100 ? 100000 : contextCount,
    temperature: assistant?.settings?.temperature ?? DEFAULT_TEMPERATURE,
    topP: assistant?.settings?.topP ?? 1,
    enableMaxTokens: assistant?.settings?.enableMaxTokens ?? false,
    maxTokens: getAssistantMaxTokens(),
    streamOutput: assistant?.settings?.streamOutput ?? true,
    toolUseMode: assistant?.settings?.toolUseMode ?? 'prompt',
    defaultModel: assistant?.defaultModel ?? undefined,
    customParameters: assistant?.settings?.customParameters ?? []
  }
}
