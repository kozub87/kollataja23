"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { MobileMenu } from "./MobileMenu"
import { RollingLink } from "./RollingLink"

interface NavbarProps {
    variant?: "hero" | "subpage"
    activePath?: string
}

export function Navbar({ variant = "hero", activePath = "/" }: NavbarProps) {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)
    const [isOverHero, setIsOverHero] = useState(variant === "hero")
    const prevScrollY = useRef(0)

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = prevScrollY.current
        
        // Zmiana motywu w zależności od pozycji względem Hero (100vh)
        if (variant === "hero") {
            // Próg 100vh minus wysokość navbaru (96px)
            setIsOverHero(latest < window.innerHeight - 96)
        } else {
            setIsOverHero(false)
        }

        // Nie chowaj paska na samej górze (pierwsze 100px)
        if (latest < 100) {
            setHidden(false)
        } else if (latest > previous && latest > 150) {
            setHidden(true)
        } else if (latest < previous) {
            setHidden(false)
        }
        
        prevScrollY.current = latest
    })

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 z-50 w-full transition-all duration-500 
                ${isOverHero 
                    ? "bg-transparent text-[#f9f6f3] border-transparent" 
                    : "bg-background/80 backdrop-blur-lg text-[#1f3a40] border-b border-foreground/5 shadow-premium"
                }`}
        >
            <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between h-24 px-12 relative">
                {/* ── LEFT SLOT: Navigation Links ── */}
                <div className="flex-1 flex items-center">
                    <div className="hidden lg:flex items-center gap-8">
                        <RollingLink href="/">Home</RollingLink>
                        <RollingLink href="/#apartamenty">Apartamenty</RollingLink>
                        <RollingLink href="/#galeria">Galeria</RollingLink>
                        <RollingLink href="/o-nas">O nas</RollingLink>
                        <RollingLink href="/kontakt">Kontakt</RollingLink>
                    </div>
                </div>

                {/* ── CENTER SLOT: Logo ── */}
                <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center group transition-opacity hover:opacity-80">
                    <div 
                        className="h-16 w-44 bg-current" 
                        style={{ 
                            maskImage: "url('/Loga/kollataja_logo.svg')", 
                            maskRepeat: "no-repeat", 
                            maskSize: "contain", 
                            maskPosition: "center",
                            WebkitMaskImage: "url('/Loga/kollataja_logo.svg')",
                            WebkitMaskRepeat: "no-repeat",
                            WebkitMaskSize: "contain",
                            WebkitMaskPosition: "center"
                        }}
                    />
                </Link>

                {/* ── RIGHT SLOT ── */}
                <div className="flex-1 flex items-center justify-end gap-6">
                    <div className="hidden lg:flex items-center gap-6 mr-2">
                        <a href="https://booking.com" target="_blank" rel="noopener noreferrer" className="h-5 hover:opacity-50 transition-opacity">
                            <div 
                                className="h-5 w-20 bg-current" 
                                style={{ 
                                    maskImage: "url('/Loga/booking.svg')", 
                                    maskRepeat: "no-repeat", 
                                    maskSize: "contain", 
                                    maskPosition: "center",
                                    WebkitMaskImage: "url('/Loga/booking.svg')",
                                    WebkitMaskRepeat: "no-repeat",
                                    WebkitMaskSize: "contain",
                                    WebkitMaskPosition: "center"
                                }}
                            />
                        </a>
                        <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer" className="h-5 hover:opacity-50 transition-opacity">
                            <div 
                                className="h-5 w-16 bg-current" 
                                style={{ 
                                    maskImage: "url('/Loga/airbnb.svg')", 
                                    maskRepeat: "no-repeat", 
                                    maskSize: "contain", 
                                    maskPosition: "center",
                                    WebkitMaskImage: "url('/Loga/airbnb.svg')",
                                    WebkitMaskRepeat: "no-repeat",
                                    WebkitMaskSize: "contain",
                                    WebkitMaskPosition: "center"
                                }}
                            />
                        </a>
                    </div>
                    <MobileMenu activePath={activePath} isOverHero={isOverHero} />
                </div>
            </div>
        </motion.nav>
    )
}
