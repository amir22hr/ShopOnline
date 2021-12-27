const { Router } = require('express')
const { body } = require('express-validator');

//configs
const router = new Router();

//Controllers
const loginController = require('../controllers/auth/loginController')
const registerController = require('../controllers/auth/registerController')
const forgetPasswordController = require('../controllers/auth/forgetPasswordController')
const validController = require('../controllers/auth/validController')
const logoutController = require('../controllers/auth/logoutController')
const deleteAccountController = require('../controllers/auth/deleteAccountController')
//github
const githubController = require('../controllers/auth/github/githubController')
const githubCallbackController = require('../controllers/auth/github/githubCallbackController')
//google
const googleController = require('../controllers/auth/google/googleController')
const googleCallbackController = require('../controllers/auth/google/googleCallbackController')

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
//Logout
router.get('/logout', logoutController)
//Delete Account
router.get('/deleteAccount', deleteAccountController)
//Login with github
router.get('/github', githubController)
router.get('/github/callback', githubCallbackController)
//Login with Google
router.get('/google', googleController)
router.get('/google/callback', googleCallbackController)


module.exports = router