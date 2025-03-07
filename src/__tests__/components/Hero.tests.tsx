import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import Hero from '../../Components/Hero/Hero'
import ThemeContextProvider from '../../Contexts/ThemeContext'
import { store } from '../../Store/store'
import { resetIntersectionMocking, setupIntersectionMocking } from 'react-intersection-observer/test-utils';
import 'react-intersection-observer'

describe('Hero and Navbar', () => {
  beforeEach(() => {
    setupIntersectionMocking(jest.fn);
  });

  afterEach(() => {
    jest.clearAllMocks()
    resetIntersectionMocking();
  })

  const renderHeroComponent = () => {
    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <Hero />
        </ThemeContextProvider>
      </Provider>
    )

    return {
      themeChanger1: screen.getByTestId('change-theme-1'),
      themeChanger2: screen.getByTestId('change-theme-2'),
      themeIcon1: screen.getByTestId('change-theme-icon-1'),
      themeIcon2: screen.getByTestId('change-theme-icon-2'),
      swapperIcon: screen.getByTestId('style-swapper'),
      sassImage: screen.getByTestId('sass-image'),
      cssImage: screen.getByTestId('css-image')
    }
  }

  test('Swapping between CSS and SASS pictures properly', () => {
    const { swapperIcon, sassImage, cssImage } = renderHeroComponent()

    expect(sassImage).toHaveClass('primary-graphic')
    expect(cssImage).toHaveClass('secondary-graphic')

    fireEvent.click(swapperIcon)
    expect(sassImage).toHaveClass('secondary-graphic')
    expect(cssImage).toHaveClass('primary-graphic')

    fireEvent.click(swapperIcon)
    expect(sassImage).toHaveClass('primary-graphic')
    expect(cssImage).toHaveClass('secondary-graphic')
  })

  test('First nav changing to light and dark mode', () => {
    const { themeChanger1, themeIcon1 } = renderHeroComponent()

    expect(themeIcon1).toHaveClass('hero-to-light')

    fireEvent.click(themeChanger1)
    expect(themeIcon1).toHaveClass('hero-to-dark')

    fireEvent.click(themeChanger1)
    expect(themeIcon1).toHaveClass('hero-to-light')
  })

  test('Second nav changing to light and dark mode', () => {
    const { themeChanger2, themeIcon2 } = renderHeroComponent()

    expect(themeIcon2).toHaveClass('hero-to-light')

    fireEvent.click(themeChanger2)
    expect(themeIcon2).toHaveClass('hero-to-dark')

    fireEvent.click(themeChanger2)
    expect(themeIcon2).toHaveClass('hero-to-light')
  })
})
