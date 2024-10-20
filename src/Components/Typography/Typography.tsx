import React, { useState } from 'react'
import "./Typography.scss"
import useTypographyReducer from '../../Hooks/typographyReducer'
import { SizeDictionary } from '../../Hooks/typographyReducer'

function Typography() {

  const [state, dispatch] = useTypographyReducer()
  const [units, setUnits] = useState<string>("px")

  interface Styles {
    color: string,
    lineHeight: number,
    letterSpacing: number
  }

  let styles: Styles = {
    color: state.color,
    lineHeight: state.height,
    letterSpacing: state.spacing
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
              <label htmlFor="typography-scale">Scale</label>
              <label htmlFor="typography-spacing">Letter Spacing</label>
              <label htmlFor="typography-height">Line Height</label>
              <label htmlFor="typography-color">Color</label>
            </div>
            <div className="typography-inputs">
              <div>
                <input type='number' id="typography-size" step="0.5" name="scale" onChange={(e) => dispatch({ type: "CHANGE_SIZE", payload: Number(e.target.value) })} value={state.size} min="5" max="20" />
              </div>
              <div>
                <select name="scale" id="typography-scale" onChange={(e) => dispatch({ type: "CHANGE_SCALE", payload: Number(e.target.value) })} >
                  <option value="1.067">1.067 - Minor Second</option>
                  <option value="1.125">1.125 - Major Second</option>
                  <option value="1.200">1.200 - Minor Third</option>
                  <option value="1.250">1.250 - Major Third</option>
                  <option value="1.333" selected>1.333 - Perfect Fourth</option>
                  <option value="1.414">1.414 - Augmented Fourth</option>
                  <option value="1.500">1.500 - Perfect Fifth</option>
                  <option value="1.618">1.618 - Golden Ratio</option>
                </select>
              </div>
              <div>
                <input type="number" step="0.1" name="letter_spacing" id="typography-spacing" value={state.spacing} onChange={(e) => dispatch({ type: "CHANGE_SPACING", payload: Number(e.target.value) })} min="-4" />
              </div>
              <div>
                <input type='number' step="0.05" name="height" id="typography-height" value={state.height} onChange={(e) => dispatch({ type: "CHANGE_HEIGHT", payload: Number(e.target.value) })} />
              </div>
              <div>
                <input type="color" name="pseudo-body-color" data-pseudo-field="body-color" colorpick-eyedropper-active="true" data-gtm-form-interact-field-id="0"
                  value={state.color}
                  onChange={(e) => dispatch({ type: "CHANGE_COLOR", payload: e.target.value })} />
              </div>
              <div>
                font
              </div>
            </div>
          </div>
        </div>
        <div className="template-stage">
          <div>
            <span onClick={() => setUnits("rem")} className={units === "rem" ? "typography-units-active" : "typography-units-inactive"}>rem </span><span onClick={() => setUnits("px")} className={units === "rem" ? "typography-units-inactive" : "typography-units-active"}>px</span>
          </div>
          <div>
            {
              sizes && sizes.reverse().map((tag, key) => {
                let parseScale = parseFloat(calcVal(key, state.size).toFixed(2))
                return (
                  <div className="template-scale-preview" key={key}>
                    <div style={{ fontSize: "15px", lineHeight: state.height, letterSpacing: "2px" }}>{tag}</div>
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