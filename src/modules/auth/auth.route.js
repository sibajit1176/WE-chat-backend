const loginsinupController = require('./auth.controller')

const route=require('express').Router()

route.post('/signup',loginsinupController.signup)
route.post('/login',loginsinupController.login)


module.exports=route