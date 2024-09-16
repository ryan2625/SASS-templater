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
      {/*Possibly make /10 a constant the same height as the oval separator*/}
      <nav className={scroll - (windowHeight / 10) > windowHeight ? "fixed-nav" : "static-nav"} aria-hidden="true">
        <div>
          <p>sass | studios</p>
          <p>about | @</p>
        </div>
      </nav>
      <div className="headline">
        <div className="intro">
          <p><span>Design</span><span> made </span><span>easy</span></p>
          <p className='intro-sub-heading'>View, edit, and export<br />
            styles in seconds</p>
          <div className='intro-styling-container'>
            <p className="intro-styling intro-primary-styling">SASS Styling</p>
            <p className="intro-styling intro-secondary-styling">Css Styling</p>
          </div>
        </div>
        <div className='intro-container'>
          <div className="intro-graphic">
            <img src={gradient2} alt="Background gradient" aria-label='hidden' />
            <div role="img" id="graphic-swap-1" className="intro-graphic-swap primary-graphic" aria-label="SASS Styling graphic"></div>
            <div role="img" id="graphic-swap-2" className="intro-graphic-swap secondary-graphic" aria-label="CSS Styling graphic"></div>
          </div>
        </div>
      </div>
      <div className="separator" aria-label='hidden'></div>
    </section>
  )
}

export default Hero
