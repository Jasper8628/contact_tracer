import React from 'react'
import './style.css'

function Index({ x, y, num, handleHover, color }) {
  return (
    <div
      className='shop'
      style={{ background: `${color}`, top: `${y}px`, left: `${x}px` }}
      name={num}
      onClick={handleHover} >

    </div>

  )
}

export default Index
