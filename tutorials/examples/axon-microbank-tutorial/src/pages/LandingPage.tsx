/**
 * LandingPage.tsx — Public landing page (route: "/")
 * Composes Navbar, Hero, FeatureCards, and Footer.
 */
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { FeatureCards } from '../components/FeatureCards'
import { Footer } from '../components/Footer'

export function LandingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <FeatureCards />
      </main>
      <Footer />
    </>
  )
}
