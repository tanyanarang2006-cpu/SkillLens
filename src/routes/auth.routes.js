const {Router} = require('express')
const authController = require('../controller/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const authRouter = Router()
//user registers
authRouter.post('/register',authController.registeruserController)
//user logs in
authRouter.post('/login',authController.loginUserController)
//user logs out
authRouter.get('/logout',authController.logoutUserController)
//user checks profile-protected route
authRouter.get('/get-me',authMiddleware.authUser,authController.ProfileUserController)


module.exports = authRouter
