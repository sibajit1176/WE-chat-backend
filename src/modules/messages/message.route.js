const authMiddleware = require('../../middlewares/authMiddleware')
const { sendmessageControler, getMessageController } = require('./message.controler')

const route = require('express').Router()

route.post('/sendMessage',authMiddleware,sendmessageControler)
route.get('/getMessage/:chatId',authMiddleware,getMessageController)


module.exports=route