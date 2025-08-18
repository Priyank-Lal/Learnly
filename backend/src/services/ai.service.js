const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

const generateTask = async (goal, days, dueDate) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
    Goal: ${goal}
    Complete Goal By: ${dueDate}
    Target completion date: ${days}
       
Create a sequence of micro-goals to achieve the target in the given time.
Rules:
1. Keep output under 100 words.
2. Use only a numbered list.
3. No dates in the response.
4. Each step should start with an action verb.
5. Distribute difficulty evenly over time.
  `,
    config: {
      systemInstruction: `
      You are an expert productivity planner.
      You always return results in clean numbered list format without any extra explanation.
      Each list item is a micro-goal that can be completed in sequence.
    `,
    },
  });

  return response.text;
};

const generateCategory = async (goal) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Classify the following goal title into one of these categories ONLY:
          ["Learning", "Career", "Health", "Personal", "Other"].

          Return ONLY the category name, nothing else.

          Goal Title: "${goal}"`,

    config: {
      systemInstruction: `You are a strict classifier. Always reply with exactly one word from: Learning, Career, Health, Personal, Other. No explanations, no sentences.`,
    },
  });

  return response.text.trim();
};

module.exports = {
  generateCategory,generateTask
};
