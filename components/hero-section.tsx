"use client"

import { BananaDecoration, BananaIcon } from "./banana-icon"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const scrollToEditor = () => {
    document.getElementById("editor")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToShowcase = () => {
    document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <BananaDecoration className="top-10 left-10 rotate-[-30deg]" />
      <BananaDecoration className="top-20 right-20 rotate-[45deg]" />
      <BananaDecoration className="bottom-10 left-1/4 rotate-[15deg]" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-8">
          <span className="text-2xl">🍌</span>
          <span className="text-sm font-medium">The AI model that outperforms Flux Kontext</span>
          <ArrowRight className="w-4 h-4" />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">Nano Banana</h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed text-balance">
          Transform any image with simple text prompts. Nano Banana's advanced model delivers consistent character
          editing and scene preservation that surpasses Flux Kontext. Experience the future of AI image editing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base px-8"
            onClick={scrollToEditor}
          >
            Start Editing
            <BananaIcon className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-base px-8 bg-transparent" onClick={scrollToShowcase}>
            View Examples
          </Button>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            One-shot editing
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Multi-image support
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Natural language
          </div>
        </div>
      </div>
    </section>
  )
}
