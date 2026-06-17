const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const messageStatuse=sequelize.define('messageStatuse',{
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true
    },
    messageId:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM(
            'sent',
            'delivered',
            'read'
        )
    }

})