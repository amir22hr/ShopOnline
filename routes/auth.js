const { Router } = require('express')
const { body } = require('express-validator');

//configs
const router = new Router();

//Controllers
const loginController = require('../controllers/auth/loginController')
const registerController = require('../controllers/auth/registerController')
const forgetPasswordController = require('../controllers/auth/forgetPasswordController')
const validController = require('../controllers/auth/validController')

//Login 
router.get('/login', loginController.get)
router.post('/login', loginController.post)
//Sign Up
router.get('/register', registerController.get)
router.post('/register', body('email').isEmail(), body('password').isLength({ min: 5 }), registerController.post)
//Forget
router.post('/forget', forgetPasswordController)
//Validation
router.get('/valid', validController)

module.exports = router