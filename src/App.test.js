import { render, screen } from '@testing-library/react'
import App from './App'
import ThemeContextProvider from '../src/Contexts/ThemeContext'
import { store } from './Store/store'
import { Provider } from 'react-redux'

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </Provider>)
  const elements = screen.getAllByText('sass | studios');
  expect(elements[0]).toBeInTheDocument()
})
