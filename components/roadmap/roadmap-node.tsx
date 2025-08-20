"use client"

import { Handle, Position } from "@xyflow/react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

interface RoadmapNodeProps {
  data: {
    label: string
    description: string
    prereq: string[]
    to: string[]
    onClick: () => void
    viewMode: "compact" | "expanded"
  }
}

export function RoadmapNode({ data }: RoadmapNodeProps) {
  const { label, description, prereq, onClick, viewMode } = data

  const isCompact = viewMode === "compact"

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Card
        className={`cursor-pointer hover:shadow-lg transition-all duration-200 group ${
          isCompact ? "min-w-[120px]" : "min-w-[200px]"
        }`}
        onClick={onClick}
      >
        <CardContent className={`${isCompact ? "p-3" : "p-4"} space-y-2`}>
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold ${isCompact ? "text-sm" : "text-base"} leading-tight`}>{label}</h3>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>

          {!isCompact && <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>}

          {prereq.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                {prereq.length} prereq{prereq.length > 1 ? "s" : ""}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </>
  )
}
