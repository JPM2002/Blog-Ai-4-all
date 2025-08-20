"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { GLOSSARY } from "@/lib/glossary"

// Extended glossary with more terms
const EXTENDED_GLOSSARY = [
  ...GLOSSARY,
  { term: "activation function", short: "Non-linear function applied to neuron outputs (ReLU, sigmoid, tanh)." },
  { term: "batch normalization", short: "Technique to normalize layer inputs for stable training." },
  { term: "convolutional layer", short: "Layer that applies filters to detect local patterns in data." },
  { term: "dropout", short: "Regularization technique that randomly sets some neurons to zero during training." },
  { term: "embedding", short: "Dense vector representation of discrete objects like words or tokens." },
  { term: "fine-tuning", short: "Adapting a pre-trained model to a specific task with additional training." },
  {
    term: "hyperparameter",
    short: "Configuration setting that controls the learning process (learning rate, batch size).",
  },
  { term: "loss function", short: "Function that measures the difference between predicted and actual outputs." },
  { term: "neural network", short: "Computational model inspired by biological neural networks." },
  { term: "optimizer", short: "Algorithm that updates model parameters to minimize the loss function." },
  { term: "pre-training", short: "Initial training phase on large datasets before task-specific fine-tuning." },
  {
    term: "recurrent neural network",
    short: "Network with connections that create loops, suitable for sequential data.",
  },
  { term: "transformer", short: "Architecture using self-attention mechanisms, foundation of modern NLP models." },
  { term: "weight", short: "Learnable parameter in neural networks that determines connection strength." },
]

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTerms = useMemo(() => {
    if (!searchQuery) return EXTENDED_GLOSSARY

    return EXTENDED_GLOSSARY.filter(
      (item) =>
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.short.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  const groupedTerms = useMemo(() => {
    const groups: Record<string, typeof EXTENDED_GLOSSARY> = {}

    filteredTerms.forEach((term) => {
      const firstLetter = term.term[0].toUpperCase()
      if (!groups[firstLetter]) {
        groups[firstLetter] = []
      }
      groups[firstLetter].push(term)
    })

    // Sort terms within each group
    Object.keys(groups).forEach((letter) => {
      groups[letter].sort((a, b) => a.term.localeCompare(b.term))
    })

    return groups
  }, [filteredTerms])

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">AI/ML Glossary</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Quick definitions for common AI and machine learning terms. Click on any term in our papers to see its
          definition.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search terms or definitions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Alphabet Navigation */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="font-semibold mb-4">Jump to letter</h3>
            <div className="grid grid-cols-6 lg:grid-cols-4 gap-2">
              {alphabet.map((letter) => {
                const hasTerms = groupedTerms[letter]?.length > 0
                return (
                  <button
                    key={letter}
                    onClick={() => scrollToLetter(letter)}
                    disabled={!hasTerms}
                    className={`p-2 text-sm rounded transition-colors ${
                      hasTerms
                        ? "hover:bg-primary/10 text-foreground"
                        : "text-muted-foreground cursor-not-allowed opacity-50"
                    }`}
                  >
                    {letter}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Terms List */}
        <div className="lg:col-span-3">
          {Object.keys(groupedTerms).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No terms found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedTerms)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([letter, terms]) => (
                  <div key={letter} id={`letter-${letter}`}>
                    <h2 className="text-2xl font-bold mb-4 text-primary">{letter}</h2>
                    <div className="space-y-4">
                      {terms.map((term, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">{term.term}</h3>
                                <Badge variant="outline" className="text-xs">
                                  Definition
                                </Badge>
                              </div>
                              <p className="text-muted-foreground leading-relaxed">{term.short}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-12 text-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">{EXTENDED_GLOSSARY.length}</div>
              <div className="text-sm text-muted-foreground">Terms defined</div>
              <p className="text-xs text-muted-foreground">More terms added regularly</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
