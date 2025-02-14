import { createContext, useMemo, useState } from 'react'
import { initialState as initialTypographyState, State as TypographyState } from '../Hooks/useTypographyReducer'

interface StylesContext {
  tags: TypographyState
  margins: number[]
  colors: {
    primary: string
    secondary: string
    bg1: string
    bg2: string
    primaryDark: string
    secondaryDark: string
    bg1Dark: string
    bg2Dark: string
  }
}

interface TotalStylesContext {
  styles: StylesContext
  setStyles: React.Dispatch<React.SetStateAction<StylesContext>>
}

const defaultContext: StylesContext = {
  tags: initialTypographyState,
  margins: [0.25, 0.5, 1, 2, 5],
  colors: {
    primary: '',
    secondary: '',
    bg1: '',
    bg2: '',
    primaryDark: '',
    secondaryDark: '',
    bg1Dark: '',
    bg2Dark: '',
  },
}

const BaseTotalStylesContext: TotalStylesContext = {
  styles: defaultContext,
  setStyles: () => {},
}

export const StylesContext = createContext<TotalStylesContext>(BaseTotalStylesContext)

const StylesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [styles, setStyles] = useState<StylesContext>(defaultContext)

  const stylesTheme = useMemo(
    () => ({
      styles: styles,
      setStyles: setStyles,
    }),
    [styles, setStyles],
  )

  return <StylesContext.Provider value={stylesTheme}>{children}</StylesContext.Provider>
}

export default StylesContextProvider
