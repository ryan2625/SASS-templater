import React, { useReducer } from "react"

export interface State {
    size: number,
    scale: number,
    spacing: number,
    height: number,
    weight: boolean,
    font: string,
    color: string
}

type Action =
    { type: "CHANGE_SIZE", payload: number }
    | { type: "CHANGE_SCALE", payload: number }
    | { type: "CHANGE_SPACING", payload: number }
    | { type: "CHANGE_HEIGHT", payload: number }
    | { type: "CHANGE_WEIGHT", payload: boolean }
    | { type: "CHANGE_FONT", payload: string }
    | { type: "CHANGE_COLOR", payload: string }

const initialState: State = {
    size: 16,
    scale: 1.250,
    spacing: 0,
    height: 1.5,
    weight: false,
    font: "Roboto Flex, sans-serif",
    color: "#ffffff"
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
        case "CHANGE_WEIGHT":
            return { ...state, weight: !state.weight }
        case "CHANGE_FONT":
            const selectNode = document.getElementById("typography-font")
            if (selectNode instanceof HTMLSelectElement) {
                selectNode.style.fontFamily = selectNode.value
            }
            return { ...state, font: action.payload }
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