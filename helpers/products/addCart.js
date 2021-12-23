const Customers = require('../../models/customers')

const addCart = async (user, id) => {
    Customers.findOneAndUpdate(
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

module.exports = addCart