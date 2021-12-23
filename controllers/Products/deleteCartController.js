const rou = require('../../helpers/routes')
const Customers = require('../../models/customers')

const deleteCartController = async (req, res) => {

    if (req.query.id) {
        await Customers.updateOne({ _id: req.user._id }, {
            $pullAll: {
                carts: [req.query.id],
            },
        });

        return res.status(302).redirect(rou.main)
    }
}

module.exports = deleteCartController