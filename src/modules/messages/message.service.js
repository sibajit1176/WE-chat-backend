const { User,ChatMember } = require('../../models');
const Message = require('../../models/messages');

const sendMessageService = async (loginUserId, payload) => {

    const { chatId, message } = payload;
    const isMember = await ChatMember.findOne({
        where: {
            chatId,
            userId: loginUserId
        }
    });

    if (!isMember) {
        throw new Error("You are not a member of this chat");
    }

    const newMessage = await Message.create({
        chatId,
        senderId: loginUserId,
        messageType: "text",
        message
    });

    return {
        success: true,
        message: "Message sent successfully",
        data: newMessage
    };
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
        message: msg.message
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