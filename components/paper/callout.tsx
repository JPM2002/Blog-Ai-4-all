import type React from "react"
import { cn } from "@/lib/utils"
import { Info, CheckCircle, AlertTriangle } from "lucide-react"

interface CalloutProps {
  variant?: "info" | "success" | "warning"
  children: React.ReactNode
}

export function Callout({ variant = "info", children }: CalloutProps) {
  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
  }

  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-100",
    success:
      "bg-green-50 border-green-200 text-green-900 dark:bg-green-950/50 dark:border-green-800 dark:text-green-100",
    warning:
      "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950/50 dark:border-yellow-800 dark:text-yellow-100",
  }

  const Icon = icons[variant]

  return (
    <div className={cn("border rounded-lg p-4 my-6", styles[variant])}>
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
