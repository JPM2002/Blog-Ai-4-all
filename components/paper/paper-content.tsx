import { AttentionPaper } from "@/content/papers/attention-is-all-you-need"

interface PaperContentProps {
  slug: string
}

export function PaperContent({ slug }: PaperContentProps) {
  // In a real app, this would dynamically load the correct paper content
  switch (slug) {
    case "attention-is-all-you-need":
      return <AttentionPaper />
    default:
      return <div>Paper content not found</div>
  }
}
