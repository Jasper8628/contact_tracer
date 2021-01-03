const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const [tag, secTag, reset, restart, search] = require('./utils/customer');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  // app.all('*',(req, res) => {
  //   res.sendFile(path.join(__dirname, 'client/build/index.html'));
  //   });
}

const set = new Set();
const firstSet = new Set();
const secSet = new Set();
app.get('/api/reset', (req, res) => {
  restart()
  console.log('server restarted')
  res.json({
    message: 'server reset'
  })
});
app.post('/api/info', (req, res) => {
  const { name, shopType } = req.body
  search(name, shopType)
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
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
