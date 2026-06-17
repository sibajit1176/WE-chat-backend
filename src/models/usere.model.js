const {Sequelize, DataTypes}=require('sequelize')
const db=require('../config/db')

const UserEntity=db.define('userEntity',{
    id:{
        type:DataTypes.BIGINT,
       primaryKey:true,
       autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
     email:{
        type:DataTypes.STRING,
        allowNull:false,
        // unique:false
    },
    phoneNo:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    },
     password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isOnline:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    lastSeen:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    profilePicture:{
        type:DataTypes.STRING,
        allowNull:true
    }
    
})
module.exports=UserEntity