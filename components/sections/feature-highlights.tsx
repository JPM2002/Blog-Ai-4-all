"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { BookOpen, Layers, HelpCircle, TrendingUp, Brain, Users } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Wiki-style entries",
    description: "Comprehensive breakdowns with cross-references.",
  },
  {
    icon: Layers,
    title: "Beginner → Deep-dive layers",
    description: "Start simple, go as deep as you want.",
  },
  {
    icon: HelpCircle,
    title: "Glossary tooltips",
    description: "Hover over terms for instant definitions.",
  },
  {
    icon: TrendingUp,
    title: "Progress tracking",
    description: "See your learning journey unfold.",
  },
  {
    icon: Brain,
    title: "Quizzes & flashcards",
    description: "Reinforce your understanding.",
  },
  {
    icon: Users,
    title: "Community reading groups",
    description: "Learn together with peers.",
  },
]

export function FeatureHighlights() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
