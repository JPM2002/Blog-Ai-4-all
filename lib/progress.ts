import { supabase } from "@/lib/supabase/client"

export interface UserProgress {
  id: string
  user_id: string
  roadmap_node_id?: string
  paper_slug?: string
  completed: boolean
  completed_at?: string
  created_at: string
  updated_at: string
}

// Client-side functions
export async function markPaperAsRead(paperSlug: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("User not authenticated")

  const { data, error } = await supabase
    .from("user_paper_progress")
    .upsert({
      user_id: user.id,
      paper_slug: paperSlug,
      completed: true,
      completed_at: new Date().toISOString(),
    })
    .select()

  if (error) throw error
  return data
}

export async function markRoadmapNodeAsCompleted(nodeId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("User not authenticated")

  const { data, error } = await supabase
    .from("user_progress")
    .upsert({
      user_id: user.id,
      roadmap_node_id: nodeId,
      completed: true,
      completed_at: new Date().toISOString(),
    })
    .select()

  if (error) throw error
  return data
}

export async function getUserPaperProgress(paperSlug: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from("user_paper_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("paper_slug", paperSlug)
    .single()

  if (error && error.code !== "PGRST116") throw error
  return data
}

export async function getUserRoadmapProgress(nodeId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("roadmap_node_id", nodeId)
    .single()

  if (error && error.code !== "PGRST116") throw error
  return data
}

export async function getUserProgressStats(userId: string) {
  // This is a client-side fallback - for server-side use, import from progress-server.ts
  const [paperProgress, roadmapProgress] = await Promise.all([
    supabase.from("user_paper_progress").select("*").eq("user_id", userId).eq("completed", true),
    supabase.from("user_progress").select("*").eq("user_id", userId).eq("completed", true),
  ])

  return {
    papersCompleted: paperProgress.data?.length || 0,
    roadmapNodesCompleted: roadmapProgress.data?.length || 0,
  }
}
