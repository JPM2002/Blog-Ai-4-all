import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default async function RoadmapManagementPage() {
  const supabase = createClient()

  const { data: nodes, error } = await supabase.from("roadmap_nodes").select("*").order("position_x")

  if (error) {
    console.error("Error fetching roadmap nodes:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sans font-bold">Roadmap Management</h1>
          <p className="text-muted-foreground">Manage learning path nodes and connections</p>
        </div>
        <Button asChild>
          <Link href="/admin/roadmap/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Node
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nodes?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Beginner Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nodes?.filter((n) => n.difficulty === "Beginner").length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Advanced Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nodes?.filter((n) => n.difficulty === "Advanced").length || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Roadmap Nodes</CardTitle>
          <CardDescription>Manage learning path topics and their relationships</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Prerequisites</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nodes?.map((node) => (
                <TableRow key={node.id}>
                  <TableCell className="font-medium">{node.title}</TableCell>
                  <TableCell>{node.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        node.difficulty === "Beginner"
                          ? "secondary"
                          : node.difficulty === "Intermediate"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {node.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    ({node.position_x}, {node.position_y})
                  </TableCell>
                  <TableCell>{node.prerequisites?.length || 0} items</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/roadmap/${node.id}/edit`}>
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
              {(!nodes || nodes.length === 0) && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No roadmap nodes found. Create your first node to get started.
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
