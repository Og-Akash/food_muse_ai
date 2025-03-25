import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPEN_ROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const aiModel = async (prompt: string) =>
  await openai.chat.completions.create({
    model: "google/gemini-2.0-flash-lite-001",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_object",
    },
});

const BASE_URL = "https://aigurulab.tech";

export const generateRecipeImage = async (recipeImagePrompt: string) => await axios.post(
    BASE_URL + "/api/generate-image",
    {
      width: 1024,
      height: 1024,
      input: recipeImagePrompt,
      model: "sdxl", //'flux'
      aspectRatio: "1:1", //Applicable to Flux model only
    },
    {
      headers: {
        "x-api-key": process.env.EXPO_PUBLIC_IMAGE_GENERATION_API_KEY, // Your API Key
        "Content-Type": "application/json", // Content Type
      },
    }
);
