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
        console.log(res.data)
        const arr = res.data.closeContact
        const arr2 = res.data.secondContact
        const arrShops = res.data.primaryShops
        const arrShops2 = res.data.secondaryShops
        const primeContact = res.data.primaryContacts;
        const color = colors
        const shopCol = shopColor
        const lineZero = zero;
        const lineClose = closeContacts;
        const lineShop = secondShops;
        const lineSecond = secondContacts;

        primeContact.forEach((element, index) => {
          const shop = document.getElementById(element.phoneNumber);
          const { right, left, top, bottom } = shop.getBoundingClientRect()
          const x0 = (right + left) / 2
          const y0 = (top + bottom) / 2
          element.customersToTag.forEach((customer, i) => {
            console.log('logging customer: ', customer)
            const xy = document.getElementById(customer);
            const { bottom, top, right, left } = xy.getBoundingClientRect();
            const x1 = (right + left) / 2;
            const y1 = (bottom + top) / 2;
            if (customer === name) {
              lineZero.push({ x0: x1, y0: y1, x1: x0, y1: y0 })
              setZero(lineZero);
            } else {
              lineClose.push({ x0, y0, x1, y1 })
              setClose(lineClose)
            }
          })
          shopCol[element.phoneNumber] = shopRed;
        });

        arrShops2.forEach((element, index) => {
          const shop = document.getElementById(element.phoneNumber);
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
        setColor(color)
        setShopColor(shopCol)
      })
  }
  const test = (e) => {
    const name = e.target.getAttribute('id')
    console.log('logging id: ', name)
    const subject = document.getElementById(name);
    const x = subject.getBoundingClientRect().x
    const y = subject.getBoundingClientRect().y
    // console.log('shop number: ', name, 'position: ', x, ' ', y)
    // console.log(shopColor)
  }
  const [lineDisplay, setLineDisplay] = useState({
    display: 'block',
    text: 'Clear Line'
  })
  const clearLine = () => {
    if (lineDisplay.display !== 'none') {
      setLineDisplay({
        display: 'none',
        text: 'Show Line'
      })
    } else {
      setLineDisplay({
        display: 'block',
        text: 'Clear Line'
      })
    }

  }
  const firstshops = () => {

  }
  return (
    <div>
      <svg style={{ display: `${lineDisplay.display}` }}>
        {zero.map((line, index) => (
          <line key={index} onAnimationEnd={firstshops} x1={line.x0} y1={line.y0} x2={line.x1} y2={line.y1} style={{ stroke: 'rgb(255,0,0)', strokeWidth: '1px' }} />
        ))}
        {closeContacts.map((line, index) => (
          <line key={index} x1={line.x0} y1={line.y0} x2={line.x1} y2={line.y1} style={{ stroke: 'rgb(255,0,0)', strokeWidth: '1px' }} />
        ))}
        {/* {contactLines.map((line, index) => (
          <line key={index} x1={line.x0} y1={line.y0} x2={line.x1} y2={line.y1} style={{ stroke: 'rgb(255,0,0)', strokeWidth: '1px' }} />
        ))}
        {contactLines.map((line, index) => (
          <line key={index} x1={line.x0} y1={line.y0} x2={line.x1} y2={line.y1} style={{ stroke: 'rgb(255,0,0)', strokeWidth: '1px' }} />
        ))} */}
      </svg>
      <div className='container' >
        {positions.map((position, index) => (
          <div key={index}
            className={colors[position.num] || 'normal'}
            style={{ top: `${position.y}px`, left: `${position.x}px` }}
            name={position.num}
            id={position.num}
            // onMouseOver={test}
            onClick={handleClick} >
          </div>
        ))}
        {shops.map((shop, index) => (
          <div key={index} className={shopColor[shop.num] || 'shop'}
            id={shop.num}
            style={{ top: `${shop.y}px`, left: `${shop.x}px` }}
            // onMouseOver={test}
            name={shop.num}
          >
            <span name={shop.num} className={shop.icon}> </span>

          </div>
        ))}
        {/* <div className='shop' style={{ background: 'green', top: '0', left: '0' }}></div> */}
        <button id='reset' onClick={reset} >Reset </button>
        <button id='clearLine' onClick={clearLine} >{lineDisplay.text}</button>
      </div>

    </div>

  )
}

export default Index
