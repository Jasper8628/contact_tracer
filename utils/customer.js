
const customers = {};
const shops = [];
const openingHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const durations = [30, 60, 90, 120, 150];
const gap = [];
const numCustomers = 100000;
const numShops = 5000;
const visits = 2;
for (let i = 0; i < 12; i++) {
  gap.push(5 * i)
}
for (let i = 0; i < numShops; i++) {
  const num = i + 900000000
  shops.push({
    shopName: 'random shop' + i,
    'phoneNumber': num
  })
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
for (let j = 0; j < 14; j++) {
  const date = countDay(j);
  shops.forEach(shop => {
    shop[date] = {
      8: [], 9: [], 10: [], 11: [], 12: [],
      13: [], 14: [], 15: [], 16: [], 17: []
    }
  })
}
const generateVisit = (iter, customer, visits) => {
  const ranNum = Math.floor(Math.random() * visits);
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
const genRandom = (array) => {
  const ranNum = Math.floor(Math.random() * array.length);
  return array[ranNum]
}
for (let i = 0; i < numCustomers; i++) {
  const num = i + 500000000
  const numStr = '0' + num;
  customers[numStr] = {
    'phoneNumber': numStr,
    'status': 'negative'
  };
  for (let j = 0; j < 14; j++) {
    generateVisit(j, customers[numStr], visits)
  }
}
const set = new Set();
const firstSet = new Set();
const secSet = new Set();
let listOfShops = []
const reset = () => { listOfShops = [] }

const tag = async (phoneNumber, numdays, isSecRound) => {
  const customer = customers[phoneNumber]
  if (customer !== undefined) {
    for (let i = 14 - numdays; i < 14; i++) {
      const date = countDay(i);
      customer[date].forEach(shop => {
        listOfShops.push({
          shopName: shop.shopName,
          visitDate: date,
          from: shop.from,
          to: shop.to
        })
      })
    }
    // secTag(isSecRound)
  } else {
    console.log('customer not found, try another number')
  }
  return JSON.stringify(listOfShops)
}
const secTag = async (arr, isSecRound) => {
  arr.forEach(item => {
    const newSet = new Set();
    const shop = shops.find(shop => shop.shopName === item.shopName);
    const { visitDate, from, to } = item;
    const newTo = Math.floor(to)
    const newFrom = Math.floor(from)
    const thenDays = new Date(visitDate) / 1000 / 3600 / 24;
    const nowDays = new Date() / 1000 / 3600 / 24;
    const numDays = Math.floor(nowDays - thenDays);
    if (newTo === newFrom) {
      shop[visitDate][newFrom].forEach(customer => {
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
    } else {
      const tempArray = shop[visitDate][newFrom].concat(shop[visitDate][newTo])
      tempArray.forEach(customer => {
        const phoneNum = customer.phoneNumber;
        if (!isSecRound) {
          customers[phoneNum].status = 'red';
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
    }
    const customersToTag = Array.from(newSet)
    if (!isSecRound) {
      customersToTag.forEach(number => {
        tag(number, numDays, true)
      })
    }
  })
  // console.log('setSize: ', set.size, 'firstSet size: ', firstSet.size, "secSet size: ", secSet.size);
  // console.log(count)
  if (!isSecRound) {
    const firstArr = Array.from(firstSet)
    return JSON.stringify([listOfShops, firstArr])
  } else {
    const result = Array.from(secSet);
    const total = Array.from(set);
    return JSON.stringify([result, total])
  }
}
// console.log(customers[12]['2020 12 22'])
// sample.forEach(item => { tag(item, 14, false) })
// for (let i = 0; i < 2; i++) {
//   const num = i + 500000000
//   const newNum = "0" + num
//   tag(newNum, 14, false)
// }
// tag('0500000035', 14, false)
// console.log(shops[5]['2020 12 22'][10])
module.exports = [tag, secTag, reset];
