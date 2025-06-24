import { getSystemAssistants } from '@/mock'

export function useAssistant(id?: string) {
  if (!id) {
    return {
      assistant: null
    }
  }

  const assistant = getSystemAssistants().find(assistant => assistant.id === id)

  if (!assistant) {
    throw new Error(`Assistant with id ${id} not found`)
  }

  return {
    assistant
  }
}

export function useDefaultAssistant() {
  const assistant = getSystemAssistants()[0]

  if (!assistant) {
    throw new Error('Default assistant not found')
  }

  return {
    assistant
  }
}
