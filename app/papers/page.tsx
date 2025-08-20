"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, ExternalLink } from "lucide-react"
import Link from "next/link"

// Sample papers data
const papers = [
  {
    slug: "attention-is-all-you-need",
    title: "Attention Is All You Need",
    authors: "Vaswani et al.",
    year: 2017,
    tags: ["Transformer", "NLP", "Deep Learning", "Advanced"],
    difficulty: "Advanced",
    tldr: "Introduced the Transformer architecture using self-attention to model sequence dependencies without recurrence, enabling massive parallelism and state-of-the-art results.",
  },
  {
    slug: "deep-residual-learning",
    title: "Deep Residual Learning for Image Recognition",
    authors: "He et al.",
    year: 2015,
    tags: ["CNN", "Computer Vision", "ResNet", "Intermediate"],
    difficulty: "Intermediate",
    tldr: "Introduced residual connections that enable training of very deep neural networks by addressing the vanishing gradient problem.",
  },
  {
    slug: "gradient-descent-optimization",
    title: "An Overview of Gradient Descent Optimization Algorithms",
    authors: "Ruder, S.",
    year: 2016,
    tags: ["Optimization", "Theory", "Beginner"],
    difficulty: "Beginner",
    tldr: "Comprehensive overview of gradient descent variants and their applications in deep learning optimization.",
  },
]

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]
const topics = ["All", "NLP", "Computer Vision", "Theory", "Optimization", "Deep Learning"]

export default function PapersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [selectedTopic, setSelectedTopic] = useState("All")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = selectedDifficulty === "All" || paper.difficulty === selectedDifficulty
    const matchesTopic = selectedTopic === "All" || paper.tags.some((tag) => tag.includes(selectedTopic))

    return matchesSearch && matchesDifficulty && matchesTopic
  })

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Difficulty</h3>
        <div className="space-y-2">
          {difficulties.map((difficulty) => (
            <Button
              key={difficulty}
              variant={selectedDifficulty === difficulty ? "default" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => setSelectedDifficulty(difficulty)}
            >
              {difficulty}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Topic</h3>
        <div className="space-y-2">
          {topics.map((topic) => (
            <Button
              key={topic}
              variant={selectedTopic === topic ? "default" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">AI Papers Library</h1>
        <p className="text-muted-foreground text-lg">
          Explore our collection of AI/ML research papers with beginner-friendly explanations.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search papers by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Mobile Filter Button */}
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <FilterContent />
          </div>
        </div>

        {/* Papers Grid */}
        <div className="lg:col-span-3">
          {filteredPapers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No papers found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedDifficulty("All")
                  setSelectedTopic("All")
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredPapers.map((paper) => (
                <Card key={paper.slug} className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-lg leading-tight">{paper.title}</h3>
                        <Badge
                          variant={
                            paper.difficulty === "Beginner"
                              ? "secondary"
                              : paper.difficulty === "Intermediate"
                                ? "default"
                                : "destructive"
                          }
                        >
                          {paper.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {paper.authors} • {paper.year}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {paper.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong>TL;DR:</strong> {paper.tldr}
                    </p>

                    <div className="flex gap-2 pt-2">
                      <Button asChild className="flex-1">
                        <Link href={`/paper/${paper.slug}`}>Read</Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
