import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './style.css'
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
  const [highLight, setHighLight] = useState({})
  const [lineDisplay, setLineDisplay] = useState({
    display: 'block',
    text: 'Clear Lines'
  })
  const [otherLines, setOtherlins] = useState({
    line1: 'line1', line2: 'line2', line3: 'line3', line4: 'line4', toggle: false, text: 'toggle', currentLines: {}
  })

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    const people = []
    const shopArr = []
    for (let i = 0; i < 2000; i++) {
      const num = '0' + (500000000 + i);
      const x = Math.random() * 55 + 2
      const y = Math.random() * 55 + 5
      people.push({ x, y, num })
    }
    for (let i = 0; i < 100; i++) {
      const num = '0' + (900000000 + i);
      const x = Math.random() * 55 + 2
      const y = Math.random() * 55 + 5
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
      numdays: 14
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
              lineZero.push({ x0: x1, y0: y1, x1: x0, y1: y0, start: customer, end: element.phoneNumber })
              setZero(lineZero);
            } else {
              lineClose.push({ x0, y0, x1, y1, start: element.phoneNumber, end: customer })
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
                lineShop.push({ x0: x1, y0: y1, x1: x0, y1: y0, start: customer, end: element.phoneNumber })
                setSecShop(lineShop);
              }
            } else if (customer !== name) {
              lineSecond.push({ x0, y0, x1, y1, start: element.phoneNumber, end: customer })
              setSecCont(lineSecond)
            }
          })
          if (shopCol[element.phoneNumber] !== shopRed) {
            shopCol[element.phoneNumber] = shopYellow
          }
        });
        if (arr.length) {
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
        } else { color[name] = primary }
        setShopColor(shopCol)
        setColor(color)
      })
  }
  const handleVis = (e) => {
    const name = e.target.getAttribute('name')
    console.log(name)
    if (otherLines[name] === name) {
      setOtherlins({
        ...otherLines,
        [name]: ''
      })
    } else {
      setOtherlins({
        ...otherLines,
        [name]: name
      })
    }
  }
  const handleHover = (e) => {
    const name = e.target.getAttribute('name');
    if (otherLines.toggle && checkNode(name)) {
      const currentLines = otherLines
      setOtherlins({
        ...otherLines,
        line1: otherLines.line1 === 'line1' ? 'line1dim' : '',
        line2: otherLines.line2 === 'line2' ? 'line2dim' : '',
        line3: otherLines.line3 === 'line3' ? 'line3dim' : '',
        line4: otherLines.line4 === 'line4' ? 'line4dim' : '',
        currentLines
      })
      const lineArr = highLight;
      lineArr[name] = 'highLight'
      setHighLight(lineArr)
    }
  }
  const handleLeave = (e) => {
    const name = e.target.getAttribute('name');
    if (otherLines.toggle && checkNode(name)) {
      const currentLines = otherLines.currentLines
      setOtherlins(currentLines)
      const lineArr = highLight;
      lineArr[name] = ''
      setHighLight(lineArr)
    }
  }
  const handleToggle = () => {
    if (!otherLines.toggle) {
      setOtherlins({
        ...otherLines,
        toggle: true,
        text: 'toggled'
      })
    } else {
      setOtherlins({
        ...otherLines,
        toggle: false,
        text: 'toggle'
      })
    }
  }
  const checkNode = (id) => {
    if (document.getElementById(id).classList.length > 1) {
      return true
    } else { return false }
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
      <svg style={{ display: `${lineDisplay.display}` }}>
        {zero.map((line, index) => (
          <line className={`${otherLines.line1} ${highLight[line.start]} ${highLight[line.end]}end`}
            key={index} x1={line.x0} y1={line.y0} x2={line.x1} y2={line.y1} />
        ))}
      </svg>
      <svg style={{ display: `${lineDisplay.display}` }}>
        {closeContacts.map((line, index) => (
          <line className={`${otherLines.line2} ${highLight[line.start]} ${highLight[line.end]}end`}
            key={index} x1={line.x0} y1={line.y0} x2={line.x1} y2={line.y1} />
        ))}
      </svg>
      <svg style={{ display: `${lineDisplay.display}` }}>
        {secondShops.map((line, index) => (
          <line className={`${otherLines.line3} ${highLight[line.start]} ${highLight[line.end]}end`}
            key={index} x1={line.x0} y1={line.y0} x2={line.x1} y2={line.y1} />
        ))}
      </svg>
      <svg style={{ display: `${lineDisplay.display}` }}>
        {secondContacts.map((line, index) => (
          <line className={`${otherLines.line4} ${highLight[line.start]} ${highLight[line.end]}end`}
            key={index} x1={line.x0} y1={line.y0} x2={line.x1} y2={line.y1} />
        ))}</svg>
      <div className='container' >
        {positions.map((position, index) => (
          <div key={index}
            className={colors[position.num] || 'normal'}
            style={{ top: `${position.y}vh`, left: `${position.x}vw` }}
            name={position.num}
            id={position.num}
            onClick={handleClick}
            onMouseOver={handleHover}
            onMouseOut={handleLeave} >
          </div>
        ))}
        {shops.map((shop, index) => (
          <div key={index} className={shopColor[shop.num] || 'shop'}
            id={shop.num}
            style={{ top: `${shop.y}vh`, left: `${shop.x}vw` }}
            name={shop.num}
            onMouseOver={handleHover}
            onMouseOut={handleLeave}
          >
            <span name={shop.num} className={shop.icon}> </span>
          </div>
        ))}
        <div className='buttonContainer'>
          <button name='line1' onClick={handleVis} >1st</button>
          <button name='line2' onClick={handleVis} >2nd</button>
          <button name='line3' onClick={handleVis} >3rd</button>
          <button name='line4' onClick={handleVis} >4th</button>
          <button name='toggle-highlight' onClick={handleToggle} >{otherLines.text} </button>
        </div>
        <button id='reset' onClick={reset} >Reset </button>
        <button id='clearLine' onClick={clearLine} >{lineDisplay.text}</button>
      </div>
    </div>
  )
}

export default Index
