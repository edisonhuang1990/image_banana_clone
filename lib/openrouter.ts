import OpenAI from "openai"

function requiredEnv(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required env var: ${name}`)
  return value
}

export function getOpenRouterClient() {
  const apiKey = requiredEnv("OPENROUTER_API_KEY")

  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey,
    defaultHeaders: {
      // Optional; used by OpenRouter for rankings/analytics.
      "HTTP-Referer": process.env.SITE_URL ?? "http://localhost:3000",
      "X-Title": process.env.SITE_NAME ?? "image_banana_clone",
    },
  })
}

