import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import ThemeContextProvider from '../Contexts/ThemeContext'
import App from '../App'
import { store } from '../Store/store'

describe('Typography and Navbar', () => {
  beforeEach(() => {
    // None yet
  })

  const rootApp = (
    <Provider store={store}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </Provider>
  )

  test('Rendering the navbar properly', () => {
    render(
      rootApp
    )
    const elements = screen.getAllByText('sass | studios')
    expect(elements[0] && elements[1]).toBeInTheDocument()
  })
})

