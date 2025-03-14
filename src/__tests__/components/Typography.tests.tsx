import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import Hero from '../../Components/Hero/Hero'
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
  // test('Changing Height onClick', () => {
  //   const { swapperIcon, sassImage, cssImage } = renderTypographyComponent()

  //   expect(sassImage).toHaveClass('primary-graphic')
  //   expect(cssImage).toHaveClass('secondary-graphic')

  //   fireEvent.click(swapperIcon)
  //   expect(sassImage).toHaveClass('secondary-graphic')
  //   expect(cssImage).toHaveClass('primary-graphic')

  //   fireEvent.click(swapperIcon)
  //   expect(sassImage).toHaveClass('primary-graphic')
  //   expect(cssImage).toHaveClass('secondary-graphic')
  // })
  // test('Changing weight onClick', () => {
  //   const { swapperIcon, sassImage, cssImage } = renderTypographyComponent()

  //   expect(sassImage).toHaveClass('primary-graphic')
  //   expect(cssImage).toHaveClass('secondary-graphic')

  //   fireEvent.click(swapperIcon)
  //   expect(sassImage).toHaveClass('secondary-graphic')
  //   expect(cssImage).toHaveClass('primary-graphic')

  //   fireEvent.click(swapperIcon)
  //   expect(sassImage).toHaveClass('primary-graphic')
  //   expect(cssImage).toHaveClass('secondary-graphic')
  // })
  // test('Properly changing units between rem and px', () => {
  //   const { swapperIcon, sassImage, cssImage } = renderTypographyComponent()

  //   expect(sassImage).toHaveClass('primary-graphic')
  //   expect(cssImage).toHaveClass('secondary-graphic')

  //   fireEvent.click(swapperIcon)
  //   expect(sassImage).toHaveClass('secondary-graphic')
  //   expect(cssImage).toHaveClass('primary-graphic')

  //   fireEvent.click(swapperIcon)
  //   expect(sassImage).toHaveClass('primary-graphic')
  //   expect(cssImage).toHaveClass('secondary-graphic')
  // })
  // test('Setting the scale from local storage', () => {
  //   const { swapperIcon, sassImage, cssImage } = renderTypographyComponent()

  //   expect(sassImage).toHaveClass('primary-graphic')
  //   expect(cssImage).toHaveClass('secondary-graphic')

  //   fireEvent.click(swapperIcon)
  //   expect(sassImage).toHaveClass('secondary-graphic')
  //   expect(cssImage).toHaveClass('primary-graphic')

  //   fireEvent.click(swapperIcon)
  //   expect(sassImage).toHaveClass('primary-graphic')
  //   expect(cssImage).toHaveClass('secondary-graphic')
  // })
  // test('Color changing during theme swap', () => {
  //   const { swapperIcon, sassImage, cssImage } = renderTypographyComponent()

  //   expect(sassImage).toHaveClass('primary-graphic')
  //   expect(cssImage).toHaveClass('secondary-graphic')

  //   fireEvent.click(swapperIcon)
  //   expect(sassImage).toHaveClass('secondary-graphic')
  //   expect(cssImage).toHaveClass('primary-graphic')

  //   fireEvent.click(swapperIcon)
  //   expect(sassImage).toHaveClass('primary-graphic')
  //   expect(cssImage).toHaveClass('secondary-graphic')
  // })
})
