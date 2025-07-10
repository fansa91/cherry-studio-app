import { PersonGeneration } from '@google/genai'

import { getProviderByModel } from '@/services/AssistantService'
import { Model } from '@/types/assistant'
import { getBaseModelName } from '@/utils/naming'

import { isEmbeddingModel } from './embedding'

export const SUPPORTED_DISABLE_GENERATION_MODELS = [
  'gemini-2.0-flash-exp-image-generation',
  'gemini-2.0-flash-preview-image-generation',
  'gemini-2.0-flash-exp',
  'gpt-4o',
  'gpt-4o-mini',
  'gpt-4.1',
  'gpt-4.1-mini',
  'gpt-4.1-nano',
  'o3'
]

export const TEXT_TO_IMAGE_REGEX = /flux|diffusion|stabilityai|sd-|dall|cogview|janus/i

export function isTextToImageModel(model: Model): boolean {
  return TEXT_TO_IMAGE_REGEX.test(model.id)
}

export const GENERATE_IMAGE_MODELS = [
  'gemini-2.0-flash-exp-image-generation',
  'gemini-2.0-flash-preview-image-generation',
  'gemini-2.0-flash-exp',
  'grok-2-image-1212',
  'grok-2-image',
  'grok-2-image-latest',
  'gpt-image-1'
]

// For middleware to identify models that must use the dedicated Image API
export const DEDICATED_IMAGE_MODELS = ['grok-2-image', 'dall-e-3', 'dall-e-2', 'gpt-image-1']

export const isDedicatedImageGenerationModel = (model: Model): boolean =>
  DEDICATED_IMAGE_MODELS.filter(m => model.id.includes(m)).length > 0

export type GenerateImageParams = {
  model: string
  prompt: string
  negativePrompt?: string
  imageSize: string
  batchSize: number
  seed?: string
  numInferenceSteps?: number
  guidanceScale?: number
  signal?: AbortSignal
  promptEnhancement?: boolean
  personGeneration?: PersonGeneration
}

export function isGenerateImageModel(model: Model): boolean {
  if (!model) {
    return false
  }

  const provider = getProviderByModel(model)

  if (!provider) {
    return false
  }

  const isEmbedding = isEmbeddingModel(model)

  if (isEmbedding) {
    return false
  }

  const baseName = getBaseModelName(model.id, '/').toLowerCase()

  if (GENERATE_IMAGE_MODELS.includes(baseName)) {
    return true
  }

  return false
}

export function isSupportedDisableGenerationModel(model: Model): boolean {
  if (!model) {
    return false
  }

  return SUPPORTED_DISABLE_GENERATION_MODELS.includes(model.id)
}
