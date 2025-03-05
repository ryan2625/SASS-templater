import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import App from '../App'
import ThemeContextProvider from '../Contexts/ThemeContext'
import { store } from '../Store/store'

// Initial tests discovery file
describe('Typography and Navbar', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const rootApp = (
    <Provider store={store}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </Provider>
  )

  test('Rendering the navbar properly', () => {
    render(rootApp)
    const elements = screen.getAllByText('sass | studios')
    expect(elements[0] && elements[1]).toBeInTheDocument()
  })
})
