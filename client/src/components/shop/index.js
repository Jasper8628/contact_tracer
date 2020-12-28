import React from 'react'
import './style.css'

function Index({ x, y, num, handleHover, color, className }) {
  return (
    <div
      className={className || 'normal'}
      style={{ color: `${color}`, top: `${y}px`, left: `${x}px` }}
      name={num}
      onClick={handleHover} >

    </div>

  )
}

export default Index
