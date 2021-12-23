const rou = require('../../helpers/routes');

const logoutController = async (req, res) => {

    await req.logout();
    await res.redirect(rou.main);
}

module.exports = logoutController