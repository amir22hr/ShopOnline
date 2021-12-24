const hashPassword = require('../../helpers/Auth/hashPassword')
const rou = require('../../helpers/routes')
const tokenCrypto = require('../../helpers/tokenCrypto')
const Customers = require('../../models/customers')
const ejs = require('ejs')
const path = require('path');
const mailSender = require('../../helpers/Auth/mailSender');
const { validationResult } = require('express-validator');

const get = (req, res) => {
    res.render('auth/register', {
        title: "Customers Register Page",
        rou,
        flash: req.flash()
    })
}

const post = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('danger', `${errors.errors[0].msg} | ${errors.errors[0].param}`)
        return res.status(400).redirect(rou.register)
    }

    try {
        const token = await tokenCrypto(req.body.email, req.body.name)
        //Check Token Already Exist ?

        //true => redirect
        try {
            const user = await Customers.findOne({ token })
            if (user.valid === false) {
                await req.flash('warning', "Check Your Email And Verify Account, If you don't receive the email, try to forget the password.")
                res.status(302).redirect(rou.login)
            }
            else {
                await req.flash('warning', 'User Already Exist !')
                res.status(302).redirect(rou.login)
            }
        } catch (error) {
            console.log(`\n---registerController.js---1\n`, error)
        }

        //false => create user
        const hash = await hashPassword(req.body.password)
        //import to database
        await Customers.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            token
        })

        //render HTML
        const html = await ejs.renderFile(path.join(__dirname, '../../views/mail/valid.ejs'), {
            title: "Email Validation",
            valid: `http://localhost:${process.env.PORT}${rou.valid}?token=${token}`
        })
        //Send Mail
        await mailSender(req.body.email, "Activation email", html)

        //flash Message
        await req.flash('primary', "Check Mail to Validation")
        res.status(302).redirect(rou.login)

    } catch (error) {
        console.log(`\n---registerController.js---2\n`, error)
        await req.flash('warning', 'Check your Inputs')
        res.status(302).redirect(rou.register)
    }
}

module.exports = {
    get,
    post
}