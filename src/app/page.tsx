import { Navbar } from "@/components/ui/Navbar"
import { Hero } from "@/components/sections/Hero"
import { Collection } from "@/components/sections/Collection"
import { Location } from "@/components/sections/Location"
import { Reviews } from "@/components/sections/Reviews"
import { FAQ } from "@/components/sections/FAQ"
import { CTA } from "@/components/sections/CTA"
import { WelcomeSection } from "@/components/sections/WelcomeSection"
import { GallerySection } from "@/components/sections/GallerySection"
import { SectionSeparator } from "@/components/ui/SectionSeparator"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col items-center w-full">
      <Navbar variant="hero" />
      <div className="w-full flex flex-col">
        <Hero />
        <div className="relative z-10 bg-background w-full flex flex-col">
          <WelcomeSection />
          <SectionSeparator />
          <GallerySection />
          <SectionSeparator />
          <Collection />
          <SectionSeparator />
          <Location />
          <SectionSeparator />
          <Reviews />
          <SectionSeparator />
          <FAQ />
          <SectionSeparator />
          <CTA />
          <SectionSeparator />
          <Footer />
        </div>
      </div>
    </main>
  )
}
