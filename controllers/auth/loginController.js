const passport = require("passport")
const rou = require("../../helpers/routes")

const get = (req, res) => {
    res.render('auth/login', {
        title: "Customers Login Page",
        rou,
        flash: req.flash()
    })
}

const post = passport.authenticate('local', {
    successRedirect: rou.main,
    failureRedirect: rou.login,
    failureFlash: true,
})

module.exports = {
    get,
    post
}