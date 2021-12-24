const rou = require('../../helpers/routes')
const Customers = require('../../models/customers')

const validController = async (req, res) => {

    try {
        //check token has exist
        const user = await Customers.findOne({ token: req.query.token })

        //Already activated => redirect
        if (user.valid === true) {
            throw new Error("Token Already Activated!")
        }
        // false => create
        else {
            await Customers.findOneAndUpdate({ token: req.query.token }, {
                valid: true
            })

            //flash message
            req.flash('success', 'Register Complete.')
            res.status(302).redirect(rou.login)
        }
    } catch (error) {
        console.log(`\n---validController.js---\n`, error)
        req.flash('warning', 'token Not Valid !')
        res.status(302).redirect(rou.login)
    }
}

module.exports = validController