interface DiagramProps {
  name: string
}

export function Diagram({ name }: DiagramProps) {
  // In a real app, this would load the actual diagram
  return (
    <div className="my-8">
      <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
        <p className="text-muted-foreground">
          Diagram: <span className="font-mono">{name}</span>
        </p>
        <p className="text-sm text-muted-foreground mt-2">Interactive diagram would be rendered here</p>
      </div>
    </div>
  )
}
