import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PaperMeta } from "@/components/paper/paper-meta"
import { TableOfContents } from "@/components/paper/table-of-contents"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit } from "lucide-react"
import Link from "next/link"

export default async function PreviewPaperPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    notFound()
  }

  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    notFound()
  }

  // Get paper data
  const { data: paper, error } = await supabase.from("papers").select("*").eq("slug", params.slug).single()

  if (error || !paper) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Preview Header */}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Eye className="mr-1 h-3 w-3" />
              Preview Mode
            </Badge>
            <span className="text-sm text-muted-foreground">
              {paper.status === "draft" ? "Draft" : "Published"} • Last updated{" "}
              {new Date(paper.updated_at).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/papers/${paper.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/papers">Close Preview</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Paper Content */}
      <div className="container mx-auto max-w-screen-xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <PaperMeta paper={paper} />
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap">{paper.content}</div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
