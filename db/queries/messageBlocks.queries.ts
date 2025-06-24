import { eq, inArray } from 'drizzle-orm'

import { MessageBlock, MessageBlockStatus, MessageBlockType } from '@/types/message'

import { db } from '..'
// import { db } from '..'
import { messageBlocks } from '../schema'

type KeysOfUnion<T> = T extends T ? keyof T : never

// 数据库记录转换为 MessageBlock 类型
export function transformDbToMessageBlock(dbRecord: any): MessageBlock {
  const base = {
    id: dbRecord.id,
    messageId: dbRecord.messageId,
    type: dbRecord.type as MessageBlockType,
    createdAt: dbRecord.createdAt,
    updatedAt: dbRecord.updatedAt,
    status: dbRecord.status as MessageBlockStatus,
    model: dbRecord.model ? JSON.parse(dbRecord.model) : undefined,
    metadata: dbRecord.metadata ? JSON.parse(dbRecord.metadata) : undefined,
    error: dbRecord.error ? JSON.parse(dbRecord.error) : undefined
  }

  // 根据类型添加特定字段并返回正确的类型
  switch (base.type) {
    case MessageBlockType.MAIN_TEXT:
      return {
        ...base,
        type: MessageBlockType.MAIN_TEXT,
        content: dbRecord.content || '',
        knowledgeBaseIds: dbRecord.knowledgeBaseIds ? JSON.parse(dbRecord.knowledgeBaseIds) : undefined,
        citationReferences: dbRecord.citationReferences ? JSON.parse(dbRecord.citationReferences) : undefined
      }

    case MessageBlockType.THINKING:
      return {
        ...base,
        type: MessageBlockType.THINKING,
        content: dbRecord.content || '',
        thinking_millsec: dbRecord.thinkingMillsec || undefined
      }

    case MessageBlockType.CODE:
      return {
        ...base,
        type: MessageBlockType.CODE,
        content: dbRecord.content || '',
        language: dbRecord.language || 'text'
      }

    case MessageBlockType.IMAGE:
      return {
        ...base,
        type: MessageBlockType.IMAGE,
        url: dbRecord.url || undefined,
        file: dbRecord.file ? JSON.parse(dbRecord.file) : undefined
      }

    case MessageBlockType.TOOL:
      return {
        ...base,
        type: MessageBlockType.TOOL,
        toolId: dbRecord.toolId || '',
        toolName: dbRecord.toolName || undefined,
        arguments: dbRecord.arguments ? JSON.parse(dbRecord.arguments) : undefined,
        content: dbRecord.content
          ? // 尝试解析为对象，如果失败则保持为字符串
            (() => {
              try {
                return JSON.parse(dbRecord.content)
              } catch {
                return dbRecord.content
              }
            })()
          : undefined
      }

    case MessageBlockType.TRANSLATION:
      return {
        ...base,
        type: MessageBlockType.TRANSLATION,
        content: dbRecord.content || '',
        sourceBlockId: dbRecord.sourceBlockId || undefined,
        sourceLanguage: dbRecord.sourceLanguage || undefined,
        targetLanguage: dbRecord.targetLanguage || ''
      }

    case MessageBlockType.CITATION:
      return {
        ...base,
        type: MessageBlockType.CITATION,
        response: dbRecord.response ? JSON.parse(dbRecord.response) : undefined,
        knowledge: dbRecord.knowledge ? JSON.parse(dbRecord.knowledge) : undefined
      }

    case MessageBlockType.FILE:
      return {
        ...base,
        type: MessageBlockType.FILE,
        file: dbRecord.file ? JSON.parse(dbRecord.file) : { id: '', name: '', path: '', size: 0, type: '', ext: '' }
      }

    case MessageBlockType.ERROR:
      return {
        ...base,
        type: MessageBlockType.ERROR
      }

    case MessageBlockType.UNKNOWN:
    default:
      return {
        ...base,
        type: MessageBlockType.UNKNOWN
      }
  }
}

