const { Router } = require('express')

//configs
const router = new Router();

//Controllers
const addCartController = require('../controllers/Products/addCartController')
const deleteCartController = require('../controllers/Products/deleteCartController')
const checkoutController = require('../controllers/Products/checkoutController')

//Add Cart
router.get('/add', addCartController)
//delete Cart
router.get('/delete', deleteCartController)
//checkout
router.get('/checkout', checkoutController)


module.exports = router