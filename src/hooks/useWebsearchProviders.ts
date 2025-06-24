import { INITIAL_WEBSEARCH_PROVIDERS } from '@/mock'
import { WebSearchProvider } from '@/types/websearch'

export function useWebsearchProviders() {
  const freeProviders: WebSearchProvider[] = INITIAL_WEBSEARCH_PROVIDERS.filter(provider => provider.type === 'free')
  const apiProviders: WebSearchProvider[] = INITIAL_WEBSEARCH_PROVIDERS.filter(provider => provider.type === 'api')

  return {
    freeProviders,
    apiProviders
  }
}

export function useWebsearchProvider(id: string) {
  const provider = INITIAL_WEBSEARCH_PROVIDERS.find(provider => provider.id === id)

  if (!provider) {
    throw new Error(`Web search provider with id ${id} not found`)
  }

  return {
    provider
  }
}
