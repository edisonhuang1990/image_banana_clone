import { NextResponse } from "next/server"
import { getOpenRouterClient } from "@/lib/openrouter"

export const runtime = "nodejs"

function fileToDataUrl(file: File) {
  return file.arrayBuffer().then((buf) => {
    const mime = file.type || "application/octet-stream"
    const base64 = Buffer.from(buf).toString("base64")
    return `data:${mime};base64,${base64}`
  })
}

type OpenRouterImageMessage = {
  images?: string[]
  content?: unknown
}

function extractImages(message: OpenRouterImageMessage) {
  if (Array.isArray(message.images) && message.images.length > 0) return message.images

  // Fallback if provider returns images via content parts instead of `message.images`.
  if (Array.isArray(message.content)) {
    const urls: string[] = []
    for (const part of message.content as any[]) {
      const url = part?.image_url?.url
      if (typeof url === "string") urls.push(url)
    }
    if (urls.length > 0) return urls
  }

  return []
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const prompt = String(formData.get("prompt") ?? "").trim()
    const image = formData.get("image")

    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 })
    }
    if (!(image instanceof File)) {
      return NextResponse.json({ error: "Missing image" }, { status: 400 })
    }

    if (image.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Image too large (max 10MB)" }, { status: 400 })
    }

    const imageUrl = await fileToDataUrl(image)
    const openai = getOpenRouterClient()

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-image",
      // OpenRouter's image generation guide recommends setting modalities.
      modalities: ["image", "text"],
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
    })

    const message = completion.choices?.[0]?.message as OpenRouterImageMessage | undefined
    const images = message ? extractImages(message) : []

    if (images.length === 0) {
      return NextResponse.json(
        { error: "No images returned from model", rawMessage: message ?? null },
        { status: 502 }
      )
    }

    return NextResponse.json({ images })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

