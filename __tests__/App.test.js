import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import ThemeContextProvider from '../Contexts/ThemeContext'
import App from '../App'
import { store } from '../Store/store'

describe('Typography and Navbar', () => {
  beforeEach(() => {
    // None yet
  })

  test('renders learn react link', () => {
    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </Provider>
    )
    const elements = screen.getAllByText('sass | studios')
    expect(elements[0]).toBeInTheDocument()
  })

})

