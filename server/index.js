require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

const cookieParser = require('cookie-parser');

const { User } = require("./models/User");
const { Comment } = require("./models/Comments");
const { auth } = require("./middleware/auth");

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/key');

mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/users/register', (req, res) => {
  // 가입시 필요한 정보들을 client에서 가져오면 그 것들을 DB에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err});
    return res.status(200).json({success: true});
  });
});

app.post('/api/users/login', (req, res) => {
  // 요청된 ID를 DB에 있는지 탐색
  User.findOne({ id: req.body.id }, (err, user) => {
    if(!user) return res.json({ loginSuccess: false, message: "제공된 ID에 해당하는 유저 없음."})
    // 요청된 ID가 있다면 PW가 맞는 PW인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)  return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."});
      // PW가 맞으면 토큰 생성
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        
        // token을 쿠키에 저장한다.
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id })
      })
    })
  })

});

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    id: req.user.id,
    nickname: req.user.nickname,
    email: req.user.email,
    role: req.user.role
  })
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id}, 
    {token: ""},
    (err, user) => {
      if(err) return res.json({success: false, err});
      return res.status(200).send({
        success: true
      })
    })
});

app.post('/api/comment/saveComment', (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if(err) return res.json({success: false, err});
    Comment.find({'_id': comment._id})
    .populate('writer')
    .exec((err, result) => {
      if(err) return res.json({success: false, err});
      res.status(200).json({success: true, result});
    })
  });
});

app.post('/api/comment/getComment', (req, res) => {
  Comment.find({"movieId": req.body.movieId})
  .populate('writer')
  .exec((err, comments) => {
    if(err) return res.status(400).send(err);
    res.status(200).json({success: true, comments});
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})