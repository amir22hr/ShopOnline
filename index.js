//define
require('dotenv').config({ path: './variables.env' })
const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')

require('./config/db')
const router = require('./routes')
const HandlerError = require('./helpers/handlerError')
const initializePassPort = require('./helpers/Auth/initializePassPort');

//configs
const app = express()
const port = process.env.PORT
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
//check Session
app.use(session({
    // 1min = 60000 ms
    // 5min = 300000 ms
    // 30min = 1800000 ms
    // 1h = 3600000 ms
    // 2days = 172800000 ms
    cookie: { maxAge: 172800000 },
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_ID,
        touchAfter: 2 * 86400,// time period in seconds //2days
        autoRemove: 'native',
        
    })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
initializePassPort(app, passport)

// MiddleWares
app.use('/', router)

//handlerErrors
app.use(HandlerError.handleError404)
app.use(HandlerError.handleErrorServer)

//listen
app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`)
})