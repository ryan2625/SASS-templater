import React, { useEffect, useState } from 'react'
import "./Hero.scss"
import "../../Styles_SASS/__variables.scss"
import gradient1 from "../../Assets/Images/Other/blue-gradient.webp"
import gradient2 from "../../Assets/Images/Other/purple-gradient.webp"
import swoosh1 from "../../Assets/Images/Other/sass-swoosh.png"
import swoosh2 from "../../Assets/Images/Other/css-swoosh.png"
import swap1 from "../../Assets/Images/Other/swap1.png"
import swap2 from "../../Assets/Images/Other/swap2.png"
import temp1 from "../../Assets/Images/Other/temp1.png"
import temp2 from "../../Assets/Images/Other/temp2.png"

const Hero = () => {

  const [scroll, setScroll] = useState<number>(0)
  const [swap, setSwap] = useState<boolean>(true)
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
    document.getElementById("intro-after")?.addEventListener("click", function (e) {
      setSwap(prev => !prev)
      //Toggle between SASS and CSS for bg gradient, code pictures, and SASS/CSS styling
    })
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
          <p><span>Design</span><span> made </span><span>easy<img className={"intro-swoosh " + (swap ? "intro-swoosh-up" : "intro-swoosh-down")} src={swoosh1} /> <img className={"intro-swoosh " + (swap ? "intro-swoosh-down" : "intro-swoosh-up")} src={swoosh2} /> </span></p>
          <p className='intro-sub-heading'>View, edit, and export<br />
            styles in seconds</p>
          <div className='intro-styling-container'>
            <img src={swap2} id="intro-after" alt="Click to swap between SASS and CSS display" />
            <p className="intro-hold-width">SASS Styling</p>
            <p className={"intro-styling " + (swap ? "intro-primary-styling" : "intro-secondary-styling")}>SASS Styling</p>
            <p className={"intro-styling " + (swap ? "intro-secondary-styling" : "intro-primary-styling")}>CSS Styling</p>
          </div>
        </div>
        <div className='intro-container'>
          <div className="intro-graphic">
            <img src={gradient2} className={swap ? "gradient-fadein" : "gradient-fadeout"} alt="Background gradient" aria-label='hidden' />
            <img src={gradient1} className={swap ? "gradient-fadeout" : "gradient-fadein"} alt="Background gradient" aria-label='hidden' />
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