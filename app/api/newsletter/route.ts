import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const result = newsletterSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid email address",
          details: result.error.issues,
        },
        { status: 400 },
      )
    }

    const { email } = result.data

    // TODO: Replace with actual newsletter service integration
    // For now, we'll just log the email and return success
    console.log(`Newsletter subscription: ${email}`)

    // Simulate some processing time
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In a real implementation, you would:
    // - Add email to your newsletter service (ConvertKit, Mailchimp, etc.)
    // - Send welcome email
    // - Store subscription in database
    // - Handle duplicate subscriptions

    return NextResponse.json({
      ok: true,
      message: "Successfully subscribed to newsletter",
    })
  } catch (error) {
    console.error("Newsletter subscription error:", error)

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
