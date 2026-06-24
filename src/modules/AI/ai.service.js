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

Return ONLY a JSON array.
Do not use markdown.
Do not wrap the response in \`\`\`json.
`;

    const result = await model.generateContent(prompt);

    let response = result.response.text().trim();

    response = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(response);
};

const smartReplies = async (message) => {

    const prompt = `
You are a JSON API.

Generate exactly 3 short, relevant replies to the incoming message.

Incoming message:
"${message}"

Rules:
- Return ONLY a valid JSON array.
- Do NOT use markdown.
- Do NOT use \`\`\`.
- Do NOT explain anything.
- Each reply should be concise.

Example:

[
  "Yes",
  "No",
  "I'll join"
]
`;

    const result = await model.generateContent(prompt);

    let response = result.response.text().trim();

    response = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    try {
        return JSON.parse(response);
    } catch (error) {
        console.error("Gemini response:", response);
        throw new Error("Invalid JSON returned by Gemini");
    }
};

module.exports = {
    predictiveTyping,
    smartReplies
};