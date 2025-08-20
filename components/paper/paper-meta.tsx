"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Share, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface PaperMetaProps {
  paper: {
    title: string
    authors: string
    year: number
    tags: string[]
    difficulty: string
    pdf: string
  }
}

export function PaperMeta({ paper }: PaperMetaProps) {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link copied to clipboard!")
  }

  const handleMarkComplete = () => {
    // Store in localStorage for MVP
    localStorage.setItem(`paper-${paper.title}`, "completed")
    toast.success("Paper marked as complete!")
  }

  return (
    <div className="space-y-6 mb-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{paper.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span>{paper.authors}</span>
          <span>•</span>
          <span>{paper.year}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {paper.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
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
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <a href={paper.pdf} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open PDF
          </a>
        </Button>
        <Button variant="outline" onClick={handleMarkComplete}>
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark as complete
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  )
}
