"use client"

import type React from "react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { GLOSSARY } from "@/lib/glossary"

interface TermProps {
  children: React.ReactNode
  "data-term": string
}

export function Term({ children, "data-term": term }: TermProps) {
  const definition = GLOSSARY.find((item) => item.term.toLowerCase() === term.toLowerCase())

  if (!definition) {
    return <span className="underline decoration-dotted">{children}</span>
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="underline decoration-dotted cursor-help text-primary">{children}</span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>{definition.short}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
