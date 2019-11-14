const express = require('express')
const path = require('path')
const {
  syncAndSeed,
  Products,
  Companies,
  Offerings
} = require('./db.js')

const PORT = 3000

const app = express()

app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, 'index.html'));
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/api/products', (req, res, next) => {
  Products.findAll()
    .then(product => {
      res.send(product)
    })
    .catch(next)
  })

app.get('/api/companies', (req, res, next) => {
  Companies.findAll()
    .then(company => {
      res.send(company)
    })
    .catch(next)
  })


app.get('/api/offerings', (req, res, next) => {
  Offerings.findAll()
    .then(offer => {
      res.send(offer)
    })
    .catch(next)
  })



syncAndSeed()
  .then(() => {
    app.listen(PORT,() => {
      console.log(`The app is running on http://localhost/${PORT}`)
    })
  })

