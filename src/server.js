require('dotenv').config()
require('./models')
const http=require('http')
const app=require('./app')
const sequelize=require('./config/db')
const {Server}=require('socket.io')


const PORT=process.env.PORT||6000
const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000"
    }
})


sequelize.authenticate()
.then(()=>{
    console.log('Database connected');
    return sequelize.sync({alter:true})    
}).then(()=>{
 
server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    
})
}).catch((err)=>{
    console.log(err);
    
})
