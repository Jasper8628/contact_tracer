import React from 'react'
import './style.css'
function Index({ guide }) {
  return (
    <div>
      <div className={`guide guideHover ${guide.guideHover.display}`}
        style={{
          top: `${guide.guideHover.y - 100}px`,
          left: `${guide.guideHover.x - 10}px`
        }} >
        <h2>Hover to inspect</h2>
        <span className='far fa-hand-point-down' />
      </div>
      <div className='guide guideClick' style={{ display: `${guide.guideClick.display}` }} >
        <h2>Click a small circle to start</h2>
        <span className='far fa-hand-point-down' />
      </div>
      <div style={{ display: `${guide.guideSpin.display}` }} className='guide guideSpin' ><span className='fas fa-spinner' /> </div>
    </div>
  )
}

export default Index