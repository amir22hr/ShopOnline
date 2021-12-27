const rou = require('../../../helpers/routes')
const passport = require("passport")

const githubCallbackController =
    passport.authenticate('github', {
        successRedirect: rou.main,
        failureRedirect: rou.login,
        failureFlash: true,
    })


module.exports = githubCallbackController