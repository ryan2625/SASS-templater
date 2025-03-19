import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { demoString } from '../../Components/Typography/constants'
import Typography from '../../Components/Typography/Typography'
import ThemeContextProvider from '../../Contexts/ThemeContext'
import { store } from '../../Store/store'
import { removeLetters } from '../../Utils/generalUtils'
import { initialState as initialFontValues } from '../../Utils/typographyTypesUtils'

describe('Typography component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const getCssProp = (element: HTMLElement) => {
    return window.getComputedStyle(element)
  }

  const getLargeDemoText = () => {
    return screen.getAllByText(new RegExp(demoString, 'i'))[0]
  }

  const setupTestsHelper = (element: HTMLElement, property: keyof CSSStyleDeclaration, input: HTMLElement) => {
    const demoText = getLargeDemoText()
    const cssProp = getCssProp(element)[property]
    const step = input.getAttribute('step')
    return { demoText, cssProp, step }
  }

  const renderTypographyComponent = () => {
    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <Typography />
        </ThemeContextProvider>
      </Provider>
    )
    return {
      fontPreviewContainer: screen.getByTestId('font-preview-container') as HTMLDivElement,
      fontSizeInput: screen.getByRole('spinbutton', { name: /typography size/i }) as HTMLInputElement,
      fontFamilyInput: screen.getByRole('combobox', { name: /typography font size/i }) as HTMLSelectElement,
      fontColorInput: screen.getByLabelText(/typography color/i) as HTMLInputElement,
      fontScaleInput: screen.getByRole('combobox', { name: /typography scale/i }) as HTMLSelectElement,
      fontSpacingInput: screen.getByRole('spinbutton', { name: /typography letter spacing/i }) as HTMLInputElement,
      fontHeightInput: screen.getByRole('spinbutton', { name: /typography line height/i }) as HTMLInputElement,
      fontWeightInput: screen.getByRole('combobox', { name: /typography font weight/i }) as HTMLSelectElement
    }
  }

  // const renderTypographyandHeroComponent = () => {
  //   render(
  //     <Provider store={store}>
  //       <ThemeContextProvider>
  //         <Hero />
  //         <Typography />
  //       </ThemeContextProvider>
  //     </Provider>
  //   )
  // }

  test('Increasing font size onClick', () => {
    const { fontSizeInput } = renderTypographyComponent()
    // Retrieve text fields such as 16px, 20.5px, 1rem
    const elements = screen.getAllByText(/[0-9]+\.?[0-9]*\s?(px|rem)/i)
    const initialVal = removeLetters(elements[elements.length - 1].textContent)
    const step = fontSizeInput.getAttribute('step')

    expect(initialVal).toBe(String(initialFontValues.size))
    expect(fontSizeInput.value).toBe(initialVal)

    fireEvent.change(fontSizeInput, { target: { value: `${Number(initialVal) + Number(step)}` } })

    const updatedElements = screen.getAllByText(/[0-9]+\.?[0-9]*\s?(px|rem)/i)
    const updatedVal = updatedElements[updatedElements.length - 1]

    expect(updatedVal).toHaveTextContent(`${Number(initialVal) + Number(step)}px`)
  })
  test('Changing font family onClick', () => {
    const { fontFamilyInput } = renderTypographyComponent()
    const firstOption = fontFamilyInput.querySelector('option')
    const selectedFontFamily = firstOption?.value

    fireEvent.change(fontFamilyInput, { target: { value: selectedFontFamily } })

    expect(getLargeDemoText()).toHaveStyle(`font-family: ${selectedFontFamily}`)
  })
  test('Changing color onClick', () => {
    const { fontColorInput } = renderTypographyComponent()
    const initalColor = fontColorInput.value
    const changedColor = '#AAAAAA'

    expect(getLargeDemoText()).toHaveStyle(`color: ${initalColor}`)

    fireEvent.change(fontColorInput, { target: { value: changedColor } })

    expect(getLargeDemoText()).toHaveStyle(`color: ${changedColor}`)
  })
  test('Changing scale onClick', () => {
    const { fontScaleInput } = renderTypographyComponent()
    const option = fontScaleInput.querySelector('option')
    let scale = getLargeDemoText().getAttribute('data-scale-assertion')
    let testScaleValue = null
    if (option instanceof HTMLOptionElement) {
      testScaleValue = option?.value
    }

    expect(Number(scale)).toEqual(initialFontValues.scale)
    expect(testScaleValue).not.toBeNull()

    fireEvent.change(fontScaleInput, { target: { value: testScaleValue } })
    scale = getLargeDemoText().getAttribute('data-scale-assertion')

    expect(scale).toEqual(testScaleValue)
  })
  test('Changing spacing onClick', () => {
    const { fontSpacingInput } = renderTypographyComponent()
    const step = fontSpacingInput.getAttribute('step')
    const initialVal = fontSpacingInput.value
    const demoText = getLargeDemoText()
    const increasedSpacing = initialVal + step

    expect(getCssProp(demoText).letterSpacing).toBe(initialVal)

    fireEvent.change(fontSpacingInput, { target: { value: `${increasedSpacing}` } })

    const cleanEndResult = removeLetters(getCssProp(demoText).letterSpacing)

    if (cleanEndResult) {
      expect(parseFloat(cleanEndResult)).toBeCloseTo(parseFloat(increasedSpacing))
    }
  })
  test('Changing Height onClick', () => {
    const { fontHeightInput } = renderTypographyComponent()
    const demoText = getLargeDemoText()
    const initialHeight = getCssProp(demoText).lineHeight
    const step = fontHeightInput.getAttribute('step')
    const increasedHeight = String(Number(step) + Number(initialHeight)) // I know... lol

    expect(getCssProp(demoText).lineHeight).toBe(initialHeight)

    fireEvent.change(fontHeightInput, { target: { value: `${increasedHeight}` } })

    expect(parseFloat(getCssProp(demoText).lineHeight)).toBeCloseTo(parseFloat(increasedHeight))

  })
  test('Changing weight onClick', () => {
    const { fontWeightInput } = renderTypographyComponent()
    const demoText = getLargeDemoText()
    const initialWeight = getCssProp(demoText).fontWeight

    fireEvent.change(fontWeightInput, { target: { value: true } })

    expect(getCssProp(demoText).fontWeight).not.toBe(initialWeight)
  })
})
