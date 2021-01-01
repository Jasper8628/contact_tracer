import React from 'react'
import './style.css'

function Index() {
  return (
    <div>
      <div className='headBar'>
        <div className='logo'>
          <span className=' fas fa-fingerprint' />
        </div>
        {/* <h3>Trace someone by phone number: </h3> */}
        <p>0440-00-</p>
        <input id='tagInput' placeholder='Trace someone by phone number... (enter 1~2000)' />
        <select>
          <option>14</option>
          <option>13</option>
          <option>12</option>
          <option>11</option>
          <option>10</option>
          <option>9</option>
          <option>8</option>
          <option>7</option>
          <option>6</option>
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
        <p>days since exposure</p>
        <button id='search'><span className='fas fa-search'></span> </button>
        <h3>or </h3>
        {/* <button id='tag'><span className='fas fa-user-tag'></span>Tag Someone </button>
        <h3>or </h3> */}
        <button id='random' ><span className='fas fa-random'></span> Random</button>
      </div>
    </div>

  )
}

export default Index
