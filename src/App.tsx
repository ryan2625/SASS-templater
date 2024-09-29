import { useState, useEffect } from 'react';
import './App.scss';
import Hero from "./Components/Hero/Hero"
import Template from "./Components/Template_Designer/Template"
import "./Styles_SASS/__variables.scss"
import "./App.scss"
function App() {

  return (
    <div className="App">
      <Hero />
      <Template />
    </div>
  );
}

export default App;
