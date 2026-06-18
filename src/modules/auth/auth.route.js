const authMiddleware = require('../../middlewares/authMiddleware')
const loginsinupController = require('./auth.controller')

const route=require('express').Router()

route.post('/signup',loginsinupController.signup)
route.post('/login',loginsinupController.login)
route.get('/verify',authMiddleware,loginsinupController.isVerify)



module.exports=route