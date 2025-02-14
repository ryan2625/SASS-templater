import { createContext, useEffect, useState } from 'react'

type themes = 'light' | 'dark'

interface ThemeContextType {
  context: 'light' | 'dark'
  setTheme: React.Dispatch<React.SetStateAction<themes | null>>
}

const defaultContext: ThemeContextType = {
  context: 'dark',
  setTheme: () => {},
}

export const ThemeContext = createContext<ThemeContextType>(defaultContext)

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  type themes = 'light' | 'dark'

  const [theme, setTheme] = useState<themes>('dark')

  const changeTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', newTheme)
      return newTheme
    })
  }

  const contextTheme = {
    context: theme,
    setTheme: changeTheme,
  }

  return <ThemeContext.Provider value={contextTheme}>{children}</ThemeContext.Provider>
}

export default ThemeContextProvider
