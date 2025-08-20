import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getUserProgressStats } from "@/lib/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, MapPin, Trophy, Clock } from "lucide-react"

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/signin")
  }

  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  const stats = await getUserProgressStats(user.id)

  // Get recent activity
  const { data: recentPapers } = await supabase
    .from("user_paper_progress")
    .select("paper_slug, completed_at")
    .eq("user_id", user.id)
    .eq("completed", true)
    .order("completed_at", { ascending: false })
    .limit(5)

  const { data: recentNodes } = await supabase
    .from("user_progress")
    .select("roadmap_node_id, completed_at")
    .eq("user_id", user.id)
    .eq("completed", true)
    .order("completed_at", { ascending: false })
    .limit(5)

  // Calculate progress percentages (assuming total counts)
  const totalPapers = 10 // This would come from your papers data
  const totalNodes = 15 // This would come from your roadmap data
  const paperProgress = (stats.papersCompleted / totalPapers) * 100
  const roadmapProgress = (stats.roadmapNodesCompleted / totalNodes) * 100

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-sans font-bold mb-2">Welcome back, {profile?.full_name || user.email}!</h1>
        <p className="text-muted-foreground">Track your learning progress and continue your AI/ML journey.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Papers Read</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.papersCompleted}</div>
            <p className="text-xs text-muted-foreground">{totalPapers - stats.papersCompleted} remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roadmap Progress</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.roadmapNodesCompleted}</div>
            <p className="text-xs text-muted-foreground">{totalNodes - stats.roadmapNodesCompleted} topics left</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((paperProgress + roadmapProgress) / 2)}%</div>
            <p className="text-xs text-muted-foreground">Keep up the great work!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">days learning</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Paper Progress</CardTitle>
            <CardDescription>
              {stats.papersCompleted} of {totalPapers} papers completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={paperProgress} className="mb-2" />
            <p className="text-sm text-muted-foreground">{paperProgress.toFixed(1)}% complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roadmap Progress</CardTitle>
            <CardDescription>
              {stats.roadmapNodesCompleted} of {totalNodes} topics mastered
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={roadmapProgress} className="mb-2" />
            <p className="text-sm text-muted-foreground">{roadmapProgress.toFixed(1)}% complete</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Papers</CardTitle>
            <CardDescription>Papers you've completed recently</CardDescription>
          </CardHeader>
          <CardContent>
            {recentPapers && recentPapers.length > 0 ? (
              <div className="space-y-2">
                {recentPapers.map((paper, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{paper.paper_slug.replace(/-/g, " ")}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(paper.completed_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No papers completed yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Topics</CardTitle>
            <CardDescription>Roadmap topics you've mastered</CardDescription>
          </CardHeader>
          <CardContent>
            {recentNodes && recentNodes.length > 0 ? (
              <div className="space-y-2">
                {recentNodes.map((node, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{node.roadmap_node_id}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(node.completed_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No topics completed yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
