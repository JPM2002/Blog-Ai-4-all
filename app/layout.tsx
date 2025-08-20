import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "AIPapers.dev — AI papers, demystified",
    template: "%s | AIPapers.dev",
  },
  description: "Understand foundational AI/ML research papers with visuals, TL;DRs, and a structured roadmap.",
  generator: "Next.js",
  applicationName: "AIPapers.dev",
  keywords: [
    "AI",
    "machine learning",
    "research papers",
    "education",
    "deep learning",
    "neural networks",
    "transformers",
    "computer vision",
    "NLP",
    "artificial intelligence",
  ],
  authors: [{ name: "AIPapers.dev Team" }],
  creator: "AIPapers.dev",
  publisher: "AIPapers.dev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aipapers.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aipapers.dev",
    title: "AIPapers.dev — AI papers, demystified",
    description: "Understand foundational AI/ML research papers with visuals, TL;DRs, and a structured roadmap.",
    siteName: "AIPapers.dev",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AIPapers.dev - AI papers, demystified",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIPapers.dev — AI papers, demystified",
    description: "Understand foundational AI/ML research papers with visuals, TL;DRs, and a structured roadmap.",
    images: ["/og-image.png"],
    creator: "@aipapers_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
