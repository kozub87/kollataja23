"use client"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { WeatherWidget } from "@/components/ui/WeatherWidget"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/ui/Navbar"

const T = { duration: 0.55, ease: "easeOut" } as const

export function Hero() {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Unikamy problemów z hydracją przy next-themes
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <section className="sticky top-0 w-full h-screen overflow-hidden bg-background z-0">
            {/* ── Background Image Layers (Perfect Overlay) ── */}
            <div className="absolute inset-0 z-0 bg-black">
                {/* Layers: Dark and Light cross-fade */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                    style={{ backgroundImage: "url('/Hero.png')", opacity: mounted && theme === "dark" ? 0 : 1 }}
                />
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                    style={{ backgroundImage: "url('/Hero dark.png')", opacity: mounted && theme === "dark" ? 1 : 0 }}
                />
                
                {/* Premium Overlay: Stronger base + subtle vignette for text legibility */}
                <div className="absolute inset-0 bg-black/35 z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-[1]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-[1]" />
            </div>

            {/* ── Centered Content ── */}
            <div className="relative z-10 w-full max-w-[1440px] mx-auto h-full flex flex-col items-center justify-center px-6 md:px-12 text-center pointer-events-none">
                <div className="pointer-events-auto flex flex-col items-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-serif text-[44px] md:text-[88px] leading-[1.2] md:leading-[105.6px] tracking-[-0.01em] md:tracking-[-0.4px] text-[#f9f6f3] mb-8 text-center"
                        style={{ textTransform: "none" }}
                    >
                        Tworzymy Twój spokój.
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.55 }}
                        className="flex flex-col items-center gap-10 mt-8"
                    >
                        <p className="font-sans text-[18px] leading-[25.2px] tracking-[0.25px] font-normal text-[#f9f6f3] max-w-2xl">
                            Odrestaurowane apartamenty tuż obok Dworca Głównego. <br className="hidden md:block" /> Gwarancja doskonałego wypoczynku w samym sercu Wrocławia.
                        </p>
                        <Link href="/#apartamenty" className="bg-[#f9f6f3] text-[#1f3a40] font-sans font-semibold text-[13px] tracking-[0.1em] uppercase px-10 py-4 hover:bg-[#a1826a] hover:text-[#f9f6f3] hover:scale-105 transition-all duration-300 shadow-xl">
                            Zobacz Lokale
                        </Link>
                    </motion.div>
                </div>

                {/* ── Weather Widget (Relative to 1440px container) ── */}
                <div className="absolute bottom-12 right-6 md:right-12 z-20 hidden md:block w-auto pointer-events-auto">
                    <WeatherWidget />
                </div>
            </div>
        </section>
    )
}
