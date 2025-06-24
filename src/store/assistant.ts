import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getDefaultAssistant } from '@/services/AssistantService'
import { Assistant } from '@/types/assistant'

export interface AssistantsState {
  defaultAssistant: Assistant
  tagsOrder: string[]
}

const initialState: AssistantsState = {
  defaultAssistant: getDefaultAssistant(),
  tagsOrder: []
}

const assistantsSlice = createSlice({
  name: 'assistants',
  initialState,
  reducers: {
    updateDefaultAssistant: (state, action: PayloadAction<{ assistant: Assistant }>) => {
      state.defaultAssistant = action.payload.assistant
    },
    setTagsOrder: (state, action: PayloadAction<string[]>) => {
      state.tagsOrder = action.payload
    }
  }
})

export const { updateDefaultAssistant, setTagsOrder } = assistantsSlice.actions

export default assistantsSlice.reducer
