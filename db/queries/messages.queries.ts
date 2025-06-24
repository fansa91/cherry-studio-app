import { eq } from 'drizzle-orm'

import { Message } from '@/types/message'

import { db } from '..'
import { messages } from '../schema'
import { getBlocksIdByMessageId } from './messageBlocks.queries'

/**
 * 将数据库记录转换为 Message 类型。
 * @param dbRecord - 从数据库检索的记录。
 * @returns 一个 Message 对象。
 */
export function transformDbToMessage(dbRecord: any): Message {
  const safeJsonParse = (jsonString: string | null, defaultValue: any = undefined) => {
    if (typeof jsonString !== 'string') {
      return defaultValue
    }

    try {
      return JSON.parse(jsonString)
    } catch (e) {
      console.error('JSON parse error for string:', jsonString)
      return defaultValue
    }
  }

  return {
    id: dbRecord.id,
    role: dbRecord.role,
    assistantId: dbRecord.assistantId,
    topicId: dbRecord.topicId,
    createdAt: dbRecord.createdAt,
    updatedAt: dbRecord.updatedAt,
    status: dbRecord.status,
    modelId: dbRecord.modelId,
    model: dbRecord.model ? safeJsonParse(dbRecord.model) : undefined,
    type: dbRecord.type,
    useful: !!dbRecord.useful,
    askId: dbRecord.askId,
    mentions: dbRecord.mentions ? safeJsonParse(dbRecord.mentions) : undefined,
    usage: dbRecord.usage ? safeJsonParse(dbRecord.usage) : undefined,
    metrics: dbRecord.metrics ? safeJsonParse(dbRecord.metrics) : undefined,
    multiModelMessageStyle: dbRecord.multiModelMessageStyle,
    foldSelected: !!dbRecord.foldSelected,
    // 注意：'blocks' 字段需要通过查询 message_blocks 表来单独填充。
    blocks: []
  }
}

/**
 * 将 Message 对象转换为数据库记录格式。
 * 注意：此函数不处理 'blocks' 属性，因为块存储在单独的表中。
 * @param message - Message 对象。
 * @returns 一个适合数据库操作的对象。
 */
function transformMessageToDb(message: Partial<Message>): any {
  const dbRecord: any = {}

  if (message.id !== undefined) dbRecord.id = message.id
  if (message.role !== undefined) dbRecord.role = message.role
  if (message.assistantId !== undefined) dbRecord.assistantId = message.assistantId
  if (message.topicId !== undefined) dbRecord.topicId = message.topicId
  if (message.createdAt !== undefined) dbRecord.createdAt = message.createdAt
  if (message.updatedAt !== undefined) dbRecord.updatedAt = message.updatedAt
  if (message.status !== undefined) dbRecord.status = message.status
  if (message.modelId !== undefined) dbRecord.modelId = message.modelId
  if (message.type !== undefined) dbRecord.type = message.type
  if (message.askId !== undefined) dbRecord.askId = message.askId
  if (message.multiModelMessageStyle !== undefined) dbRecord.multiModelMessageStyle = message.multiModelMessageStyle

  if (message.useful !== undefined) {
    dbRecord.useful = message.useful ? 1 : 0
  }

  if (message.foldSelected !== undefined) {
    dbRecord.foldSelected = message.foldSelected ? 1 : 0
  }

  if (message.model !== undefined) {
    dbRecord.model = message.model ? JSON.stringify(message.model) : null
  }

  if (message.mentions !== undefined) {
    dbRecord.mentions = message.mentions ? JSON.stringify(message.mentions) : null
  }

  if (message.usage !== undefined) {
    dbRecord.usage = message.usage ? JSON.stringify(message.usage) : null
  }

  if (message.metrics !== undefined) {
    dbRecord.metrics = message.metrics ? JSON.stringify(message.metrics) : null
  }

  return dbRecord
}

/**
 * 根据 ID 获取单个消息。
 * @param messageId - 要获取的消息的 ID。
 * @returns 一个 Message 对象，如果未找到则返回 undefined。
 */
export async function getMessageById(messageId: string): Promise<Message | undefined> {
  try {
    const result = await db.select().from(messages).where(eq(messages.id, messageId)).limit(1)

    if (result.length === 0) {
      return undefined
    }

    const blocks = await getBlocksIdByMessageId(messageId)
    const message = transformDbToMessage(result[0])
    message.blocks = blocks
    return message
  } catch (error) {
    console.error(`Error getting message by ID ${messageId}:`, error)
    throw error
  }
}

/**
 * 获取给定主题 ID 的所有消息。
 * @param topicId - 主题的 ID。
 * @returns 一组 Message 对象。
 */
export async function getMessagesByTopicId(topicId: string): Promise<Message[]> {
  try {
    const results = await db.select().from(messages).where(eq(messages.topicId, topicId))

    if (results.length === 0) {
      return []
    }

    const messagesResult = results.map(transformDbToMessage)
    // 获取所有消息的块 ID
    const blocksPromises = messagesResult.map(message => getBlocksIdByMessageId(message.id))
    const blocksResults = await Promise.all(blocksPromises)

    // 将每个消息的块 ID 填充到对应的消息对象中
    for (let i = 0; i < messagesResult.length; i++) {
      messagesResult[i].blocks = blocksResults[i]
    }

    return messagesResult
  } catch (error) {
    console.error(`Error getting messages for topic ID ${topicId}:`, error)
    throw error
  }
}

/**
 * 插入或更新单个消息。
 * 如果消息已存在，则更新它；如果不存在，则插入新消息。
 * @param topicId - 主题的 ID。
 * @param message - 要插入或更新的消息对象。
 */
export async function upsertOneMessage(message: Message): Promise<Message> {
  try {
    const existingMessage = await getMessageById(message.id)

    if (existingMessage) {
      // 更新现有消息
      const dbRecord = transformMessageToDb(message)
      return transformDbToMessage(
        await db.update(messages).set(dbRecord).where(eq(messages.id, message.id)).returning()
      )
    } else {
      // 插入新消息
      const dbRecord = transformMessageToDb(message)

      return transformDbToMessage(await db.insert(messages).values(dbRecord).returning())
    }
  } catch (error) {
    console.error(`Error upserting message with ID ${message.id}:`, error)
    throw error
  }
}

export async function removeAllMessages() {
  try {
    await db.delete(messages)
  } catch (error) {
    console.error('Error removing all messages:', error)
    throw error
  }
}
