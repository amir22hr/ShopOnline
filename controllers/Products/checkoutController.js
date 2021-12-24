const rou = require('../../helpers/routes')
const Customers = require('../../models/customers')
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path')
const showCart = require('../../helpers/products/showCart');
const mailSender = require('../../helpers/Auth/mailSender');

const checkoutController = async (req, res) => {

    if (req.query.id) {

        //render HTML
        const html = await ejs.renderFile(path.join(__dirname, '../../views/mail/checkout.ejs'), {
            title: "Thanks for buying from us",
            list: await showCart(req.user)
        })

        mailSender(req.user.email, 'checkout', html)

        await Customers.findOneAndUpdate(
            //req.query.id => user
            { _id: req.query.id },
            { carts: [] }
        )

        return res.status(302).redirect(rou.main)
    }
}
module.exports = checkoutController