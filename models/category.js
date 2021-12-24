const mongoose = require('mongoose')

//Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cate: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("categories", categorySchema)