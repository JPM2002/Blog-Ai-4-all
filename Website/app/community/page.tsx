import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DiscIcon as Discord, Users, Calendar, BookOpen, MessageCircle, Heart } from "lucide-react"

const studyGroups = [
  {
    name: "Beginner's Circle",
    description: "Perfect for those just starting their AI journey",
    members: 150,
    nextMeeting: "Sundays 2PM EST",
    topics: ["Math Basics", "Linear Algebra", "Gradient Descent"],
  },
  {
    name: "Transformer Deep Dive",
    description: "Advanced discussions on attention mechanisms",
    members: 89,
    nextMeeting: "Wednesdays 7PM EST",
    topics: ["Attention", "BERT", "GPT", "T5"],
  },
  {
    name: "Computer Vision Club",
    description: "CNNs, object detection, and visual AI",
    members: 124,
    nextMeeting: "Fridays 6PM EST",
    topics: ["CNNs", "ResNet", "Object Detection", "Segmentation"],
  },
]

const communityStats = [
  { label: "Active Members", value: "2,500+" },
  { label: "Study Groups", value: "12" },
  { label: "Papers Discussed", value: "150+" },
  { label: "Countries", value: "45" },
]

export default function CommunityPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Users className="h-4 w-4" />
          <span>Community</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Learn together, grow faster</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Join our vibrant community of AI enthusiasts, students, and researchers. Participate in study groups, ask
          questions, and contribute to making AI research more accessible.
        </p>
      </div>

      {/* Discord CTA */}
      <Card className="mb-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-8 text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Discord className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Join our Discord</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with fellow learners, get help with papers, share insights, and participate in live discussions.
            </p>
          </div>
          <Button size="lg" className="text-lg px-8" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Discord className="mr-2 h-5 w-5" />
              Join Discord Community
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Community Stats */}
      <div className="grid gap-6 md:grid-cols-4 mb-12">
        {communityStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center space-y-2">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Study Groups */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Weekly Reading Groups</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join structured study sessions where we break down papers together, discuss key concepts, and help each
            other learn.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {studyGroups.map((group, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{group.name}</h3>
                  <p className="text-muted-foreground text-sm">{group.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{group.members} members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{group.nextMeeting}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Current topics:</p>
                  <div className="flex flex-wrap gap-1">
                    {group.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Join Group
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How to Contribute */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">How to Contribute</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help us make AI research more accessible for everyone. There are many ways to get involved.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Write Summaries</h3>
                <p className="text-sm text-muted-foreground">
                  Help create beginner-friendly explanations of complex papers.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Answer Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Share your knowledge and help others understand concepts.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Spread the Word</h3>
                <p className="text-sm text-muted-foreground">
                  Help us reach more students who could benefit from accessible AI education.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Code of Conduct */}
      <Card>
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Code of Conduct</h2>
            <p className="text-muted-foreground">Our community guidelines for a welcoming environment</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 text-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Be respectful</h3>
                <p className="text-muted-foreground">
                  Treat all community members with kindness and respect, regardless of their experience level.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Stay on topic</h3>
                <p className="text-muted-foreground">
                  Keep discussions focused on AI/ML research, learning, and helping others understand concepts.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">No spam or self-promotion</h3>
                <p className="text-muted-foreground">
                  Avoid excessive self-promotion. Share resources that genuinely help the community learn.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Help others learn</h3>
                <p className="text-muted-foreground">
                  Remember that everyone is at a different stage. Be patient and encouraging with beginners.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
