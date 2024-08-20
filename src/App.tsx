import { useState, useEffect } from 'react';
import './App.scss';
import Hero from "./Components/Hero/Hero"
import Template from "./Components/Template_Designer/Template"
import "./Styles_SASS/__variables.scss"
function App() {

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  const [theme, setTheme] = useState<string>("dark")

  const changeTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', newTheme)
      return newTheme
    })
  }

  return (
    <div className="App">
      <Hero />
      <Template />
    </div>
  );
}

export default App;
