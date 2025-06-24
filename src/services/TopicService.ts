import { t } from 'i18next'

import { Assistant, Topic } from '@/types/assistant'
import { uuid } from '@/utils'

import { deleteTopicById as _deleteTopicById, getTopics, upsertOneTopic } from '../../db/queries/topics.queries'

export async function createNewTopic(assistant: Assistant): Promise<Topic> {
  const newTopic: Topic = {
    id: uuid(),
    assistantId: assistant.id,
    name: t('new_topic'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: []
  }
  await upsertOneTopic(newTopic)
  return newTopic
}

export async function getNewestTopic(): Promise<Topic | null> {
  const topics = await getTopics()

  if (topics.length === 0) {
    return null
  }

  return topics[0]
}

export async function deleteTopicById(topicId: string): Promise<void> {
  try {
    await _deleteTopicById(topicId)
  } catch (error) {
    console.error('Failed to delete topic:', error)
    throw error
  }
}
