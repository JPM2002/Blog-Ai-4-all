"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  const scrollToNewsletter = () => {
    document.getElementById("newsletter-signup")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-24 md:py-32">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">AI papers, demystified.</h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Understand foundational AI/ML research through visuals, beginner-friendly guides, and a structured
                learning path.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <a href="/roadmap">
                  Start learning free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" onClick={scrollToNewsletter}>
                Join the newsletter
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="px-3 py-1">
                Beginner-friendly
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Free to start
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                No fluff
              </Badge>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <span className="text-lg font-semibold">AI Research Made Simple</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-sm">Visual explanations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-sm">Step-by-step breakdowns</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-sm">Interactive learning path</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
