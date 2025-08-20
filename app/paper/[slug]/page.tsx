import { notFound } from "next/navigation"
import { PaperContent } from "@/components/paper/paper-content"
import { PaperMeta } from "@/components/paper/paper-meta"
import { TableOfContents } from "@/components/paper/table-of-contents"
import { PaperProgressTracker } from "@/components/progress/paper-progress-tracker"

// This would typically come from a CMS or database
const papers = {
  "attention-is-all-you-need": {
    title: "Attention Is All You Need",
    authors: "Vaswani et al.",
    year: 2017,
    tags: ["Transformer", "NLP", "Deep Learning", "Advanced"],
    difficulty: "Advanced",
    pdf: "https://arxiv.org/pdf/1706.03762.pdf",
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const paper = papers[params.slug as keyof typeof papers]

  if (!paper) {
    return {
      title: "Paper Not Found",
    }
  }

  return {
    title: `${paper.title} | AIPapers.dev`,
    description: `Learn about ${paper.title} by ${paper.authors} (${paper.year}) with beginner-friendly explanations and visuals.`,
  }
}

export default function PaperPage({ params }: { params: { slug: string } }) {
  const paper = papers[params.slug as keyof typeof papers]

  if (!paper) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <PaperMeta paper={paper} />
          <div className="mb-6">
            <PaperProgressTracker paperSlug={params.slug} paperTitle={paper.title} />
          </div>
          <PaperContent slug={params.slug} />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <TableOfContents />
          </div>
        </div>
      </div>
    </div>
  )
}
