import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

const showcaseItems = [
  {
    image: "/ai-generated-mountain-landscape-with-dramatic-peak.jpg",
    title: "Ultra-Fast Mountain Generation",
    description: "Created in 0.8 seconds with Nano Banana's optimized neural engine",
    time: "0.8s",
  },
  {
    image: "/ai-generated-beautiful-garden-with-colorful-flower.jpg",
    title: "Instant Garden Creation",
    description: "Complex scene rendered in milliseconds using Nano Banana technology",
    time: "0.6s",
  },
  {
    image: "/ai-generated-tropical-beach-scene-with-crystal-cle.jpg",
    title: "Real-time Beach Synthesis",
    description: "Nano Banana delivers photorealistic results at lightning speed",
    time: "0.9s",
  },
  {
    image: "/ai-generated-aurora-borealis-night-sky-with-stars-.jpg",
    title: "Rapid Aurora Generation",
    description: "Advanced effects processed instantly with Nano Banana AI",
    time: "1.2s",
  },
]

export function ShowcaseSection() {
  return (
    <section id="showcase" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary mb-2">Showcase</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lightning-Fast AI Creations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">See what Nano Banana generates in milliseconds</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {showcaseItems.map((item, index) => (
            <Card key={index} className="overflow-hidden group">
              <div className="aspect-[3/2] relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">Nano Banana Speed</span>
                </div>
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                  {item.time}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Experience the power of Nano Banana yourself</p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Try Nano Banana Generator</Button>
        </div>
      </div>
    </section>
  )
}
