import { eq } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'

import { db } from '../../db'
import { transformDbToMessageBlock } from '../../db/queries/messageBlocks.queries'
import { messageBlocks as messageBlocksSchema } from '../../db/schema'

export const useMessageBlocks = (messageId: string) => {
  const query = db.select().from(messageBlocksSchema).where(eq(messageBlocksSchema.message_id, messageId))

  const { data: rawBlocks } = useLiveQuery(query)

  const processedBlocks = !rawBlocks ? [] : rawBlocks.map(block => transformDbToMessageBlock(block))

  return { processedBlocks }
}
