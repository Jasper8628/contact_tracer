import React from 'react'
import './style.css'

function Index({ handleVis, checkbox, highlightSwitch, handleSwitch, clearLine, lineDisplay, reset }) {
  return (
    <div className='buttonContainer'>
      <button name='line1' onClick={handleVis}><span className={`${checkbox['line1']} checkFont`} /><span className='lineLeg redLineThick' /> </button>
      <button name='line2' onClick={handleVis}><span className={`${checkbox['line2']} checkFont`} /><span className='lineLeg redLineThin' /> </button>
      <button name='line3' onClick={handleVis}><span className={`${checkbox['line3']} checkFont`} /><span className='lineLeg yellowLineThick' /> </button>
      <button name='line4' onClick={handleVis}><span className={`${checkbox['line4']} checkFont`} /><span className='lineLeg yellowLineThin' /> </button>
      <button name='toggle-highlight' onClick={handleSwitch}><span className={`${highlightSwitch.text} checkFont`} />Hover to highlight </button>
      <button id='reset' onClick={reset} > <span className='fas fa-power-off'></span> Reset </button>
      <button id='clearLine' onClick={clearLine} ><span className={lineDisplay.fa}></span> {lineDisplay.text}</button>
    </div>
  )
}

export default Index
