import { createContext, useState } from 'react'

export type Themes = 'light' | 'dark'

interface ThemeContextType {
  context: Themes
  setTheme(theme?: Themes): Themes | undefined
}

const defaultContext: ThemeContextType = {
  context: 'dark',
  setTheme: () => 'dark'
}

export const ThemeContext = createContext<ThemeContextType>(defaultContext)

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Themes>('dark')

  const themeUtil = (newTheme: Themes) => {
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', JSON.stringify(newTheme))
  }

  const changeTheme = (val?: Themes) => {
    const newTheme: Themes = val !== undefined ? val : (theme === 'light' ? 'dark' : 'light')
    themeUtil(newTheme)
    setTheme(newTheme)
    return val
  }

  const contextTheme = {
    context: theme,
    setTheme: changeTheme
  }

  return <ThemeContext.Provider value={contextTheme}>{children}</ThemeContext.Provider>
}

export default ThemeContextProvider
