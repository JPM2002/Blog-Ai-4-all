"use client"

import Link from "next/link"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Plus, Eye, Save, ExternalLink } from "lucide-react"
import { toast } from "sonner"

interface EnhancedPaperFormProps {
  paper?: any
  isEdit?: boolean
}

export function EnhancedPaperForm({ paper, isEdit = false }: EnhancedPaperFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("edit")

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
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const url = isEdit ? `/api/admin/papers/${paper.id}` : "/api/admin/papers"
      const method = isEdit ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          slug,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save paper")
      }

      const savedPaper = await response.json()
      toast.success(isEdit ? "Paper updated successfully!" : "Paper created successfully!")

      // Redirect to preview if it's a new paper, or stay on edit page
      if (!isEdit) {
        router.push(`/admin/preview/paper/${slug}`)
      }
      router.refresh()
    } catch (error) {
      toast.error("Failed to save paper")
      console.error("Error saving paper:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAndPreview = async () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    // Save first
    await handleSubmit(new Event("submit") as any)

    // Then open preview in new tab
    window.open(`/admin/preview/paper/${slug}`, "_blank")
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button type="button" onClick={handleSaveAndPreview} variant="outline" disabled={loading}>
            <Eye className="mr-2 h-4 w-4" />
            Save & Preview
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : isEdit ? "Update Paper" : "Save Paper"}
          </Button>
        </div>
        {isEdit && paper?.slug && (
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/preview/paper/${paper.slug}`} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Preview
            </Link>
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Links & Tags</CardTitle>
                  <CardDescription>External resources and categorization</CardDescription>
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
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Live Preview
              </CardTitle>
              <CardDescription>See how your paper will appear to users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 bg-background">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-sans font-bold mb-2">{formData.title || "Untitled Paper"}</h1>
                    <p className="text-muted-foreground mb-4">
                      {formData.authors || "Unknown Authors"} • {formData.year} • {formData.difficulty}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {formData.abstract && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Abstract</h2>
                      <p className="text-muted-foreground leading-relaxed">{formData.abstract}</p>
                    </div>
                  )}

                  {formData.content && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3">Content Preview</h2>
                      <div className="prose prose-slate max-w-none dark:prose-invert">
                        <div className="whitespace-pre-wrap">{formData.content.substring(0, 1000)}...</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publication Settings</CardTitle>
              <CardDescription>Control how and when this paper is published</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Publication Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {formData.status === "draft"
                    ? "Paper is saved but not visible to users"
                    : "Paper is live and visible to all users"}
                </p>
              </div>

              <div className="space-y-2">
                <Label>URL Slug</Label>
                <Input
                  value={formData.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "")}
                  disabled
                />
                <p className="text-sm text-muted-foreground">
                  Generated automatically from the title. Paper will be available at /paper/[slug]
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