// MessageBlock 转换为数据库记录
function transformMessageBlockToDb(messageBlock: MessageBlock): any {
  const base = {
    id: messageBlock.id,
    messageId: messageBlock.messageId,
    type: messageBlock.type,
    createdAt: messageBlock.createdAt,
    updatedAt: messageBlock.updatedAt,
    status: messageBlock.status,
    model: messageBlock.model ? JSON.stringify(messageBlock.model) : null,
    metadata: messageBlock.metadata ? JSON.stringify(messageBlock.metadata) : null,
    error: messageBlock.error ? JSON.stringify(messageBlock.error) : null
  }

  // 根据类型添加特定字段
  switch (messageBlock.type) {
    case MessageBlockType.MAIN_TEXT:
      return {
        ...base,
        content: messageBlock.content,
        knowledgeBaseIds: messageBlock.knowledgeBaseIds ? JSON.stringify(messageBlock.knowledgeBaseIds) : null,
        citationReferences: messageBlock.citationReferences ? JSON.stringify(messageBlock.citationReferences) : null
      }

    case MessageBlockType.THINKING:
      return {
        ...base,
        content: messageBlock.content,
        thinkingMillsec: messageBlock.thinking_millsec || null
      }

    case MessageBlockType.CODE:
      return {
        ...base,
        content: messageBlock.content,
        language: messageBlock.language
      }

    case MessageBlockType.IMAGE:
      return {
        ...base,
        url: messageBlock.url || null,
        file: messageBlock.file ? JSON.stringify(messageBlock.file) : null
      }

    case MessageBlockType.TOOL:
      return {
        ...base,
        toolId: messageBlock.toolId,
        toolName: messageBlock.toolName || null,
        arguments: messageBlock.arguments ? JSON.stringify(messageBlock.arguments) : null,
        content: typeof messageBlock.content === 'object' ? JSON.stringify(messageBlock.content) : messageBlock.content
      }

    case MessageBlockType.TRANSLATION:
      return {
        ...base,
        content: messageBlock.content,
        sourceBlockId: messageBlock.sourceBlockId || null,
        sourceLanguage: messageBlock.sourceLanguage || null,
        targetLanguage: messageBlock.targetLanguage
      }

    case MessageBlockType.CITATION:
      return {
        ...base,
        response: messageBlock.response ? JSON.stringify(messageBlock.response) : null,
        knowledge: messageBlock.knowledge ? JSON.stringify(messageBlock.knowledge) : null
      }

    case MessageBlockType.FILE:
      return {
        ...base,
        file: JSON.stringify(messageBlock.file)
      }

    default:
      return base
  }
}

/**
 * 添加或更新单个块 (Upsert)。
 * @param block - 要更新或插入的 MessageBlock 对象。
 */
export async function upsertOneBlock(block: MessageBlock) {
  try {
    const dbRecord = transformMessageBlockToDb(block)
    await db.insert(messageBlocks).values(dbRecord).onConflictDoUpdate({
      target: messageBlocks.id,
      set: dbRecord // 更新除主键外的所有字段
    })
  } catch (error) {
    console.error('Error upserting one block:', error)
    throw error
  }
}

/**
 * 添加或更新多个块。
 * @param blocks - 要更新或插入的 MessageBlock 对象数组。
 */
export async function upsertManyBlocks(blocks: MessageBlock[]) {
  if (blocks.length === 0) return

  try {
    const dbRecords = blocks.map(transformMessageBlockToDb)

    const upsertPromises = dbRecords.map(record =>
      db.insert(messageBlocks).values(record).onConflictDoUpdate({
        target: messageBlocks.id,
        set: record
      })
    )
    await Promise.all(upsertPromises)
  } catch (error) {
    console.error('Error upserting many blocks:', error)
    throw error
  }
}

/**
 * 更新单个现有块。
 * @param update - 包含块 ID 和要应用的更改的对象。
 */
