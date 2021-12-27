const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const generator = require('generate-password')
const date = require('date-and-time')

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
        default: generator.generate({
            length: 20,
            numbers: true
        })
    },
    joinDate: {
        type: String,
        default: date.format(new Date(), 'YYYY/MM/DD'),
    },
    token: {
        type: String,
        required: true
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

//add findOrCreate to model
customersSchema.plugin(findOrCreate);

module.exports = mongoose.model("customers", customersSchema)