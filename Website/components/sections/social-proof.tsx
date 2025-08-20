"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Brain, Map, Target } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "From confusion to clarity",
    description: "We turn dense math and jargon into visuals and analogies.",
  },
  {
    icon: Map,
    title: "Structured roadmap",
    description: "Foundations → Neural nets → Transformers → Advanced topics.",
  },
  {
    icon: Target,
    title: "Learn by doing",
    description: "Quizzes, flashcards, and mini projects after each paper.",
  },
]

export function SocialProof() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="text-center mb-16">
          <p className="text-muted-foreground">Built with students and educators in mind.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
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
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
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
