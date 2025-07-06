import React, { useMemo } from 'react'
import props from './types'
import './Stylesheet.scss'
import { RootState } from '../../Store/store'
import { useSelector } from 'react-redux'

function Stylesheet({ active }: props) {
  const styles = useSelector((state: RootState) => state.styles)

  // Do we need memoization? probably not but...
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { size, scale, spacing, height, weight, font, color, ...rest } = useMemo(() => ({
    ...styles
  }), [styles])

  function renderFonts() {
    return (
      <>
        <h1>{size}</h1>
      </>
    )
  }

  return (
    <>
      {active &&
        <section className='stylesheet-modal'>
          <div className="modal-body">{JSON.stringify(styles)}</div>
          {renderFonts()}
        </section>
      }
    </>
  )
}

export default Stylesheet
