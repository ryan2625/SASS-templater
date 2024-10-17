import React, { useReducer } from "react"

interface State {
    size: number,
    scale: number,
    spacing: number,
    height: number,
    color: string
}

type Action =
    { type: "CHANGE_SIZE", payload: number }
    | { type: "CHANGE_SCALE", payload: number }
    | { type: "CHANGE_SPACING", payload: number }
    | { type: "CHANGE_HEIGHT", payload: number }
    | { type: "CHANGE_COLOR", payload: string }

const initialState: State = {
    size: 10,
    scale: 1.2,
    spacing: 0,
    height: 20,
    color: ""
}

function Reducer(state: State, action: Action): State {
    const { type } = action

    switch (type) {
        case "CHANGE_SIZE":
            return { ...state, size: action.payload }
        case "CHANGE_SCALE":
            return { ...state, scale: action.payload }
        case "CHANGE_SPACING":
            return { ...state, spacing: action.payload }
        case "CHANGE_HEIGHT":
            return { ...state, height: action.payload }
        case "CHANGE_COLOR":
            return { ...state, color: action.payload }
    }
}

const useTypographyReducer = () => {
    return useReducer(Reducer, initialState) 
}

//Not actually using this but I left it because its cute
export interface SizeDictionary {
    [key: string]: number
}
export default useTypographyReducer