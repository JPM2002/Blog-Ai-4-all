"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowRight, ChevronRight } from "lucide-react"

const roadmapNodes = [
  { id: "math", label: "Math Basics", description: "Linear algebra, calculus fundamentals" },
  { id: "gd", label: "Gradient Descent", description: "Optimization basics for neural networks" },
  { id: "backprop", label: "Backprop", description: "How neural networks learn" },
  { id: "cnns", label: "CNNs", description: "Convolutional neural networks for vision" },
  { id: "rnns", label: "RNNs", description: "Recurrent networks for sequences" },
  { id: "attention", label: "Attention", description: "The mechanism that changed everything" },
  { id: "transformers", label: "Transformers", description: "Modern architecture for NLP" },
  { id: "modern-nlp", label: "Modern NLP", description: "BERT, GPT, and beyond" },
]

export function RoadmapPreview() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">A guided path from zero to research-ready</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow a curated sequence of papers and concepts. Unlock topics as you progress.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4 mb-12">
          {roadmapNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-200 group">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm">{node.label}</h3>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-xs text-muted-foreground">{node.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <a href="/roadmap">
              See the full roadmap
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
