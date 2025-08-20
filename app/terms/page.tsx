import { Card, CardContent } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card>
          <CardContent className="p-8 prose prose-lg dark:prose-invert max-w-none">
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using AIPapers.dev, you accept and agree to be bound by the terms and provision of this
              agreement.
            </p>

            <h2>Use License</h2>
            <p>
              Permission is granted to temporarily access the materials on AIPapers.dev for personal, non-commercial
              transitory viewing only.
            </p>

            <h2>Disclaimer</h2>
            <p>
              The materials on AIPapers.dev are provided on an 'as is' basis. AIPapers.dev makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including without limitation,
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
              of intellectual property or other violation of rights.
            </p>

            <h2>Limitations</h2>
            <p>
              In no event shall AIPapers.dev or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability
              to use the materials on AIPapers.dev, even if AIPapers.dev or an authorized representative has been
              notified orally or in writing of the possibility of such damage.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:legal@aipapers.dev">legal@aipapers.dev</a>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
