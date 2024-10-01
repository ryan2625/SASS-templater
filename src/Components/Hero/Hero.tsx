import { useEffect, useState, useContext, ReactEventHandler } from 'react'
import { ThemeContext } from '../../Contexts/ThemeContext'
import "./Hero.scss"
import "../../Styles_SASS/__variables.scss"
import { gradient1, gradient2, swoosh1, swoosh2, swap1, swap2, cssDark, sassDark, cssLight, sassLight, darkLightMode } from "./Imports"

const Hero = () => {
  const themeContext = useContext(ThemeContext)
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

  function setTheme(event: React.MouseEvent<HTMLDivElement>) {
    themeContext.setTheme()
  }

  return (
    <section className="hero-container">
      <nav className='main-nav'>
      <div>
          <p>sass | studios</p>
          <div className='hero-mode-constructor'><p>about |</p>
            <div className={"hero-mode-bg" + (themeContext.context == "light" ? " hero-mode-light" : " hero-mode-dark")} onClick={setTheme}>
              <img className={"hero-mode-picture" + (themeContext.context == "light" ? " hero-to-dark" : " hero-to-light")} src={darkLightMode} alt="" /></div>
          </div>
        </div>
      </nav>
      {/*Possibly make /10 a constant the same height as the oval separator*/}
      <nav className={scroll - (windowHeight / 10) > windowHeight ? "fixed-nav" : "static-nav"} aria-hidden="true">
        <div>
          <p>sass | studios</p>
          <div className='hero-mode-constructor'><p>about |</p>
            <div className={"hero-mode-bg" + (themeContext.context == "light" ? " hero-mode-light" : " hero-mode-dark")} onClick={setTheme}>
              <img className={"hero-mode-picture" + (themeContext.context == "light" ? " hero-to-dark" : " hero-to-light")} src={darkLightMode} alt="" /></div>
          </div>
        </div>
      </nav>
      <div className="headline">
        <div className="intro">
          <p><span>Design</span><span> made </span><span>easy<img className={"intro-swoosh " + (swap ? "intro-swoosh-up" : "intro-swoosh-down")} src={swoosh1} /> <img className={"intro-swoosh " + (swap ? "intro-swoosh-down" : "intro-swoosh-up")} src={swoosh2} /> </span></p>
          <p className='intro-sub-heading'>View, edit, and export<br />
            styles in seconds</p>
          <div className='intro-styling-container'>
            <img src={themeContext.context == "dark" ? swap2 : swap1} id="intro-after" alt="Click to swap between SASS and CSS display" />
            <p className="intro-hold-width">SASS Styling</p>
            <p className={"intro-styling " + (swap ? "intro-primary-styling" : "intro-secondary-styling")}>SASS Styling</p>
            <p className={"intro-styling " + (swap ? "intro-secondary-styling" : "intro-primary-styling")}>CSS Styling</p>
          </div>
        </div>
        <div className='intro-container'>
          <div className="intro-graphic">
            <img src={gradient2} className={swap ? "gradient-fadein" : "gradient-fadeout"} alt="Background gradient" aria-label='hidden' />
            <img src={gradient1} className={swap ? "gradient-fadeout" : "gradient-fadein"} alt="Background gradient" aria-label='hidden' />
            <div className={'intro-swap-cont1 ' + (swap ? "" : "hero-overlay-adjust")}>
              <img src={themeContext.context == "dark" ? sassDark : sassLight} className={"intro-graphic-swap graphic-swap-1-dark " + (swap ? "primary-graphic" : "secondary-graphic")} aria-label="SASS Styling graphic" />
            </div>
            <div className={'intro-swap-cont2 ' + (swap ? "hero-overlay" : "")}>
              <img src={themeContext.context == "dark" ? cssDark : cssLight} className={"intro-graphic-swap graphic-swap-2-dark " + (swap ? "secondary-graphic" : "primary-graphic")} aria-label="CSS Styling graphic" />
            </div>
          </div>
        </div>
      </div>
      <div className="separator" aria-label='hidden'></div>
    </section>
  )
}

export default Hero