let customers = {};
let shops = [];
let set = new Set();
let firstSet = new Set();
let secSet = new Set();
let listOfShops = []
let primeContact = []
const openingHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const durations = [30, 60, 90, 120, 150];
const gap = [];
const numCustomers = 2001;
const numShops = 100;
const visits = 7
const offset = Math.ceil(visits / 2);
for (let i = 0; i < 12; i++) {
  gap.push(5 * i)
}
const search = async (num) => {
  let item = {}
  shops.forEach(shop => {
    if (shop.phoneNumber === num) {
      const keys = Object.keys(shop)
      const dates = [];
      keys.forEach(key => {
        if (shop[key].length !== 0 && typeof (shop[key]) !== 'string') {
          const hours = Object.keys(shop[key])
          const log = []
          hours.forEach(hour => {
            if (shop[key][hour].length) {
              log.push({
                hour: hour,
                log: shop[key][hour]
              })
            }
          })
          dates.push({
            date: key,
            log: log
          })
        }
      })
      item = {
        phoneNumber: shop.phoneNumber,
        shopName: shop.shopName,
        status: '',
        dates: dates,
        type: 'shop'
      }
    }
  })
  if (customers[num] !== undefined) {
    const customer = customers[num]
    const keys = Object.keys(customer)
    const dates = [];
    keys.forEach(key => {
      if (customer[key].length !== 0 && typeof (customer[key]) !== 'string') {
        dates.push({
          date: key,
          log: customer[key]
        })
      }
    })
    item = {
      phoneNumber: customer.phoneNumber,
      status: customer.status,
      dates: dates,
      type: 'customer'
    }
  }
  return JSON.stringify(item)
}
const genRandom = (array) => {
  const ranNum = Math.floor(Math.random() * array.length);
  return array[ranNum]
}
const countDay = (iter) => {
  const ms = new Date().getTime();
  const numMS = (ms / 1000 / 3600 / 24 - (14 - iter)) * 24 * 3600 * 1000
  const year = new Date(numMS).getFullYear();
  const month = new Date(numMS).getMonth() + 1;
  const dayy = new Date(numMS).getDate();
  const newDate = year + " " + month + " " + dayy;
  return newDate;
}

const generateVisit = (iter, customer, visits, offset) => {
  const ranNum = Math.floor(Math.random() * visits) - offset;
  const newDate = countDay(iter);
  let hour = genRandom(openingHours)
  customer[newDate] = [];
  for (let i = 0; i < ranNum; i++) {
    const shop = genRandom(shops)
    const duration = genRandom(durations) / 60
    const gapTime = genRandom(gap) / 60;
    if (hour <= 17) {
      customer[newDate].push({
        shopName: shop.shopName,
        phoneNumber: shop.phoneNumber,
        from: hour,
        to: (hour + duration) > 17 ? 17 : hour + duration
      })
      const newTime = Math.floor(hour).toString();
      shop[newDate][newTime].push({
        'phoneNumber': customer.phoneNumber,
        'status': customer.status,
        'duration': duration * 60 + 'minutes'
      })
    }
    hour = hour + gapTime + duration;
  }
}

const reset = () => {
  listOfShops = [];
  set = new Set();
  firstSet = new Set();
  secSet = new Set();
}
const restart = () => {
  reset()
  customers = {};
  shops = [];
  for (let i = 0; i < numShops; i++) {
    const num = '0' + (i + 900000000)
    shops.push({
      shopName: 'random shop' + i,
      'phoneNumber': num,
      'type': 'shop'
    })
  }
  for (let j = 0; j < 14; j++) {
    const date = countDay(j);
    shops.forEach(shop => {
      shop[date] = {
        8: [], 9: [], 10: [], 11: [], 12: [],
        13: [], 14: [], 15: [], 16: [], 17: []
      }
    })
  }
  for (let i = 0; i < numCustomers; i++) {
    const num = i + 440000000
    const numStr = '0' + num;
    customers[numStr] = {
      'phoneNumber': numStr,
      'status': 'negative',
      'type': 'customer'
    };
    for (let j = 0; j < 14; j++) {
      generateVisit(j, customers[numStr], visits, offset)
    }
  }
}

const tag = async (phoneNumber, numdays) => {
  const customer = customers[phoneNumber]
  if (customer !== undefined) {
    for (let i = 14 - numdays; i < 14; i++) {
      const date = countDay(i);
      customer[date].forEach(shop => {
        listOfShops.push({
          shopName: shop.shopName,
          phoneNumber: shop.phoneNumber,
          customer: phoneNumber,
          visitDate: date,
          from: shop.from,
          to: shop.to
        })
      })
    }
  } else {
    console.log('customer not found, try another number')
  }
  return JSON.stringify(listOfShops)
}

const secTag = async (arr, isSecRound) => {
  primeContact = []
  arr.forEach(item => {
    const newSet = new Set();
    const shop = shops.find(shop => shop.shopName === item.shopName);
    const { visitDate, from, to, phoneNumber } = item;
    const newTo = Math.floor(to)
    const newFrom = Math.floor(from)
    const thenDays = new Date(visitDate) / 1000 / 3600 / 24;
    const nowDays = new Date() / 1000 / 3600 / 24;
    const numDays = Math.floor(nowDays - thenDays);
    let tempArr = []
    if (newTo === newFrom) {
      tempArr = shop[visitDate][newFrom]
    } else { tempArr = shop[visitDate][newFrom].concat(shop[visitDate][newTo]) }
    tempArr.forEach(customer => {
      const phoneNum = customer.phoneNumber;
      if (!isSecRound) {
        customers[phoneNum].status = 'red'
        firstSet.add(phoneNum)
      } else {
        if (customers[phoneNum].status !== 'red') {
          customers[phoneNum].status = 'yellow'
          secSet.add(phoneNum)
        }
      }
      newSet.add(customer.phoneNumber);
      set.add(customer.phoneNumber)
    })
    const customersToTag = Array.from(newSet)
    primeContact.push({ phoneNumber, customersToTag })
    if (!isSecRound) {
      customersToTag.forEach(number => {
        tag(number, numDays)
      })
    }
  })
  if (!isSecRound) {
    const firstArr = Array.from(firstSet)
    return JSON.stringify([listOfShops, firstArr, primeContact])
  } else {
    const result = Array.from(secSet);
    const total = Array.from(set);
    return JSON.stringify([result, total, primeContact])
  }
}

restart()
module.exports = [tag, secTag, reset, restart, search];
