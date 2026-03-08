"use client"
import { motion } from "framer-motion"


export function Footer() {
    return (
        /* h-dvh = dynamic viewport height (accounts for mobile browser chrome) */
        <footer className="h-dvh min-h-[600px] bg-foreground text-background flex flex-col overflow-hidden">

            {/* ── Top label bar ── */}
            <div className="flex justify-between items-center px-4 md:px-8 py-4 border-b border-background/10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-background" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-background/60">Kontakt</span>
                </div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-background/30">
                    51.1074° N · 17.0385° E
                </span>
            </div>

            {/* ── Main CTA — flex-1 takes all remaining space ── */}
            <div className="flex-1 flex flex-col justify-center px-4 md:px-8 py-6 min-h-0 border-b border-background/10">
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="text-[13vw] md:text-[11vw] lg:text-[9.5vw] font-semibold tracking-tighter uppercase leading-[0.95] text-background"
                >
                    ZAREZERWUJ<br />SWÓJ<br />POBYT.
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-row items-center gap-6 mt-8"
                >
                    <a
                        href="https://booking.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold tracking-widest uppercase text-background border-b border-background pb-0.5 hover:opacity-60 transition-opacity"
                    >
                        Booking.com →
                    </a>
                    <span className="text-background/20">·</span>
                    <a
                        href="https://airbnb.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold tracking-widest uppercase text-background/50 hover:text-background transition-colors"
                    >
                        Airbnb →
                    </a>
                </motion.div>
            </div>

            {/* ── Bottom info ── */}
            {/* DESKTOP: 3-column grid */}
            <div className="hidden md:grid md:grid-cols-3 shrink-0 border-b border-background/10">
                <div className="px-8 py-7 border-r border-background/10 flex flex-col gap-2">
                    <div className="font-semibold text-lg tracking-tighter uppercase text-background flex items-start">
                        KOŁŁĄTAJA 23<sup className="text-[9px] ml-0.5 mt-1">®</sup>
                    </div>
                    <p className="text-[9px] font-semibold tracking-widest uppercase text-background/30">Wrocław, Polska</p>
                </div>
                <div className="px-8 py-7 border-r border-background/10 flex flex-col gap-2.5">
                    {[
                        { label: "Apartamenty", href: "/#apartamenty" },
                        { label: "Lokalizacja", href: "/#lokalizacja" },
                        { label: "Opinie", href: "/#opinie" },
                        { label: "O nas", href: "/o-nas" },
                        { label: "Kontakt", href: "/kontakt" },
                    ].map(link => (
                        <a key={link.label} href={link.href} className="text-[10px] font-semibold tracking-[0.18em] uppercase text-background/55 hover:text-background transition-colors flex items-center justify-between group">
                            {link.label}
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </a>
                    ))}
                </div>
                <div className="px-8 py-7 flex flex-col gap-3">
                    <a href="mailto:kontakt@kollataja23.pl" className="text-[10px] font-semibold tracking-[0.15em] uppercase text-background/55 hover:text-background transition-colors">kontakt@kollataja23.pl</a>
                    <a href="tel:+48123456789" className="text-[10px] font-semibold tracking-[0.15em] uppercase text-background/55 hover:text-background transition-colors">+48 123 456 789</a>
                    <div className="flex gap-3 pt-1">
                        <a href="https://booking.com" target="_blank" rel="noopener noreferrer" className="text-[9px] font-semibold tracking-widest uppercase text-background/35 border border-background/20 px-2.5 py-1 hover:border-background/50 transition-all">Booking</a>
                        <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer" className="text-[9px] font-semibold tracking-widest uppercase text-background/35 border border-background/20 px-2.5 py-1 hover:border-background/50 transition-all">Airbnb</a>
                    </div>
                </div>
            </div>

            {/* MOBILE: compact single row */}
            <div className="md:hidden shrink-0 flex justify-between items-start px-4 py-5 border-b border-background/10 gap-4">
                <div className="flex flex-col gap-1.5">
                    <div className="font-semibold text-base tracking-tighter uppercase text-background flex items-start">
                        KOŁŁĄTAJA 23<sup className="text-[8px] ml-0.5 mt-0.5">®</sup>
                    </div>
                    <p className="text-[8px] font-semibold tracking-widest uppercase text-background/30">Wrocław, Polska</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                    <a href="mailto:kontakt@kollataja23.pl" className="text-[9px] font-semibold tracking-[0.12em] uppercase text-background/55">kontakt@kollataja23.pl</a>
                    <div className="flex gap-2 mt-1">
                        <a href="https://booking.com" target="_blank" rel="noopener noreferrer" className="text-[8px] font-semibold tracking-widest uppercase text-background/35 border border-background/20 px-2 py-1">Booking</a>
                        <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer" className="text-[8px] font-semibold tracking-widest uppercase text-background/35 border border-background/20 px-2 py-1">Airbnb</a>
                    </div>
                </div>
            </div>

            {/* ── Copyright strip ── */}
            <div className="flex justify-between items-center px-4 md:px-8 py-3 shrink-0">
                <span className="text-[7px] md:text-[8px] font-semibold tracking-widest uppercase text-background/20">
                    © 2026 Kołłątaja 23. Wszelkie prawa zastrzeżone.
                </span>
                <span className="text-[7px] md:text-[8px] font-semibold tracking-widest uppercase text-background/20">
                    Wrocław, Polska
                </span>
            </div>
        </footer>
    )
}
