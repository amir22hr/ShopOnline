const { Router } = require('express')
const authRoute = require('../routes/auth')
const Products = require('../routes/products')
const checkAuth = require('../helpers/Auth/checkAuthenticated')

//configs
const router = new Router();

//Controllers
const mainController = require('../controllers/mainController');
const productController = require('../controllers/Products/productController')
const logoutController = require('../controllers/auth/logoutController')
const deleteAccountController = require('../controllers/auth/deleteAccountController')

//Main
router.get('/', mainController)
//Product
router.get('/product/:id', productController)
//Logout
router.get('/logout', logoutController)
//Delete Account
router.get('/deleteAccount', deleteAccountController)

//Authentication
router.use('/auth', checkAuth.isLoggedIn, authRoute)
//Products Tools
router.use('/', checkAuth.checkAuthenticated, Products)

module.exports = router