export async function updateOneBlock(update: { id: string; changes: Partial<MessageBlock> }) {
  try {
    const { id, changes } = update
    const dbChanges: { [key: string]: any } = {}

    // 使用 KeysOfUnion 辅助类型来正确地类型化键数组。
    // 这会创建一个包含任何块类型中所有可能键的联合类型。
    const jsonFields: KeysOfUnion<MessageBlock>[] = [
      'model',
      'metadata',
      'error',
      'file',
      'arguments',
      'response',
      'knowledge',
      'knowledgeBaseIds',
      'citationReferences'
    ]

    for (const key in changes) {
      // 我们必须将 `changes` 转换为 `any` 来动态访问其属性，
      // 因为 TypeScript 无法保证给定的 `key` 存在于 `MessageBlock` 联合类型中的每一种类型上。
      const value = (changes as any)[key]
      if (value === undefined) continue

      // 为了类型兼容性，对 `includes` 方法使用字符串数组断言。
      if ((jsonFields as string[]).includes(key)) {
        dbChanges[key] = JSON.stringify(value)
      } else if (key === 'thinking_millsec') {
        dbChanges.thinkingMillsec = value
      } else if (key === 'content' && typeof value === 'object') {
        dbChanges.content = JSON.stringify(value)
      } else {
        dbChanges[key] = value
      }
    }

    if (Object.keys(dbChanges).length > 0) {
      await db.update(messageBlocks).set(dbChanges).where(eq(messageBlocks.id, id))
    }
  } catch (error) {
    console.error(`Error updating block with ID ${update.id}:`, error)
    throw error
  }
}

/**
 * 根据 ID 移除单个块。
 * @param blockId - 要移除的块的 ID。
 */
export async function removeOneBlock(blockId: string) {
  try {
    await db.delete(messageBlocks).where(eq(messageBlocks.id, blockId))
  } catch (error) {
    console.error(`Error removing block with ID ${blockId}:`, error)
    throw error
  }
}

/**
 * 根据 ID 列表移除多个块。
 * @param blockIds - 要移除的块的 ID 数组。
 */
export async function removeManyBlocks(blockIds: string[]) {
  if (blockIds.length === 0) return

  try {
    await db.delete(messageBlocks).where(inArray(messageBlocks.id, blockIds))
  } catch (error) {
    console.error('Error removing multiple blocks:', error)
    throw error
  }
}

/**
 * 移除所有块。
 */
export async function removeAllBlocks() {
  try {
    await db.delete(messageBlocks)
  } catch (error) {
    console.error('Error removing all blocks:', error)
    throw error
  }
}

// --- 查询函数 ---

/**
 * 根据消息 ID 获取所有消息块。
 * @param messageId - 消息的 ID。
 * @returns MessageBlock 对象数组。
 */
export async function getBlocksByMessageId(messageId: string): Promise<MessageBlock[]> {
  try {
    const dbRecords = await db.select().from(messageBlocks).where(eq(messageBlocks.messageId, messageId))
    return dbRecords.map(transformDbToMessageBlock)
  } catch (error) {
    console.error(`Error getting blocks for message ID ${messageId}:`, error)
    throw error
  }
}

/**
 * 根据消息 ID 获取所有块的 ID。
 * @param messageId - 消息的 ID。
 * @returns 块 ID 数组。
 */
export async function getBlocksIdByMessageId(messageId: string): Promise<string[]> {
  try {
    const dbRecords = await db
      .select({ id: messageBlocks.id })
      .from(messageBlocks)
      .where(eq(messageBlocks.messageId, messageId))

    return dbRecords.map(record => record.id)
  } catch (error) {
    console.error(`Error getting block IDs for message ID ${messageId}:`, error)
    throw error
  }
}

export async function getBlockById(blockId: string): Promise<MessageBlock | null> {
  try {
    const dbRecord = await db.select().from(messageBlocks).where(eq(messageBlocks.id, blockId)).limit(1).execute()

    if (dbRecord.length === 0) {
      return null
    }

    return transformDbToMessageBlock(dbRecord[0])
  } catch (error) {
    console.error(`Error getting block with ID ${blockId}:`, error)
    throw error
  }
}
