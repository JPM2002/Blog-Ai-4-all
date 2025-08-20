"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, ExternalLink, X } from "lucide-react"
import Link from "next/link"

interface PreviewToolbarProps {
  type: "paper" | "roadmap" | "glossary"
  item: any
  editUrl: string
  publicUrl?: string
  onClose?: () => void
}

export function PreviewToolbar({ type, item, editUrl, publicUrl, onClose }: PreviewToolbarProps) {
  return (
    <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Eye className="mr-1 h-3 w-3" />
            Preview Mode
          </Badge>
          <span className="text-sm text-muted-foreground">
            {item.status === "draft" ? "Draft" : "Published"} • Last updated{" "}
            {new Date(item.updated_at || item.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {publicUrl && (
            <Button variant="outline" size="sm" asChild>
              <Link href={publicUrl} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live
              </Link>
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <Link href={editUrl}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={onClose} asChild>
            <Link href={`/admin/${type}s`}>
              <X className="mr-2 h-4 w-4" />
              Close
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
