import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeContextProvider from "../src/Contexts/ThemeContext"
import { store } from "./Store/store"
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));

if (root) {
    root.render(
        <Provider store={store}>
            <ThemeContextProvider>
                <App />
            </ThemeContextProvider>
        </Provider>
    )
} else {
    throw new Error(
        "You need a root element in your html file bro..."
    )
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
