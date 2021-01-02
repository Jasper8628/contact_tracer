import React, { useState } from 'react'
import { useNewContext } from '../../utils/global';
import './style.css'
function Index() {
  const [global, dispatch] = useNewContext();
  if (global.item) {
    const keys = Object.keys(global.item)
    console.log(keys)


    // keys.forEach(key => {
    //   if (global.item[key] !== [] && typeof (global.item[key]) !== 'string') {
    //     const hours = Object.keys(global.item[key])
    //     const log = []
    //     hours.forEach(hour => {
    //       if (global.item[key][hour].length) {
    //         log.push({
    //           hour: hour,
    //           log: global.item[key][hour]
    //         })
    //       }
    //     })
    //     date.push({
    //       date: key,
    //       hours: log
    //     })
    //   }
    //   console.log(date);
    // })
    // setDates(date);
  }
  return (
    <div className='card'>
      <div className='cardContainer'>
        <div className='qr'></div>
        <h3>{global.item.status ? global.item.status : ''} </h3>
        <h1>{global.item.name ? global.item.name : 'none'}</h1>
        <h2>{global.item.phoneNumber ? global.item.phoneNumber : 'none'}</h2>
        {global.item.dates.map((date, index) => (
          <details key={index}>
            <summary>{date.date}</summary>
            {date.log.map((entry, index) => (
              global.item.type === 'shop' ?
                <details key={index} >
                  <summary>{entry.hour}</summary>
                  <ul>customers
                {entry.log.map((customer, index) => (
                    <li key={index} >{customer.phoneNumber}</li>
                  ))}
                  </ul>
                </details> :
                <details>
                  <summary>{entry.shopName}: {entry.phoneNumber} </summary>
                  <p>from: {entry.from} o'clock</p>
                  <p>to:{entry.to} o'clock </p>
                </details>
            ))}
          </details>
        ))}
      </div>
    </div>
  )
}

export default Index
