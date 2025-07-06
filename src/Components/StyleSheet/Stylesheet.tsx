import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../Store/store'
import './Stylesheet.scss'
import props from './types'

function Stylesheet({ active }: props) {
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
        <h1>{size}</h1>
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
          </div>
        </section>
      )}
    </>
  )
}

export default Stylesheet
