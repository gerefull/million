import { GoogleGenAI } from "@google/genai";
import { AiConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePostContent = async (config: AiConfig): Promise<string> => {
  try {
    // Map creativity to temperature
    const tempMap = {
      low: 0.3,
      medium: 0.7,
      high: 0.95
    };

    const systemInstruction = `You are an expert Social Media Manager for Telegram channels. 
    Your goal is to write engaging, grammatically perfect posts.
    - strictly adhere to the requested language.
    - Use appropriate emojis but do not overdo it.
    - Do not use hashtags unless explicitly asked.
    - Keep paragraphs short and readable.`;

    const prompt = `
    Task: Write a Telegram post.
    Topic: ${config.topic}
    Language: ${config.postLanguage}
    Tone: ${config.tone}
    Target Audience: ${config.targetAudience || 'General'}
    Specific Context/Details to include: ${config.context || 'None'}
    
    The post should be approximately 50-100 words long.
    Output strictly only the post text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: tempMap[config.creativity],
      }
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to communicate with AI service.");
  }
};