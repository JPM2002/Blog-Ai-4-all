"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { InteractiveRoadmap } from "@/components/roadmap/interactive-roadmap"
import { ROADMAP_NODES } from "@/lib/roadmap-data"
import { BookOpen, Users, Target } from "lucide-react"
import Link from "next/link"

export default function RoadmapPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"compact" | "expanded">("expanded")
  const [isNodePanelOpen, setIsNodePanelOpen] = useState(false)

  const selectedNodeData = selectedNode ? ROADMAP_NODES.find((node) => node.id === selectedNode) : null

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId)
    setIsNodePanelOpen(true)
  }

  const handleGoToPapers = (topic: string) => {
    // This would filter papers by topic
    window.location.href = `/papers?topic=${encodeURIComponent(topic)}`
  }

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">AI/ML Learning Roadmap</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Follow a structured path from mathematical foundations to cutting-edge research. Click on any topic to explore
          papers and prerequisites.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as any)}>
            <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
            <ToggleGroupItem value="expanded">Expanded</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Interactive Roadmap */}
      <div className="mb-12">
        <Card className="p-6">
          <div className="h-[600px] w-full">
            <InteractiveRoadmap nodes={ROADMAP_NODES} onNodeClick={handleNodeClick} viewMode={viewMode} />
          </div>
        </Card>
      </div>

      {/* Learning Path Stats */}
      <div className="grid gap-6 md:grid-cols-3 mb-12">
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">8 Core Topics</h3>
              <p className="text-muted-foreground text-sm">From math basics to modern NLP</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Structured Learning</h3>
              <p className="text-muted-foreground text-sm">Prerequisites clearly mapped</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Community Driven</h3>
              <p className="text-muted-foreground text-sm">Learn with others</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Node Details Sheet */}
      <Sheet open={isNodePanelOpen} onOpenChange={setIsNodePanelOpen}>
        <SheetContent className="w-96">
          {selectedNodeData && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedNodeData.label}</SheetTitle>
              </SheetHeader>

              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{selectedNodeData.description}</p>
                </div>

                {selectedNodeData.prereq.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Prerequisites</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedNodeData.prereq.map((prereqId) => {
                        const prereqNode = ROADMAP_NODES.find((node) => node.id === prereqId)
                        return (
                          <Badge key={prereqId} variant="outline">
                            {prereqNode?.label || prereqId}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}

                {selectedNodeData.to.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Unlocks</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedNodeData.to.map((nextId) => {
                        const nextNode = ROADMAP_NODES.find((node) => node.id === nextId)
                        return (
                          <Badge key={nextId} variant="secondary">
                            {nextNode?.label || nextId}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Button className="w-full" onClick={() => handleGoToPapers(selectedNodeData.label)}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Go to papers
                  </Button>

                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/community">
                      <Users className="mr-2 h-4 w-4" />
                      Join study group
                    </Link>
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Learning Path</h4>
                  <p className="text-xs text-muted-foreground">
                    Complete prerequisites before starting this topic for the best learning experience.
                  </p>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
