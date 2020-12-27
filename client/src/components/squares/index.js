import React, { useEffect, useState } from 'react'
import './style.css';

function Index() {
  const [newArray, setArray] = useState([])
  useEffect(() => {
    const displayArray = []
    for (let i = 0; i < 224; i++) {
      displayArray.push({
        businessName: i,
        phoneNumber: Math.floor(Math.random() * 1000000) + 10000000,
        date1: '',
        date2: '',
      })
    }
    setArray(displayArray)
  }, [])
  return (
    <div className='squares'>
      {newArray.map((item, index) => (
        <div className='square' key={index} >
          <p>
            Business Name: {item.businessName}
          </p>
        </div>
      ))}

    </div>

  )
}

export default Index
