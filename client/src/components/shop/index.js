import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios';
const red = 'red normal'
const yellow = 'yellow normal';
const primary = 'primary normal'
const shopRed = 'red shop'
const shopYellow = 'yellow shop'
const icons = ['fas fa-utensils', 'fas fa-cocktail', 'fas fa-coffee', 'fas fa-shopping-cart', 'fas fa-swimmer', 'fas fa-bus-alt', 'far fa-building', 'fas fa-stethoscope']

function Index() {
  const [positions, setPosition] = useState([]);
  const [shops, setShop] = useState([]);
  const [colors, setColor] = useState({});
  const [shopColor, setShopColor] = useState({});
  const [zero, setZero] = useState([]);
  const [closeContacts, setClose] = useState([]);
  const [secondShops, setSecShop] = useState([]);
  const [secondContacts, setSecCont] = useState([]);
  const [vis, setVis] = useState({})
  const [lineDisplay, setLineDisplay] = useState({
    display: 'block',
    text: 'Clear Lines'
  })
  useEffect(() => {
    init()
  }, [])
  const init = () => {
    const people = []
    const shopArr = []
    for (let i = 0; i < 2000; i++) {
      const num = '0' + (500000000 + i);
      const x = Math.ceil(Math.random() * 1450 + 30)
      const y = Math.ceil(Math.random() * 800 + 30)
      people.push({ x, y, num })
    }
    for (let i = 0; i < 100; i++) {
      const num = '0' + (900000000 + i);
      const x = Math.ceil(Math.random() * 1450 + 20)
      const y = Math.ceil(Math.random() * 800 + 20)
      shopArr.push({ x, y, num, icon: genRandom(icons) })
    }
    setShop(shopArr)
    setPosition(people)
  }
  const genRandom = (array) => {
    const ranNum = Math.floor(Math.random() * array.length);
    return array[ranNum]
  }

  const reset = () => {
    const arr = document.getElementsByClassName('shop');
    console.log(arr.length)
    for (let i = 0; i < arr.length; i++) {
      arr[i].classList.remove('red', 'yellow', 'primary')
    }
    setZero([])
    setClose([])
    setSecShop([])
    setSecCont([])
    setShopColor({})
    setColor({});
    axios.get('/api').then(res => console.log(res));
  }
  const genXY = (id) => {
    const { right, left, top, bottom } = document.getElementById(id).getBoundingClientRect();
    return [(right + left) / 2, (top + bottom) / 2]
  }

  const handleClick = (e) => {
    const name = e.target.getAttribute('name');
    setColor({
      ...colors,
      [name]: primary
    })
    const data = {
      phoneNumber: name,
      numdays: 14,
      isSecRound: true,
      message: 'hello'
    }
    axios.post('/api', data)
      .then(res => {
        const arr = res.data.closeContacts
        const arr2 = res.data.secondContacts
        const primeContact = res.data.primaryContacts;
        const finalContact = res.data.finalContacts;
        const color = colors
        const shopCol = shopColor
        const lineZero = zero;
        const lineClose = closeContacts;
        const lineShop = secondShops;
        const lineSecond = secondContacts;
        const tempCustomerArr = [];
        const tempShopArr = []

        primeContact.forEach((element) => {
          tempShopArr.push(element.phoneNumber)
          const [x0, y0] = genXY(element.phoneNumber)
          element.customersToTag.forEach((customer) => {
            const [x1, y1] = genXY(customer)
            if (customer === name) {
              lineZero.push({ x0: x1, y0: y1, x1: x0, y1: y0 })
              setZero(lineZero);
            } else {
              lineClose.push({ x0, y0, x1, y1 })
              tempCustomerArr.push(customer)
              setClose(lineClose)
            }
          })
          shopCol[element.phoneNumber] = shopRed;
        });

        finalContact.forEach((element) => {
          const shopNum = element.phoneNumber
          const [x0, y0] = genXY(shopNum)
          element.customersToTag.forEach((customer) => {
            const [x1, y1] = genXY(customer)
            if (tempCustomerArr.indexOf(customer) !== -1) {
              if (tempShopArr.indexOf(shopNum) === -1) {
                lineShop.push({ x0: x1, y0: y1, x1: x0, y1: y0 })
                setSecShop(lineShop);
              }
            } else if (customer !== name) {
              lineSecond.push({ x0, y0, x1, y1 })
              setSecCont(lineSecond)
            }
          })
          if (shopCol[element.phoneNumber] !== shopRed) {
            shopCol[element.phoneNumber] = shopYellow
          }
        });
        arr.forEach(element => {
          if (element === name) {
            color[element] = primary
          } else if (color[element] !== primary) {
            color[element] = red
          }
        });
        arr2.forEach(element => {
          if (color[element] !== red && color[element] !== primary) {
            color[element] = yellow
          }
        });
        setShopColor(shopCol)
        setColor(color)
      })
  }
  const handleVis = (e) => {
    const name = e.target.getAttribute('name')
    if (vis[name] !== 'hidden') {
      setVis({
        ...vis,
        [name]: 'hidden'
      })
    } else {
      setVis({
        ...vis,
        [name]: 'visible'
      })
    }
  }
  const clearLine = () => {
    if (lineDisplay.display !== 'none') {
      setLineDisplay({
        display: 'none',
        text: 'Show Lines'
      })
    } else {
      setLineDisplay({
        display: 'block',
        text: 'Clear Lines'
      })
    }
  }
  return (
    <div>
      <svg style={{ display: `${lineDisplay.display}`, visibility: `${vis['1st']}` }}>
        {zero.map((line, index) => (
          <line className='line1' key={index} x1={line.x0} y1={line.y0} x2={line.x1} y2={line.y1} />
        ))}
      </svg>
      <svg style={{ display: `${lineDisplay.display}`, visibility: `${vis['2nd']}` }}>
        {closeContacts.map((line, index) => (
          <line className='line2' key={index} x1={line.x0} y1={line.y0} x2={line.x1} y2={line.y1} />
        ))}
      </svg>
      <svg style={{ display: `${lineDisplay.display}`, visibility: `${vis['3rd']}` }}>
        {secondShops.map((line, index) => (
          <line className='line3' key={index} x1={line.x0} y1={line.y0} x2={line.x1} y2={line.y1} />
        ))}
      </svg>
      <svg style={{ display: `${lineDisplay.display}`, visibility: `${vis['4th']}` }}>
        {secondContacts.map((line, index) => (
          <line className='line4' key={index} x1={line.x0} y1={line.y0} x2={line.x1} y2={line.y1} />
        ))}</svg>
      <div className='container' >
        {positions.map((position, index) => (
          <div key={index}
            className={colors[position.num] || 'normal'}
            style={{ top: `${position.y}px`, left: `${position.x}px` }}
            name={position.num}
            id={position.num}
            onClick={handleClick} >
          </div>
        ))}
        {shops.map((shop, index) => (
          <div key={index} className={shopColor[shop.num] || 'shop'}
            id={shop.num}
            style={{ top: `${shop.y}px`, left: `${shop.x}px` }}
            name={shop.num}
          >
            <span name={shop.num} className={shop.icon}> </span>
          </div>
        ))}
        <div className='buttonContainer'>
          <button name='1st' onClick={handleVis} >1st</button>
          <button name='2nd' onClick={handleVis} >2nd</button>
          <button name='3rd' onClick={handleVis} >3rd</button>
          <button name='4th' onClick={handleVis} >4th</button>
        </div>
        <button id='reset' onClick={reset} >Reset </button>
        <button id='clearLine' onClick={clearLine} >{lineDisplay.text}</button>
      </div>
    </div>
  )
}

export default Index
