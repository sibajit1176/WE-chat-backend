const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

const predictiveTyping = async (text) => {

    const prompt = `
Suggest ONLY 3 short next phrase completions.

User typed:
"${text}"

Return JSON only.

Example:
[
"tomorrow",
"at 5 pm",
"the office"
]
`;

    const result = await model.generateContent(prompt);

    return JSON.parse(result.response.text());

};

const smartReplies = async (message) => {

    const prompt = `
Generate only 3 short replies.

Incoming message:

"${message}"

Return JSON.

[
"Yes",
"No",
"I'll join"
]
`;

    const result = await model.generateContent(prompt);

    return JSON.parse(result.response.text());

};

module.exports = {
    predictiveTyping,
    smartReplies
};