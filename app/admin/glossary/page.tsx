import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default async function GlossaryManagementPage() {
  const supabase = createClient()

  const { data: terms, error } = await supabase.from("glossary_terms").select("*").order("term")

  if (error) {
    console.error("Error fetching glossary terms:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sans font-bold">Glossary Management</h1>
          <p className="text-muted-foreground">Manage AI/ML terminology and definitions</p>
        </div>
        <Button asChild>
          <Link href="/admin/glossary/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Term
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{terms?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(terms?.map((t) => t.category).filter(Boolean)).size || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Additions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {terms?.filter((t) => {
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return new Date(t.created_at) > weekAgo
              }).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Glossary Terms</CardTitle>
          <CardDescription>Manage AI/ML terminology definitions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Term</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Definition</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {terms?.map((term) => (
                <TableRow key={term.id}>
                  <TableCell className="font-medium">{term.term}</TableCell>
                  <TableCell>{term.category && <Badge variant="outline">{term.category}</Badge>}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="truncate">{term.definition}</p>
                  </TableCell>
                  <TableCell>{new Date(term.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/glossary/${term.id}/edit`}>
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
              {(!terms || terms.length === 0) && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No glossary terms found. Create your first term to get started.
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
