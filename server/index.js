require('dotenv').config();
const express = require('express')
const app = express()
const port = 5000

const mongoId = process.env.DB_ID;
const mongoPassword = process.env.DB_PW;

const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${mongoId}:${mongoPassword}@mymovielist.nmowq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})