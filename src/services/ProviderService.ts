import { Provider } from '@/types/assistant'

import {
  getAllProviders as _getAllProviders,
  getProviderById as _getProviderById,
  upsertProviders
} from '../../db/queries/providers.queries'

export async function saveProvider(provider: Provider) {
  try {
    await upsertProviders([provider])
  } catch (error) {
    console.error('Error saving provider:', error)
    throw error
  }
}

export async function getProviderById(providerId: string) {
  try {
    const provider = await _getProviderById(providerId)

    if (!provider) {
      throw new Error(`Provider with ID ${providerId} not found`)
    }

    return provider
  } catch (error) {
    console.error('Error getting provider by id:', error)
    throw error
  }
}

export async function getAllProviders() {
  try {
    return await _getAllProviders()
  } catch (error) {
    console.error('Error getting all providers:', error)
    throw error
  }
}
