const rou = require('../../helpers/routes')
const Customers = require('../../models/customers')
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path')
const showCart = require('../../helpers/products/showCart');

const checkoutController = async (req, res) => {

    if (req.query.id) {

        //send Mail Validation
        var transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASS
            },
        });
        //render HTML
        const html = await ejs.renderFile(path.join(__dirname, '../../views/mail/checkout.ejs'), {
            title: "Thanks for buying from us",
            list: await showCart(req.user)
        })
        //form mail
        const mailOptions = {
            from: process.env.GMAIL, // sender address
            to: req.user.email, // list of receivers
            subject: 'checkout', // Subject line
            html: html// plain text body
        };
        await transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });

        await Customers.findOneAndUpdate(
            //req.query.id => user
            { _id: req.query.id },
            { carts: [] }
        )

        return res.status(302).redirect(rou.main)
    }
}
module.exports = checkoutController