import React from 'react'
import './style.css'

function Index({ handleChange, handleSubmit, input }) {
  return (
    <div>
      <div className='headBar'>
        <div className='logo'>
          <span className=' fas fa-fingerprint' />
        </div>
        {/* <h3>Trace someone by phone number: </h3> */}
        <p>0440-00-</p>
        <input name='name' id='tagInput' placeholder='Trace by phone number... (enter 1~2000)' onChange={handleChange} />
        <select name='days' onChange={handleChange} >
          <option name='14' value={input.value} >14</option>
          <option name='13' value={input.value}>13</option>
          <option name='12' value={input.value}>12</option>
          <option name='11' value={input.value}>11</option>
          <option name='10' value={input.value}>10</option>
          <option name='9' value={input.value}>9</option>
          <option name='8' value={input.value}>8</option>
          <option name='7' value={input.value}>7</option>
          <option name='6' value={input.value}>6</option>
          <option name='5' value={input.value}>5</option>
          <option name='4' value={input.value}>4</option>
          <option name='3' value={input.value}>3</option>
          <option name='2' value={input.value}>2</option>
          <option name='1' value={input.value}>1</option>
        </select>
        <p>days since exposure</p>
        <button id='search' onClick={handleSubmit}><span className='fas fa-search' /> </button>
        <h3>or </h3>
        {/* <button id='tag'><span className='fas fa-user-tag'></span>Tag Someone </button>
        <h3>or </h3> */}
        <button id='random' onClick={handleSubmit} ><span className='fas fa-random' /> Random</button>
      </div>
    </div>

  )
}

export default Index
