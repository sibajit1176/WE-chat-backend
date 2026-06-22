const { sendMessageService, getMessageService, uploadCloudinaryService } = require("./message.service")


const sendmessageControler = async (req, res) => {
    try {

        const result = await sendMessageService(
            req.user,
            req.body,
        );

        return res.status(201).json(result);

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

const getMessageController = async (req, res) => {
    try {
        const loginUserId = req.user.userId
        const { chatId } = req.params
        const result = await getMessageService(chatId, loginUserId)
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const uploadCloudControler = async (req, res) => {
    try {

        const result = await uploadCloudinaryService(
            req.user,
            req.file
        );

        return res.status(201).json(result);

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
};
module.exports = {
    sendmessageControler,
    getMessageController,
    uploadCloudControler
}