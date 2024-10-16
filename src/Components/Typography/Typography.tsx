import React from 'react'
import "./Typography.scss"
import useTypographyReducer from '../../Hooks/typographyReducer'
import { SizeDictionary } from '../../Hooks/typographyReducer'

function Typography() {

  const [state, dispatch] = useTypographyReducer()

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
          <h2>Styles</h2>
          <div className="config-columns">
            <div>
              <label htmlFor="">Font Size</label>
              <label htmlFor="">Scale</label>
              <label htmlFor="">Letter Spacing</label>
              <label htmlFor="">Line Height</label>
              <label htmlFor="">Color</label>
            </div>
            <div>
              <div>
                <input type='number' step="0.5" name="font_size" />
              </div>
              <div>
                <select name="scale" onChange={(e) => dispatch({ type: "CHANGE_SCALE", payload: Number(e.target.value) })}>
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
                <input type="number" step="0.02" name="letter_spacing" />
              </div>
              <div>
                <input type='number' step="0.05" name="font_size" />
              </div>
              <div>
                color
              </div>
            </div>
          </div>
        </div>
        <div className="template-stage">
          <div>Absolutely positioned px/rem label</div>
          <div>
            {
              sizes && sizes.reverse().map((tag, key) => {
                return (
                  <div>
                    <div>{tag}</div>
                    <div>{calcVal(key, state.size)}</div>
                    <div>Woven silk pyjamas exchanged for blue quartz gems</div>
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