import { getCssVariableValue, hexToRgb, rgbToHex, removeNumbers, removeLetters } from "../../Utils/generalUtils";

describe('Testing general utility functions', () => {
  test('getCssVariableValue gets correct value', () => {
    document.documentElement.style.setProperty('--inverse-txt1', '#FFFFFF');
    expect(getCssVariableValue('--inverse-txt1')).not.toBeNull()
  })
  test('hexToRgb converts hex values to rgb format', () => {
    expect(hexToRgb('#ff0000')).toBe('rgb(255, 0, 0)')
    expect(hexToRgb('#0f0')).toBe('rgb(0, 255, 0)')
    expect(hexToRgb('rgb(255, 0, 0)')).toBe('rgb(255, 0, 0)')
  })
  test('rgbToHex converts rgb values to hex format', () => {
    expect(rgbToHex('rgb(255, 0, 0)')).toBe('#ff0000')
    expect(rgbToHex('rgb(18, 52, 86)')).toBe('#123456')
    expect(rgbToHex('#ff0000')).toBe('#ff0000');
  })
  test('removeNumbers strips digits from strings', () => {
    expect(removeNumbers('abc123')).toBe('abc')
    expect(removeNumbers('123abc456')).toBe('abc')
    expect(removeNumbers('no numbers here')).toBe('no numbers here')
  })
  test('removeLetters strips alphabetic characters from strings', () => {
    expect(removeLetters('abc123')).toBe('123')
    expect(removeLetters('123abc456')).toBe('123456')
    expect(removeLetters(null)).toBeUndefined()
  })
});