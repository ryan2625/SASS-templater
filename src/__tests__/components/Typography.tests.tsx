import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event';
import Typography from '../../Components/Typography/Typography'
import Hero from '../../Components/Hero/Hero'
import ThemeContextProvider from '../../Contexts/ThemeContext'
import { store } from '../../Store/store'
import { removeLetters } from '../../Utils/generalUtils'
import { demoString } from '../../Components/Typography/constants';
import { initialState as initialFontValues } from '../../Utils/typographyTypesUtils';

describe('Typography component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const getCssProp = (element: HTMLElement) => {
    return window.getComputedStyle(element)
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
      fontWeightInput: screen.getByRole('combobox', { name: /typography font weight/i }) as HTMLSelectElement,
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

  test('Increasing font size onClick', async () => {
    const { fontSizeInput } = renderTypographyComponent()
    // Retrieve text fields such as 16px, 20.5px, 1rem
    const elements = screen.getAllByText(/[0-9]+\.?[0-9]*\s?(px|rem)/i)
    const initialVal = removeLetters((elements[elements.length - 1]).textContent)
    const step = fontSizeInput.getAttribute('step')

    expect(initialVal).toBe(String(initialFontValues.size))
    expect(fontSizeInput.value).toBe(initialVal)

    fireEvent.change(fontSizeInput, { target: { value: `${Number(initialVal) + Number(step)}` } })

    const updatedElements = screen.getAllByText(/[0-9]+\.?[0-9]*\s?(px|rem)/i)
    const updatedVal = (updatedElements[updatedElements.length - 1])

    expect(updatedVal).toHaveTextContent(`${Number(initialVal) + Number(step)}px`)
  })
  test('Changing font family onClick', () => {
    const { fontFamilyInput } = renderTypographyComponent()
    const firstOption = fontFamilyInput.querySelector('option')
    const selectedFontFamily = firstOption?.value
    const demoTexts = screen.getAllByText(new RegExp(demoString, "i"))

    fireEvent.change(fontFamilyInput, { target: { value: selectedFontFamily } })

    expect(demoTexts[0]).toHaveStyle(`font-family: ${selectedFontFamily}`);
  })
  test('Changing color onClick', () => {
    const { fontColorInput } = renderTypographyComponent()
    const initalColor = fontColorInput.value
    const demoTexts = screen.getAllByText(new RegExp(demoString, 'i'))
    const changedColor = '#AAAAAA'

    expect(demoTexts[0]).toHaveStyle(`color: ${initalColor}`)

    fireEvent.change(fontColorInput, { target: { value: changedColor } })

    expect(demoTexts[0]).toHaveStyle(`color: ${changedColor}`)
  })
  test('Changing scale onClick', () => {
    const { fontScaleInput } = renderTypographyComponent()
    const demoTexts = screen.getAllByText(new RegExp(demoString, 'i'))
    const option = fontScaleInput.querySelector('option')
    let scale = demoTexts[0].getAttribute('data-scale-assertion')
    let testScaleValue = null
    if (option instanceof (HTMLOptionElement)) {
      testScaleValue = option?.value
    }

    expect(Number(scale)).toEqual(initialFontValues.scale)
    expect(testScaleValue).not.toBeNull()

    fireEvent.change(fontScaleInput, { target: { value: testScaleValue } })
    scale = demoTexts[0].getAttribute('data-scale-assertion')

    expect(scale).toEqual(testScaleValue)

  })
  // test('Changing spacing onClick', () => {
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
}
)