
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we assume API_KEY is provided.
  console.error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

/**
 * Analyzes an image of a train compartment to determine if it's safe.
 * @param base64Image The base64 encoded image string.
 * @returns 'SAFE' or 'UNSAFE' based on the analysis.
 */
export const analyzeCompartmentImage = async (base64Image: string, mimeType: string): Promise<'SAFE' | 'UNSAFE' | 'ERROR'> => {
  try {
    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: base64Image,
      },
    };

    const textPart = {
      text: "Analyze this image of a train compartment. Are there two or fewer people, or is it completely empty? Respond with only the word 'UNSAFE' if it is empty or has two or fewer people. Otherwise, respond with only the word 'SAFE'. Do not add any other explanation.",
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });
    
    const text = response.text.trim().toUpperCase();

    if (text === 'SAFE' || text === 'UNSAFE') {
      return text;
    }
    
    console.warn("Unexpected Gemini API response:", response.text);
    return 'ERROR';

  } catch (error) {
    console.error("Error analyzing compartment image:", error);
    return 'ERROR';
  }
};

/**
 * Filters user feedback to check if it's relevant or spam.
 * @param feedbackText The text of the user's feedback.
 * @returns `true` if relevant, `false` if spam/troll.
 */
export const filterFeedback = async (feedbackText: string): Promise<boolean> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Classify the following user feedback for a women's safety app. Is it relevant and constructive feedback about safety in public transport, or is it spam, a troll comment, abusive, or completely off-topic? Respond with only 'RELEVANT' or 'SPAM'.\n\nFeedback: "${feedbackText}"`,
    });
    
    const classification = response.text.trim().toUpperCase();
    return classification === 'RELEVANT';
    
  } catch (error) {
    console.error("Error filtering feedback:", error);
    // Default to true to avoid blocking legitimate feedback on API error
    return true; 
  }
};
