const LocalStrategy = require('passport-local')
const GitHubStrategy = require('passport-github2').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const rou = require('../../helpers/routes')
const Customers = require('../../models/customers')
const bcrypt = require('bcrypt')
const mailSender = require('../../helpers/Auth/mailSender')

const initialize = (app, passport) => {

    //define MiddleWare
    app.use(passport.initialize())
    app.use(passport.session())

    //callback Function Email
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

    //callback Function GitHub
    const authenticateUserGitHub = async (accessToken, refreshToken, profile, cb) => {
        await Customers.findOrCreate({
            name: profile.username,
            email: profile.id + '@github.com',
            token: profile.id,
        }, function (err, user) {
            if (err) console.log(err)
            return cb(err, user);
        });
    }

    //callback Function Google
    const authenticateUserGoogle = async (accessToken, refreshToken, profile, cb) => {
        await Customers.findOrCreate({
            name: profile.displayName,
            email: profile.id + '@google.com',
            token: profile.id,
        }, function (err, user) {
            if (err) console.log(err)
            return cb(err, user);
        });
    }


    //- auth github
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:5000" + rou.githubCallback
    }, authenticateUserGitHub))

    //- auth Google
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000" + rou.googleCallback
    }, authenticateUserGoogle))


    //- auth email
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))


    //- serializeUser - deserializeUser
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser(async (id, done) => {
        return done(null, await Customers.findOne({ _id: id }))
    })
}

module.exports = initialize