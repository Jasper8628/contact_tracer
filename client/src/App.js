
import './App.css';
import React, { useEffect, useState } from 'react';
import Sqaures from './components/squares'
import customers from './utils/customers';
import shops from './utils/shops';

function App() {
  const [positions, setPosition] = useState([]);
  useEffect(() => {
    const temp = []
    for (let i = 0; i < shops.length; i++) {
      const x = Math.ceil(Math.random() * 1600 + 5)
      const y = Math.ceil(Math.random() * 800 + 5)
      temp.push({ x, y })
    }
    setPosition(temp)
  }, [])
  const handleHover = () => {
    console.log('hover')
  }
  return (
    <div className="container">
      <svg>
        {positions.map((position, index) => (

          // <button style={{ top: `${position.y}px`, left: `${position.x}px` }} onClick={handleHover} ></button>

          <circle onMouseOver={handleHover} key={index} cx={position.x} cy={position.y} r="5" stroke="green" stroke-width="3" fill="green" />

        ))}
      </svg>
    </div>
  );
}

export default App;
