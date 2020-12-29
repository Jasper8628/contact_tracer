const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const [tag, secTag, reset, restart] = require('./utils/customer');
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
app.get('/api', (req, res) => {
  restart()
  console.log('server restarted')
  res.json({
    message: 'server reset'
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
              console.log('total sicklies:', final[1].length)
              console.log('total shop hours in question:', parsed[0].length)
              res.json({
                message: 'second response',
                closeContact: parsed[1],
                secondContact: final[0],
                primaryShops: newData,
                primaryContacts: parsed[2],
                secondaryShops: parsed[0]
              })
            })
        })

    })
})
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
