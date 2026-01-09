
import { GoogleGenAI } from "@google/genai";
import { RECIPES } from "../recipesData";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askChef = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres un chef experto especializado en las siguientes recetas: ${JSON.stringify(RECIPES.map(r => r.name))}. 
      Responde a la siguiente pregunta del usuario de forma amable y concisa en español: ${query}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error asking Gemini:", error);
    return "Lo siento, mi gorro de chef se ha caído. Inténtalo de nuevo en un momento.";
  }
};
