const router=require("express").Router();

const controller=require("./ai.controller");

router.post("/predict",controller.predictiveTyping);

router.post("/reply",controller.smartReplies);

module.exports=router;