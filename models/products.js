const mongoose = require('mongoose')
const date = require('date-and-time');

// Schema
const productsSchema = new mongoose.Schema({
    nameProduct: String,
    createdAt: {
        type: String,
        default: date.format(new Date(), 'YYYY / MM / DD'),
    },
    price: Number,
    priceCent: Number,
    category: String,
    imgProduct: String,
})

module.exports = mongoose.model("products", productsSchema)