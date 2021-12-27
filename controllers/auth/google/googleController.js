const passport = require("passport")

const googleController = passport.authenticate('google', {
    scope: ['profile'],
})

module.exports = googleController