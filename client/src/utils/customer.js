import fs from 'fs';
const customers = [];
const shops = [];
const openingHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const durations = [30, 60, 90, 120, 150, 180, 210, 240];
const gap = [];
const numCustomers = 3000;
const numShops = 200;
const sample = [
  '0500000035',
  '0500000100',
  '0500000495',
  '0500000335',
  '0500000766',
  '0500000715',
  '0500000656',
  '0500000255',
  '0500000174',
  '0500000332']
for (let i = 0; i < 12; i++) {
  gap.push(5 * i)
}
for (let i = 0; i < numCustomers; i++) {
  const num = i + 500000000
  customers.push({
    'phoneNumber': '0' + num,
    'status': 'negative'
  })
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
const generateVisit = (iter, customer) => {
  const ranNum = Math.floor(Math.random() * 3);
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

customers.forEach(customer => {
  for (let i = 0; i < 14; i++) {
    generateVisit(i, customer)
  }
})
// fs.writeFile('shops.js', JSON.stringify(shops), function (err) {
//   if (err) throw err;
//   console.log('Replaced!');
// });
// fs.writeFile('customers.js', JSON.stringify(customers), function (err) {
//   if (err) throw err;
//   console.log('Replaced!');
// });

const listOfShops = []
const set = new Set();
const firstSet = new Set();
const secSet = new Set();

const tag = (phoneNumber, numdays, isSecRound) => {
  const customer = customers.find(customer => customer.phoneNumber === phoneNumber)
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
    secTag(isSecRound)
  } else {
    console.log('customer not found, try another number')
  }
}
let count = 0;
const secTag = (isSecRound) => {
  listOfShops.forEach(item => {
    const newSet = new Set();
    const shop = shops.find(shop => shop.shopName === item.shopName);
    const { visitDate, from, to } = item;
    const newTo = Math.floor(to)
    const newFrom = Math.floor(from)
    const thenDays = new Date(visitDate) / 1000 / 3600 / 24;
    const nowDays = new Date() / 1000 / 3600 / 24;
    const numDays = Math.floor(nowDays - thenDays);
    // console.log(numDays);
    if (newTo === newFrom) {
      shop[visitDate][newFrom].forEach(customer => {
        if (!isSecRound) {
          firstSet.add(customer.phoneNumber)
          // update customer.status to red here
        } else {
          const firstSetArray = Array.from(firstSet);
          if (firstSetArray.indexOf(customer.phoneNumber) === -1) {
            secSet.add(customer.phoneNumber)
          }
          // if customer.status !=='red'
          // update customer.status to yellow here
        }
        newSet.add(customer.phoneNumber);
        set.add(customer.phoneNumber)
      })
    } else {
      const tempArray = shop[visitDate][newFrom].concat(shop[visitDate][newTo])
      tempArray.forEach(customer => {
        if (!isSecRound) {
          firstSet.add(customer.phoneNumber)
          // update customer.status to red here
        } else {
          const firstSetArray = Array.from(firstSet);
          if (firstSetArray.indexOf(customer.phoneNumber) === -1) {
            secSet.add(customer.phoneNumber)
          }
          // if customer.status !=='red'
          // update customer.status to yellow here
        }
        newSet.add(customer.phoneNumber);
        set.add(customer.phoneNumber)
      })
    }
    count++;
    const customersToTag = Array.from(newSet)
    if (!isSecRound) {
      customersToTag.forEach(number => {
        tag(number, numDays, true)
      })
    }
  })
  // console.log('setSize: ', set.size, 'firstSet size: ', firstSet.size, "secSet size: ", secSet.size);
  // console.log(count)
}
// console.log(customers[12]['2020 12 22'])
// sample.forEach(item => { tag(item, 14, false) })
// for (let i = 0; i < 2; i++) {
//   const num = i + 500000000
//   const newNum = "0" + num
//   tag(newNum, 14, false)
// }
tag('0500000035', 14, false)
// console.log(shops[5]['2020 12 22'][10])
