const { createPrivatechatcontroller, getPrivateChatMemberofLoginUser } = require('./chat.controler')
const authMiddleware=require('../../middlewares/authMiddleware')


const route= require('express').Router()

route.post('/addMember',authMiddleware,createPrivatechatcontroller)
route.get('/getMember',authMiddleware,getPrivateChatMemberofLoginUser)

module.exports=route