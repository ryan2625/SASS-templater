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
    | { type: "CHANGE_NUMBER", payload: number }
    | { type: "CHANGE_SPACING", payload: number }
    | { type: "CHANGE_HEIGHT", payload: number }
    | { type: "CHANGE_COLOR", payload: string }

const initialState: State = {
    size: 0,
    scale: 0,
    spacing: 0,
    height: 0,
    color: ""
}

function Reducer(state: State, action: Action): State {
    const { type } = action

    switch (type) {
        case "CHANGE_SIZE":
            return { ...state, size: action.payload }
        case "CHANGE_NUMBER":
            return { ...state, scale: action.payload }
        case "CHANGE_SPACING":
            return { ...state, spacing: action.payload }
        case "CHANGE_HEIGHT":
            return { ...state, height: action.payload }
        case "CHANGE_COLOR":
            return { ...state, color: action.payload }
    }
}

export const [state, action] = useReducer(Reducer, initialState)
