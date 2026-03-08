"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ThemeToggle } from "@/components/ThemeToggle"

const navLinks = [
    { num: "01", label: "Home", href: "/" },
    { num: "02", label: "Apartamenty", href: "/#apartamenty" },
    { num: "03", label: "O nas", href: "/o-nas" },
    { num: "04", label: "Galeria", href: "/galeria" },
    { num: "05", label: "Kontakt", href: "/kontakt" },
]

interface MenuProps {
    activePath?: string
}

export function MobileMenu({ activePath }: MenuProps) {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const scrollYRef = useRef(0)

    useEffect(() => {
        setMounted(true)
    }, [])

    // ── Synchroniczne zamknięcie menu (używane na click linków i nawigacji) ────
    // MUSI być synchroniczne — Next.js nawiguje zanim React scommituje stan
    const closeMenu = () => {
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.width = ""
        document.body.style.overflowY = ""
        window.scrollTo(0, scrollYRef.current)
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
                    <ThemeToggle />
                </div>

                <button
                    onClick={() => setOpen(true)}
                    aria-label="Otwórz menu"
                    className={`flex flex-col justify-center gap-[6px] w-9 h-9 py-1 shrink-0 transition-opacity duration-150
                            ${open ? "invisible opacity-0 pointer-events-none" : "visible opacity-100"}`}
                >
                    <span className="block h-px w-full bg-foreground" />
                    <span className="block h-px w-full bg-foreground" />
                    <span className="block h-px w-full bg-foreground" />
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
                            className="fixed inset-0 z-[500] bg-background flex flex-col"
                        >
                            {/* ── Top bar ── */}
                            <div className="flex justify-between items-center px-4 md:px-8 py-4 md:py-5 border-b border-foreground/15 shrink-0">
                                <Link
                                    href="/"
                                    onClick={closeMenu}
                                    className="font-semibold text-xl tracking-tighter uppercase text-foreground flex items-start"
                                >
                                    KOŁŁĄTAJA 23<sup className="text-[10px] ml-0.5 mt-0.5 font-bold">®</sup>
                                </Link>
                                <div className="flex items-center gap-4 md:gap-6">
                                    <ThemeToggle />
                                    <button
                                        onClick={closeMenu}
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
                                <nav className="flex-1 flex flex-col overflow-y-auto px-4 md:px-8 pt-2 md:pt-6 md:border-r md:border-foreground/15">
                                    {navLinks.map((link, idx) => {
                                        const isActive = activePath === link.href
                                        return (
                                            <motion.div
                                                key={link.num}
                                                initial={{ opacity: 0, x: -16 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.04 + idx * 0.06, duration: 0.3, ease: "easeOut" }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={closeMenu}
                                                    className="flex items-baseline gap-5 py-5 md:py-6 border-b border-foreground/10 group"
                                                >
                                                    <span className="text-[10px] font-semibold tracking-widest text-foreground/25 w-5 shrink-0">
                                                        {link.num}
                                                    </span>
                                                    <span className={`text-[11vw] md:text-[6vw] leading-none font-semibold tracking-tighter uppercase transition-opacity
                                                        ${isActive ? "text-foreground" : "text-foreground group-hover:opacity-40"}`}>
                                                        {link.label}
                                                    </span>
                                                    {isActive && (
                                                        <span className="ml-auto text-[9px] font-semibold tracking-widest uppercase text-foreground/30 pb-1 shrink-0">●</span>
                                                    )}
                                                </Link>
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
                                        <div className="flex gap-3 pt-2">
                                            <a href="https://booking.com" target="_blank" rel="noopener noreferrer"
                                                onClick={closeMenu}
                                                className="text-[9px] font-semibold tracking-widest uppercase text-foreground/50 border border-foreground/20 px-3 py-2 hover:border-foreground/50 hover:text-foreground transition-all">
                                                Booking.com
                                            </a>
                                            <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer"
                                                onClick={closeMenu}
                                                className="text-[9px] font-semibold tracking-widest uppercase text-foreground/50 border border-foreground/20 px-3 py-2 hover:border-foreground/50 hover:text-foreground transition-all">
                                                Airbnb
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
                                <div className="flex items-center gap-3">
                                    <a href="https://booking.com" target="_blank" rel="noopener noreferrer"
                                        onClick={closeMenu}
                                        className="text-[10px] font-semibold tracking-widest uppercase text-foreground/60 border border-foreground/20 px-4 py-2 hover:border-foreground/50 hover:text-foreground transition-all">
                                        Booking.com
                                    </a>
                                    <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer"
                                        onClick={closeMenu}
                                        className="text-[10px] font-semibold tracking-widest uppercase text-foreground/60 border border-foreground/20 px-4 py-2 hover:border-foreground/50 hover:text-foreground transition-all">
                                        Airbnb
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
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}
