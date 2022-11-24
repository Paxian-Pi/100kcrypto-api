const { type } = require('express/lib/response')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VerificationTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now
    }
})

const VerificationModel = mongoose.model('tokens', VerificationTokenSchema)

module.exports = VerificationModel