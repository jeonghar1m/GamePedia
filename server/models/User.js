const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    id: {
        type: String,
        maxlength: 50,
        unique: 1 // 중복 방지
    },
    nickname: {
        type: String,
        trim: true, // true일 경우 스페이스(공백)를 없애주는 역할
        maxlength: 15,
        unique: 1
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 8
    },
    role: {
        type: Number, // 0: 일반 유저, 1: 관리자
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        // 토큰 유효기간
        type: Number
    }
})

userSchema.pre('save', function(next) {
    let user = this;

    // 비밀번호를 변경할 때만 아래 코드 실행
    if(user.isModified('password')) {
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;   // password를 hash로 변환
                next();
            })
        })
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err,isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {
    let user = this;
    // jsonwebtoken을 이용해 token을 생성한다.
    let token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    })
}

userSchema.statics.findByToken = function(token, cb) {
    let user = this;

    // Decode the Token
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 ID를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user);
        })
    });
}

const User = mongoose.model('User', userSchema)

module.exports = {User}