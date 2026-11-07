const {Router} = require('express')
const authController = require('../controller/auth.controller')

const authRouter = Router()

authRouter.post('/register',authController.registeruserController)


module.exports = authRouter
