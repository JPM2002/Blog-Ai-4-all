import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { EnhancedPaperForm } from "@/components/admin/enhanced-paper-form"

export default async function EditPaperPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

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

  const { data: paper, error } = await supabase.from("papers").select("*").eq("id", params.id).single()

  if (error || !paper) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-sans font-bold">Edit Paper</h1>
        <p className="text-muted-foreground">Update "{paper.title}"</p>
      </div>

      <EnhancedPaperForm paper={paper} isEdit={true} />
    </div>
  )
}
