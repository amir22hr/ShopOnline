const Customers = require('../../models/customers')
const rou = require('../../helpers/routes')

const deleteAccountController = async (req, res) => {

        try {
            await Customers.deleteOne({
                _id: req.user._id
            })
            
            return res.status(302).redirect(rou.main)
        } catch (error) {
            console.log(`\n---deleteAccountController.js---\n`, error)
            return res.status(302).redirect(rou.main)
        }
  
}

module.exports = deleteAccountController