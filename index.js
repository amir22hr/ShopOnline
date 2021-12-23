//define
require('dotenv').config({ path: './variables.env' })
const express = require('express')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

require('./config/db')
const router = require('./routes')
const HandlerError = require('./helpers/handlerError')
const initializePassPort = require('./helpers/Auth/initializePassPort');

//configs
const app = express()
const port = process.env.PORT
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
    cookie: { maxAge: 60000 },
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());
initializePassPort(app, passport)

//MiddleWares
app.use('/', router)

//handlerErrors
app.use(HandlerError.handleError404)
app.use(HandlerError.handleErrorServer)

//listen
app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`)
})