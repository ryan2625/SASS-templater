import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import ThemeContextProvider from '../../Contexts/ThemeContext'
import Hero from '../../Components/Hero/Hero'
import { store } from '../../Store/store'

describe('Typography and Navbar', () => {
  beforeEach(() => {
    // None yet
  })

  const typographyComponent = (
    <Provider store={store}>
      <ThemeContextProvider>
        <Hero />
      </ThemeContextProvider>
    </Provider>
  )

  test('Changing to light and dark mode', () => {
    render(
      typographyComponent
    )

    const themeChanger = screen.getByTestId('change-theme-1')
    // Make sure theme changes
    fireEvent.click(themeChanger)
  })

})

