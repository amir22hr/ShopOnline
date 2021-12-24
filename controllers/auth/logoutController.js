const rou = require('../../helpers/routes');

const logoutController = async (req, res) => {

    try {
        await req.logout();
        await res.redirect(rou.main);
    } catch (error) {
        console.log(`\n---logoutController.js---\n`, error)
        await res.redirect(rou.main);
    }
}

module.exports = logoutController