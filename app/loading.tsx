import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12">
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="text-center space-y-4">
          <div className="h-8 bg-muted rounded-lg w-64 mx-auto animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse"></div>
        </div>

        {/* Content skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                <div className="h-10 bg-muted rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
