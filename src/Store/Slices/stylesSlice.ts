import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState as importedInitialState, type TypographyReducerState } from '../../Utils/typographyTypesUtils'

export interface StylesState extends TypographyReducerState {
  otherStyles: object
}

const initialState: StylesState = {
  ...importedInitialState,
  otherStyles: {}
}

export const stylesSlice = createSlice({
  name: 'styles',
  initialState,
  reducers: {
    stateFromReducer: (state: StylesState, action: PayloadAction<TypographyReducerState>) => {
      return { ...state, ...action.payload }
    }
  }
})

export const { stateFromReducer } = stylesSlice.actions

export default stylesSlice.reducer
