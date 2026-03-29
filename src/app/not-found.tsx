"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/sections/Footer"

export default function NotFound() {
    return (
        <main className="flex flex-col min-h-screen bg-[#f9f6f3] text-foreground font-sans antialiased">
            {/* ── 1. Navbar (Subpage variant for dark links on light bg) ── */}
            <Navbar variant="subpage" activePath="/404" />

            {/* ── 2. 404 Content (Centered like the reference image) ── */}
            <section className="relative w-full h-screen flex flex-col items-center justify-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-[100px] text-[#1f3a40] leading-[1.1] mb-8 tracking-tight">
                        Zabłądziłeś?
                    </h1>
                    
                    <p className="font-sans text-[16px] md:text-[18px] leading-relaxed text-foreground/60 max-w-xl mx-auto mb-16 text-balance">
                        Strona, której szukasz, nie została odnaleziona lub została przeniesiona do innej części naszej kamienicy. Pozwól, że zaprowadzimy Cię z powrotem.
                    </p>

                    <Link 
                        href="/" 
                        className="inline-block px-12 py-5 border border-[#1f3a40]/20 text-[#1f3a40] font-sans text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#a1826a] hover:text-[#f9f6f3] hover:border-[#a1826a] transition-all duration-300"
                    >
                        Powrót do strony głównej
                    </Link>
                </motion.div>
            </section>

            {/* ── 3. Footer ── */}
            <Footer />
        </main>
    )
}
