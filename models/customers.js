const mongoose = require('mongoose')
const date = require('date-and-time');

//Schema
const customersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    joinDate: {
        type: String,
        default: date.format(new Date(), 'YYYY/MM/DD'),
    },
    token: {
        type: String,
        required: true,
    },
    valid: {
        type: Boolean,
        default: false,
    },
    carts: {
        type: Array,
        required: false
    },
})

module.exports = mongoose.model("customers", customersSchema)