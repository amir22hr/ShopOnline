const mongoose = require('mongoose')
const date = require('date-and-time');

//Schema
const customersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    joinDate: {
        type: String,
        default: date.format(new Date(), 'YYYY/MM/DD'),
    },
    token: String,
    valid: {
        type: Boolean,
        default: false
    },
    carts: {
        type: Array,
        required: false
    },
})

module.exports = mongoose.model("customers", customersSchema)