import { customers, shops } from './customer';
const listOfShops = []

const countDay = (iter) => {
  const ms = new Date().getTime();
  const numMS = (ms / 1000 / 3600 / 24 - (14 - iter)) * 24 * 3600 * 1000
  const year = new Date(numMS).getFullYear();
  const month = new Date(numMS).getMonth() + 1;
  const dayy = new Date(numMS).getDate();
  const newDate = year + " " + month + " " + dayy;
  return newDate;
}

const tag = (phoneNumber) => {
  const customer = customers.find(customer => customers['phone number'] === phoneNumber)
  for (let i = 0; i < 14; i++) {
    const date = countDay(i);
    listOfShops.push(customer[date].name)
  }
}