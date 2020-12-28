
import './App.css';
import React, { useEffect, useState } from 'react';
import Shop from './components/shop';
import Menu from './components/menu';
import axios from 'axios';
function App() {
  const [positions, setPosition] = useState([]);
  const [colors, setColor] = useState({});
  useEffect(() => {
    const temp = []
    for (let i = 0; i < 2000; i++) {
      const num = '0' + (500000000 + i);
      const x = Math.ceil(Math.random() * 1200 + 200)
      const y = Math.ceil(Math.random() * 800 + 200)
      temp.push({ x, y, num })
    }
    setPosition(temp)
  }, [])
  const reset = () => {
    setColor({});
    axios.get('/api').then(res => console.log(res));
  }
  const handleHover = (e) => {
    const name = e.target.getAttribute('name');
    console.log(name)
    const data = {
      phoneNumber: name,
      numdays: 14,
      isSecRound: true,
      message: 'hello'
    }
    axios.post('/api', data)
      .then(res => {
        console.log(res.data)
        const arr = res.data.closeContact
        const arr2 = res.data.secondContact
        const color = {}
        arr.forEach(element => {
          color[element] = 'red'
        });
        arr2.forEach(element => {
          if (color[element] !== 'red') {
            color[element] = 'yellow'
          }
        });
        setColor(color)
      })
  }
  return (
    <div >
      <Menu onclick={reset} />

      {/* <svg>  */}
      {positions.map((position, index) => (
        <Shop
          color={colors[position.num] || 'green'}
          key={index}
          x={position.x}
          y={position.y}
          num={position.num}
          handleHover={handleHover} />

        // <button style={{ top: `${position.y}px`, left: `${position.x}px` }} onClick={handleHover} ></button>

        // <circle onMouseOver={handleHover} key={index} name={position.num} cx={position.x} cy={position.y} r="5" stroke="green" strokeWidth="3" fill="green" />

      ))}
      {/* </svg> */}
    </div>
  );
}

export default App;
