const chatEntity = require("../../models/chat.model")
const chatmemberEntity = require("../../models/chatmember")
const UserEntity = require("../../models/usere.model")
const sequelize = require('../../config/db');
const { Op } = require("sequelize");

const createPrivatechatService = async (loginUserId, phno) => {
    return await sequelize.transaction(async (transaction) => {
        const findchatMember = await UserEntity.findOne({
            where: {
                phoneNo: phno
            },
            transaction
        });

        if (!findchatMember) {
            throw new Error("Invalid user");
        }

        if (findchatMember.id === loginUserId) {
            throw new Error("You cannot chat with yourself");
        }

        const chatKey = `_${[loginUserId, findchatMember.id].sort().join("_")}_`;

        const existingChat = await chatEntity.findOne({
            where: {
                chatKey,
                chatType: "private"
            },
            transaction
        });

        if (existingChat) {
            return {
                success: true,
                message: "Chat already exists",
                chatId: existingChat.id
            };
        }

        const createChat = await chatEntity.create(
            {
                chatType: "private",
                createdById: loginUserId,
                chatKey
            },
            { transaction }
        );

        await chatmemberEntity.bulkCreate(
            [
                {
                    chatId: createChat.id,
                    userId: loginUserId,
                },
                {
                    chatId: createChat.id,
                    userId: findchatMember.id,

                }
            ],
            { transaction }
        );

        const data={
            chatId:createChat.id,
            name:findchatMember.name,
            userid:findchatMember.id,
        }

        return {
            success: true,
            message: "Chat created successfully",
            data
        };
    });
};
const getPrivateChatMemberofLoginUser = async (loginUserId) => {

    const chats = await chatEntity.findAll({
        where: {
            chatType: "private"
        },

        include: [
            {
                model: chatmemberEntity,
                as: "myMembership",
                required: true,
                where: {
                    userId: loginUserId
                },
                attributes: []
            },
            {
                model: chatmemberEntity,
                as: "otherMembers",
                required: true,
                where: {
                    userId: {
                        [Op.ne]: loginUserId
                    }
                },
                attributes: ["chatId"],

                include: [
                    {
                        model: UserEntity,
                        attributes: ["id", "name", "profilePicture"]
                    }
                ]
            }
        ],

        attributes: [["id", "chatId"]]
    });

    const formattedChats = chats.map(chat => ({
        chatId: chat.dataValues.chatId,
        userId: chat.otherMembers[0].userEntity.id,
        name: chat.otherMembers[0].userEntity.name,
        profilePicture: chat.otherMembers[0].userEntity.profilePicture
    }));

    return formattedChats;
};


module.exports = {
    createPrivatechatService,
    getPrivateChatMemberofLoginUser
};