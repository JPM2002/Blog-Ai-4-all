import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, BookOpen } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-24">
      <div className="text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 space-y-6">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-primary">404</h1>
              <h2 className="text-2xl font-semibold">Page Not Found</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong
                URL.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/papers">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Papers
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/roadmap">
                  <Search className="mr-2 h-4 w-4" />
                  Explore Roadmap
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
