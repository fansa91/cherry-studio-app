import { eq } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { useMemo } from 'react'

import { db } from '../../db'
import { transformDbToMessageBlock } from '../../db/queries/messageBlocks.queries'
import { messageBlocks as messageBlocksSchema } from '../../db/schema'

export const useMessageBlocks = (messageId: string) => {
  const query = useMemo(
    () => db.select().from(messageBlocksSchema).where(eq(messageBlocksSchema.messageId, messageId)),
    [messageId]
  )
  const { data: rawBlocks } = useLiveQuery(query)

  const processedBlocks = useMemo(() => {
    if (!rawBlocks) {
      return []
    }

    return rawBlocks.map(block => transformDbToMessageBlock(block))
  }, [rawBlocks])

  return { processedBlocks }
}
