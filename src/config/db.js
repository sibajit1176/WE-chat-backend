const {Sequelize}=require('sequelize')

const sequelize=new Sequelize(
    process.env.dbname,
    process.env.dbUser,
    process.env.password,
    {
        host:'localhost',
        dialect:'mysql',
    }
)

module.exports=sequelize