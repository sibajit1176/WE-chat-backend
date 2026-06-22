const authMiddleware = require('../../middlewares/authMiddleware')
const { sendmessageControler, getMessageController, uploadCloudControler } = require('./message.controler')
const upload=require('./message.middleware')

const route = require('express').Router()

route.post('/sendMessage',authMiddleware,sendmessageControler)
route.get('/getMessage/:chatId',authMiddleware,getMessageController)
route.post('/uploadFile',authMiddleware,upload.single('file'),uploadCloudControler)


module.exports=route