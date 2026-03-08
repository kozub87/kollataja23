"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { apartments } from "@/lib/apartments"
import { MobileMenu } from "@/components/ui/MobileMenu"

// ── Build flat image list from apartments data ────────────────────────────────
const allPhotos = apartments.flatMap(apt =>
    apt.images.map((url, i) => ({
        url,
        apt: apt.id,
        label: apt.title,
        sub: i === 0 ? "Zdjęcie główne" : `Zdjęcie ${i + 1}`,
    }))
)

type Filter = "all" | 1 | 2 | 3 | 4

export function GalleryPage() {
    const [filter, setFilter] = useState<Filter>("all")
    const [lightbox, setLightbox] = useState<number | null>(null)

    const photos = filter === "all" ? allPhotos : allPhotos.filter(p => p.apt === filter)

    // Keyboard navigation in lightbox
    function handleKey(e: React.KeyboardEvent) {
        if (lightbox === null) return
        if (e.key === "ArrowRight") setLightbox(i => i !== null ? Math.min(i + 1, photos.length - 1) : null)
        if (e.key === "ArrowLeft") setLightbox(i => i !== null ? Math.max(i - 1, 0) : null)
        if (e.key === "Escape") setLightbox(null)
    }

    const filterOptions: { label: string; value: Filter }[] = [
        { label: "WSZYSTKIE", value: "all" },
        { label: "APT. 1", value: 1 },
        { label: "APT. 2", value: 2 },
        { label: "APT. 3", value: 3 },
        { label: "APT. 4", value: 4 },
    ]

    return (
        <main
            className="min-h-screen bg-background text-foreground font-sans antialiased"
            onKeyDown={handleKey}
            tabIndex={-1}
        >
            {/* ── Top nav ── */}
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
                    <MobileMenu activePath="/galeria" />
                </div>
            </nav>

            {/* ── Header + filters ── */}
            <div className="px-4 md:px-8 pt-14 pb-8 border-b border-foreground/15 flex flex-col md:flex-row justify-between md:items-end gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2.5 h-2.5 bg-foreground" />
                        <span className="text-xs font-semibold tracking-widest uppercase text-foreground/55">Galeria</span>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-semibold tracking-tighter uppercase leading-[0.95] text-foreground"
                    >
                        WSZYSTKIE<br />PRZESTRZENIE.
                    </motion.h1>
                </div>

                {/* Filter tabs */}
                <div className="flex items-center gap-0 border border-foreground/15 self-start md:self-end">
                    {filterOptions.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => setFilter(opt.value)}
                            className={`px-4 py-2.5 text-[9px] font-semibold tracking-widest transition-all border-r last:border-r-0 border-foreground/15
                                ${filter === opt.value
                                    ? "bg-foreground text-background"
                                    : "text-foreground/50 hover:text-foreground"
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Photo count ── */}
            <div className="px-4 md:px-8 py-3 border-b border-foreground/12 flex items-center gap-3">
                <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/35">
                    {photos.length} {photos.length === 1 ? "zdjęcie" : "zdjęć"}
                </span>
            </div>

            {/* ── Masonry-style grid ── */}
            <div className="p-4 md:p-8">
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3"
                >
                    <AnimatePresence mode="popLayout">
                        {photos.map((photo, idx) => (
                            <motion.div
                                key={`${photo.apt}-${photo.url}`}
                                layout
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setLightbox(idx)}
                                className={`relative overflow-hidden cursor-pointer group border border-foreground/8
                                    ${idx % 5 === 0 ? "col-span-2 row-span-2" : ""}`}
                                style={{ aspectRatio: idx % 5 === 0 ? "auto" : "4/3" }}
                            >
                                {idx % 5 === 0 && <div style={{ paddingBottom: "75%" }} />}
                                <img
                                    src={photo.url}
                                    alt={`${photo.label} — ${photo.sub}`}
                                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-end p-3">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-background text-[9px] font-semibold tracking-widest uppercase">{photo.label}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
                        onClick={() => setLightbox(null)}
                    >
                        {/* Top bar */}
                        <div className="flex justify-between items-center px-5 py-4 shrink-0 border-b border-white/10" onClick={e => e.stopPropagation()}>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[9px] font-semibold tracking-widest uppercase text-white/50">{photos[lightbox]?.label}</span>
                                <span className="text-[8px] font-semibold tracking-widest uppercase text-white/30">{photos[lightbox]?.sub}</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-[9px] font-semibold tracking-widest uppercase text-white/35">
                                    {lightbox + 1} / {photos.length}
                                </span>
                                <button
                                    onClick={() => setLightbox(null)}
                                    className="text-white/50 hover:text-white transition-colors text-2xl leading-none"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="flex-1 flex items-center justify-center p-4 md:p-8 min-h-0" onClick={e => e.stopPropagation()}>
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={lightbox}
                                    initial={{ opacity: 0, scale: 0.97 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    src={photos[lightbox]?.url}
                                    alt={photos[lightbox]?.label ?? ""}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </AnimatePresence>
                        </div>

                        {/* Bottom nav arrows */}
                        <div className="flex justify-between items-center px-5 py-4 shrink-0 border-t border-white/10" onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setLightbox(i => i !== null ? Math.max(i - 1, 0) : null)}
                                disabled={lightbox === 0}
                                className="text-[10px] font-semibold tracking-widest uppercase text-white/40 hover:text-white disabled:opacity-20 transition-colors px-4 py-2"
                            >
                                ← POPRZEDNIE
                            </button>
                            <button
                                onClick={() => setLightbox(i => i !== null ? Math.min(i + 1, photos.length - 1) : null)}
                                disabled={lightbox === photos.length - 1}
                                className="text-[10px] font-semibold tracking-widest uppercase text-white/40 hover:text-white disabled:opacity-20 transition-colors px-4 py-2"
                            >
                                NASTĘPNE →
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Footer mini ── */}
            <div className="flex justify-center md:justify-between items-center px-4 md:px-8 py-5 bg-foreground text-background border-t border-foreground/10">
                <span className="text-[9px] font-semibold tracking-widest uppercase text-background/35">© 2026 KOŁŁĄTAJA 23 · WROCŁAW</span>
            </div>
        </main>
    )
}
