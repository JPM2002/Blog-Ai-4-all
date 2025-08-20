"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function SamplePaper() {
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
          <h2 className="text-3xl font-bold mb-4">Example: "Attention Is All You Need"</h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <blockquote className="border-l-4 border-primary pl-6 italic text-lg">
              "Self-attention replaces recurrence and convolution, learning token-to-token relationships in parallel,
              dramatically improving training efficiency and performance on translation tasks."
            </blockquote>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">What you'll learn:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>How self-attention mechanisms work</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>Why transformers revolutionized NLP</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span>The math behind query, key, and value</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-center">Self-Attention Visualization</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-mono bg-muted px-2 py-1 rounded">Query (Q)</div>
                      <div className="flex-1 h-px bg-primary/30 mx-4"></div>
                      <div className="text-sm font-mono bg-muted px-2 py-1 rounded">Key (K)</div>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">Attention weights computed</div>
                    <div className="flex items-center justify-center">
                      <div className="text-sm font-mono bg-primary/20 px-2 py-1 rounded">Value (V)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <a href="/paper/attention-is-all-you-need">
              Open the paper page template
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
