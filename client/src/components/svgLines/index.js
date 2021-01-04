import React from 'react'
import './style.css'

function Index({ lineArr, lineDisplay, otherLines, highLight }) {
  return (
    <div>
      <svg style={{ display: `${lineDisplay.display}` }}>
        {lineArr.map((line, index) => (
          <g>
            <line className={`${otherLines} ${highLight[line.start]} ${highLight[line.end]}end`}
              key={index} x1={line.x0} y1={line.y0} x2={line.x1} y2={line.y1} ></line>
            <text className={`${highLight[line.end]}linetext`} x={line.x0} y={line.y0 - 20} >{line.startName}</text>
            <text className={`${highLight[line.start]}linetext`} x={line.x1} y={line.y1 - 20} >{line.endName}</text>

          </g>

        ))}
      </svg>
    </div>
  )
}

export default Index
