import { EnhancedPaperForm } from "@/components/admin/enhanced-paper-form"

export default function NewPaperPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-sans font-bold">Create New Paper</h1>
        <p className="text-muted-foreground">Add a new research paper to the platform</p>
      </div>

      <EnhancedPaperForm />
    </div>
  )
}
