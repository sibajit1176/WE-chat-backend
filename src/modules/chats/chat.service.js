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

        const data = {
            chatId: createChat.id,
            name: findchatMember.name,
            userid: findchatMember.id,
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
                        attributes: ["id", "name", "profilePicture","isOnline","lastSeen"]
                    }
                ]
            }
        ],

        attributes: [["id", "chatId"],"chatType"]
    });

    const formattedChats = chats.map(chat => ({
        chatId: chat.dataValues.chatId,
        userId: chat.otherMembers[0].userEntity.id,
        name: chat.otherMembers[0].userEntity.name,
        profilePicture: chat.otherMembers[0].userEntity.profilePicture,
        chatType:chat.dataValues.chatType,
        lastSeen:chat.otherMembers[0].userEntity.lastSeen,
        isOnline:chat.otherMembers[0].userEntity.isOnline
    }));

    return formattedChats;
};
const createGroupChatService = async (loginUserId, payload) => {

    return await sequelize.transaction(async (transaction) => {

        const { groupName, userIds } = payload;

        if (userIds.length > 50) {
            throw new Error("In One Group 50 Member allow")
        }
        const members = [...new Set(userIds)];

        if (!members.includes(loginUserId)) {
            members.push(loginUserId);
        }

        const users = await UserEntity.findAll({
            where: {
                id: members
            },
            transaction
        });

        if (users.length !== members.length) {
            throw new Error("One or more users are invalid");
        }

        const existingChat = await chatEntity.findOne({
            where: {
                groupName,
                chatType: "group",
                chatKey: payload.groupName,
                createdById: loginUserId
            },
            transaction
        });

        if (existingChat) {
            throw new Error("Group name already exists");
        }
        const createChat = await chatEntity.create(
            {
                chatType: "group",
                groupName,
                createdById: loginUserId,
                chatKey: payload.groupName
            },
            { transaction }
        );

        const chatMembers = members.map((userId) => ({
            chatId: createChat.id,
            userId
        }));

        await chatmemberEntity.bulkCreate(
            chatMembers,
            { transaction }
        );

        return {
            success: true,
            message: "Group created successfully",
            data: {
                chatId: createChat.id,
                groupName,
                members
            }
        };

    });

};
const getGroupschat = async (loginUserId) => {
    const groupChat = await chatEntity.findAll({
        where: {
            chatType: 'group',
        },
        include: [
            {
                model: chatmemberEntity,
                as: "myMembership",
                required: true,
                where: {
                    userId: loginUserId
                },
            }
        ], attributes: [
            ["id", "chatId"],
            "groupName",
            "groupImage",
            "chatType"
        ],

        order: [["createdAt", "DESC"]]
    });

    return groupChat.map(group => ({
        chatId: group.dataValues.chatId,
        groupName: group.groupName,
        groupImage: group.groupImage,
        chatType:group.chatType
    }));

};

module.exports = {
    createPrivatechatService,
    getPrivateChatMemberofLoginUser,
    createGroupChatService,
    getGroupschat
};