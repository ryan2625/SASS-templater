import { configureStore } from '@reduxjs/toolkit'
import stylesReducer from './Slices/stylesSlice'

export const store = configureStore({
  reducer: {
    styles: stylesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
