"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { BookOpen, Lightbulb, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: BookOpen,
    title: "Pick a paper",
    description: "Each entry has TL;DRs, diagrams, and glossary popups.",
  },
  {
    icon: Lightbulb,
    title: "Read the friendly walkthrough",
    description: "From intuition → math → code pointers.",
  },
  {
    icon: CheckCircle,
    title: "Test yourself",
    description: "Micro-quizzes and flashcards to lock it in.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
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
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-primary">Step {index + 1}</div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <Tabs defaultValue="student" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">Student View</TabsTrigger>
            <TabsTrigger value="educator">Educator View</TabsTrigger>
          </TabsList>
          <TabsContent value="student" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  Perfect for beginners who want to understand AI research without getting lost in jargon. Start with
                  visual intuitions, then dive deeper into the math when you're ready.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="educator" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  Use our structured breakdowns to supplement your curriculum. Each paper includes teaching notes,
                  common misconceptions, and suggested exercises for your students.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
