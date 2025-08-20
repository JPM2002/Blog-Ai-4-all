"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, BookOpen } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { markPaperAsRead, getUserPaperProgress } from "@/lib/progress"
import { toast } from "sonner"

interface PaperProgressTrackerProps {
  paperSlug: string
  paperTitle: string
}

export function PaperProgressTracker({ paperSlug, paperTitle }: PaperProgressTrackerProps) {
  const { user } = useAuth()
  const [isCompleted, setIsCompleted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      checkProgress()
    }
  }, [user, paperSlug])

  const checkProgress = async () => {
    try {
      const progress = await getUserPaperProgress(paperSlug)
      setIsCompleted(progress?.completed || false)
    } catch (error) {
      console.error("Error checking progress:", error)
    }
  }

  const handleMarkAsRead = async () => {
    if (!user) {
      toast.error("Please sign in to track your progress")
      return
    }

    setLoading(true)
    try {
      await markPaperAsRead(paperSlug)
      setIsCompleted(true)
      toast.success("Paper marked as read!")
    } catch (error) {
      toast.error("Failed to update progress")
      console.error("Error marking paper as read:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <BookOpen className="h-4 w-4" />
        <span>Sign in to track your progress</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        onClick={handleMarkAsRead}
        disabled={loading || isCompleted}
        variant={isCompleted ? "secondary" : "default"}
        size="sm"
        className="flex items-center gap-2"
      >
        {isCompleted ? (
          <>
            <CheckCircle className="h-4 w-4" />
            Completed
          </>
        ) : (
          <>
            <Circle className="h-4 w-4" />
            {loading ? "Marking..." : "Mark as Read"}
          </>
        )}
      </Button>
      {isCompleted && <div className="text-sm text-muted-foreground">Great job! You've completed this paper.</div>}
    </div>
  )
}
