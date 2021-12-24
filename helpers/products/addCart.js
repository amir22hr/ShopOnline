const Customers = require('../../models/customers')
const Products = require('../../models/products')
const rou = require('../routes')

const addCart = async (user, id, res) => {
    try {
        //check product has exist
        const existProduct = await Products.findOne({
            _id: id
        })

        if (existProduct) {
            // add product to user cart
            await Customers.findOneAndUpdate(
                { email: user.email },
                { $push: { carts: id } },
                function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                    }
                });
        }
    } catch (error) {
        console.log(`\n---addCart.js---\n`, error)
        return res.status(302).redirect(rou.main)
    }
}

module.exports = addCart