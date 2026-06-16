const {Sequelize, DataTypes}=require('sequelize')
const db=require('../config/db')

const UserEntity=db.define('userEntity',{
    id:{
        type:DataTypes.INTEGER,
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
    isPrime:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    totalAmount:{
        type:DataTypes.FLOAT,
        defaultValue:0.0
    }
    
})
module.exports=UserEntity