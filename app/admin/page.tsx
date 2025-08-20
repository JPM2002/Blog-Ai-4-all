import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, MapPin, BookMarked, TrendingUp, Activity } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = createClient()

  // Get statistics
  const [usersResult, papersResult, progressResult, glossaryResult] = await Promise.all([
    supabase.from("users").select("id, created_at, role").order("created_at", { ascending: false }),
    supabase.from("papers").select("id"),
    supabase.from("user_paper_progress").select("id, completed").eq("completed", true),
    supabase.from("glossary_terms").select("id"),
  ])

  const totalUsers = usersResult.data?.length || 0
  const totalPapers = papersResult.data?.length || 0
  const totalCompletions = progressResult.data?.length || 0
  const totalGlossaryTerms = glossaryResult.data?.length || 0

  // Get recent users (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const recentUsers = usersResult.data?.filter((user) => new Date(user.created_at) > sevenDaysAgo).length || 0

  // Get admin users
  const adminUsers = usersResult.data?.filter((user) => user.role === "admin").length || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-sans font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your AIPapers.dev platform</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">+{recentUsers} this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Papers</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPapers}</div>
            <p className="text-xs text-muted-foreground">Published papers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompletions}</div>
            <p className="text-xs text-muted-foreground">Papers completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Glossary Terms</CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGlossaryTerms}</div>
            <p className="text-xs text-muted-foreground">Definitions available</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user registrations and completions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usersResult.data?.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">New user registered</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Platform health and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database Status</span>
                <span className="text-xs text-green-600 font-medium">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Admin Users</span>
                <span className="text-xs font-medium">{adminUsers}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg. Completion Rate</span>
                <span className="text-xs font-medium">
                  {totalUsers > 0 ? Math.round((totalCompletions / totalUsers) * 100) : 0}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Content Health</span>
                <span className="text-xs text-green-600 font-medium">Good</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-3">
            <Card className="p-4 hover:bg-accent cursor-pointer transition-colors">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm font-medium">Add New Paper</span>
              </div>
            </Card>
            <Card className="p-4 hover:bg-accent cursor-pointer transition-colors">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Update Roadmap</span>
              </div>
            </Card>
            <Card className="p-4 hover:bg-accent cursor-pointer transition-colors">
              <div className="flex items-center gap-2">
                <BookMarked className="h-4 w-4" />
                <span className="text-sm font-medium">Manage Glossary</span>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
