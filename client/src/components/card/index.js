import React, { useState, useLayoutEffect } from 'react'
import { useNewContext } from '../../utils/global';
import QRcode from 'qrcode.react'
import './style.css'
function Index() {
  const [global, dispatch] = useNewContext();
  const [viewSize, setViewsize] = useState('')
  const [rotate, setRotate] = useState({})
  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth < 1000) {
        setViewsize(150)
      } else if (window.innerWidth > 2500) {
        setViewsize(300)
      } else {
        const newSize = 150 + (window.innerWidth - 1000) / 1500 * 150
        console.log('newsize:', newSize, window.innerWidth)
        setViewsize(newSize)
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  const handleClick = (e) => {
    const name = e.target.getAttribute('name');
    // const detail=document.getElementById(name).tog
    // detail.toggle
    console.log(name)
    setRotate({
      ...rotate,
      [name]: rotate[name] !== '90deg' ? '90deg' : '0deg'
    })
  }
  const handleLeave = (e) => {
    const name = e.target.getAttribute('name');
    console.log(name)
    setRotate({
      ...rotate,
      [name]: rotate[name] !== '90deg' ? '90deg' : '0deg'
    })
  }

  const qr = {
    name: global.item.name,
    phoneNumber: global.item.phoneNumber,
    status: global.item.status
  }
  const qrStr = JSON.stringify(qr)
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  return (
    <div className='card'>
      <div className='cardContainer'>
        <div className='qr'>
          <QRcode
            value={qrStr}
            size={parseInt(viewSize)}
            bgColor={global.item.status === 'red' ?
              'rgb(255,0,0,0.8' : global.item.status === 'yellow' ? 'rgb(255,255,0,0.7' : 'rgb(255,255,255,0.6'}
            fgColor='black'
            imageSettings={{ height: 5, width: 5 }}
          />
        </div>
        {/* <h3>{global.item.status ? global.item.status : ''} </h3> */}
        <h1>{global.item.name ? global.item.name : 'none'}</h1>
        <h2><span className='fas fa-phone-alt' />  {global.item.phoneNumber ? global.item.phoneNumber : 'none'}</h2>
        {/* <p>Dates since exposure</p> */}
        {global.item.dates.map((date, index) => (
          <div className='date' key={index}>
            <h3>{date.date} :</h3>
            {date.log.map((entry, index) => (
              global.item.type === 'shop' ?
                <div className='content' >
                  <details name={`${entry.hour}${date.date}`} key={index} >
                    <summary name={`${entry.hour}${date.date}`}  > <span className='fas fa-chevron-circle-right' /> {entry.hour} : 00 </summary>
                    {entry.log.map((customer, index) => (
                      <p key={index} ><span className='fas fa-phone-alt' />  {customer.phoneNumber}</p>
                    ))}
                  </details>
                </div> :
                <div className='content' >
                  <details name={`${entry.shopName}${date.date}`}  >
                    <summary name={`${entry.shopName}${date.date}`} > <span className='fas fa-chevron-circle-right' /> {entry.shopName}: </summary>
                    <div className='content'>
                      <p><span className='fas fa-phone-alt' />  {entry.phoneNumber}  </p>
                      <p>from: {parseInt(entry.from)} :
                      {parseInt((entry.from - (parseInt(entry.from))) * 60) === 0 ?
                          ' 00' : parseInt((entry.from - (parseInt(entry.from))) * 60)}</p>
                      <p>to: {parseInt(entry.to)} :
                       {parseInt((entry.to - (parseInt(entry.to))) * 60) === 0 ?
                          ' 00' : parseInt((entry.to - (parseInt(entry.to))) * 60)}</p>
                    </div>
                  </details>

                </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Index
