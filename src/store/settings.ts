import { createSlice } from '@reduxjs/toolkit'

import { TopicNamingSetting, TranslateModelSetting } from '@/types/setting'

export interface SettingsState {
  topicNamingSetting: TopicNamingSetting
  translateModelSetting: TranslateModelSetting
}

const initialState: SettingsState = {
  topicNamingSetting: {
    autoNaming: false,
    prompt: ''
  },
  translateModelSetting: {
    specifyLanguage: false,
    sourceLanguage: undefined,
    targetLanguage: undefined,
    prompt: ''
  }
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTopicNamingSetting: (state, action) => {
      state.topicNamingSetting = action.payload
    },
    setTranslateModelSetting: (state, action) => {
      state.translateModelSetting = action.payload
    }
  }
})

export const { setTopicNamingSetting, setTranslateModelSetting } = settingsSlice.actions

export default settingsSlice.reducer
