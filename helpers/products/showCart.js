const Customers = require('../../models/customers')
const Products = require('../../models/products')

const showCart = async (user)=>{
    const customers = await Customers.findOne({email: user.email})
    const carts = customers.carts
    return await Products.find({_id: carts})
}

module.exports = showCart