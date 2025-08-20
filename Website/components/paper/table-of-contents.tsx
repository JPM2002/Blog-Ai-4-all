"use client"

import { useState, useEffect } from "react"

const sections = [
  { id: "tldr", title: "TL;DR" },
  { id: "why-matters", title: "Why This Paper Matters" },
  { id: "intuition", title: "Intuition" },
  { id: "math", title: "Key Equations" },
  { id: "visuals", title: "Visuals" },
  { id: "glossary", title: "Glossary" },
  { id: "quiz", title: "Quiz" },
  { id: "further-reading", title: "Further Reading" },
]

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -80% 0px" },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">On this page</h3>
      <nav className="space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`block w-full text-left text-sm py-1 px-2 rounded transition-colors ${
              activeSection === section.id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {section.title}
          </button>
        ))}
      </nav>
    </div>
  )
}
