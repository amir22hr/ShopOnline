const { Router } = require('express')
const checkAuth = require('../helpers/Auth/checkAuthenticated')

//configs
const router = new Router();

//Controllers
const mainController = require('../controllers/mainController');
const productController = require('../controllers/Products/productController')
const authRoute = require('../routes/auth')
const userRoute = require('../routes/user')
const Products = require('../routes/products')

//Main
router.get('/', mainController)
//Product
router.get('/product/:id', productController)
//Authentication
router.use('/auth', checkAuth.isLoggedIn, authRoute)
//User
router.use('/user', checkAuth.checkAuthenticated, userRoute)
//Products Tools
router.use('/', checkAuth.checkAuthenticated, Products)

module.exports = router