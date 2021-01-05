const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp()
const express = require("express");
const [tag, secTag, reset, restart, search, displayShops, displayCustomers, clearShops] = require('./utils/customer');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors)

app.get('/api/reset', (req, res) => {
  clearShops()
    .then(() => {
      res.json({
        arr: displayShops,
        message: 'server reset'
      })
      console.log('server restarted')
    });
})
app.post('/api/info', (req, res) => {
  console.log(req.body)
  const { name } = req.body
  search(name)
    .then(data => {
      const item = JSON.parse(data)
      res.json({
        message: 'found',
        item: item
      })
    })
})
app.post('/api', (req, res) => {
  reset();
  const { phoneNumber, numdays } = req.body
  tag(phoneNumber, numdays)
    .then(data => {
      const newData = JSON.parse(data)
      console.log('patient zero visited:', newData.length, 'shops');
      secTag(newData, false)
        .then(data => {
          const parsed = JSON.parse(data)
          console.log('close contacts:', parsed[1].length)
          secTag(parsed[0], true)
            .then(data => {
              const final = JSON.parse(data);
              console.log('secondary contacts:', final[0].length)
              console.log('chain of transmission total of', final[1].length, 'impacted')
              console.log('total shop hours in question:', parsed[0].length)
              res.json({
                message: 'query successful',
                closeContacts: parsed[1],
                secondContacts: final[0],
                primaryContacts: parsed[2],
                finalContacts: final[2]
              })
            })
        })
    })
})
app.get('/api', (req, res) => {
  // cors(req, res, () => {
  console.log('init request')
  res.json({ arr: displayShops, arr2: displayCustomers })
  // })
})
exports.server = functions.region('australia-southeast1').https.onRequest(app);

