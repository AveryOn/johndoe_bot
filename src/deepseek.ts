import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // Укажи API-ключ
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>", // Необязательно
    "X-Title": "<YOUR_SITE_NAME>", // Необязательно
  },
});

export async function getResponse(msg: string) {
  const completion = await client.chat.completions.create({
    model: "deepseek/deepseek-r1:free",
    messages: [{ role: "user", content: msg }],
  });

  return completion;
}
