
import { GoogleGenAI, Type } from "@google/genai";
import { RECIPES } from "../recipesData";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askChef = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres un chef experto. Tu tarea es ayudar al usuario y detectar si quiere añadir una nueva receta a su colección.
      
      Recetas actuales: ${JSON.stringify(RECIPES.map(r => r.name))}.
      
      Si el usuario proporciona una receta nueva, extráela con cuidado.
      Si es solo una pregunta, responde normalmente.
      
      La respuesta debe ser SIEMPRE un objeto JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: {
              type: Type.STRING,
              description: "Tu respuesta conversacional al usuario."
            },
            newRecipe: {
              type: Type.OBJECT,
              description: "Datos de la receta si el usuario está intentando añadir una.",
              properties: {
                name: { type: Type.STRING },
                ingredients: { type: Type.STRING },
                instructions: { type: Type.STRING },
                type: { 
                  type: Type.STRING, 
                  description: "Debe ser 'caliente' o 'fresco'" 
                },
                image: { 
                  type: Type.STRING, 
                  description: "Un solo emoticono que represente el plato" 
                }
              }
            }
          },
          required: ["text"]
        },
        temperature: 0.7,
      },
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error asking Gemini:", error);
    return { text: "Lo siento, mi gorro de chef se ha caído. Inténtalo de nuevo en un momento." };
  }
};
