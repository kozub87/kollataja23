"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ThemeToggle } from "@/components/ThemeToggle"
import { RollingLink } from "./RollingLink"

const navLinks = [
    { num: "01", label: "Home", href: "/" },
    { num: "02", label: "Apartamenty", href: "/#apartamenty" },
    { num: "03", label: "Galeria", href: "/#galeria" },
    { num: "04", label: "O nas", href: "/o-nas" },
    { num: "05", label: "Kontakt", href: "/kontakt" },
]

interface MenuProps {
    activePath?: string
    isOverHero?: boolean
}

export function MobileMenu({ activePath, isOverHero }: MenuProps) {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const scrollYRef = useRef(0)

    useEffect(() => {
        setMounted(true)
    }, [])

    // ── Synchroniczne zamknięcie menu (używane na click linków i nawigacji) ────
    // MUSI być synchroniczne — Next.js nawiguje zanim React scommituje stan
    const closeMenu = (isNavigating = false) => {
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        document.body.style.overflowY = ""
        if (!isNavigating) {
            window.scrollTo(0, scrollYRef.current)
        }
        setOpen(false)
    }

    // ── Scroll lock przy OTWIERANIU (only open=true branch) ──────────────────
    useEffect(() => {
        if (open) {
            scrollYRef.current = window.scrollY
            document.body.style.position = "fixed"
            document.body.style.top = `-${scrollYRef.current}px`
            document.body.style.width = "100%"
            document.body.style.overflowY = "scroll"
        }
        // Cleanup przy unmount (safety net)
        return () => {
            document.body.style.position = ""
            document.body.style.top = ""
            document.body.style.width = ""
            document.body.style.overflowY = ""
        }
    }, [open])

    useEffect(() => {
        const handle = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu() }
        window.addEventListener("keydown", handle)
        return () => window.removeEventListener("keydown", handle)
    }, [])

    return (
        <>
            <div className="flex items-center gap-4 md:gap-6">
                <div className={`transition-opacity duration-150 ${open ? "invisible opacity-0 pointer-events-none" : "visible opacity-100"}`}>
                    <ThemeToggle isOverHero={isOverHero} />
                </div>

                <button
                    onClick={() => setOpen(true)}
                    aria-label="Otwórz menu"
                    className={`flex lg:hidden flex-col justify-center gap-[6px] w-9 h-9 py-1 shrink-0 transition-opacity duration-150
                            ${open ? "invisible opacity-0 pointer-events-none" : "visible opacity-100"}`}
                >
                    <span className={`block h-px w-full transition-colors ${isOverHero ? "bg-[#f9f6f3]" : "bg-foreground"}`} />
                    <span className={`block h-px w-full transition-colors ${isOverHero ? "bg-[#f9f6f3]" : "bg-foreground"}`} />
                    <span className={`block h-px w-full transition-colors ${isOverHero ? "bg-[#f9f6f3]" : "bg-foreground"}`} />
                </button>
            </div>

            {/* ── Full-screen overlay — renderowany przez Portal (omija problemy z z-index i filter) ── */}
            {mounted && createPortal(
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[500] bg-background/40 backdrop-blur-sm"
                        >
                            <motion.div 
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="w-full h-full bg-background flex flex-col border-x border-foreground/5"
                            >
                                {/* ── Top bar ── */}
                                <div className="flex justify-between items-center px-4 md:px-8 h-24 border-b border-foreground/10 shrink-0">
                                    <Link
                                        href="/"
                                        onClick={() => closeMenu(false)}
                                        className="flex items-center group transition-opacity hover:opacity-80"
                                    >
                                        <div 
                                            className="h-16 w-44 bg-foreground" 
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
                                    <div className="flex items-center gap-4 md:gap-6">
                                        <ThemeToggle />
                                        <button
                                            onClick={() => closeMenu(false)}
                                            aria-label="Zamknij menu"
                                            className="flex items-center justify-center w-9 h-9 shrink-0 hover:opacity-50 transition-opacity"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* ── Body: mobile = 1 kolumna, desktop = 2 kolumny ── */}
                                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

                                    {/* ── LEFT / MAIN: Nav links ── */}
                                    <nav className="flex-1 flex flex-col overflow-y-auto px-4 md:px-8 pt-2 md:pt-6 md:border-r md:border-foreground/10">
                                        {navLinks.map((link, idx) => {
                                            const isActive = activePath === link.href
                                            return (
                                                <motion.div
                                                    key={link.num}
                                                    initial={{ opacity: 0, x: -16 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.04 + idx * 0.06, duration: 0.3, ease: "easeOut" }}
                                                >
                                                    <RollingLink
                                                        href={link.href}
                                                        onClick={() => closeMenu(true)}
                                                        className={`flex items-baseline gap-5 py-5 md:py-6 border-b border-foreground/5 group ${isActive ? "text-foreground" : "text-foreground"}`}
                                                    >
                                                        <span className="text-[10px] font-semibold tracking-widest text-foreground/25 w-5 shrink-0">
                                                            {link.num}
                                                        </span>
                                                        <span className="text-[10vw] md:text-[5vw] leading-none font-semibold tracking-tighter">
                                                            {link.label}
                                                        </span>
                                                        {isActive && (
                                                            <span className="ml-auto text-[9px] font-semibold tracking-widest uppercase text-foreground/30 pb-1 shrink-0">●</span>
                                                        )}
                                                    </RollingLink>
                                                </motion.div>
                                            )
                                        })}
                                    </nav>

                                    {/* ── RIGHT: Info (tylko desktop) ── */}
                                    <motion.aside
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.25, duration: 0.4 }}
                                        className="hidden md:flex flex-col justify-between px-8 py-8"
                                        style={{ width: "320px", minWidth: "280px" }}
                                    >
                                        {/* Top: lokalizacja */}
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/30">Lokalizacja</span>
                                            <p className="text-sm font-semibold tracking-tight text-foreground/70 leading-tight">
                                                ul. Kołłątaja 23<br />50-002 Wrocław
                                            </p>
                                        </div>

                                        {/* Middle: kontakt */}
                                        <div className="flex flex-col gap-4">
                                            <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/30">Kontakt</span>
                                            <div className="flex flex-col gap-2">
                                                <a href="tel:+48123456789"
                                                    className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors">
                                                    +48 123 456 789
                                                </a>
                                                <a href="mailto:kontakt@kollataja23.pl"
                                                    className="text-sm font-semibold text-foreground/50 hover:text-foreground transition-colors">
                                                    kontakt@kollataja23.pl
                                                </a>
                                            </div>
                                            <div className="flex gap-4 pt-4 items-center">
                                                <a href="https://booking.com" target="_blank" rel="noopener noreferrer"
                                                    onClick={() => closeMenu(false)}
                                                    className="h-5 hover:opacity-60 transition-opacity"
                                                >
                                                    <div 
                                                        className="h-5 w-20 bg-foreground" 
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
                                                    onClick={() => closeMenu(false)}
                                                    className="h-5 hover:opacity-60 transition-opacity"
                                                >
                                                    <div 
                                                        className="h-5 w-16 bg-foreground" 
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
                                        </div>

                                        {/* Bottom: theme + copyright */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/25">
                                                © 2026 Kołłątaja 23
                                            </span>
                                        </div>
                                    </motion.aside>
                                </div>

                                {/* ── Bottom (tylko mobile): booking + kontakt + theme ── */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.38, duration: 0.3 }}
                                    className="md:hidden shrink-0 px-4 pt-5 pb-8 border-t border-foreground/15 flex flex-col gap-4"
                                >
                                    <div className="flex items-center gap-6 mt-2">
                                        <a href="https://booking.com" target="_blank" rel="noopener noreferrer"
                                            onClick={() => closeMenu(false)}
                                            className="h-6 hover:opacity-60 transition-opacity"
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
                                            onClick={() => closeMenu(false)}
                                            className="h-6 hover:opacity-60 transition-opacity"
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
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col gap-0.5">
                                            <a href="tel:+48123456789"
                                                className="text-[10px] font-semibold tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors">
                                                +48 123 456 789
                                            </a>
                                            <a href="mailto:kontakt@kollataja23.pl"
                                                className="text-[10px] font-semibold tracking-widest uppercase text-foreground/40 hover:text-foreground transition-colors">
                                                kontakt@kollataja23.pl
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}
