const { User,ChatMember } = require('../../models');
const Message = require('../../models/messages');

const sendMessageService = async (user, payload) => {

    const { chatId, message } = payload;
    const isMember = await ChatMember.findOne({
        where: {
            chatId,
            userId: user.userId
        }
    });

    if (!isMember) {
        throw new Error("You are not a member of this chat");
    }

    const newMessage = await Message.create({
        chatId,
        senderId: user.userId,
        messageType: "text",
        message
    });
    // const updatelastSeen=await User.update(
    //     {
    //         lastSeen:Date.now()
    //     },{
    //     where:{
    //         id:loginUserId
    //     }}
    // )

    return {
    success: true,
    message: "Message sent successfully",
    data: {
        messageId: newMessage.id,
        chatId: newMessage.chatId,
        userId: newMessage.senderId,
        message: newMessage.message,
        sent: newMessage.createdAt,
        userName:user.username
    }
    }
};

const getMessageService = async (chatId, loginUserId) => {
    const isMember = await ChatMember.findOne({
        where: {
            chatId,
            userId: loginUserId
        }
    });

    if (!isMember) {
        throw new Error("You are not a member of this chat");
    }

    const messages = await Message.findAll({
        where: {
            chatId,
            isDeleted: false
        },
        include: [
            {
                model: User,
                attributes: ["id", "name"]
            }
        ],
        order: [["createdAt", "ASC"]]
    });

    const formattedMessages = messages.map((msg) => ({
        messageId: msg.id,
        userId: msg.userEntity.id,
        userName: msg.userEntity.name,
        message: msg.message,
        sent:msg.createdAt
    }));

    return {
        success: true,
        message: "Messages fetched successfully",
        data: formattedMessages
    };
};

module.exports={
    sendMessageService,
    getMessageService
}