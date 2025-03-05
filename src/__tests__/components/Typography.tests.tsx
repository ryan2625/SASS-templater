import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import Typography from '../../Components/Typography/Typography'
import Hero from '../../Components/Hero/Hero'
import ThemeContextProvider from '../../Contexts/ThemeContext'
import { store } from '../../Store/store'

describe('Typography', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const renderTypographyComponent = () => {
    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <Typography />
        </ThemeContextProvider>
      </Provider>
    )
    return {
      fontPreviewContainer: screen.getByTestId('font-preview-container'),
      fontSizeInput: screen.getByRole('spinbutton', { name: /typography size/i }),
      fontFamilyInput: screen.getByRole('combobox', { name: /typography font/i }),
      fontColorInput: screen.getByLabelText(/typography color/i),
      fontScaleInput: screen.getByRole('combobox', { name: /typography scale/i }),
      fontSpacingInput: screen.getByRole('spinbutton', { name: /typography letter spacing"/i }),
      fontHeightInput: screen.getByRole('spinbutton', { name: /typography line height/i }),
      fontWeightInput: screen.getByRole('combobox', { name: /typography font weight/i }),
    }
  }

  const renderTypographyandHeroComponent = () => {
    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <Hero />
          <Typography />
        </ThemeContextProvider>
      </Provider>
    )
  }
  // test('Increasing font size onClick', () => {
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
  // test('Changing font family onClick', () => {
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
  // test('Changing color onClick', () => {
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
  // test('Changing scale onClick', () => {
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
})
