import { useState, useEffect } from 'react';
import './App.scss';
import Hero from "./Components/Hero/Hero"
import "./Styles_SASS/__variables.scss"
function App() {

useEffect(() => {
 document.documentElement.setAttribute('data-theme', theme)
}, [])

  const [theme, setTheme] = useState("dark")

  const changeTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', newTheme)
      return newTheme
    })
  }

  return (
    <div className="App">
      <button onClick={changeTheme}>
        asd
      </button>
      <Hero />
    </div>
  );
}

export default App;
