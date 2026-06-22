const multer=require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary=require('../../config/cloudinary')
const crypto=require('crypto')


const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {

        const type = file.mimetype.split("/")[0];
        const userId = req.user.userId;

        return {
            folder: `wechat/${type}/${userId}`,
            public_id: `msg_${Date.now()}_${crypto.randomBytes(8).toString("hex")}`,
            resource_type: "auto"
        };

    }
});
module.exports=multer({
    storage
})