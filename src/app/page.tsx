import { Hero } from "@/components/sections/Hero"
import { Collection } from "@/components/sections/Collection"
import { Location } from "@/components/sections/Location"
import { Reviews } from "@/components/sections/Reviews"
import { Amenities } from "@/components/sections/Amenities"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
      <Hero />
      <Collection />
      <Location />
      <Reviews />
      <Amenities />
      <Footer />
    </main>
  )
}
