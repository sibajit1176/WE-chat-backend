const chatService=require('../chats/chat.service')

const createPrivatechatcontroller=async (req,res)=>{
    try {
        const loginUserId=req.user.userId
        const {phno}=req.body
        const result = await chatService.createPrivatechatService(loginUserId,phno)
        return res.status(201).json(result)

    } catch (error) {
          return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
const createGroupchatcontroller=async (req,res)=>{
    try {
        const loginUserId=req.user.userId
        const result = await chatService.createGroupChatService(loginUserId,req.body)
        return res.status(201).json(result)

    } catch (error) {
          return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const getPrivateChatMemberofLoginUser=async(req,res)=>{
    try {
        const loginUserId=req.user.userId
        const result=await chatService.getPrivateChatMemberofLoginUser(loginUserId)
        return res.status(200).json(result)
        
    } catch (error) {
          return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const getGroupChatscontroller=async(req,res)=>{
    try {
        const  loginUserId=req.user.userId
        const result =await chatService.getGroupschat(loginUserId)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createPrivatechatcontroller,
    getPrivateChatMemberofLoginUser,
    createGroupchatcontroller,
    getGroupChatscontroller
};