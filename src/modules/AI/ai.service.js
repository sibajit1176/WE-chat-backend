const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

const predictiveTyping = async (text) => {
    const prompt = `
You are a JSON API.

Suggest exactly 3 short next phrase completions.

User typed:
"${text}"

Rules:
- Return ONLY a valid JSON array.
- Do NOT use markdown.
- Do NOT use \`\`\`.
- Do NOT explain anything.

Example:
[
  "tomorrow",
  "at 5 pm",
  "the office"
]
`;

    const result = await model.generateContent(prompt);

    let response = result.response.text().trim();

    response = response
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    try {
        const suggestions = JSON.parse(response);

        if (!Array.isArray(suggestions)) {
            throw new Error("Response is not an array");
        }

        return suggestions.slice(0, 3);
    } catch (error) {
        console.error("Gemini response:", response);
        return [];
    }
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