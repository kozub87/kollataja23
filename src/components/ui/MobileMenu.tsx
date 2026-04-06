"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ThemeToggle } from "@/components/ThemeToggle"

const navLinks = [
    { label: "Strona Główna", href: "/" },
    { label: "Apartamenty", href: "/#apartamenty" },
    { label: "Galeria", href: "/#galeria" },
    { label: "O nas", href: "/o-nas" },
]

interface MenuProps {
    activePath?: string
    isOverHero?: boolean
}

export function MobileMenu({ activePath, isOverHero }: MenuProps) {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const closeMenu = () => {
        document.body.style.overflow = ""
        setOpen(false)
    }

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    useEffect(() => {
        const handle = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu() }
        window.addEventListener("keydown", handle)
        return () => window.removeEventListener("keydown", handle)
    }, [])

    return (
        <>
            {/* Hamburger Button Container */}
            <div className="flex items-center gap-4 lg:gap-6">
                <div className={`hidden lg:block transition-opacity duration-300 ${open ? "invisible opacity-0 pointer-events-none" : "visible opacity-100"}`}>
                    <ThemeToggle isOverHero={isOverHero} />
                </div>

                {/* Hamburger */}
                <button
                    onClick={() => setOpen(true)}
                    aria-label="Otwórz menu"
                    className={`flex lg:hidden flex-col justify-center gap-[6px] w-9 h-9 py-1 shrink-0 transition-opacity duration-300
                            ${open ? "invisible opacity-0 pointer-events-none" : "visible opacity-100"}`}
                >
                    <span className={`block h-[1px] w-full transition-colors ${isOverHero ? "bg-white" : "bg-foreground"}`} />
                    <span className={`block h-[1px] w-full transition-colors ${isOverHero ? "bg-white" : "bg-foreground"}`} />
                    <span className={`block h-[1px] w-full transition-colors ${isOverHero ? "bg-white" : "bg-foreground"}`} />
                </button>
            </div>

            {/* Premium Full-Screen Overlay via Portal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                            className="fixed inset-0 z-[500] bg-background w-full h-[100dvh] flex flex-col justify-between overflow-hidden"
                        >
                            {/* ── 1. Top Bar (Identical layout to Navbar) ── */}
                            <div className="w-full h-16 px-6 md:px-12 max-w-[1440px] mx-auto flex items-center justify-between shrink-0 relative">
                                <div className="flex-1 flex items-center">
                                    <div className="lg:hidden">
                                        <ThemeToggle />
                                    </div>
                                </div>
                                
                                {/* Centered Logo */}
                                <Link
                                    href="/"
                                    onClick={closeMenu}
                                    className="absolute left-1/2 -translate-x-1/2 flex items-center group transition-opacity hover:opacity-80"
                                >
                                    <div 
                                        className="h-12 w-36 bg-foreground" 
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

                                <div className="flex-1 flex items-center justify-end gap-4 md:gap-6">
                                    <div className="hidden lg:block">
                                        <ThemeToggle />
                                    </div>
                                    {/* Close Button (Premium X Style) */}
                                    <button
                                        onClick={closeMenu}
                                        aria-label="Zamknij menu"
                                        className="flex flex-col justify-center items-center w-9 h-9 shrink-0 group relative overflow-hidden"
                                    >
                                        <span className="block absolute h-[1px] w-full bg-foreground rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                                        <span className="block absolute h-[1px] w-full bg-foreground -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                                    </button>
                                </div>
                            </div>

                            {/* ── 2. Centered Navigation Links ── */}
                            <nav className="flex-1 w-full flex flex-col justify-center items-center gap-6 md:gap-8 px-6 overflow-y-auto">
                                {navLinks.map((link, idx) => {
                                    const isActive = activePath === link.href || activePath === link.href.split('#')[0] // handle anchor links
                                    return (
                                        <motion.div
                                            key={link.label}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: 0.1 + idx * 0.05, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={closeMenu}
                                                className={`group relative flex flex-col items-center justify-center font-sans text-[22px] md:text-[26px] font-light tracking-[0.15em] uppercase transition-all duration-500 ${isActive ? "text-primary" : "text-foreground hover:text-primary"}`}
                                            >
                                                {link.label}
                                                {isActive && (
                                                    <motion.div 
                                                        layoutId="mobileActive"
                                                        className="w-1.5 h-1.5 rounded-full bg-primary mt-2"
                                                    />
                                                )}
                                            </Link>
                                        </motion.div>
                                    )
                                })}
                            </nav>

                            {/* ── 3. Bottom Block: Platforms & Contact ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.4, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                                className="w-full px-6 pb-10 pt-6 flex flex-col items-center gap-10 shrink-0"
                            >
                                {/* Platform links */}
                                <div className="flex items-center gap-10">
                                    <a href="https://booking.com" target="_blank" rel="noopener noreferrer"
                                        onClick={closeMenu}
                                        className="h-6 hover:opacity-100 opacity-60 transition-opacity"
                                    >
                                        <div 
                                            className="h-6 w-24 bg-foreground" 
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
                                    <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer"
                                        onClick={closeMenu}
                                        className="h-6 hover:opacity-100 opacity-60 transition-opacity"
                                    >
                                        <div 
                                            className="h-6 w-20 bg-foreground" 
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

                                {/* Address & Contact info */}
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <span className="text-[11px] font-sans font-normal tracking-widest text-foreground/40 uppercase mb-1">
                                        Kołłątaja 23, Wrocław
                                    </span>
                                    <a href="tel:+48123456789"
                                        className="text-[15px] font-serif tracking-wide text-foreground hover:text-primary transition-colors">
                                        +48 123 456 789
                                    </a>
                                    <a href="mailto:kontakt@kollataja23.pl"
                                        className="text-[13px] font-sans font-normal text-foreground/80 hover:text-primary transition-colors">
                                        kontakt@kollataja23.pl
                                    </a>
                                </div>
                            </motion.div>

                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}
