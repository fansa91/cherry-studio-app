import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RuntimeState {
  initialized: boolean
  welcomeShown: boolean
}

const initialState: RuntimeState = { welcomeShown: false, initialized: false }

const runtimeSlice = createSlice({
  name: 'runtime',
  initialState,
  reducers: {
    setInitialized(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload
    },
    setWelcomeShown(state, action: PayloadAction<boolean>) {
      state.welcomeShown = action.payload
    }
  }
})

export const { setInitialized, setWelcomeShown } = runtimeSlice.actions
export default runtimeSlice.reducer
