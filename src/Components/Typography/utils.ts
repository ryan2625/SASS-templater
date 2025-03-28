import { Themes } from '../../Contexts/ThemeContext'
import { rgbToHex } from '../../Utils/generalUtils'
import type { TypographyReducerState } from '../../Utils/typographyTypesUtils'

export function typeGuardReducerState(value: unknown): value is TypographyReducerState {
  return (
    typeof value === 'object' &&
    value !== null &&
    'size' in value &&
    'scale' in value &&
    'spacing' in value &&
    'height' in value &&
    'weight' in value &&
    'font' in value &&
    'color' in value &&
    typeof value.size === 'number' &&
    typeof value.scale === 'number' &&
    typeof value.spacing === 'number' &&
    typeof value.height === 'number' &&
    typeof value.weight === 'boolean' &&
    typeof value.font === 'string' &&
    typeof value.color === 'string'
  )
}

// Most likely redundant but initially was needed as validation when I didn't retain theme in storage
export function colorThemeMismatch(themeState: Themes, styleState: TypographyReducerState) {
  const darkDiv = document.createElement('div')
  darkDiv.className = 'theme-dark'
  document.body.appendChild(darkDiv)
  const darkColor = window.getComputedStyle(darkDiv).getPropertyValue('--bg1')

  const lightDiv = document.createElement('div')
  lightDiv.className = 'theme-light'
  document.body.appendChild(lightDiv)
  const lightColor = window.getComputedStyle(lightDiv).getPropertyValue('--bg1')

  document.body.removeChild(darkDiv)
  document.body.removeChild(lightDiv)

  if (styleState.color === rgbToHex(lightColor) && themeState === 'dark') {
    styleState = { ...styleState, color: rgbToHex(darkColor) }
  }
  if (styleState.color === rgbToHex(darkColor) && themeState === 'light') {
    styleState = { ...styleState, color: rgbToHex(lightColor) }
  }

  return styleState
}

export function typeGuardTheme(value: unknown): value is Themes {
  return (typeof value === 'string' && value !== null && value === 'light') || value === 'dark'
}

export function calcVal(index: number, value: number, scale: number, sizes: string[]): number {
  if (index === sizes.length - 1) {
    return value
  } else {
    return calcVal((index += 1), value * scale, scale, sizes)
  }
}
