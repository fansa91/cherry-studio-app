import { eq } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'

import { Provider } from '@/types/assistant'

import { db } from '../../db'
import { transformDbToProvider, upsertProviders } from '../../db/queries/providers.queries'
import { providers as providersSchema } from '../../db/schema'

/**
 * Fetch all providers from the database.
 */
export function useAllProviders() {
  const query = db.select().from(providersSchema)
  const { data: rawProviders, updatedAt } = useLiveQuery(query)

  if (!updatedAt) {
    return {
      providers: [],
      isLoading: true
    }
  }

  const processedProviders = rawProviders.map(provider => transformDbToProvider(provider))
  return {
    providers: processedProviders,
    isLoading: false
  }
}

/**
 * Fetch a single provider by its ID.
 * @param providerId
 */
export function useProvider(providerId: string) {
  console.log('useProvider', providerId)
  const query = db.select().from(providersSchema).where(eq(providersSchema.id, providerId))
  const { data: rawProvider, updatedAt } = useLiveQuery(query)

  const updateProvider = async (provider: Provider) => {
    await upsertProviders([provider])
  }

  if (!updatedAt) {
    return {
      provider: null,
      isLoading: true,
      updateProvider
    }
  }

  const provider = transformDbToProvider(rawProvider[0])
  return {
    provider,
    isLoading: false,
    updateProvider
  }
}
