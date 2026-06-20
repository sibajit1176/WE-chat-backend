const { createPrivatechatcontroller, getPrivateChatMemberofLoginUser, createGroupchatcontroller, getGroupChatscontroller } = require('./chat.controler')
const authMiddleware=require('../../middlewares/authMiddleware')


const route= require('express').Router()

route.post('/addMember',authMiddleware,createPrivatechatcontroller)
route.get('/getMember',authMiddleware,getPrivateChatMemberofLoginUser)
route.post('/createGroup',authMiddleware,createGroupchatcontroller)
route.get('/getgroupChats',authMiddleware,getGroupChatscontroller)


module.exports=route