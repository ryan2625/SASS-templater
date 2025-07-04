import React from 'react'
import props from './types'
import './Stylesheet.scss'

function Stylesheet({ active }: props) {
  return (
    <>
      {active &&
        <section className='stylesheet-modal'>
          ASD
        </section>
      }
    </>
  )
}

export default Stylesheet
