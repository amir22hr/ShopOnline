const mongoose = require('mongoose')

//Schema
const categorySchema = new mongoose.Schema({
    name: String,
    cate: String,
})

module.exports = mongoose.model("categories", categorySchema)