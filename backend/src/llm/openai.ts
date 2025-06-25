import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateText = async (prompt: string): Promise<string> => {
  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150,
    });
    return response.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate text from OpenAI");
  }
};