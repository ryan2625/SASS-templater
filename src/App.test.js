import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import ThemeContextProvider from '../src/Contexts/ThemeContext'
import App from './App'
import { store } from './Store/store'

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </Provider>,
  )
  const elements = screen.getAllByText('sass | studios')
  expect(elements[0]).toBeInTheDocument()
})
