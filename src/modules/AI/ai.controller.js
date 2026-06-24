const aiService = require("./ai.service");

const predictiveTyping = async (req,res)=>{

    const suggestions =
        await aiService.predictiveTyping(req.body.text);

    res.json({
        success:true,
        data:suggestions
    });

};

const smartReplies = async(req,res)=>{

    const replies =
        await aiService.smartReplies(req.body.message);

    res.json({
        success:true,
        data:replies
    });

};

module.exports={
    predictiveTyping,
    smartReplies
};