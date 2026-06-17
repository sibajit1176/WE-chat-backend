const {Sequelize, DataTypes}=require('sequelize')
const db=require('../config/db')

const chatmemberEntity=db.define('chatmemberEntity',{
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true
    },
    chatId:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    userId:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    joinDate:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    },
    
})

module.exports=chatmemberEntity