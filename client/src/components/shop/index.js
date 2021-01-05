import React, { useEffect, useState } from 'react';
import SvgLine from '../svgLines';
import ToggleGroup from '../toggleGroup';
import HeadBar from '../headBar';
import handleTag from '../../utils/tag';
import Guide from '../guilde'
import './style.css'
import { useNewContext } from '../../utils/global';
import icons from './icons';
import API from '../../utils/API';
let timeOut;
const primary = 'primary normal'
function Index() {
  const [, dispatch] = useNewContext();
  const [positions, setPosition] = useState([]);
  const [people, setPeople] = useState({})
  const [shops, setShop] = useState([]);
  const [colors, setColor] = useState({});
  const [shopColor, setShopColor] = useState({});
  const [zero, setZero] = useState([]);
  const [closeContacts, setClose] = useState([]);
  const [secondShops, setSecShop] = useState([]);
  const [secondContacts, setSecCont] = useState([]);
  const [highLight, setHighLight] = useState({});
  const [guide, setGuide] = useState({
    warning: { errorFree: true, display: 'none' },
    guideSpin: { display: 'block' },
    guideClick: { count: false, display: 'none' },
    guideHover: { count: true, display: 'none', x: '', y: '' }
  })
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
    line1: 'line1', line2: 'line2', line3: 'line3', line4: 'line4', toggle: false, text: 'far fa-circle', veil: 0, currentLines: {}
  })

  useEffect(() => {
    init()
  }, [])
  const init = () => {
    const dots = []
    const shopArr = []
    for (let i = 0; i < 2001; i++) {
      const num = '0' + (440000000 + i);
      const x = Math.random() * 65 + 2
      const y = Math.random() * 65 + 3
      dots.push({ x, y, num })
    }
    API.init().then(res => {
      setGuide({
        ...guide,
        guideSpin: { display: 'none' },
        guideClick: { count: false, display: 'block' },


      })
      const { arr, arr2 } = res.data
      arr.forEach(element => {
        const { num, shopType } = element
        const x = Math.random() * 65 + 2
        const y = Math.random() * 65 + 3
        shopArr.push({ x, y, num, icon: icons[shopType] })
      });
      setShop(shopArr)
      setPeople(arr2)
    })
    setPosition(dots)
  }
  const reset = () => {
    setZero([])
    setClose([])
    setSecShop([])
    setSecCont([])
    setShopColor({})
    setColor({});
    API.reset()
    // .then(res => {
    //   const arr = res.data.arr
    //   const shopArr = shops
    //   arr.forEach((element, index) => {
    //     const { shopType } = element
    //     shopArr[index].icon = icons[shopType]
    //   });
    //   setShop(shopArr)
    // });
  }
  const checkNode = (id) => {
    if (document.getElementById(id).classList.length > 1) {
      return true
    } else { return false }
  }
  const genRandom = (array) => {
    const ranNum = Math.floor(Math.random() * array.length);
    return array[ranNum]
  }
  const handleClick = (e) => {
    clearTimeout(timeOut);
    const name = e.target.getAttribute('name');
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
    API.tag(data)
      .then(res => handleTag(res, name,
        colors, setColor, shopColor, setShopColor,
        zero, setZero, closeContacts, setClose,
        secondShops, setSecShop, secondContacts, setSecCont, people)
      )
      .then(() => {
        if (!guide.guideClick.count) {
          const node = genRandom(zero)
          setGuide({
            ...guide,
            guideClick: { count: true, display: 'none' },
            guideHover: { count: false, display: 'block', x: node.x1, y: node.y1 }
          })
        }
        API.search({ name })
          .then(result => {
            dispatch({
              type: 'info',
              item: result.data.item
            })
            console.log(result.data)

          })
      })
  }

  const handleHover = (e) => {
    const name = e.target.getAttribute('name');
    if (highlightSwitch.status && otherLines.toggle && checkNode(name)) {
      timeOut = setTimeout(() => {
        if (!guide.guideHover.count) {
          setGuide({
            ...guide,
            guideHover: { count: true, display: 'none', x: '', y: '' }
          })
        }
        API.search({ name })
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
        veil: 0.3,
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
        currentLines.veil = 0;
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
    console.log(name)
    let value = e.target.value;
    if ((isNaN(parseInt(value)) && value !== '') || parseInt(value) > 2000) {
      setGuide({
        ...guide,
        warning: { display: 'block', errorFree: false }
      })
    }
    else if (value === "") {
      setGuide({
        ...guide,
        warning: { display: 'none', errorFree: true }
      })
      setInput({ ...input, [name]: '0440000000' })
    } else {
      setGuide({
        ...guide,
        warning: { display: 'none', errorFree: true }
      })
      if (name === 'name') {
        value = '0' + (parseInt(value) + 440000000)
      }
      setInput({ ...input, [name]: value })
    }
  }
  const handleSubmit = (e) => {

    let name = input.name
    let days = input.days
    console.log(name, days)
    if (e.target.id === 'random') {
      const num = '0' + Math.floor(Math.random() * 1999 + 440000000);
      name = num;
      days = 14;
    }
    if (guide.warning.errorFree) {
      setColor({ ...colors, [name]: primary })
      const data = {
        phoneNumber: name,
        numdays: days
      }
      API.tag(data)
        .then(res => handleTag(res, name,
          colors, setColor, shopColor, setShopColor,
          zero, setZero, closeContacts, setClose,
          secondShops, setSecShop, secondContacts, setSecCont, people)
        )
    }
  }
  return (
    <div>
      <SvgLine lineArr={zero} lineDisplay={lineDisplay} otherLines={otherLines.line1} highLight={highLight} />
      <SvgLine lineArr={closeContacts} lineDisplay={lineDisplay} otherLines={otherLines.line2} highLight={highLight} />
      <SvgLine lineArr={secondShops} lineDisplay={lineDisplay} otherLines={otherLines.line3} highLight={highLight} />
      <SvgLine lineArr={secondContacts} lineDisplay={lineDisplay} otherLines={otherLines.line4} highLight={highLight} />
      <HeadBar handleChange={handleChange} handleSubmit={handleSubmit} input={input} />
      <Guide guide={guide} />
      <div className='container'>
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
            onMouseOut={handleLeave}>
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
        <div className='veil' style={{ background: `rgb(0,0,0,${otherLines.veil})` }} ></div>
      </div>
    </div>
  )
}

export default Index
