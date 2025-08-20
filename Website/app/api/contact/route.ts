import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed",
          details: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      )
    }

    const { name, email, message } = result.data

    // TODO: Replace with actual contact form handling
    // For now, we'll just log the contact form submission
    console.log(`Contact form submission:`, {
      name,
      email,
      message: message.substring(0, 100) + (message.length > 100 ? "..." : ""),
      timestamp: new Date().toISOString(),
    })

    // Simulate some processing time
    await new Promise((resolve) => setTimeout(resolve, 300))

    // In a real implementation, you would:
    // - Send email notification to support team
    // - Store message in database or support system
    // - Send auto-reply to user
    // - Integrate with support ticket system

    return NextResponse.json({
      ok: true,
      message: "Message sent successfully. We'll get back to you soon!",
    })
  } catch (error) {
    console.error("Contact form error:", error)

    return NextResponse.json(
      {
        ok: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
