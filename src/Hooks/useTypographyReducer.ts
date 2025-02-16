import { useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { stateFromReducer } from '../Store/Slices/stylesSlice'
import { initialState, State } from '../Utils/typographyutils'

type Action =
  | { type: 'CHANGE_SIZE'; payload: number }
  | { type: 'CHANGE_SCALE'; payload: number }
  | { type: 'CHANGE_SPACING'; payload: number }
  | { type: 'CHANGE_HEIGHT'; payload: number }
  | { type: 'CHANGE_WEIGHT'; payload: boolean }
  | { type: 'CHANGE_FONT'; payload: string }
  | { type: 'CHANGE_COLOR'; payload: string }

const useTypographyReducer = () => {
  const dispatch = useDispatch()

  function Reducer(state: State, action: Action): State {
    const { type } = action
    let newState: State

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
        if (selectNode instanceof HTMLSelectElement) {
          selectNode.style.fontFamily = selectNode.value
        }
        newState = { ...state, font: action.payload }
        break
      }
      case 'CHANGE_COLOR': {
        newState = { ...state, color: action.payload }
        break
      }
      default: {
        newState = state
        break
      }
    }
    dispatch(stateFromReducer(newState))
    return newState
  }
  return useReducer(Reducer, initialState)
}

export default useTypographyReducer
