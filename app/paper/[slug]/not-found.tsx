import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, ArrowLeft } from "lucide-react"

export default function PaperNotFound() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-24">
      <div className="text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 space-y-6">
            <div className="space-y-4">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto" />
              <h1 className="text-3xl font-bold">Paper Not Found</h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                The paper you're looking for doesn't exist or hasn't been added to our library yet.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/papers">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse All Papers
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
