import { useContext, useEffect, useState, useRef, useMemo } from 'react'
import { ThemeContext } from '../../Contexts/ThemeContext'
import useTypographyReducer from '../../Hooks/useTypographyReducer'
import { getCssVariableValue } from '../../Utils/generalUtils'
import { initialState, TypographyReducerState } from '../../Utils/typographyTypesUtils'
import { fonts, labels, scales, sizes } from './constants'
import { Styles } from './types'
import './Typography.scss'
import { calcVal, typeGuardReducerState, typeGuardTheme, colorThemeMismatch } from './utils'
import { Themes } from '../../Contexts/ThemeContext'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Store/store'
import { stateFromReducer } from '../../Store/Slices/stylesSlice'

// TODO : Fix with react hooks memo, callback ETC then do the same for the HERO component

function Typography() {
  const reduxDispatch = useDispatch()
  const themeContext = useContext(ThemeContext)
  const stylesObject = useSelector((state: RootState) => state.styles);
  const [scaleFromStorage, setScaleFromStorage] = useState<number>(1.250)
  const [state, dispatch] = useTypographyReducer()
  const [units, setUnits] = useState<string>('px')
  const [isPastInitialRender, setIsPastInitialRender] = useState(false);
  const initialRenderPhaseComplete = useRef(false);
  const typographyFontRef = useRef<HTMLSelectElement>(null);
  const typographyScaleRef = useRef<HTMLSelectElement>(null);

  const { color, height, spacing, font, weight, scale, size } = stylesObject;


  const styles: Styles = {
    color: color,
    lineHeight: height,
    letterSpacing: spacing,
    fontFamily: font
  }

  const fontsMap = useMemo(() =>
    fonts.map((fontOption) => (
      <option key={fontOption.displayName} value={fontOption.value}>
        {fontOption.displayName}
      </option>
    )),
    [fonts]
  );

  useEffect(() => {
    if (isPastInitialRender) {
      dispatch({ type: 'CHANGE_COLOR', payload: getCssVariableValue('--bg1') })
    }
  }, [dispatch, themeContext.context])

  useEffect(() => {
    const themeState: Themes = JSON.parse(localStorage.getItem('theme') || '"dark"')
    if (typeGuardTheme(themeState)) {
      themeContext.setTheme(themeState)
    }
    const styleState: TypographyReducerState = JSON.parse(localStorage.getItem('styleState') || `${JSON.stringify(initialState)}`)
    if (typeGuardReducerState(styleState)) {
      const validatedStyles = colorThemeMismatch(themeState, styleState)
      dispatch({ type: 'STATE_FROM_STORAGE', payload: validatedStyles })
      setScaleFromStorage(validatedStyles.scale)
    }
  }, [])

  useEffect(() => {
    if (isPastInitialRender) {
      if (typographyFontRef.current) {
        Array.from(typographyFontRef.current.children).forEach((child) => {
          (child as HTMLOptionElement).style.fontFamily = (child as HTMLOptionElement).value;
        });
      }

      if (typographyScaleRef.current) {
        const selectNodes = Array.from(typographyScaleRef.current.children);
        if (selectNodes && scaleFromStorage != initialState.scale) {
          selectNodes.forEach((option) => {
            (option as HTMLOptionElement).selected =
              Number((option as HTMLOptionElement).value) === scaleFromStorage;
          });
        } else {
          const defaultNode = selectNodes.find((defaultOption) =>
            Number((defaultOption as HTMLOptionElement).value) === initialState.scale
          );
          if (defaultNode) {
            (defaultNode as HTMLOptionElement).selected = true;
          }
        }
      }
    }
  }, [isPastInitialRender, scaleFromStorage])

  useEffect(() => {
    if (!initialRenderPhaseComplete.current) {
      initialRenderPhaseComplete.current = true;
      requestAnimationFrame(async () => {
        await new Promise(resolve => setTimeout(resolve, 125))
        setIsPastInitialRender(true);
      });
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    const { otherStyles, ...rest } = stylesObject;
    if (JSON.stringify(state) !== JSON.stringify(rest))
      // Added redux in later versions. Used to keep context and redux in sync.
      reduxDispatch(stateFromReducer(state))
  }, [state])


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
                  aria-label="Typography size"
                  onChange={(e) =>
                    dispatch({
                      type: 'CHANGE_SIZE',
                      payload: Number(e.target.value)
                    })
                  }
                  value={size}
                />
              </div>
              <div>
                <select
                  ref={typographyFontRef}
                  name="typography-font"
                  id="typography-font"
                  aria-label="Typography font size"
                  onChange={(e) => dispatch({ type: 'CHANGE_FONT', payload: e.target.value })}
                  value={font}
                >
                  {fonts && fontsMap}
                </select>
              </div>
              <div>
                <input
                  type="color"
                  name="typography-color"
                  id="typography-color"
                  aria-label="Typography color"
                  data-pseudo-field="body-color"
                  colorpick-eyedropper-active="true"
                  data-gtm-form-interact-field-id="0"
                  value={color}
                  onChange={(e) => dispatch({ type: 'CHANGE_COLOR', payload: e.target.value })}
                />
              </div>
              <div>
                <select
                  ref={typographyScaleRef}
                  id="typography-scale"
                  name="typography-scale"
                  aria-label="Typography scale"
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
                  aria-label="Typography letter spacing"
                  value={spacing}
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
                  aria-label="Typography line height"
                  value={height}
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
                  aria-label="Typography font weight"
                  value={String(weight)}
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
          <div data-testid="font-preview-container">
            {sizes &&
              sizes.map((tag, key) => {
                const parseScale = parseFloat(calcVal(key, size, scale, sizes).toFixed(1))
                return (
                  <div className="template-scale-preview" key={key}>
                    <div
                      style={{
                        fontSize: '15px',
                        lineHeight: height,
                        letterSpacing: '2px',
                        color: getCssVariableValue('--inverse-txt1')
                      }}
                    >
                      {tag}
                    </div>
                    <div
                      style={{
                        fontSize: '15px',
                        lineHeight: height,
                        letterSpacing: '2px'
                      }}
                    >
                      {(units === 'px' ? parseScale : ((parseScale * 1) / 16).toFixed(1)) + units}
                    </div>
                    <div
                      style={{
                        ...styles,
                        fontSize: parseScale,
                        fontWeight: weight === true ? (sizes.length - key + 1) * 100 : 400
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