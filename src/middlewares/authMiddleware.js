const jwt=require('jsonwebtoken')

const authMiddleware= async(req,res,next)=>{
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
       throw new Error("Invalid token")
    }
    const decode=jwt.verify(
        token,
        process.env.SECRET_key
    )
    req.user=decode
    next()
  } catch (error) {
    error.statusCode = error.statusCode || 401;
    next(error)
  }
}
module.exports=authMiddleware