import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../Store/store'
import './Stylesheet.scss'
import { textSizeLabels } from './constants'
import props from './types'

function Stylesheet({ active }: props) {
  const [styleType, setStyleType] = useState<string>('css')
  const styles = useSelector((state: RootState) => state.styles)

  // Do we need memoization? probably not but...
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { size, scale, spacing, height, weight, font, color, ...rest } = useMemo(
    () => ({
      ...styles
    }),
    [styles]
  )

  function renderFonts() {
    const prefix = styleType === 'css' ? '--' : '$'
    return (
      <>
        {textSizeLabels.map((label, index) => {
          return (
            <div key={index}><span>{prefix}{label}</span></div>
          )
        })}
      </>
    )
  }

  return (
    <>
      {active && (
        <section className="stylesheet-modal">
          <div className="modal-body">
            {JSON.stringify(styles)}
            {renderFonts()}
            <span>font-family: {font}</span>
            <span>font-weight: {weight}</span>
            <span>line-height: {height}</span>
            <span>color: {color}</span>
          </div>
        </section>
      )}
    </>
  )
}

export default Stylesheet
