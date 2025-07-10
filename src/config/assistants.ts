import assistantsEnJsonData from '@/resources/data/assistants-en.json'
import { Assistant } from '@/types/assistant'

export function getSystemAssistants(): Assistant[] {
  try {
    if (assistantsEnJsonData) {
      return JSON.parse(JSON.stringify(assistantsEnJsonData)) || []
    } else {
      return []
    }
  } catch (error) {
    console.error('Error reading assistants data:', error)
    return []
  }
}
