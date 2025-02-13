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
