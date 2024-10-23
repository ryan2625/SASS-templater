import React, { useState, useEffect, useContext } from 'react'
import "./Typography.scss"
import useTypographyReducer from '../../Hooks/typographyReducer'
import { ThemeContext } from '../../Contexts/ThemeContext'

function Typography() {
  const themeContext = useContext(ThemeContext)
  const [state, dispatch] = useTypographyReducer()
  const [units, setUnits] = useState<string>("px")

  interface Styles {
    color: string,
    lineHeight: number,
    letterSpacing: number,
    fontFamily: string
  }

  let styles: Styles = {
    color: state.color,
    lineHeight: state.height,
    letterSpacing: state.spacing,
    fontFamily: state.font
  }

  const sizes: string[] = [
    "p",
    "h6",
    "h5",
    "h4",
    "h3",
    "h2",
    "h1"
  ]

  function calcVal(index: number, value: number): number {
    if (index === sizes.length - 1) {
      return value
    } else {
      return calcVal(index += 1, (value * state.scale))
    }
  }

  function computeStyleVariables(variable: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable)
  }

  useEffect(() => {
    const parentEl = [].slice.call(document.getElementById("typography-font")?.children)
    parentEl.forEach((child: HTMLOptionElement) => {
      child.style.fontFamily = child.value
    })
  }, [])

  useEffect(() => {
    dispatch({ type: "CHANGE_COLOR", payload: computeStyleVariables("--bg1") })
  }, [themeContext.context])

  return (
    <section className="template-container">
      <div className="template-creator">
        <div className="template-config">
          <div className='typography-styles-container'>
            <h2>Styles</h2>
            <div className="typography-decoration-h2" id="typography-h2-decoration1"></div>
            <div className="typography-decoration-h2" id="typography-h2-decoration2"></div>
            <div className="typography-decoration-h2" id="typography-h2-decoration3"></div>
          </div>
          <div className="config-columns">
            <div>
              <label htmlFor="typography-size">Font Size</label>
              <label htmlFor="typography-scale">Font Family</label>
              <label htmlFor="typography-spacing">Color</label>
              <label htmlFor="typography-height">Scale</label>
              <label htmlFor="typography-color">Spacing</label>
              <label htmlFor="typography-font">Height</label>
            </div>
            <div className="typography-inputs">
              <div>
                <input type='number' id="typography-size" step="0.5" name="typography-size" onChange={(e) => dispatch({ type: "CHANGE_SIZE", payload: Number(e.target.value) })} value={state.size} min="5" max="20" />
              </div>
              <div>
                <select name="typography-font" id="typography-font" onChange={(e) => dispatch({ type: "CHANGE_FONT", payload: e.target.value })} defaultValue="Roboto Flex, sans-serif">
                  <option value="'Webdings', fantasy">Webdings</option>
                  <option value="'Wingdings', fantasy">Wingdings</option>
                  <option value="'Algerian', serif">Algerian</option>
                  <option value="Arial Black, sans-serif">Arial Black</option>
                  <option value="'Brush Script MT', cursive">Brush Script MT</option>
                  <option value="'Century Gothic', sans-serif">Century Gothic</option>
                  <option value="'Comic Sans MS', cursive, sans-serif">Comic Sans MS</option>
                  <option value="'Courier New', monospace">Courier New</option>
                  <option value="Fantasy, fantasy">Fantasy</option>
                  <option value="Garamond, serif">Garamond</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Impact', sans-serif">Impact</option>
                  <option value="'Jokerman', cursive">Jokerman</option>
                  <option value="'Lucida Console', monospace">Lucida Console</option>
                  <option value="'Papyrus', fantasy">Papyrus</option>
                  <option value="Roboto Flex, sans-serif">Roboto Flex, sans-serif</option>
                  <option value="'Seaweed Script', cursive">Seaweed Script, cursive</option>
                  <option value="'Segoe Print', cursive">Segoe Print</option>
                  <option value="'Tahoma', sans-serif">Tahoma</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                  <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                  <option value="'Verdana', sans-serif">Verdana</option>
                </select>
              </div>
              <div>
                <input type="color" name="typography-color"
                  id="typography-color"
                  data-pseudo-field="body-color" colorpick-eyedropper-active="true" data-gtm-form-interact-field-id="0"
                  value={state.color}
                  onChange={(e) => dispatch({ type: "CHANGE_COLOR", payload: e.target.value })} />
              </div>
              <div>
                <select id="typography-scale" name="typography-scale" onChange={(e) => dispatch({ type: "CHANGE_SCALE", payload: Number(e.target.value) })} defaultValue="1.200">
                  <option value="1.067">1.067 - Minor Second</option>
                  <option value="1.125">1.125 - Major Second</option>
                  <option value="1.200">1.200 - Minor Third</option>
                  <option value="1.250">1.250 - Major Third</option>
                  <option value="1.333">1.333 - Perfect Fourth</option>
                  <option value="1.414">1.414 - Augmented Fourth</option>
                  <option value="1.500">1.500 - Perfect Fifth</option>
                  <option value="1.618">1.618 - Golden Ratio</option>
                </select>
              </div>
              <div>
                <input type="number" step="0.1" name="typography-spacing" id="typography-spacing" value={state.spacing} onChange={(e) => dispatch({ type: "CHANGE_SPACING", payload: Number(e.target.value) })} min="-4" />
              </div>
              <div>
                <input type='number' step="0.05" name="typography-height" id="typography-height" value={state.height} onChange={(e) => dispatch({ type: "CHANGE_HEIGHT", payload: Number(e.target.value) })} />
              </div>
            </div>
          </div>
        </div>
        <div className="template-stage">
          <div>
            <span onClick={() => setUnits("rem")} style={{ color: computeStyleVariables("--inverse-txt1") }} className={units === "rem" ? "typography-units-active" : "typography-units-inactive"}>rem </span>
            <span onClick={() => setUnits("px")} style={{ color: computeStyleVariables("--inverse-txt1") }} className={units === "rem" ? "typography-units-inactive" : "typography-units-active"}>px</span>
          </div>
          <div>
            {
              sizes && sizes.reverse().map((tag, key) => {
                let parseScale = parseFloat(calcVal(key, state.size).toFixed(2))
                return (
                  <div className="template-scale-preview" key={key}>
                    <div style={{ fontSize: "15px", lineHeight: state.height, letterSpacing: "2px", color: computeStyleVariables("--inverse-txt1") }}>{tag}</div>
                    <div style={{ fontSize: "15px", lineHeight: state.height, letterSpacing: "2px" }}>{(units === "px" ? parseScale : (parseScale * 1 / 16).toFixed(2)) + units}</div>
                    <div style={{ ...styles, fontSize: parseScale }}>Woven silk pyjamas exchanged for blue quartz gems</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Typography