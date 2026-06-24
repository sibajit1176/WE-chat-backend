const express=require('express')
const errorMiddleware = require('./middlewares/errormiddleware')
const authRoute=require('./modules/auth/auth.route')
const chatRoute=require('./modules/chats/chat.route')
const messageRoute=require('./modules/messages/message.route')
const aiRoutes=require('./modules/AI/ai.route')

const cors=require('cors')

const app=express()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Wechat run"
    })
})
app.use('/wechat',authRoute)
app.use('/wechat',chatRoute)
app.use('/wechat',messageRoute)
app.use('/wechat',aiRoutes)


app.use(errorMiddleware)

module.exports=app