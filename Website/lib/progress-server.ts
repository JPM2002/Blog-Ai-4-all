import { createClient } from "@/lib/supabase/server"

export async function getUserProgressStats(userId: string) {
  const supabase = createClient()

  const [paperProgress, roadmapProgress] = await Promise.all([
    supabase.from("user_paper_progress").select("*").eq("user_id", userId).eq("completed", true),
    supabase.from("user_progress").select("*").eq("user_id", userId).eq("completed", true),
  ])

  return {
    papersCompleted: paperProgress.data?.length || 0,
    roadmapNodesCompleted: roadmapProgress.data?.length || 0,
  }
}
