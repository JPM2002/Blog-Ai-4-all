"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

interface Question {
  id: string
  type: "mcq"
  prompt: string
  options: string[]
  answer: number
}

interface QuizProps {
  questions: Question[]
}

export function Quiz({ questions }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState<Record<string, boolean>>({})

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }))
  }

  const checkAnswer = (questionId: string) => {
    setShowResults((prev) => ({ ...prev, [questionId]: true }))
  }

  return (
    <div className="space-y-6 my-8">
      <h3 className="text-xl font-semibold">Quiz</h3>
      {questions.map((question, qIndex) => {
        const userAnswer = answers[question.id]
        const showResult = showResults[question.id]
        const isCorrect = userAnswer === question.answer

        return (
          <Card key={question.id}>
            <CardContent className="p-6 space-y-4">
              <h4 className="font-medium">
                Question {qIndex + 1}: {question.prompt}
              </h4>

              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(question.id, index)}
                    disabled={showResult}
                    className={`w-full text-left p-3 rounded border transition-colors ${
                      userAnswer === index
                        ? showResult
                          ? isCorrect
                            ? "bg-green-50 border-green-200 text-green-900 dark:bg-green-950/50"
                            : "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/50"
                          : "bg-primary/10 border-primary"
                        : showResult && index === question.answer
                          ? "bg-green-50 border-green-200 text-green-900 dark:bg-green-950/50"
                          : "bg-muted/30 border-border hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && (
                        <>
                          {index === question.answer && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {userAnswer === index && index !== question.answer && (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {!showResult && userAnswer !== undefined && (
                <Button onClick={() => checkAnswer(question.id)}>Check Answer</Button>
              )}

              {showResult && (
                <div
                  className={`p-3 rounded ${
                    isCorrect
                      ? "bg-green-50 text-green-900 dark:bg-green-950/50 dark:text-green-100"
                      : "bg-red-50 text-red-900 dark:bg-red-950/50 dark:text-red-100"
                  }`}
                >
                  {isCorrect ? "Correct! " : "Incorrect. "}
                  The correct answer is: {question.options[question.answer]}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
