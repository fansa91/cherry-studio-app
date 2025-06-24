import { INITIAL_PROVIDERS } from '@/mock'

export function useAllProviders() {
  return {
    providers: INITIAL_PROVIDERS
  }
}

export function useProviders() {
  const providers = INITIAL_PROVIDERS.filter(provider => provider.enabled)
  return {
    providers: providers
  }
}

export function useProvider(id: string) {
  const provider = INITIAL_PROVIDERS.find(p => p.id === id)

  if (!provider) {
    throw new Error(`Provider with id ${id} not found`)
  }

  return {
    provider,
    models: provider?.models || []
  }
}
