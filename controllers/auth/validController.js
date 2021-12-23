const rou = require('../../helpers/routes')
const Customers = require('../../models/customers')

const validController = async (req, res) => {
    try {
        const user = await Customers.findOne({ token: req.query.token })
        if (user.valid === true) { throw new Error("Token Already Activated!") }
        else {
            await Customers.findOneAndUpdate({ token: req.query.token }, {
                valid: true
            })
            req.flash('success', 'Register Complete.')
            res.status(302).redirect(rou.login)
        }
    } catch (error) {
        console.log(error)
        req.flash('warning', 'token Not Valid !')
        res.status(302).redirect(rou.login)
    }
}

module.exports = validController