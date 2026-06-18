const UserEntity = require("../../models/usere.model")
const bcrypt=require('bcrypt')
const JWT=require('jsonwebtoken')

const signupService=async(payload)=>{
        const existinguser=await UserEntity.findOne({
            where:{
                phoneNo:payload.phno
            }
        })
        if(existinguser){
            throw new Error('Number allready exists')
        }
      const hashPassword=await bcrypt.hash(payload.password,10)
      const createUser=await UserEntity.create({
        name:payload.name,
        email:payload.email,
        phoneNo:payload.phno,
        password:hashPassword
      })
      return {
        name:createUser.name,
        email:createUser.email,
      }
}
const loginService = async (payload) => {

    const existingUser = await UserEntity.findOne({
        where: {
            phoneNo: payload.phno
        }
    });

    if (!existingUser) {
        throw new Error('User does not exist');
    }

    const isPasswordValid =
        await bcrypt.compare(
            payload.password,
            existingUser.password
        );

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const jwtPayload = {
        userId: existingUser.id,
        username: existingUser.name,
        email: existingUser.email,
        phoneNo: existingUser.phoneNo
    };

    const token = JWT.sign(
        jwtPayload,
        process.env.SECRET_KEY,
        {
            expiresIn: '1d'
        }
    );

    return {
        token
    };
};
const loginVerifyService = async (id) => {

    const validUser = await UserEntity.findOne({
        where:{
            id
        }
    });

    if (!validUser) {
        throw new Error("User not found");
    }

    return {
        success: true,
        message: "User details fetched successfully",
        data: {
            id: validUser.id,
            name: validUser.name,
            email: validUser.email,
            phno: validUser.phoneNo,
            profilePicture: validUser.profilePicture
        }
    };
};
module.exports={
    signupService,
    loginService,
    loginVerifyService
}