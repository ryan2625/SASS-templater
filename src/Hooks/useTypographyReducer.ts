import { useReducer } from 'react'
import { rgbToHex } from '../Utils/generalUtils'
import { initialState, type TypographyReducerState } from '../Utils/typographyTypesUtils'

type Action =
  | { type: 'CHANGE_SIZE'; payload: number }
  | { type: 'CHANGE_SCALE'; payload: number }
  | { type: 'CHANGE_SPACING'; payload: number }
  | { type: 'CHANGE_HEIGHT'; payload: number }
  | { type: 'CHANGE_WEIGHT'; payload: boolean }
  | { type: 'CHANGE_FONT'; payload: string }
  | { type: 'CHANGE_COLOR'; payload: string }
  | { type: 'STATE_FROM_STORAGE'; payload: TypographyReducerState }

const useTypographyReducer = () => {
  function Reducer(state: TypographyReducerState, action: Action): TypographyReducerState {
    const { type } = action
    let newState: TypographyReducerState

    switch (type) {
      case 'CHANGE_SIZE': {
        newState = { ...state, size: action.payload }
        break
      }
      case 'CHANGE_SCALE': {
        newState = { ...state, scale: action.payload }
        break
      }
      case 'CHANGE_SPACING': {
        newState = { ...state, spacing: action.payload }
        break
      }
      case 'CHANGE_HEIGHT': {
        newState = { ...state, height: action.payload }
        break
      }
      case 'CHANGE_WEIGHT': {
        newState = { ...state, weight: !state.weight }
        break
      }
      case 'CHANGE_FONT': {
        const selectNode = document.getElementById('typography-font')
        // Although we should keep DOM manipulation out of a reducer, its
        // easier to do type checking and DOM manipulation in one place
        if (selectNode instanceof HTMLSelectElement) {
          selectNode.style.fontFamily = selectNode.value
          newState = { ...state, font: action.payload }
        } else {
          newState = state
        }
        break
      }
      case 'CHANGE_COLOR': {
        const validateColor = rgbToHex(action.payload)
        newState = { ...state, color: validateColor }
        break
      }
      case 'STATE_FROM_STORAGE': {
        if (action.payload) {
          newState = { ...action.payload }
        } else {
          newState = state
        }
        break
      }
      default: {
        newState = state
        break
      }
    }

    if (type != 'STATE_FROM_STORAGE' && newState != initialState) {
      localStorage.setItem('styleState', JSON.stringify(newState))
    }
    return newState
  }
  return useReducer(Reducer, initialState)
}

export default useTypographyReducer
