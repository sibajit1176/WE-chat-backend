const {Sequelize, DataTypes}=require('sequelize')
const db=require('../config/db')

const chatEntity = db.define('chatEntity',{
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true
    },
    chatType:{
        type:DataTypes.ENUM(
            'group',
            'private'
        ),
        allowNull:false
    },
    groupName:{
        type:DataTypes.STRING,
        allowNull:true
    },
    groupImage:{
        type:DataTypes.STRING,
        allowNull:true
    },
    chatKey:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdById:{
        type:DataTypes.BIGINT,
        allowNull:false
    }
})

module.exports=chatEntity