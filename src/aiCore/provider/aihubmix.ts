import { ProviderId } from '@cherrystudio/ai-core'

import { isOpenAILLMModel } from '@/config/models/webSearch'
import { Model, Provider } from '@/types/assistant'

export function getAiSdkProviderIdForAihubmix(model: Model): ProviderId | 'openai-compatible' {
  const id = model.id.toLowerCase()

  if (id.startsWith('claude')) {
    return 'anthropic'
  }

  if ((id.startsWith('gemini') || id.startsWith('imagen')) && !id.endsWith('-nothink') && !id.endsWith('-search')) {
    return 'google'
  }

  if (isOpenAILLMModel(model)) {
    return 'openai'
  }

  return 'openai-compatible'
}

export function createAihubmixProvider(model: Model, provider: Provider): Provider {
  const providerId = getAiSdkProviderIdForAihubmix(model)
  provider = {
    ...provider,
    extra_headers: {
      ...provider.extra_headers,
      'APP-Code': 'MLTG2087'
    }
  }

  if (providerId === 'google') {
    return {
      ...provider,
      type: 'gemini',
      apiHost: 'https://aihubmix.com/gemini'
    }
  }

  if (providerId === 'openai') {
    return {
      ...provider,
      type: 'openai'
    }
  }

  if (providerId === 'anthropic') {
    return {
      ...provider,
      type: 'anthropic'
    }
  }

  return provider
}
