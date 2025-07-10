import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Assistant } from '@/types/assistant'

export interface AssistantsState {
  tagsOrder: string[]
}

const initialState: AssistantsState = {
  tagsOrder: []
}

const assistantsSlice = createSlice({
  name: 'assistants',
  initialState,
  reducers: {
    setTagsOrder: (state, action: PayloadAction<string[]>) => {
      state.tagsOrder = action.payload
    },
    updateAssistants: (state, action: PayloadAction<Assistant[]>) => {}
  }
})

export const { setTagsOrder } = assistantsSlice.actions

export default assistantsSlice.reducer
