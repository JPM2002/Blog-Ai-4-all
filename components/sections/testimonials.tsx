"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const testimonials = [
  {
    quote: "Finally, AI papers that make sense! The visual explanations are game-changing.",
    author: "Sarah Chen",
    role: "CS Student",
    avatar: "/student-avatar.png",
  },
  {
    quote: "I use these breakdowns to supplement my ML course. Students love the clarity.",
    author: "Dr. Michael Rodriguez",
    role: "Professor",
    avatar: "/professor-avatar.png",
  },
  {
    quote: "The roadmap helped me transition from web dev to ML research. Incredible resource.",
    author: "Alex Kim",
    role: "ML Engineer",
    avatar: "/engineer-avatar.png",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-sm">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
