import { useState, useEffect } from 'react';
import './App.scss';
import Hero from "./Components/Hero/Hero"
import Template from './Components/Template/Template';
import Typography from './Components/Typography/Typography';
import "./Styles/__variables.scss"
import "./App.scss"
function App() {

  return (
    <div className="App">
      <Hero />
      <Typography />
      <Template />
    </div>
  );
}

export default App;
