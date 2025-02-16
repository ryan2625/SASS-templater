//import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { initialState as importedInitialState, State } from '../../Hooks/useTypographyReducer'
export interface StylesState extends State {
  otherStyles: string
}

const initialState: StylesState = {
  ...importedInitialState,
  otherStyles: ""
}

export const counterSlice = createSlice({
  name: 'styles',
  initialState,
  reducers: {
    increment: (state: StylesState) => {
      state.font += 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment } = counterSlice.actions

export default counterSlice.reducer

// Above is example store configuration for future

/*


export interface State {
  size: number
  scale: number
  spacing: number
  height: number
  weight: boolean
  font: string
  color: string
}
  todo edit interface but use values extend it and edit

*/
