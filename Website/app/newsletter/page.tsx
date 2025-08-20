"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Mail, Clock } from "lucide-react"
import { toast } from "sonner"

const benefits = [
  "One paper breakdown every week",
  "Visual explanations and diagrams",
  "Key insights in 5 minutes or less",
  "No spam, unsubscribe anytime",
]

const recentTopics = [
  "Attention Is All You Need",
  "ResNet: Deep Residual Learning",
  "BERT: Bidirectional Transformers",
  "GPT: Generative Pre-training",
]

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        toast.success("You're in! Check your inbox.")
        setEmail("")
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Mail className="h-4 w-4" />
            <span>Weekly Newsletter</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">One paper in five minutes — weekly.</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students and researchers who get bite-sized AI paper summaries delivered to their inbox
            every week.
          </p>
        </div>

        {/* Main Signup Card */}
        <Card className="mb-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading} size="lg">
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Short, clear, and practical. No spam. Unsubscribe anytime.
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Benefits Grid */}
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">What you'll get</h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Recent topics</h2>
            <div className="space-y-3">
              {recentTopics.map((topic, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="font-medium">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="text-2xl font-bold text-primary">5 min</div>
              <div className="text-sm text-muted-foreground">Average read time</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="text-2xl font-bold text-primary">Weekly</div>
              <div className="text-sm text-muted-foreground">Delivery schedule</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="text-2xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Subscribers</div>
            </CardContent>
          </Card>
        </div>

        {/* Sample Newsletter Preview */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Sample Newsletter</h2>
              <p className="text-muted-foreground">Here's what a typical issue looks like</p>
            </div>

            <div className="max-w-2xl mx-auto bg-muted/30 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">Issue #42</Badge>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>5 min read</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold">This Week: Attention Is All You Need</h3>

              <div className="space-y-2 text-sm">
                <p className="font-medium">TL;DR:</p>
                <p className="text-muted-foreground">
                  Self-attention replaces recurrence, enabling parallel processing and better long-range dependencies.
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium">Key Insight:</p>
                <p className="text-muted-foreground">
                  Think of attention as each word asking "which other words should I pay attention to?"
                </p>
              </div>

              <div className="pt-4 border-t text-xs text-muted-foreground">
                <p>Next week: We'll dive into BERT and bidirectional training...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
