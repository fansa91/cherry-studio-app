import { eq } from 'drizzle-orm'

import { Assistant } from '@/types/assistant'

import { db } from '..'
import { assistants } from '../schema'

/**
 * 将数据库记录转换为 Assistant 类型。
 * @param dbRecord - 从数据库检索的记录。
 * @returns 一个 Assistant 对象。
 */
function transformDbToAssistant(dbRecord: any): Assistant {
  const safeJsonParse = (jsonString: string | null, defaultValue: any = undefined) => {
    if (typeof jsonString !== 'string') {
      return defaultValue
    }

    try {
      return JSON.parse(jsonString)
    } catch (e) {
      console.error('JSON parse error for string:', e, jsonString)
      return defaultValue
    }
  }

  return {
    id: dbRecord.id,
    name: dbRecord.name,
    prompt: dbRecord.prompt,
    // knowledgeIds: dbRecord.knowledgeIds ? JSON.parse(dbRecord.knowledgeIds) : [],
    type: dbRecord.type,
    emoji: dbRecord.emoji,
    description: dbRecord.description,
    model: safeJsonParse(dbRecord.model),
    defaultModel: safeJsonParse(dbRecord.defaultModel),
    settings: safeJsonParse(dbRecord.settings),
    enableWebSearch: !!dbRecord.enableWebSearch,
    // websearchProviderId: dbRecord.websearchProviderId,
    enableGenerateImage: !!dbRecord.enableGenerateImage,
    // mcpServers: dbRecord.mcpServers ? JSON.parse(dbRecord.mcpServers) : undefined,
    knowledgeRecognition: dbRecord.knowledgeRecognition,
    tags: safeJsonParse(dbRecord.tags, []),
    group: safeJsonParse(dbRecord.group, []),
    topics: [] // 初始化 topics 为一个空数组
  }
}

/**
 * 将 Assistant 对象转换为数据库记录格式。
 * @param assistant - Assistant 对象。
 * @returns 一个适合数据库操作的对象。
 */
function transformAssistantToDb(assistant: Assistant): any {
  return {
    id: assistant.id,
    name: assistant.name,
    prompt: assistant.prompt,
    // knowledgeIds: assistant.knowledgeIds ? JSON.stringify(assistant.knowledgeIds) : null,
    type: assistant.type,
    emoji: assistant.emoji,
    description: assistant.description,
    model: assistant.model ? JSON.stringify(assistant.model) : null,
    defaultModel: assistant.defaultModel ? JSON.stringify(assistant.defaultModel) : null,
    settings: assistant.settings ? JSON.stringify(assistant.settings) : null,
    enableWebSearch: assistant.enableWebSearch ? 1 : 0,
    // websearchProviderId: assistant.websearchProviderId,
    enableGenerateImage: assistant.enableGenerateImage ? 1 : 0,
    // mcpServers: assistant.mcpServers ? JSON.stringify(assistant.mcpServers) : null,
    knowledgeRecognition: assistant.knowledgeRecognition,
    tags: assistant.tags ? JSON.stringify(assistant.tags) : null,
    group: assistant.group ? JSON.stringify(assistant.group) : null
  }
}

/**
 * 获取所有助手。
 * @returns 一个包含所有 Assistant 对象的数组。
 */
export async function getAllAssistants(): Promise<Assistant[]> {
  try {
    const result = await db.select().from(assistants)
    return result.map(transformDbToAssistant)
  } catch (error) {
    console.error('Error getting all assistants:', error)
    throw error
  }
}

export async function getAssistantById(id: string): Promise<Assistant | null> {
  try {
    const result = await db.select().from(assistants).where(eq(assistants.id, id)).limit(1)

    if (result.length === 0) {
      return null
    }

    return transformDbToAssistant(result[0])
  } catch (error) {
    console.error('Error getting assistant by ID:', error)
    throw error
  }
}

/**
 *
 * @param assistantsToUpsert 要插入或更新的助手数组。
 * @returns 无返回值。
 * @description 此函数将尝试插入或更新助手记录到数据库中。
 */
export async function upsertAssistants(assistantsToUpsert: Assistant[]) {
  try {
    const dbRecords = assistantsToUpsert.map(transformAssistantToDb)
    const upsertPromises = dbRecords.map(record =>
      db
        .insert(assistants)
        .values(record)
        .onConflictDoUpdate({
          target: [assistants.id],
          set: record
        })
    )
    await Promise.all(upsertPromises)
  } catch (error) {
    console.error('Error upserting assistants:', error)
    throw error
  }
}
