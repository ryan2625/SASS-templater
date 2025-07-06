import React, { useContext, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
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
import Stylesheet from './Components/StyleSheet/Stylesheet'
import './Hero.scss'

const Hero = () => {
  const themeContext = useContext(ThemeContext)
  const [navScrollRef, inView] = useInView({
    rootMargin: '350px',
    initialInView: true
  })
  const heroRef = useRef<HTMLDivElement>(null)
  const [swap, setSwap] = useState<boolean>(true)
  const [active, setActive] = useState<boolean>(false)
  const [notInitialRender, setNotInitialRender] = useState<boolean>(false)

  useEffect(() => {
    if (heroRef.current) {
      setTimeout(() => {
        heroRef.current?.classList.add('no-animation')
      }, 1)
      setTimeout(() => {
        heroRef.current?.classList.remove('no-animation')
      }, 10)
    }
  }, [])

  // eslint-disable-next-line
  function setTheme(event: React.MouseEvent<HTMLDivElement>) {
    themeContext.setTheme()
  }

  return (
    <section className="hero-container" id="main-hero-container" ref={heroRef}>
      <nav className="main-nav" ref={navScrollRef}>
        <div>
          <p className="sass-studios">sass | studios</p>
          <div className="hero-mode-constructor">
            <div>
              <p>
                <span
                  onClick={() => {
                    setActive((prev) => !prev)
                  }}
                >
                  &#123;styles&#125;
                </span>{' '}
                /{' '}
              </p>
            </div>
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
      <nav className={!inView ? 'fixed-nav' : 'static-nav'} aria-hidden="true">
        <div>
          <p className="sass-studios">sass | studios</p>
          <div className="hero-mode-constructor">
            <div>
              <p>
                <span
                  onClick={() => {
                    setActive((prev) => !prev)
                  }}
                >
                  &#123;styles&#125;
                </span>{' '}
                /{' '}
              </p>
            </div>
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
              onClick={() => {
                setSwap((prev) => !prev)
                setNotInitialRender(true)
              }}
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
      <Stylesheet active={active} setActive={setActive} />
      <div className="separator" aria-label="hidden"></div>
    </section>
  )
}

export default Hero
