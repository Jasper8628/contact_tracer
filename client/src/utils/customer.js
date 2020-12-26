const customers = [];
const shops = [];
const openingHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const durations = [30, 60, 90, 120, 150, 180, 210, 240];
const gap = [];
for (let i = 0; i < 50; i++) {
  const num = i + 500000000
  customers.push({
    'phone number': '0' + num,
    'status': 'negative'
  })
}
for (let i = 0; i < 10; i++) {
  const num = i + 900000000
  shops.push({
    businessName: 'random shop' + i,
    'phone number': num
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
for (let i = 0; i < 12; i++) {
  gap.push(5 * i)
}
const generateVisit = (iter, customer) => {
  const ranNum = Math.ceil(Math.random() * 5);
  const newDate = countDay(iter);
  let hour = genRandom(openingHours)
  customer[newDate] = [];

  for (let i = 0; i < ranNum; i++) {
    const shop = genRandom(shops)
    const duration = genRandom(durations) / 60
    const gapTime = genRandom(gap) / 60;
    if (hour <= 17) {
      customer[newDate] = {
        [shop.businessName]: {
          from: hour,
          to: (hour * 60 + duration) / 60
        }
      }
      const newTime = Math.floor(hour).toString();
      shop[newDate][newTime].push({
        'phone number': customer['phone number'],
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
// console.log(customers[10]['2020 12 22'])
console.log(shops[5]['2020 12 22'][10])
