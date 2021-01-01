import React, { useEffect, useState } from 'react';
import SvgLine from '../svgLines';
import HeadBar from '../headBar';
import axios from 'axios';
import './style.css'
const red = 'red normal';
const yToR = 'red normal yToR';
const yellow = 'yellow normal';
const primary = 'primary normal'
const shopRed = 'red shop';
const shopYR = 'red shop yToR';
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
  const [highlightSwitch, setSwitch] = useState({
    status: true,
    text: 'far fa-dot-circle'
  })
  const [lineDisplay, setLineDisplay] = useState({
    display: 'block',
    text: 'Clear Lines',
    fa: 'fas fa-eye-slash'
  })
  const [checkbox, setCheckbox] = useState({
    'line1': 'far fa-dot-circle', 'line2': 'far fa-dot-circle', 'line3': 'far fa-dot-circle', 'line4': 'far fa-dot-circle'
  })
  const [otherLines, setOtherlins] = useState({
    line1: 'line1', line2: 'line2', line3: 'line3', line4: 'line4', toggle: false, text: 'far fa-circle', currentLines: {}
  })

  useEffect(() => {
    init()
  }, [])
  const init = () => {
    const people = []
    const shopArr = []
    for (let i = 0; i < 2000; i++) {
      const num = '0' + (500000000 + i);
      const x = Math.random() * 65 + 2
      const y = Math.random() * 65 + 5
      people.push({ x, y, num })
    }
    for (let i = 0; i < 100; i++) {
      const num = '0' + (900000000 + i);
      const x = Math.random() * 65 + 2
      const y = Math.random() * 65 + 5
      shopArr.push({ x, y, num, icon: genRandom(icons) })
    }
    setShop(shopArr)
    setPosition(people)
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
  const genRandom = (array) => {
    const ranNum = Math.floor(Math.random() * array.length);
    return array[ranNum]
  }
  const genXY = (id) => {
    const { right, left, top, bottom } = document.getElementById(id).getBoundingClientRect();
    return [(right + left) / 2, (top + bottom) / 2]
  }
  const checkNode = (id) => {
    if (document.getElementById(id).classList.length > 1) {
      return true
    } else { return false }
  }

  const handleClick = (e) => {
    const name = e.target.getAttribute('name');
    if (checkNode(name)) {
      const lineArr = highLight;
      lineArr[name] = ''
      // axios.post('/api/info', name)
      // .then(res=>{
      //   console.log('res')
      // })
    }
    setOtherlins({
      line1: 'line1',
      line2: 'line2',
      line3: 'line3',
      line4: 'line4',
      toggle: false,
      text: 'far fa-circle',
      currentLines: {}
    })

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
          if (shopCol[element.phoneNumber] === shopYellow) {
            shopCol[element.phoneNumber] = shopYR;
          } else {
            shopCol[element.phoneNumber] = shopRed;
          }
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
          if (shopCol[element.phoneNumber] !== shopRed && shopCol[element.phoneNumber] !== shopYR) {
            shopCol[element.phoneNumber] = shopYellow
          }
        });
        if (arr.length) {
          arr.forEach(element => {
            if (element === name) {
              color[element] = primary
            } else if (color[element] !== primary) {
              if (color[element] === yellow) {
                color[element] = yToR
              } else { color[element] = red }
            }
          });
          arr2.forEach(element => {
            if (color[element] !== red && color[element] !== primary && color[element] !== yToR) {
              color[element] = yellow
            }
          });
        } else { color[name] = primary }
        setShopColor(shopCol)
        setColor(color)
      })
  }
  const handleHover = (e) => {
    const name = e.target.getAttribute('name');
    if (highlightSwitch.status && otherLines.toggle && checkNode(name)) {
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
    if (highlightSwitch.status) {
      const name = e.target.getAttribute('name');
      if (otherLines.toggle && checkNode(name)) {
        const currentLines = otherLines.currentLines
        setOtherlins(currentLines)
        const lineArr = highLight;
        lineArr[name] = ''
        setHighLight(lineArr)
      } else if (!otherLines.toggle) {
        setOtherlins({
          ...otherLines,
          toggle: true,
          text: 'far fa-dot-circle'
        })
      }
    }
  }
  const clearLine = () => {
    setLineDisplay({
      display: lineDisplay.display !== 'none' ? 'none' : 'block',
      text: lineDisplay.text !== 'Show Lines' ? 'Show Lines' : 'Clear Lines',
      fa: lineDisplay.fa !== 'fas fa-eye' ? 'fas fa-eye' : 'fas fa-eye-slash'
    })
  }
  const handleVis = (e) => {
    const name = e.target.getAttribute('name')
    setOtherlins({
      ...otherLines,
      [name]: otherLines[name] === name ? '' : name
    })
    setCheckbox({
      ...checkbox,
      [name]: checkbox[name] === 'far fa-circle' ? 'far fa-dot-circle' : 'far fa-circle'
    })
  }
  const handleSwitch = () => {
    setSwitch({
      status: highlightSwitch.status ? false : true,
      text: highlightSwitch.text === 'far fa-dot-circle' ? 'far fa-circle' : 'far fa-dot-circle'
    })
  }
  return (
    <div>
      <SvgLine lineArr={zero} lineDisplay={lineDisplay} otherLines={otherLines.line1} highLight={highLight} />
      <SvgLine lineArr={closeContacts} lineDisplay={lineDisplay} otherLines={otherLines.line2} highLight={highLight} />
      <SvgLine lineArr={secondShops} lineDisplay={lineDisplay} otherLines={otherLines.line3} highLight={highLight} />
      <SvgLine lineArr={secondContacts} lineDisplay={lineDisplay} otherLines={otherLines.line4} highLight={highLight} />
      <div className='container' >
        <HeadBar />
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
          <span name='line1' onClick={handleVis} className={`${checkbox['line1']} checkFont`} /><div name='line1' onClick={handleVis} ><span className='redLineThick' /> </div>
          <span name='line2' onClick={handleVis} className={`${checkbox['line2']} checkFont`} /><div name='line2' onClick={handleVis}><span className='redLineThin' /> </div>
          <span name='line3' onClick={handleVis} className={`${checkbox['line3']} checkFont`} /><div name='line3' onClick={handleVis}><span className='yellowLineThick' /> </div>
          <span name='line4' onClick={handleVis} className={`${checkbox['line4']} checkFont`} /><div name='line4' onClick={handleVis}><span className='yellowLineThin' /> </div>
          <span name='toggle-highlight' onClick={handleSwitch} className={`${highlightSwitch.text} checkFont`} /><label onClick={handleSwitch} >Hover highlighting</label>
        </div>
        <button id='reset' onClick={reset} > <span className='fas fa-power-off'></span> Reset </button>
        <button id='clearLine' onClick={clearLine} ><span className={lineDisplay.fa}></span> {lineDisplay.text}</button>
      </div>
    </div>
  )
}

export default Index
