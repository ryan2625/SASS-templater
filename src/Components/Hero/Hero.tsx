import React, { useContext, useEffect, useState } from 'react'
import {
  cssDark,
  cssLight,
  darkLightMode,
  gradient1,
  gradient2,
  sassDark,
  sassLight,
  swap1,
  swap2,
  swoosh1,
  swoosh2
} from '../../Assets/exports'
import { ThemeContext } from '../../Contexts/ThemeContext'
import '../../Styles/__variables.scss'
import './Hero.scss'

const Hero = () => {
  const themeContext = useContext(ThemeContext)
  const [scroll, setScroll] = useState<number>(0)
  const [swap, setSwap] = useState<boolean>(true)
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight)
  const [notInitialRender, setNotInitialRender] = useState<boolean>(false)

  useEffect(() => {
    const ele = document.getElementById('main-hero-container')
    setTimeout(() => {
      ele?.classList.add('no-animation')
    }, 1)
    setTimeout(() => {
      ele?.classList.remove('no-animation')
    }, 5)

    const onScroll = () => {
      setScroll(window.scrollY)
    }
    const onResize = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    document.getElementById('intro-after')?.addEventListener('click', function () {
      setSwap((prev) => !prev)
      setNotInitialRender(true)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // eslint-disable-next-line
  function setTheme(event: React.MouseEvent<HTMLDivElement>) {
    themeContext.setTheme()
  }

  return (
    <section className="hero-container" id="main-hero-container">
      <nav className="main-nav">
        <div>
          <p className="sass-studios">sass | studios</p>
          <div className="hero-mode-constructor">
            <p></p>
            <div className="hero-mode-bg" role="button" onClick={setTheme} data-testid="change-theme-1">
              <img
                className={'hero-mode-picture' + (themeContext.context == 'light' ? ' hero-to-dark' : ' hero-to-light')}
                src={darkLightMode}
                alt={`Toggle to ${themeContext.context} mode`}
                data-testid="change-theme-icon-1"
              />
            </div>
          </div>
        </div>
      </nav>
      <nav className={scroll - windowHeight / 150 > windowHeight ? 'fixed-nav' : 'static-nav'} aria-hidden="true">
        <div>
          <p className="sass-studios">sass | studios</p>
          <div className="hero-mode-constructor">
            <p></p>
            <div className="hero-mode-bg" role="button" onClick={setTheme} data-testid="change-theme-2">
              <img
                className={'hero-mode-picture' + (themeContext.context == 'light' ? ' hero-to-dark' : ' hero-to-light')}
                src={darkLightMode}
                alt={`Toggle to ${themeContext.context} mode`}
                data-testid="change-theme-icon-2"
              />
            </div>
          </div>
        </div>
      </nav>
      <div className="headline">
        <div className="intro">
          <p>
            <span>Design</span>
            <span> made </span>
            <span>
              easy
              <img
                className={
                  'intro-swoosh ' +
                  (notInitialRender
                    ? swap
                      ? 'intro-swoosh-up'
                      : 'intro-swoosh-down'
                    : 'intro-swoosh-first-render-sass')
                }
                src={swoosh1}
                aria-hidden="true"
              />{' '}
              <img
                className={
                  'intro-swoosh ' +
                  (notInitialRender
                    ? swap
                      ? 'intro-swoosh-down'
                      : 'intro-swoosh-up'
                    : 'intro-swoosh-first-render-css')
                }
                src={swoosh2}
                aria-hidden="true"
              />{' '}
            </span>
          </p>
          <p className="intro-sub-heading">
            View, edit, and export
            <br />
            styles in seconds
          </p>
          <div className="intro-styling-container">
            <img
              src={themeContext.context == 'dark' ? swap2 : swap1}
              id="intro-after"
              alt="Click to swap between SASS and CSS display"
              data-testid="style-swapper"
            />
            <div aria-label="hidden" id="intro-highlight"></div>
            <p className="intro-hold-width">SASS Styling</p>
            <p
              className={
                'intro-styling ' +
                (notInitialRender
                  ? swap
                    ? 'intro-primary-styling'
                    : 'intro-secondary-styling'
                  : 'intro-primary-styling-first-render')
              }
            >
              SASS Styling
            </p>
            <p
              className={
                'intro-styling ' +
                (notInitialRender
                  ? swap
                    ? 'intro-secondary-styling'
                    : 'intro-primary-styling'
                  : 'intro-secondary-styling-first-render')
              }
            >
              CSS Styling
            </p>
          </div>
        </div>
        <div className="intro-container">
          <div className="intro-graphic">
            <img src={gradient2} className={swap ? 'gradient-fadein' : 'gradient-fadeout'} aria-label="hidden" />
            <img src={gradient1} className={swap ? 'gradient-fadeout' : 'gradient-fadein'} aria-label="hidden" />
            <div className={'intro-swap-cont1 ' + (swap ? '' : 'hero-overlay-adjust')}>
              <img
                src={themeContext.context == 'dark' ? sassDark : sassLight}
                className={'intro-graphic-swap graphic-swap-1-dark ' + (swap ? 'primary-graphic' : 'secondary-graphic')}
                alt="SASS Styling graphic"
                data-testid="sass-image"
              />
            </div>
            <div className={'intro-swap-cont2 ' + (swap ? 'hero-overlay' : '')}>
              <img
                src={themeContext.context == 'dark' ? cssDark : cssLight}
                className={'intro-graphic-swap graphic-swap-2-dark ' + (swap ? 'secondary-graphic' : 'primary-graphic')}
                alt="CSS Styling graphic"
                data-testid="css-image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="separator" aria-label="hidden"></div>
    </section>
  )
}

export default Hero
