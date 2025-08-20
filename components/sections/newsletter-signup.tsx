"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { toast } from "sonner"

export function NewsletterSignup() {
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
    <section id="newsletter-signup" className="py-24">
      <div className="container mx-auto max-w-screen-xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">One paper in five minutes — weekly.</h2>
                <p className="text-muted-foreground">Join the newsletter for bite-sized summaries and new visuals.</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
