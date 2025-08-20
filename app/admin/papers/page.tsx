import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

export default async function PapersManagementPage() {
  const supabase = createClient()

  const { data: papers, error } = await supabase.from("papers").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching papers:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sans font-bold">Papers Management</h1>
          <p className="text-muted-foreground">Create, edit, and manage research papers</p>
        </div>
        <Button asChild>
          <Link href="/admin/papers/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Paper
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Papers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{papers?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{papers?.filter((p) => p.status === "published").length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{papers?.filter((p) => p.status === "draft").length || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Papers</CardTitle>
          <CardDescription>Manage your research paper collection</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Authors</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {papers?.map((paper) => (
                <TableRow key={paper.id}>
                  <TableCell className="font-medium">{paper.title}</TableCell>
                  <TableCell>{paper.authors}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <Badge variant={paper.status === "published" ? "default" : "secondary"}>{paper.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(paper.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/paper/${paper.slug}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/papers/${paper.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {(!papers || papers.length === 0) && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No papers found. Create your first paper to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
