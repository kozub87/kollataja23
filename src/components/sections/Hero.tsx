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
        <section className="sticky top-0 w-full h-[100dvh] overflow-hidden bg-background z-0">
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
                <div className="pointer-events-auto flex flex-col items-center gap-6 mt-12">
                    <motion.h1 
                        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif text-[44px] md:text-[88px] leading-[1.2] md:leading-[105.6px] tracking-tight text-[#f9f6f3] text-center"
                        style={{ textTransform: "none" }}
                    >
                        Tworzymy Twój spokój.
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center gap-6"
                    >
                        <p className="font-sans text-[18px] leading-[1.5] tracking-wide font-normal text-[#f9f6f3]/90 max-w-2xl px-4">
                            Odrestaurowane apartamenty tuż obok Dworca Głównego. <br className="hidden md:block" /> Gwarancja doskonałego wypoczynku w samym sercu Wrocławia.
                        </p>
                        <Link href="/#apartamenty" className="bg-background text-foreground border border-foreground/10 font-sans font-normal text-[18px] tracking-[0.25px] px-8 py-3 hover:bg-primary hover:text-white transition-all duration-300 shadow-2xl">
                            Zobacz lokale
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
