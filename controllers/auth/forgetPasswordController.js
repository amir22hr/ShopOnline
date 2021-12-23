const rou = require('../../helpers/routes')
var generator = require('generate-password');
const Customers = require('../../models/customers')
const mailSender = require('../../helpers/Auth/mailSender');

const forgetPasswordController = async (req, res) => {
    var email = await req.body.email
    if (email) {

        try {
            const customer = await Customers.findOne({
                email
            })

            if (customer.valid === true) {
                //generate password
                var password = await generator.generate({
                    length: 8,
                    numbers: true
                });

                await mailSender(email, "Forget Password", `<p>new password: <b>${password}</b></p>`)

                await req.flash('success', "Email Sent")
                return res.status(302).redirect(rou.login)
            } else {
                //render HTML
                const html = `<a href="http://localhost:${process.env.PORT}${rou.valid}?token=${customer.token}" target="_blank"><button>Verify</button></a>`
                //Send Mail
                await mailSender(email, "Activation email", html)
                throw new Error("Please Verify Account, Validation sent to your email.")
            }

        } catch (err) {
            req.flash('danger', await err.toString())
            return res.status(302).redirect(rou.login)
        }
    }
}

module.exports = forgetPasswordController