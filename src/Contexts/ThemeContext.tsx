import { createContext, useState, useEffect, Children } from "react";

interface ThemeContextType  {
    context: "light" | "dark",
    setTheme: Function
}

var defaultContext:ThemeContextType = {
    context: "dark",
    setTheme: () => {}
}

export const ThemeContext = createContext<ThemeContextType>(defaultContext);

const ThemeContextProvider = ({children}: { children: React.ReactNode }) => {
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
      }, [])

      type themes = "light" | "dark"
    
      const [theme, setTheme] = useState<themes>("dark")
    
      const changeTheme = () => {
        setTheme(prev => {
          const newTheme = prev === 'light' ? 'dark' : 'light'
          document.documentElement.setAttribute('data-theme', newTheme)
          return newTheme
        })
      }
      
      var contextTheme = {
        context: theme,
        setTheme: changeTheme
      }

      return (
        <ThemeContext.Provider value={contextTheme}>
            {children}
        </ThemeContext.Provider>
      )
}

export default ThemeContextProvider