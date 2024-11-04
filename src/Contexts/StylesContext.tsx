import { createContext, useState, useEffect, Children } from "react";
import { State as TypographyState, initialState as initialTypographyState } from "../Hooks/typographyReducer";
interface StylesContext  {
    tags: TypographyState,
    margins: number[],
    colors: {
        primary: string,
        secondary: string,
        
    }
}

var defaultContext: StylesContext = {
    tags: initialTypographyState,
    margins: [
        .25,
        .5,
        1,
        2,
        5
    ],
    colors: {
        primary: "",
        secondary: ""
    }
}

export const StylesContext = createContext<StylesContext>(defaultContext);

const StylesContextProvider = ({children}: { children: React.ReactNode }) => {    
      
      var contextTheme = {

      }

      return (
        <StylesContext.Provider value={contextTheme}>
            {children}
        </StylesContext.Provider>
      )
}

export default StylesContextProvider