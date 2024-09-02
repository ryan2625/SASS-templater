import React, { useEffect, useState } from 'react'
import "./Hero.scss"
import "../../Styles_SASS/__variables.scss"
import gradient1 from "../../Assets/Images/Other/blue-gradient.webp"
import gradient2 from "../../Assets/Images/Other/purple-gradient.webp"
import swoosh from "../../Assets/Images/Other/swoosh.webp"
import swap1 from "../../Assets/Images/Other/swap1.png"
import swap2 from "../../Assets/Images/Other/swap2.webp"
import temp1 from "../../Assets/Images/Other/temp1.png"
import temp2 from "../../Assets/Images/Other/temp2.png"

const Hero = () => {

  const [scroll, setScroll] = useState<number>(0)
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight)

  useEffect(() => {
    const onScroll = () => {
      setScroll(window.scrollY)
    }
    const onResize = () => {
      setWindowHeight(window.innerHeight)
    }
    window.addEventListener("scroll", onScroll)
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <section className="hero-container">
      <nav className='main-nav'>
        <div>
          <p>sass | studios</p>
          <p>about | @</p>
        </div>
      </nav>
      {/*Possibly make /10 a constant the same heigght as the oval separator*/}
      <nav className={scroll - (windowHeight / 10) > windowHeight ? "fixed-nav" : "static-nav"} aria-hidden="true">
        <div>
          <p>sass | studios</p>
          <p>about | @</p>
        </div>
      </nav>
      <div className="headline">
        <div className="intro">
          <p><span>Design</span><span> made </span><span>easy</span></p>
          <p>View, edit, and export<br />
            styles in seconds</p>
          <div>
            <p>SASS Styling</p>
            <p>Css Styling</p>
          </div>
        </div>
        <div className="intro-graphic">
          <img src={temp1} alt="SASS Styling graphic" />
          <img src={temp2} alt="CSS Styling graphic" />
          <img src={gradient2} alt="Background gradient" aria-label='hidden'/>
        </div>
      </div>
      <div className="separator" aria-label='hidden'></div>
    </section>
  )
}

export default Hero
