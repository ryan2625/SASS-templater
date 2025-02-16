import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../Contexts/ThemeContext'
import useTypographyReducer from '../../Hooks/useTypographyReducer'
import { fonts, labels, scales, sizes } from './constants'
import { Styles } from './types'
import './Typography.scss'
import { calcVal, getCssVariableValue } from './utils'

function Typography() {
  const themeContext = useContext(ThemeContext)
  const [state, dispatch] = useTypographyReducer()
  const [units, setUnits] = useState<string>('px')

  const styles: Styles = {
    color: state.color,
    lineHeight: state.height,
    letterSpacing: state.spacing,
    fontFamily: state.font
  }

  useEffect(() => {
    const parentEl = [].slice.call(document.getElementById('typography-font')?.children)
    parentEl.forEach((child: HTMLOptionElement) => {
      child.style.fontFamily = child.value
    })
  }, [])

  useEffect(() => {
    dispatch({ type: 'CHANGE_COLOR', payload: getCssVariableValue('--bg1') })
  }, [dispatch, themeContext.context])

  return (
    <section className="template-container">
      <div className="template-creator">
        <div className="template-config">
          <div className="typography-styles-container">
            <h2>Styles</h2>
            <div className="typography-decoration-h2" id="typography-h2-decoration1"></div>
            <div className="typography-decoration-h2" id="typography-h2-decoration2"></div>
            <div className="typography-decoration-h2" id="typography-h2-decoration3"></div>
          </div>
          <div className="config-columns">
            <div>
              {labels &&
                labels.map((label) => {
                  return <label key={label.htmlFor}>{label.text}</label>
                })}
            </div>
            <div className="typography-inputs">
              <div>
                <input
                  type="number"
                  id="typography-size"
                  step="0.5"
                  name="typography-size"
                  onChange={(e) =>
                    dispatch({
                      type: 'CHANGE_SIZE',
                      payload: Number(e.target.value)
                    })
                  }
                  value={state.size}
                  min="5"
                  max="20"
                />
              </div>
              <div>
                <select
                  name="typography-font"
                  id="typography-font"
                  onChange={(e) => dispatch({ type: 'CHANGE_FONT', payload: e.target.value })}
                  defaultValue="Roboto Flex, sans-serif"
                >
                  {fonts &&
                    fonts.map((font) => {
                      return (
                        <option key={font.displayName} value={font.value}>
                          {font.displayName}
                        </option>
                      )
                    })}
                </select>
              </div>
              <div>
                <input
                  type="color"
                  name="typography-color"
                  id="typography-color"
                  data-pseudo-field="body-color"
                  colorpick-eyedropper-active="true"
                  data-gtm-form-interact-field-id="0"
                  value={state.color}
                  onChange={(e) => dispatch({ type: 'CHANGE_COLOR', payload: e.target.value })}
                />
              </div>
              <div>
                <select
                  id="typography-scale"
                  name="typography-scale"
                  onChange={(e) =>
                    dispatch({
                      type: 'CHANGE_SCALE',
                      payload: Number(e.target.value)
                    })
                  }
                  defaultValue="1.250"
                >
                  {scales &&
                    scales.map((scale) => {
                      return (
                        <option key={scale.value} value={scale.value}>
                          {scale.label}
                        </option>
                      )
                    })}
                </select>
              </div>
              <div>
                <input
                  type="number"
                  step="0.1"
                  name="typography-spacing"
                  id="typography-spacing"
                  value={state.spacing}
                  onChange={(e) =>
                    dispatch({
                      type: 'CHANGE_SPACING',
                      payload: Number(e.target.value)
                    })
                  }
                  min="-4"
                />
              </div>
              <div>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  name="typography-height"
                  id="typography-height"
                  value={state.height}
                  onChange={(e) =>
                    dispatch({
                      type: 'CHANGE_HEIGHT',
                      payload: Number(e.target.value)
                    })
                  }
                />
              </div>
              <div>
                <select
                  id="typography-weight"
                  name="typography-weight"
                  onChange={(e) =>
                    dispatch({
                      type: 'CHANGE_WEIGHT',
                      payload: Boolean(e.target.value)
                    })
                  }
                >
                  <option value="true">Disabled</option>
                  <option value="false">Enabled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="template-stage">
          <div>
            <span
              onClick={() => setUnits('px')}
              style={{ color: getCssVariableValue('--inverse-txt1') }}
              className={units === 'rem' ? 'typography-units-inactive' : 'typography-units-active'}
            >
              px
            </span>
            <span style={{ color: getCssVariableValue('--inverse-txt1') }}> | </span>
            <span
              onClick={() => setUnits('rem')}
              style={{ color: getCssVariableValue('--inverse-txt1') }}
              className={units === 'rem' ? 'typography-units-active' : 'typography-units-inactive'}
            >
              rem
            </span>
          </div>
          <div>
            {sizes &&
              sizes.map((tag, key) => {
                const parseScale = parseFloat(calcVal(key, state.size, state.scale, sizes).toFixed(1))
                return (
                  <div className="template-scale-preview" key={key}>
                    <div
                      style={{
                        fontSize: '15px',
                        lineHeight: state.height,
                        letterSpacing: '2px',
                        color: getCssVariableValue('--inverse-txt1')
                      }}
                    >
                      {tag}
                    </div>
                    <div
                      style={{
                        fontSize: '15px',
                        lineHeight: state.height,
                        letterSpacing: '2px'
                      }}
                    >
                      {(units === 'px' ? parseScale : ((parseScale * 1) / 16).toFixed(1)) + units}
                    </div>
                    <div
                      style={{
                        ...styles,
                        fontSize: parseScale,
                        fontWeight: state.weight === true ? (sizes.length - key + 1) * 100 : 400
                      }}
                    >
                      Woven silk pyjamas exchanged for blue quartz gems
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Typography
