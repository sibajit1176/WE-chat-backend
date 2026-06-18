const authService = require("./auth.service")

const signup = async (req, res, next) => {
    try {
        const data = await authService.signupService(req.body)
        res.status(201).send({
            success: true,
            message: 'Signup successful',
            data
        })

    } catch (error) {
        next(error)
    }
}
const login = async (req, res, next) => {
    try {
        const data = await authService.loginService(req.body)
        res.status(201).send({
            success: true,
            message: 'login successful',
            data
        })

    } catch (error) {
        next(error)
    }
}
const isVerify = async (req, res, next) => {
    try {
        const loginUserId = req.user.userId

        const data = await authService.loginVerifyService(loginUserId)
        res.status(200).send(data)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    signup,
    login,
    isVerify
}