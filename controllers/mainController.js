const rou = require('../helpers/routes')
const Products = require('../models/products')
const Category = require('../models/category')
const showCart = require('../helpers/products/showCart')

const mainController = async (req, res) => {

    try {
        //Find All Products
        const products = await Products.find()
        const categories = await Category.find()

        res.render('main', {
            title: "Digikala | fast Shopping",
            rou,
            products,
            categories,
            user: req.user,
            productsCart: req.user ? await showCart(req.user) : [""],
        })
    } catch (error) {
        console.log(`\n---mainController.js---\n`, error)
    }
}

module.exports = mainController