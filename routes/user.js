const { Router } = require('express')

//configs
const router = new Router();

//Controllers
const logoutController = require('../controllers/auth/logoutController')
const deleteAccountController = require('../controllers/auth/deleteAccountController')

//Logout
router.get('/logout', logoutController)
//Delete Account
router.get('/deleteAccount', deleteAccountController)

module.exports = router