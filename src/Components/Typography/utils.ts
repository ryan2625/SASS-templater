import { TypographyReducerState } from "../../Utils/typographyutils"

export function calcVal(index: number, value: number, scale: number, sizes: string[]): number {
  if (index === sizes.length - 1) {
    return value
  } else {
    return calcVal((index += 1), value * scale, scale, sizes)
  }
}

export function getCssVariableValue(variable: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable)
}

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