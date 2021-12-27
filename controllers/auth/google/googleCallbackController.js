const rou = require('../../../helpers/routes')
const passport = require("passport")

const googleCallbackController =
    passport.authenticate('google', {
        successRedirect: rou.main,
        failureRedirect: rou.login,
        failureFlash: true,
    })


module.exports = googleCallbackController