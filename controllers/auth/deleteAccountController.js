const Customers = require('../../models/customers')
const rou = require('../../helpers/routes')

const deleteAccountController = async (req, res) => {

        await Customers.deleteOne({
            _id: req.user._id
        })
        
        return res.status(302).redirect(rou.main)
}

module.exports = deleteAccountController