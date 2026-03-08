"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import type { Apartment } from "@/lib/apartments"
import { LeafletMap } from "@/components/ui/LeafletMap"
import { MobileMenu } from "@/components/ui/MobileMenu"

// ── Typy ──────────────────────────────────────────────────────────────────────
interface Props {
    apartment: Apartment
    others: Apartment[]
}

// ── Airbnb SVG icon ───────────────────────────────────────────────────────────
function AirbnbIcon() {
    return (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current">
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.644-.672-.624.673-.284.288c-2.072 2.023-4.303 3.357-6.528 3.357-3.46 0-6.356-2.42-6.356-6.478 0-.825.215-1.928.784-3.411.082-.212.162-.406.237-.581l.144-.353c.983-2.29 5.132-10.985 7.078-14.808.056-.11.115-.224.175-.34.504-.98 1.15-2.016 1.884-2.822C13.253 1.48 14.47 1 16 1z" />
        </svg>
    )
}

// ── Main component ────────────────────────────────────────────────────────────
export function ApartamentDetail({ apartment: apt, others }: Props) {
    const [activeImg, setActiveImg] = useState(0)

    return (
        <main className="min-h-screen bg-background text-foreground font-sans antialiased">

            {/* ── Top navigation ── */}
            <nav className="flex items-center px-4 md:px-8 py-5 border-b border-foreground/15 sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
                <Link href="/" className="flex items-center gap-2 hover:opacity-60 transition-opacity group">
                    <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-foreground/50 group-hover:text-foreground transition-colors">
                        ← Powrót
                    </span>
                </Link>
                <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-semibold text-lg tracking-tighter uppercase text-foreground flex items-start hover:opacity-60 transition-opacity">
                    KOŁŁĄTAJA 23<sup className="text-[8px] ml-0.5 mt-1 font-bold">®</sup>
                </Link>
                <div className="ml-auto">
                    <MobileMenu />
                </div>
            </nav>

            {/* ── Hero: title + main image ── */}
            <div className="border-b border-foreground/15">
                {/* Title row */}
                <div className="px-4 md:px-8 pt-12 pb-8 flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-foreground/15">
                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-2 h-2 bg-foreground" />
                            <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/50">{apt.subtitle}</span>
                        </div>
                        <motion.h1
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-4xl md:text-7xl lg:text-8xl font-semibold tracking-tighter uppercase leading-[1.05] text-foreground"
                        >
                            {apt.title}
                        </motion.h1>
                    </div>

                    {/* Quick stats */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex gap-0 border border-foreground/15"
                    >
                        {[
                            { label: "Goście", value: `${apt.guests} os.` },
                            { label: "Pokoje", value: `${apt.rooms} pok.` },
                            { label: "Metraż", value: `${apt.area} m²` },
                            { label: "Piętro", value: apt.floor },
                        ].map((s, i) => (
                            <div key={s.label} className={`flex flex-col items-center justify-center px-4 py-3 gap-1 ${i < 3 ? "border-r border-foreground/15" : ""}`}>
                                <span className="text-[8px] font-semibold tracking-widest uppercase text-foreground/40">{s.label}</span>
                                <span className="text-sm font-semibold tracking-tighter uppercase text-foreground">{s.value}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Image Gallery */}
                <div
                    className="flex flex-col md:grid md:grid-cols-[3fr_2fr]"
                    style={{ height: "clamp(360px, 68vh, 760px)" }}
                >
                    {/* ── LEFT: Main big image ── */}
                    <div
                        className="relative overflow-hidden border-b md:border-b-0 md:border-r border-foreground/15 cursor-pointer"
                        style={{ minHeight: "240px" }}
                    >
                        <img
                            src={apt.images[activeImg]}
                            alt={apt.title}
                            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500"
                            loading="eager"
                        />
                    </div>

                    {/* ── RIGHT: 3 thumbnails stacked ── */}
                    <div className="grid grid-rows-3 h-full">
                        {apt.images.slice(1).map((img, idx) => (
                            <div
                                key={img}
                                onClick={() => setActiveImg(idx + 1)}
                                className={`relative overflow-hidden cursor-pointer border-b last:border-b-0 border-foreground/15 transition-opacity duration-200
                                    ${activeImg === idx + 1 ? "opacity-50" : "hover:opacity-80"}`}
                            >
                                <img
                                    src={img}
                                    alt={`${apt.title} — zdjęcie ${idx + 2}`}
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                    loading="lazy"
                                />
                                {/* Overlay indicator */}
                                {activeImg === idx + 1 && (
                                    <div className="absolute inset-0 border-2 border-foreground pointer-events-none" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gallery dots (mobile indicator) */}
                <div className="flex justify-center gap-2 py-3 md:hidden border-t border-foreground/10">
                    {apt.images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveImg(i)}
                            className={`h-1.5 transition-all ${activeImg === i ? "bg-foreground w-4" : "bg-foreground/20 w-1.5"}`}
                        />
                    ))}
                </div>
            </div>

            {/* ── Description + Amenities + Booking ── */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 border-b border-foreground/15">

                {/* Left: Description */}
                <div className="px-4 md:px-8 py-12 flex flex-col gap-8 border-b lg:border-b-0 lg:border-r border-foreground/15">
                    <div>
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/50 mb-4 block">O Apartamencie</span>
                        <div className="space-y-4">
                            {apt.longDescription.split("\n\n").map((para, i) => (
                                <p key={i} className="text-sm text-foreground/80 leading-relaxed">
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Amenities */}
                    <div>
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/50 mb-4 block">Wyposażenie</span>
                        <div className="flex flex-col">
                            {apt.amenities.map((item, idx) => (
                                <div key={item} className="flex items-center gap-4 py-3 border-b border-foreground/8 last:border-b-0">
                                    <span className="text-[9px] font-semibold tracking-widest text-foreground/30 w-4 shrink-0">
                                        {String(idx + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-[11px] font-semibold tracking-widest uppercase text-foreground">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Pricing + Booking CTA */}
                <div className="px-4 md:px-8 py-12 flex flex-col gap-10">
                    {/* Pricing */}
                    <div>
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/50 mb-6 block">Cennik</span>
                        <div className="flex flex-col border border-foreground/15">
                            <div className="flex justify-between items-center px-6 py-5 border-b border-foreground/15">
                                <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/60">Noc (pon–czw)</span>
                                <span className="text-2xl font-semibold tracking-tighter text-foreground">
                                    {apt.price.weekday} <span className="text-sm text-foreground/50">PLN</span>
                                </span>
                            </div>
                            <div className="flex justify-between items-center px-6 py-5">
                                <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/60">Noc (pt–nd)</span>
                                <span className="text-2xl font-semibold tracking-tighter text-foreground">
                                    {apt.price.weekend} <span className="text-sm text-foreground/50">PLN</span>
                                </span>
                            </div>
                        </div>
                        <p className="text-[9px] font-semibold tracking-widest uppercase text-foreground/30 mt-3">
                            * Ceny orientacyjne. Finalna cena zależy od platformy rezerwacyjnej i długości pobytu.
                        </p>
                    </div>

                    {/* Booking CTA */}
                    <div className="flex flex-col gap-4">
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/50 mb-2 block">Zarezerwuj</span>

                        <a
                            href={apt.booking.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-6 py-5 bg-foreground text-background hover:opacity-90 transition-opacity group"
                        >
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] font-semibold tracking-widest uppercase text-background/60">Rezerwuj przez</span>
                                <span className="text-sm font-semibold tracking-widest uppercase text-background">Booking.com</span>
                            </div>
                            <span className="text-background/60 group-hover:text-background transition-colors text-lg">→</span>
                        </a>

                        <a
                            href={apt.booking.airbnbUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-6 py-5 border border-foreground/20 hover:border-foreground/60 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <AirbnbIcon />
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/50">Rezerwuj przez</span>
                                    <span className="text-sm font-semibold tracking-widest uppercase text-foreground">Airbnb</span>
                                </div>
                            </div>
                            <span className="text-foreground/40 group-hover:text-foreground transition-colors text-lg">→</span>
                        </a>

                        <a
                            href="/kontakt"
                            className="flex items-center justify-center px-6 py-4 border border-foreground/10 hover:border-foreground/30 transition-colors"
                        >
                            <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors">
                                Masz pytania? Napisz do nas →
                            </span>
                        </a>
                    </div>

                    {/* Location mini */}
                    <div>
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/50 mb-4 block">Lokalizacja</span>
                        <div className="border border-foreground/15 overflow-hidden" style={{ height: "200px" }}>
                            <LeafletMap />
                        </div>
                        <p className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40 mt-2">
                            UL. KOŁŁĄTAJA 23 · WROCŁAW · 400M DO DWORCA PKP
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Other apartments ── */}
            <section className="px-4 md:px-8 py-16 border-b border-foreground/15">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-2 h-2 bg-foreground" />
                            <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/50">Pozostałe lokale</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter uppercase text-foreground leading-tight">
                            INNE APARTAMENTY
                        </h2>
                    </div>
                    <Link href="/" className="text-[10px] font-semibold tracking-widest uppercase text-foreground border-b border-foreground pb-0.5 hover:opacity-50 transition-opacity whitespace-nowrap">
                        WSZYSTKIE →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-foreground/15">
                    {others.slice(0, 3).map((other, idx) => (
                        <Link
                            key={other.id}
                            href={`/apartament/${other.id}`}
                            className={`group flex flex-col border-b md:border-b-0 ${idx < 2 ? "md:border-r" : ""} border-foreground/15 hover:bg-foreground/3 transition-colors`}
                        >
                            <div className="w-full overflow-hidden" style={{ height: "200px" }}>
                                <img
                                    src={other.images[0]}
                                    alt={other.title}
                                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-5 flex flex-col gap-2 border-t border-foreground/15">
                                <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40">{other.subtitle}</span>
                                <h3 className="text-lg font-semibold tracking-tighter uppercase text-foreground">{other.title}</h3>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40">{other.guests} os. · {other.area} m²</span>
                                    <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground border-b border-foreground pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        WIĘCEJ →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── Footer mini ── */}
            <div className="flex justify-between items-center px-4 md:px-8 py-5 bg-foreground text-background">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-background/40">
                    © 2026 KOŁŁĄTAJA 23 · WROCŁAW
                </span>
                <div className="flex items-center gap-6">
                    <a href="https://booking.com" target="_blank" rel="noopener noreferrer" className="text-[9px] font-semibold tracking-widest uppercase text-background/40 hover:text-background transition-colors">Booking.com</a>
                    <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer" className="text-[9px] font-semibold tracking-widest uppercase text-background/40 hover:text-background transition-colors">Airbnb</a>
                </div>
            </div>
        </main>
    )
}
