const rou = require('../routes')

//For Home
const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.status(302).redirect(rou.login)
}

//For login-register-forget
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        return res.status(302).redirect(rou.main)
    }
    return next()
}

module.exports = { checkAuthenticated, isLoggedIn }