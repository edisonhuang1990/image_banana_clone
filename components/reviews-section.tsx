import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "AIArtistPro",
    role: "Digital Creator",
    avatar: "/professional-digital-artist-avatar.jpg",
    content:
      "This editor completely changed my workflow. The character consistency is incredible - miles ahead of Flux Kontext!",
    rating: 5,
  },
  {
    name: "ContentCreator",
    role: "UGC Specialist",
    avatar: "/content-creator-professional-headshot.jpg",
    content:
      "Creating consistent AI influencers has never been easier. It maintains perfect face details across edits!",
    rating: 5,
  },
  {
    name: "PhotoEditor",
    role: "Professional Editor",
    avatar: "/photo-editor-professional-portrait.jpg",
    content: "One-shot editing is basically solved with this tool. The scene blending is so natural and realistic!",
    rating: 5,
  },
  {
    name: "MarketingPro",
    role: "Brand Manager",
    avatar: "/marketing-professional-business-headshot.jpg",
    content: "Our marketing team's productivity has skyrocketed. We create stunning visuals in seconds now!",
    rating: 5,
  },
  {
    name: "DesignLead",
    role: "Creative Director",
    avatar: "/creative-director-artistic-portrait.jpg",
    content: "The natural language understanding is phenomenal. It just gets what I want every single time.",
    rating: 5,
  },
  {
    name: "SocialMedia",
    role: "Influencer",
    avatar: "/social-media-influencer-stylish-portrait.jpg",
    content: "My content game has leveled up completely. The AI-generated images look absolutely authentic!",
    rating: 5,
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary mb-2">User Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Creators Are Saying</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators who have transformed their workflow with Nano Banana
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                    <AvatarFallback>{review.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">"{review.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
