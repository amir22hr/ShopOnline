const mongoose = require('mongoose')
const date = require('date-and-time');

// Schema
const productsSchema = new mongoose.Schema({
    nameProduct: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: date.format(new Date(), 'YYYY / MM / DD'),
    },
    price: {
        type: Number,
        required: true
    },
    priceCent: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imgProduct: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("products", productsSchema)