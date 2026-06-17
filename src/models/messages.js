const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Message = sequelize.define(
    'messages',
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },

        chatId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },

        senderId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },

        messageType: {
            type: DataTypes.ENUM(
                'text',
                'image',
                'video',
                'document',
                'audio'
            ),
            defaultValue: 'text'
        },

        message: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        fileUrl: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = Message;