import React from 'react'
import props from './types'

function Stylesheet({ active }: props) {
  return (
    <>
      {active &&
        <div>Stylesheet</div>
      }
    </>
  )
}

export default Stylesheet
