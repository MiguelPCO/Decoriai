import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { StatsSection } from "@/components/landing/stats-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { FeatureSection } from "@/components/landing/feature-section"
import { StylesGrid } from "@/components/landing/styles-grid"
import { BeforeAfterSection } from "@/components/landing/before-after-section"
import { CtaSection } from "@/components/landing/cta-section"

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsSection />
        <HowItWorks />
        <FeatureSection />
        <StylesGrid />
        <BeforeAfterSection />
        <CtaSection />
      </main>
    </>
  )
}
