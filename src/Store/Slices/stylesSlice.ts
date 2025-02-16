import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState as importedInitialState, State } from '../../Utils/typographyutils'

export interface StylesState extends State {
  otherStyles: object
}

const initialState: StylesState = {
  ...importedInitialState,
  otherStyles: {},
}

export const counterSlice = createSlice({
  name: 'styles',
  initialState,
  reducers: {
    stateFromReducer: (state: StylesState, action: PayloadAction<State>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { stateFromReducer } = counterSlice.actions

export default counterSlice.reducer
