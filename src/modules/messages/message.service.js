const { User,ChatMember } = require('../../models');
const Message = require('../../models/messages');

const sendMessageService = async (user, payload) => {

    const { chatId, message ,messageType,fileUrl} = payload;
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
        messageType,
        message:message||"",
        fileUrl
    });
   
    return {
    success: true,
    message: "Message sent successfully",
    data: {
        messageId: newMessage.id,
        chatId: newMessage.chatId,
        userId: newMessage.senderId,
        message: newMessage.message,
        fileUrl,
        sent: newMessage.createdAt,
        userName:user.username,
        messageType
    }
    }
};

const uploadCloudinaryService = async (user,file) => {

    const isMember = await User.findOne({
        where: {
            id: user.userId
        }
    });

    if (!isMember) {
        throw new Error("You are not a member of this chat");
    }
    let messageType="text"
    let fileUrl=null
    if (file) {

        fileUrl = file.path;

        const mime = file.mimetype;

        if (mime.startsWith("image")) {
            messageType = "image";
        }
        else if (mime.startsWith("video")) {
            messageType = "video";
        }
        else if (mime.startsWith("audio")) {
            messageType = "audio";
        }
        else {
            messageType = "document";
        }

    }
   
    return {
    success: true,
    message: "Message sent successfully",
    data: {
        fileUrl,
        messageType
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
        sent:msg.createdAt,
        fileUrl:msg.fileUrl,
        messageType:msg.messageType
    }));

    return {
        success: true,
        message: "Messages fetched successfully",
        data: formattedMessages
    };
};

module.exports={
    sendMessageService,
    getMessageService,
    uploadCloudinaryService
}