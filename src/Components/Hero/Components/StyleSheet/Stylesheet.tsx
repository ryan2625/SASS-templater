import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../Store/store'
import './Stylesheet.scss'
import { textSizeLabels } from './constants'
import props from './types'

function Stylesheet({ active }: props) {
  const [styleType, setStyleType] = useState<string>('--')
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
    return (
      <>
        {textSizeLabels.map((label, index) => {
          return (
            <div key={index}><span>{styleType}{label}</span></div>
          )
        })}
      </>
    )
  }

  function renderClasses() {
    const accessType = styleType === '--' ? 'var(--' : '$'
    return (
      <>
        {textSizeLabels.map((label, index) => {
          return (
            <div key={index}><span>.{label} &#123; font-size: {accessType}
              {label}{accessType === '$' ? '' : ')'};&#125;</span></div>
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
            <span>h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 &#123;</span>
            <span>small &#123;</span>
            <span>h6, .h6 &#123;</span>
            <span>h5, .h5 &#123;</span>
            <span>h4, .h4 &#123;</span>
            <span>h3, .h3 &#123;</span>
            <span>h2, .h2 &#123;</span>
            <span>h1, .h1 &#123;</span>
            {renderClasses()}
          </div>
        </section>
      )}
    </>
  )
}

export default Stylesheet
