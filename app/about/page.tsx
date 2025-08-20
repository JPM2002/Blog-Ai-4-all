import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Users, BookOpen, Heart, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & Lead Educator",
    bio: "PhD in ML, former researcher at Stanford. Passionate about making AI accessible to everyone.",
    avatar: "/professional-headshot.png",
  },
  {
    name: "Sarah Kim",
    role: "Content Creator",
    bio: "MS in Computer Science, specializes in visual explanations and educational content design.",
    avatar: "/professional-headshot.png",
  },
  {
    name: "Marcus Johnson",
    role: "Community Manager",
    bio: "Former educator with 10+ years experience building learning communities.",
    avatar: "/professional-headshot.png",
  },
]

const values = [
  {
    icon: Target,
    title: "Clarity over complexity",
    description: "We believe complex ideas can be explained simply without losing their essence.",
  },
  {
    icon: Users,
    title: "Community-driven learning",
    description: "Learning is better together. We foster collaboration and peer support.",
  },
  {
    icon: BookOpen,
    title: "Open and accessible",
    description: "Knowledge should be free and available to anyone with curiosity and dedication.",
  },
  {
    icon: Heart,
    title: "Beginner-friendly",
    description: "Everyone starts somewhere. We meet learners where they are, not where we think they should be.",
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4">
          About Us
        </Badge>
        <h1 className="text-4xl font-bold mb-4">Making AI research accessible to everyone</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're on a mission to demystify artificial intelligence research and make it understandable for students,
          educators, and curious minds everywhere.
        </p>
      </div>

      {/* Mission */}
      <div className="mb-16">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-lg leading-relaxed">
                AI research papers are often dense, jargon-heavy, and intimidating for newcomers. We believe that
                groundbreaking ideas should be accessible to anyone willing to learn. That's why we break down complex
                papers into visual, intuitive explanations that build understanding step by step.
              </p>
              <p className="text-lg leading-relaxed">
                Whether you're a student taking your first ML course, an educator looking for teaching resources, or a
                professional wanting to stay current with AI advances, we're here to help you understand the papers that
                are shaping our future.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Values */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These principles guide everything we do, from content creation to community building.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card key={index}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Team */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're a small but passionate team of educators, researchers, and community builders.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center space-y-4">
                <img
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover"
                />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <Badge variant="outline">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Story */}
      <div className="mb-16">
        <Card>
          <CardContent className="p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-center mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  AIPapers.dev started in 2023 when our founder, Alex, was teaching an introductory ML course and
                  noticed how many students struggled with reading research papers. Even bright, motivated students
                  would get lost in the mathematical notation and academic jargon.
                </p>
                <p>
                  After spending countless hours creating visual explanations and simplified breakdowns for class, Alex
                  realized there was a broader need for this type of content. Students everywhere were facing the same
                  challenges: papers were intimidating, prerequisites weren't clear, and there was no structured path
                  from beginner to advanced topics.
                </p>
                <p>
                  What started as course materials for one class has grown into a comprehensive platform used by
                  thousands of students, educators, and professionals worldwide. We're proud to be part of making AI
                  education more inclusive and accessible.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact */}
      <div className="text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have questions, suggestions, or want to contribute? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/community">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Join Discord
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:hello@aipapers.dev">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Us
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
