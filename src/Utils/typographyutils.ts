export interface TypographyReducerState {
  size: number
  scale: number
  spacing: number
  height: number
  weight: boolean
  font: string
  color: string
}

export const initialState: TypographyReducerState = {
  size: 16,
  scale: 1.25,
  spacing: 0,
  height: 1.5,
  weight: false,
  font: 'Roboto Flex, sans-serif',
  color: '#ffffff'
}
