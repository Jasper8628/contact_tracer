import React, { useEffect, useState } from 'react';
import SvgLine from '../svgLines';
import ToggleGroup from '../toggleGroup';
import HeadBar from '../headBar';
import Card from '../card';
import axios from 'axios';
import handleTag from '../../utils/tag';
import './style.css'
import { useNewContext } from '../../utils/global';
import icons from './icons';
const red = 'red normal';
const yToR = 'red normal yToR';
const yellow = 'yellow normal';
const primary = 'primary normal'
const shopRed = 'red shop';
const shopYR = 'red shop yToR';
const shopYellow = 'yellow shop'
let timeOut;
function Index() {
  const [global, dispatch] = useNewContext();
  const [positions, setPosition] = useState([]);
  const [shops, setShop] = useState([]);
  const [colors, setColor] = useState({});
  const [shopColor, setShopColor] = useState({});
  const [zero, setZero] = useState([]);
  const [closeContacts, setClose] = useState([]);
  const [secondShops, setSecShop] = useState([]);
  const [secondContacts, setSecCont] = useState([]);
  const [highLight, setHighLight] = useState({})
  const [profile, setProfile] = useState({})
  const [input, setInput] = useState({
    name: '0440000000',
    days: 14
  })
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
    for (let i = 0; i < 2001; i++) {
      const num = '0' + (440000000 + i);
      const x = Math.random() * 65 + 2
      const y = Math.random() * 65 + 3
      people.push({ x, y, num })
    }
    for (let i = 0; i < 100; i++) {
      const num = '0' + (900000000 + i);
      const x = Math.random() * 65 + 2
      const y = Math.random() * 65 + 3
      const icon = genRandom(icons)
      shopArr.push({ x, y, num, icon: icon.icon, shopType: icon.name })
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
    axios.get('/api/reset').then(res => console.log(res));
  }
  const genRandom = (array) => {
    const ranNum = Math.floor(Math.random() * array.length);
    return array[ranNum]
  }
  const checkNode = (id) => {
    if (document.getElementById(id).classList.length > 1) {
      return true
    } else { return false }
  }
  const handleClick = (e) => {
    clearTimeout(timeOut);
    const name = e.target.getAttribute('name');
    const shop = shops.find(shop => shop.num === name)
    const shopType = shop ? shop.shopType : ''
    if (checkNode(name)) {
      const lineArr = highLight;
      lineArr[name] = ''
    }
    setOtherlins({
      line1: 'line1', line2: 'line2', line3: 'line3', line4: 'line4',
      toggle: false, text: 'far fa-circle', currentLines: {}
    })
    setColor({ ...colors, [name]: primary })
    const data = {
      phoneNumber: name,
      numdays: 14
    }
    axios.post('/api', data)
      .then(res => handleTag(res, name,
        colors, setColor, shopColor, setShopColor,
        zero, setZero, closeContacts, setClose,
        secondShops, setSecShop, secondContacts, setSecCont)
      )
      .then(() => {
        axios.post('/api/info', { name, shopType })
          .then(result => {
            dispatch({
              type: 'info',
              item: result.data.item
            })
            console.log(result.data)

          })
      })
  }
  const clickShop = (e) => {
    const name = e.target.getAttribute('name');
    axios.post('/api/info', { name })
      .then(res => {
        if (res.data.item.type === 'shop') {
          console.log(res.data)
        }
      })

  }
  const handleHover = (e) => {
    const name = e.target.getAttribute('name');
    if (highlightSwitch.status && otherLines.toggle && checkNode(name)) {
      const shop = shops.find(shop => shop.num === name)
      const shopType = shop ? shop.shopType : ''
      console.log(shopType)
      timeOut = setTimeout(() => {
        axios.post('/api/info', { name, shopType })
          .then(res => {
            dispatch({
              type: 'info',
              item: res.data.item
            })
            console.log(res.data)
          })
      }, 300);
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
    clearTimeout(timeOut)
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

  const handleChange = (e) => {
    const name = e.target.getAttribute('name');
    let value = e.target.value;
    if (name === 'name') {
      value = '0' + (parseInt(value) + 440000000)
    }
    setInput({ ...input, [name]: value })
  }
  const handleSubmit = (e) => {
    let name = input.name
    let days = input.days
    if (e.target.id === 'random') {
      const num = '0' + Math.floor(Math.random() * 1999 + 440000000);
      name = num;
      days = 14;
    }
    setColor({ ...colors, [name]: primary })
    const data = {
      phoneNumber: name,
      numdays: days
    }
    console.log(data)
    axios.post('/api', data)
      .then(res => handleTag(res, name,
        colors, setColor, shopColor, setShopColor,
        zero, setZero, closeContacts, setClose,
        secondShops, setSecShop, secondContacts, setSecCont)
      )
  }
  return (
    <div>
      <SvgLine lineArr={zero} lineDisplay={lineDisplay} otherLines={otherLines.line1} highLight={highLight} />
      <SvgLine lineArr={closeContacts} lineDisplay={lineDisplay} otherLines={otherLines.line2} highLight={highLight} />
      <SvgLine lineArr={secondShops} lineDisplay={lineDisplay} otherLines={otherLines.line3} highLight={highLight} />
      <SvgLine lineArr={secondContacts} lineDisplay={lineDisplay} otherLines={otherLines.line4} highLight={highLight} />
      <HeadBar handleChange={handleChange} handleSubmit={handleSubmit} input={input} />
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
            onClick={clickShop}>
            <span name={shop.num} className={shop.icon} />
          </div>
        ))}
        <ToggleGroup
          handleVis={handleVis}
          checkbox={checkbox}
          highlightSwitch={highlightSwitch}
          handleSwitch={handleSwitch}
          clearLine={clearLine}
          lineDisplay={lineDisplay}
          reset={reset} />
      </div>
    </div>
  )
}

export default Index
