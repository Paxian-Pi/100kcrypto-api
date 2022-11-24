const { type } = require('express/lib/response')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VerifyEmailSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now
    }
})

const VerifyEmailModel = mongoose.model('otp', VerifyEmailSchema)

module.exports = VerifyEmailModel