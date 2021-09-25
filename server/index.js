require('dotenv').config();
const express = require('express')
const app = express()
const port = 5000

const mongoId = process.env.DB_ID;
const mongoPassword = process.env.DB_PW;

const { User } = require("./models/User");


const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${mongoId}:${mongoPassword}@mymovielist.nmowq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  // 가입시 필요한 정보들을 client에서 가져오면 그 것들을 DB에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err});
    return res.status(200).json({success: true});
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})