import { Hero } from "@/components/sections/hero"
import { SocialProof } from "@/components/sections/social-proof"
import { RoadmapPreview } from "@/components/sections/roadmap-preview"
import { HowItWorks } from "@/components/sections/how-it-works"
import { NewsletterSignup } from "@/components/sections/newsletter-signup"
import { FeatureHighlights } from "@/components/sections/feature-highlights"
import { SamplePaper } from "@/components/sections/sample-paper"
import { Testimonials } from "@/components/sections/testimonials"
import { FAQ } from "@/components/sections/faq"
import { FinalCTA } from "@/components/sections/final-cta"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <SocialProof />
      <RoadmapPreview />
      <HowItWorks />
      <NewsletterSignup />
      <FeatureHighlights />
      <SamplePaper />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </div>
  )
}
