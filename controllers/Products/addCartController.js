const rou = require('../../helpers/routes')
const Products = require('../../models/products')
const Category = require('../../models/category')
const showCart = require('../../helpers/products/showCart')
const addCart = require('../../helpers/products/addCart')

const addCartController = async (req, res) => {

    if (req.query.id) {
        await addCart(req.user, req.query.id, res)
    }

    // Find All Products
    const products = await Products.find()
    const categories = await Category.find()

    res.render('main', {
        title: "Cart",
        rou,
        products,
        categories,
        user: req.user,
        productsCart: await showCart(req.user),
    })
}

module.exports = addCartController