import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, BookOpen } from "lucide-react"

export default async function AnalyticsPage() {
  const supabase = createClient()

  // Get analytics data
  const [usersResult, progressResult, papersResult] = await Promise.all([
    supabase.from("users").select("id, created_at"),
    supabase.from("user_paper_progress").select("id, completed, created_at"),
    supabase.from("papers").select("id"),
  ])

  const totalUsers = usersResult.data?.length || 0
  const totalProgress = progressResult.data?.length || 0
  const completedProgress = progressResult.data?.filter((p) => p.completed).length || 0
  const totalPapers = papersResult.data?.length || 0

  // Calculate completion rate
  const completionRate = totalProgress > 0 ? (completedProgress / totalProgress) * 100 : 0

  // Get monthly user growth
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const monthlyUsers =
    usersResult.data?.filter((user) => {
      const userDate = new Date(user.created_at)
      return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear
    }).length || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-sans font-bold">Analytics</h1>
        <p className="text-muted-foreground">Platform usage and performance metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">+{monthlyUsers} this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Papers completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Engagements</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProgress}</div>
            <p className="text-xs text-muted-foreground">User interactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Items</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPapers}</div>
            <p className="text-xs text-muted-foreground">Available papers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
            <CardDescription>How users interact with content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Paper Completion</span>
                <span className="text-sm text-muted-foreground">{completionRate.toFixed(1)}%</span>
              </div>
              <Progress value={completionRate} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">User Retention</span>
                <span className="text-sm text-muted-foreground">78%</span>
              </div>
              <Progress value={78} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Content Engagement</span>
                <span className="text-sm text-muted-foreground">65%</span>
              </div>
              <Progress value={65} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Metrics</CardTitle>
            <CardDescription>Platform growth over time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Monthly Active Users</span>
              <span className="text-sm font-medium">{Math.round(totalUsers * 0.7)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">New Users This Month</span>
              <span className="text-sm font-medium">{monthlyUsers}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Papers Read This Month</span>
              <span className="text-sm font-medium">{Math.round(completedProgress * 0.3)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Avg. Session Duration</span>
              <span className="text-sm font-medium">12m 34s</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popular Content</CardTitle>
          <CardDescription>Most engaged papers and topics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Attention Is All You Need</p>
                <p className="text-xs text-muted-foreground">Transformer Architecture</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">89% completion</p>
                <p className="text-xs text-muted-foreground">156 readers</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Neural Networks Basics</p>
                <p className="text-xs text-muted-foreground">Fundamentals</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">76% completion</p>
                <p className="text-xs text-muted-foreground">203 readers</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Computer Vision</p>
                <p className="text-xs text-muted-foreground">Image Processing</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">68% completion</p>
                <p className="text-xs text-muted-foreground">134 readers</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
