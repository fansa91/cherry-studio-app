import { eq } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { useEffect, useMemo, useState } from 'react'

import { Message } from '@/types/message'

import { db } from '../../db'
import { getBlocksIdByMessageId } from '../../db/queries/messageBlocks.queries'
import { transformDbToMessage } from '../../db/queries/messages.queries'
import { messages as messagesSchema } from '../../db/schema/messages'

export const useMessages = (topicId: string) => {
  const query = useMemo(
    () => db.select().from(messagesSchema).where(eq(messagesSchema.topicId, topicId)).orderBy(messagesSchema.createdAt),
    [topicId]
  )
  const { data: rawMessages } = useLiveQuery(query)

  const [processedMessages, setProcessedMessages] = useState<Message[]>([])

  useEffect(() => {
    if (rawMessages === undefined) {
      return
    }

    let isMounted = true

    const processMessages = async () => {
      const messagesWithBlocks = await Promise.all(
        rawMessages.map(async rawMsg => {
          const message = transformDbToMessage(rawMsg)
          message.blocks = await getBlocksIdByMessageId(message.id)
          return message
        })
      )

      if (isMounted) {
        setProcessedMessages(messagesWithBlocks)
      }
    }

    processMessages()

    return () => {
      isMounted = false
    }
  }, [rawMessages])

  return { processedMessages }
}
