"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Eye } from "lucide-react"
import { toast } from "sonner"

interface PaperFormProps {
  paper?: any
  isEdit?: boolean
}

export function PaperForm({ paper, isEdit = false }: PaperFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const [formData, setFormData] = useState({
    title: paper?.title || "",
    authors: paper?.authors || "",
    year: paper?.year || new Date().getFullYear(),
    abstract: paper?.abstract || "",
    difficulty: paper?.difficulty || "Beginner",
    tags: paper?.tags || [],
    pdf_url: paper?.pdf_url || "",
    arxiv_url: paper?.arxiv_url || "",
    content: paper?.content || "",
    status: paper?.status || "draft",
  })

  const [newTag, setNewTag] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = isEdit ? `/api/admin/papers/${paper.id}` : "/api/admin/papers"
      const method = isEdit ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          slug: formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save paper")
      }

      toast.success(isEdit ? "Paper updated successfully!" : "Paper created successfully!")
      router.push("/admin/papers")
      router.refresh()
    } catch (error) {
      toast.error("Failed to save paper")
      console.error("Error saving paper:", error)
    } finally {
      setLoading(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((tag) => tag !== tagToRemove) })
  }

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-sans font-bold">Preview</h2>
          <Button onClick={() => setPreviewMode(false)} variant="outline">
            <X className="mr-2 h-4 w-4" />
            Close Preview
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{formData.title}</CardTitle>
            <CardDescription>
              {formData.authors} • {formData.year} • {formData.difficulty}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div>
                <h3 className="font-semibold mb-2">Abstract</h3>
                <p className="text-sm text-muted-foreground">{formData.abstract}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Content Preview</h3>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="text-sm whitespace-pre-wrap">{formData.content.substring(0, 500)}...</pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4">
        <Button type="button" onClick={() => setPreviewMode(true)} variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update Paper" : "Create Paper"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Core details about the research paper</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter paper title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="authors">Authors</Label>
              <Input
                id="authors"
                value={formData.authors}
                onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                placeholder="e.g., Smith et al."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Links & Resources</CardTitle>
            <CardDescription>External links and resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pdf_url">PDF URL</Label>
              <Input
                id="pdf_url"
                value={formData.pdf_url}
                onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                placeholder="https://arxiv.org/pdf/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arxiv_url">ArXiv URL</Label>
              <Input
                id="arxiv_url"
                value={formData.arxiv_url}
                onChange={(e) => setFormData({ ...formData, arxiv_url: e.target.value })}
                placeholder="https://arxiv.org/abs/..."
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Abstract</CardTitle>
          <CardDescription>Brief summary of the paper</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.abstract}
            onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
            placeholder="Enter paper abstract..."
            rows={4}
            required
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
          <CardDescription>Full paper content in Markdown format</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Enter paper content in Markdown..."
            rows={20}
            className="font-mono text-sm"
            required
          />
        </CardContent>
      </Card>
    </form>
  )
}
