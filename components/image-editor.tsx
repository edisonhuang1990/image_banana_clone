"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, ImageIcon, Sparkles, X, Loader2 } from "lucide-react"
import { BananaIcon } from "./banana-icon"

export function ImageEditor() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      setError(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    noClick: true,
    noKeyboard: true,
  })

  useEffect(() => {
    if (!uploadedFile) {
      setUploadedImageUrl(null)
      return
    }

    const url = URL.createObjectURL(uploadedFile)
    setUploadedImageUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [uploadedFile])

  const handleGenerate = async () => {
    if (!uploadedFile || !prompt) return

    setIsGenerating(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("prompt", prompt)
      formData.append("image", uploadedFile)

      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      })

      const data = (await res.json()) as { images?: string[]; error?: string }

      if (!res.ok) {
        setError(data?.error ?? "Generation failed")
        setGeneratedImages([])
        return
      }

      setGeneratedImages(Array.isArray(data.images) ? data.images : [])
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed")
      setGeneratedImages([])
    } finally {
      setIsGenerating(false)
    }
  }

  const clearImage = () => {
    setUploadedFile(null)
    setGeneratedImages([])
    setError(null)
  }

  return (
    <section id="editor" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary mb-2">Get Started</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Try The AI Editor</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the power of Nano Banana's natural language image editing. Transform any photo with simple text
            commands.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Panel */}
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Prompt Engine</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Transform your image with AI-powered editing</p>

              {/* Image Upload Area */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Reference Image</label>
                {uploadedImageUrl ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <img src={uploadedImageUrl} alt="Uploaded" className="w-full h-full object-cover" />
                    <button
                      onClick={clearImage}
                      className="absolute top-2 right-2 p-1.5 bg-background/80 rounded-full hover:bg-background transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div
                      className={`
                        border-2 border-dashed rounded-lg p-8 text-center transition-colors
                        ${isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
                      `}
                    >
                      <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-4">
                        {isDragActive ? "Drop the image here" : "Drag & drop an image here"}
                      </p>
                      <Button type="button" variant="secondary" onClick={open} className="gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Add Image
                      </Button>
                      <p className="text-xs text-muted-foreground mt-3">PNG/JPG/WEBP, Max 10MB</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Prompt Input */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Main Prompt</label>
                <Textarea
                  placeholder="Describe what you want to change... e.g., 'Place the subject in a snowy mountain scene'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </div>

              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                disabled={!uploadedFile || !prompt || isGenerating}
                onClick={handleGenerate}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <BananaIcon className="w-5 h-5" />
                    Generate Now
                  </>
                )}
              </Button>

              {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Output Gallery</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Your ultra-fast AI creations appear here instantly</p>

              <div className="aspect-video rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                {generatedImages.length > 0 ? (
                  <img src={generatedImages[0]} alt="Generated" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <BananaIcon className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium mb-1">Ready for instant generation</p>
                    <p className="text-xs text-muted-foreground">Enter your prompt and unleash the power</p>
                  </div>
                )}
              </div>

              {generatedImages.length > 1 ? (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {generatedImages.slice(1).map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      className="aspect-square rounded-md overflow-hidden bg-muted"
                      onClick={() => setGeneratedImages([src, ...generatedImages.filter((x) => x !== src)])}
                      aria-label={`Select output ${i + 2}`}
                    >
                      <img src={src} alt={`Output ${i + 2}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
