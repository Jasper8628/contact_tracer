import React from 'react'
import './style.css'

function Index({ onclick }) {
  return (
    <div>
      <button id='reset' onClick={onclick} >Reset </button>
    </div>

  )
}

export default Index
