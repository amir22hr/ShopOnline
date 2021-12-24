const LocalStrategy = require('passport-local')
const rou = require('../../helpers/routes')
const Customers = require('../../models/customers')
const bcrypt = require('bcrypt')
const mailSender = require('../../helpers/Auth/mailSender')

const initialize = (app, passport) => {

    //define MiddleWare
    app.use(passport.initialize())
    app.use(passport.session())

    //config
    const authenticateUser = async (email, password, done) => {
        const user = await Customers.findOne({ email })
        if (user == null) {
            return done(null, false, { message: "No User with that email" })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                if (user.valid === true) {
                    return done(null, user)
                } else {
                    //render HTML
                    const html = `<a href="http://localhost:${process.env.PORT}${rou.valid}?token=${user.token}" target="_blank"><button>Verify</button></a>`
                    //Send Mail
                    await mailSender(email, "Activation email", html)
                    return done(null, false, { message: "Please Verify Account, Validation sent to your email." })
                }
            } else {
                return done(null, false, { message: "Password incorrect !" })
            }
        } catch (error) {
            return done(error)
        }
    }

    //-
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser(async (id, done) => {
        return done(null, await Customers.findOne({ _id: id }))
    })

}

module.exports = initialize