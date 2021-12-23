const rou = require('../../helpers/routes')
const Products = require('../../models/products')
const Customers = require('../../models/customers')
const showCart = require('../../helpers/products/showCart')
const addCart = require('../../helpers/products/addCart')

const productController = async (req, res) => {

    if (req.params.id) {
        const product = await Products.findOne({
            _id: req.params.id
        })

        //check Already Exist
        const exist = await Customers.find(
            { carts: { $all: [product._id.toString()] } })

        console.log(exist)

        return res.render('Products/product', {
            title: "Product",
            rou,
            product,
            user: req.user,
            exist: req.user ? exist : "",
            // categories,
            // productsCart: await showCart(req.user),
        })
    }

    // return res.status(302).redirect(rou.main)

}

module.exports = productController