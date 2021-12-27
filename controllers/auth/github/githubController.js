const rou = require('../../../helpers/routes')
const passport = require("passport")

const githubController = passport.authenticate('github', {
    scope: ['user:email'],
})

module.exports = githubController