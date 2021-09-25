const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);

module.exports = {User};