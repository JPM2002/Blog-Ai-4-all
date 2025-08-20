"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { markRoadmapNodeAsCompleted, getUserRoadmapProgress } from "@/lib/progress"
import { toast } from "sonner"

interface RoadmapProgressTrackerProps {
  nodeId: string
  nodeTitle: string
}

export function RoadmapProgressTracker({ nodeId, nodeTitle }: RoadmapProgressTrackerProps) {
  const { user } = useAuth()
  const [isCompleted, setIsCompleted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      checkProgress()
    }
  }, [user, nodeId])

  const checkProgress = async () => {
    try {
      const progress = await getUserRoadmapProgress(nodeId)
      setIsCompleted(progress?.completed || false)
    } catch (error) {
      console.error("Error checking progress:", error)
    }
  }

  const handleMarkAsCompleted = async () => {
    if (!user) {
      toast.error("Please sign in to track your progress")
      return
    }

    setLoading(true)
    try {
      await markRoadmapNodeAsCompleted(nodeId)
      setIsCompleted(true)
      toast.success(`${nodeTitle} marked as completed!`)
    } catch (error) {
      toast.error("Failed to update progress")
      console.error("Error marking node as completed:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <Button
      onClick={handleMarkAsCompleted}
      disabled={loading || isCompleted}
      variant={isCompleted ? "secondary" : "outline"}
      size="sm"
      className="flex items-center gap-2"
    >
      {isCompleted ? (
        <>
          <CheckCircle className="h-4 w-4 text-green-500" />
          Completed
        </>
      ) : (
        <>
          <Circle className="h-4 w-4" />
          {loading ? "Marking..." : "Mark Complete"}
        </>
      )}
    </Button>
  )
}
