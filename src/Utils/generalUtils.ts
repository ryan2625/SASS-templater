export function getCssVariableValue(variable: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable)
}

export function hexToRgb(hex: string) {
  if (!hex.includes('#')) {
    return hex
  }
  hex = hex.replace('#', '')
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgb(${r}, ${g}, ${b})`
}

export function rgbToHex(rgb: string) {
  if (rgb.includes('#') || !rgb.includes('rgb')) {
    return rgb
  }

  const [r, g, b] = rgb
    .replace('rgb(', '')
    .replace(')', '')
    .split(',')
    .map((num) => parseInt(num.trim()))

  const toHex = (num: number) => {
    const hex = num.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
