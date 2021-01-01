import React from 'react'
import './style.css'

function Index({ lineArr, lineDisplay, otherLines, highLight }) {
  return (
    <div>
      <svg style={{ display: `${lineDisplay.display}` }}>
        {lineArr.map((line, index) => (
          <line className={`${otherLines} ${highLight[line.start]} ${highLight[line.end]}end`}
            key={index} x1={line.x0} y1={line.y0} x2={line.x1} y2={line.y1} />
        ))}
      </svg>
    </div>
  )
}

export default Index
