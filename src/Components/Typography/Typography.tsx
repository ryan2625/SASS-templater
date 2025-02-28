import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../Contexts/ThemeContext'
import useTypographyReducer from '../../Hooks/useTypographyReducer'
import { getCssVariableValue } from '../../Utils/generalUtils'
import { initialState } from '../../Utils/typographyTypesUtils'
import { fonts, labels, scales, sizes } from './constants'
import { Styles } from './types'
import './Typography.scss'
import { calcVal, typeGuardReducerState } from './utils'

function Typography() {
  const themeContext = useContext(ThemeContext)
  const [state, dispatch] = useTypographyReducer()
  const [units, setUnits] = useState<string>('px')
  const [storageRetrieved, setStorageRetrieved] = useState<boolean>(false)
  const [firstRender, setFirstRender] = useState<boolean>(true)

  const styles: Styles = {
    color: state.color,
    lineHeight: state.height,
    letterSpacing: state.spacing,
    fontFamily: state.font
  }

  useEffect(() => {
    const styleState = JSON.parse(localStorage.getItem('styleState') || '{}')
    if (styleState.color == 'rgb(245, 245, 245)') {
      // Set to dark theme and refresh causes problems without this check
      styleState.color = '#000000'
    } // TODO fix this with new util function hexToRgb
    if (typeGuardReducerState(styleState)) {
      dispatch({ type: 'STATE_FROM_STORAGE', payload: styleState })
      setStorageRetrieved(true)
    }
    setFirstRender(false)
  }, [])

  useEffect(() => {
    if (!firstRender) {
      dispatch({ type: 'CHANGE_COLOR', payload: getCssVariableValue('--bg1') })
    }
  }, [dispatch, themeContext.context])

  useEffect(() => {
    const parentEl = [].slice.call(document.getElementById('typography-font')?.children)
    parentEl.forEach((child: HTMLOptionElement) => {
      child.style.fontFamily = child.value
    })
    const selectNodes = [].slice.call(document.getElementById('typography-scale')?.children)
    if (selectNodes && state.scale != initialState.scale) {
      selectNodes.forEach((option: HTMLOptionElement) => {
        if (Number(option.value) !== state.scale) {
          option.selected = false
        } else {
          option.selected = true
        }
      })
    } else {
      const defaultNode = selectNodes.find(
        (defaultOption: HTMLOptionElement) => Number(defaultOption.value) === initialState.scale
      )
      if (defaultNode) {
        ;(defaultNode as HTMLOptionElement).selected = true
      }
    }
  }, [storageRetrieved])

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
                  min="5"
                  max="20"
                  step="0.5"
                  name="typography-size"
                  onChange={(e) =>
                    dispatch({
                      type: 'CHANGE_SIZE',
                      payload: Number(e.target.value)
                    })
                  }
                  value={state.size}
                />
              </div>
              <div>
                <select
                  name="typography-font"
                  id="typography-font"
                  onChange={(e) => dispatch({ type: 'CHANGE_FONT', payload: e.target.value })}
                  value={state.font}
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
                  min="-4"
                  max="15"
                  name="typography-spacing"
                  id="typography-spacing"
                  value={state.spacing}
                  onChange={(e) =>
                    dispatch({
                      type: 'CHANGE_SPACING',
                      payload: Number(e.target.value)
                    })
                  }
                />
              </div>
              <div>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="5"
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
                  value={String(state.weight)}
                  onChange={(e) =>
                    dispatch({
                      type: 'CHANGE_WEIGHT',
                      payload: Boolean(e.target.value)
                    })
                  }
                >
                  <option value="false">Disabled</option>
                  <option value="true">Enabled</option>
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
