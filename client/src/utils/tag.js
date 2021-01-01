const red = 'red normal';
const yToR = 'red normal yToR';
const yellow = 'yellow normal';
const primary = 'primary normal'
const shopRed = 'red shop';
const shopYR = 'red shop yToR';
const shopYellow = 'yellow shop'
const genXY = (id) => {
  const { right, left, top, bottom } = document.getElementById(id).getBoundingClientRect();
  return [(right + left) / 2, (top + bottom) / 2]
}
const handleTag = (res, name, colors, setColor,
  shopColor, setShopColor, zero, setZero, closeContacts, setClose,
  secondShops, setSecShop, secondContacts, setSecCont) => {
  const arr = res.data.closeContacts
  const arr2 = res.data.secondContacts
  const primeContact = res.data.primaryContacts;
  const finalContact = res.data.finalContacts;
  const color = colors
  const shopCol = shopColor
  const lineZero = zero;
  const lineClose = closeContacts;
  const lineShop = secondShops;
  const lineSecond = secondContacts;
  const tempCustomerArr = [];
  const tempShopArr = []
  primeContact.forEach((element) => {
    tempShopArr.push(element.phoneNumber)
    const [x0, y0] = genXY(element.phoneNumber)
    element.customersToTag.forEach((customer) => {
      const [x1, y1] = genXY(customer)
      if (customer === name) {
        lineZero.push({ x0: x1, y0: y1, x1: x0, y1: y0, start: customer, end: element.phoneNumber })
        setZero(lineZero);
      } else {
        lineClose.push({ x0, y0, x1, y1, start: element.phoneNumber, end: customer })
        tempCustomerArr.push(customer)
        setClose(lineClose)
      }
    })
    if (shopCol[element.phoneNumber] === shopYellow) {
      shopCol[element.phoneNumber] = shopYR;
    } else {
      shopCol[element.phoneNumber] = shopRed;
    }
  });
  finalContact.forEach((element) => {
    const shopNum = element.phoneNumber
    const [x0, y0] = genXY(shopNum)
    element.customersToTag.forEach((customer) => {
      const [x1, y1] = genXY(customer)
      if (tempCustomerArr.indexOf(customer) !== -1) {
        if (tempShopArr.indexOf(shopNum) === -1) {
          lineShop.push({ x0: x1, y0: y1, x1: x0, y1: y0, start: customer, end: element.phoneNumber })
          setSecShop(lineShop);
        }
      } else if (customer !== name) {
        lineSecond.push({ x0, y0, x1, y1, start: element.phoneNumber, end: customer })
        setSecCont(lineSecond)
      }
    })
    if (shopCol[element.phoneNumber] !== shopRed && shopCol[element.phoneNumber] !== shopYR) {
      shopCol[element.phoneNumber] = shopYellow
    }
  });
  if (arr.length) {
    arr.forEach(element => {
      if (element === name) {
        color[element] = primary
      } else if (color[element] !== primary) {
        if (color[element] === yellow) {
          color[element] = yToR
        } else { color[element] = red }
      }
    });
    arr2.forEach(element => {
      if (color[element] !== red && color[element] !== primary && color[element] !== yToR) {
        color[element] = yellow
      }
    });
  } else { color[name] = primary }
  setShopColor(shopCol)
  setColor(color)
}
export default handleTag