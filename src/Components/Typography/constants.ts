import { Scale, Label, Font } from './types'

export const fonts: Font[] = [
  { value: "'Webdings', fantasy", displayName: 'Webdings' },
  { value: "'Wingdings', fantasy", displayName: 'Wingdings' },
  { value: "'Algerian', serif", displayName: 'Algerian' },
  { value: 'Arial Black, sans-serif', displayName: 'Arial Black' },
  { value: "'Brush Script MT', cursive", displayName: 'Brush Script MT' },
  { value: "'Century Gothic', sans-serif", displayName: 'Century Gothic' },
  { value: "'Comic Sans MS', cursive, sans-serif", displayName: 'Comic Sans MS' },
  { value: "'Courier New', monospace", displayName: 'Courier New' },
  { value: 'Fantasy, fantasy', displayName: 'Fantasy' },
  { value: 'Garamond, serif', displayName: 'Garamond' },
  { value: 'Georgia, serif', displayName: 'Georgia' },
  { value: "'Impact', sans-serif", displayName: 'Impact' },
  { value: "'Jokerman', cursive", displayName: 'Jokerman' },
  { value: "'Lucida Console', monospace", displayName: 'Lucida Console' },
  { value: "'Papyrus', fantasy", displayName: 'Papyrus' },
  { value: 'Roboto Flex, sans-serif', displayName: 'Roboto Flex, sans-serif' },
  { value: "'Seaweed Script', cursive", displayName: 'Seaweed Script, cursive' },
  { value: "'Segoe Print', cursive", displayName: 'Segoe Print' },
  { value: "'Tahoma', sans-serif", displayName: 'Tahoma' },
  { value: "'Times New Roman', serif", displayName: 'Times New Roman' },
  { value: "'Trebuchet MS', sans-serif", displayName: 'Trebuchet MS' },
  { value: "'Verdana', sans-serif", displayName: 'Verdana' },
]

export const scales: Scale[] = [
  { value: '1.067', label: '1.067 - Minor Second' },
  { value: '1.125', label: '1.125 - Major Second' },
  { value: '1.200', label: '1.200 - Minor Third' },
  { value: '1.250', label: '1.250 - Major Third' },
  { value: '1.333', label: '1.333 - Perfect Fourth' },
  { value: '1.414', label: '1.414 - Augmented Fourth' },
  { value: '1.500', label: '1.500 - Perfect Fifth' },
  { value: '1.618', label: '1.618 - Golden Ratio' },
]

export const labels: Label[] = [
  { htmlFor: 'typography-size', text: 'Font Size' },
  { htmlFor: 'typography-font', text: 'Font Family' },
  { htmlFor: 'typography-color', text: 'Color' },
  { htmlFor: 'typography-scale', text: 'Scale' },
  { htmlFor: 'typography-spacing', text: 'Spacing' },
  { htmlFor: 'typography-height', text: 'Height' },
  { htmlFor: 'typography-weight', text: 'Weight' },
]

export const sizes: string[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']
