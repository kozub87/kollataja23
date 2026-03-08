"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

// ─── Types ───────────────────────────────────────────────────────────────────
interface Apartment {
    id: number
    title: string
    guests: string
    description: string
    image: string
}

// ─── Single card — gets its y-transform from scroll progress ──────────────────
function MobileCard({
    apt,
    idx,
    total,
    scrollYProgress,
}: {
    apt: Apartment
    idx: number
    total: number
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
    // Each card's "slot" in scrollYProgress (0-1)
    // Card 0 is always visible (starts at y=0).
    // Card 1 slides in from y=100% to y=0% as progress goes from 0 → 1/n.
    // Card 2 slides in from y=100% to y=0% as progress goes from 1/n → 2/n. etc.
    const rangeStart = idx === 0 ? 0 : (idx - 1) / (total - 1)        // when it starts sliding
    const rangeEnd = idx === 0 ? 0 : idx / (total - 1)              // when it settles

    const y = useTransform(
        scrollYProgress,
        [rangeStart, rangeEnd],
        idx === 0 ? ["0%", "0%"] : ["100%", "0%"]
    )

    return (
        <motion.div
            style={{
                y,
                position: "sticky",
                top: 0,
                zIndex: idx + 1,
                height: "100vh",
                width: "100%",
                boxShadow: idx > 0 ? "0 -12px 40px rgba(0,0,0,0.20)" : "none",
            }}
            className="bg-background flex flex-col overflow-hidden"
        >
            {/* Full-stretch image — explicit height avoids flex bugs */}
            <div className="w-full overflow-hidden bg-foreground/5" style={{ height: "calc(100vh - 110px)" }}>
                <img
                    src={apt.image}
                    alt={apt.title}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                />
            </div>

            {/* Text bar */}
            <div className="w-full border-t border-foreground/15 bg-background px-5 pt-4 pb-5 flex items-start justify-between gap-4" style={{ height: "110px" }}>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span className="text-[9px] font-semibold tracking-[0.25em] uppercase text-foreground/40">
                        {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-semibold tracking-tighter uppercase text-foreground leading-tight truncate">
                        {apt.title}
                    </h3>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-foreground/55 leading-relaxed line-clamp-2 mt-0.5">
                        {apt.description}
                    </p>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0 pt-1">
                    <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40">{apt.guests}</span>
                    <a href={`/apartament/${apt.id}`} className="text-[9px] font-semibold tracking-[0.2em] uppercase text-foreground border-b border-foreground pb-0.5 whitespace-nowrap">
                        WIĘCEJ →
                    </a>
                </div>
            </div>
        </motion.div>
    )
}

// ─── Mobile scroll container — tracks scroll within itself ────────────────────
function MobileStack({ apartments }: { apartments: Apartment[] }) {
    const containerRef = useRef<HTMLDivElement>(null)

    // scrollYProgress = 0→1 as user scrolls from top to bottom of this container
    const { scrollYProgress } = useScroll({ target: containerRef })

    return (
        // Total height = n × 100vh — provides scroll space for all cards
        <div ref={containerRef} className="block md:hidden" style={{ height: `${apartments.length * 100}vh` }}>
            {apartments.map((apt, idx) => (
                <MobileCard
                    key={apt.id}
                    apt={apt}
                    idx={idx}
                    total={apartments.length}
                    scrollYProgress={scrollYProgress}
                />
            ))}
        </div>
    )
}

const apartments: Apartment[] = [
    {
        id: 1,
        title: "APARTAMENT NR 1",
        guests: "2 OSOBY",
        description: "Intymna przestrzeń z dużym oknem wychodzącym na ciche patio. Idealny wybór na romantyczny weekend.",
        image: "/Apartament%201/The%20Grand%20Suite.png"
    },
    {
        id: 2,
        title: "APARTAMENT NR 2",
        guests: "4 OSOBY",
        description: "Przestronny salon z aneksem kuchennym. Zaprojektowany z myślą o rodzinach ceniących dobry design.",
        image: "/Apartament%202/Balcony%20Residence.png"
    },
    {
        id: 3,
        title: "APARTAMENT NR 3",
        guests: "3 OSOBY",
        description: "Słoneczne wnętrze z wydzieloną strefą sypialną. Zachowane oryginalne sztukaterie na sufitach.",
        image: "/Apartament%203/Loft%20Studio.png"
    },
    {
        id: 4,
        title: "APARTAMENT NR 4",
        guests: "4 OSOBY",
        description: "Nasz flagowy apartament z dwiema sypialniami. Najwyższy standard wykończenia i pełne wyposażenie.",
        image: "/Apartament%204/Studio%20Deluxe.png"
    },
    {
        id: 5,
        title: "APARTAMENT NR 5",
        guests: "2 OSOBY",
        description: "Kameralny apartament na II piętrze z widokiem na wewnętrzne podwórko. Przytulny charakter i pełne wyposażenie.",
        image: "/Apartament%205/Terrace%20Studio.png"
    },
]

export function Collection() {
    return (
        <>
            {/* ════════════════════════════════════════════
                SECTION HEADER (shared desktop + mobile)
            ════════════════════════════════════════════ */}
            <section className="bg-background border-b border-foreground/15 px-4 pt-24 pb-16 md:px-8 md:pt-32 md:pb-24">
                <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-2.5 h-2.5 bg-foreground" />
                            <span className="text-xs uppercase font-semibold tracking-widest text-foreground/60">Kolekcja</span>
                        </div>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="text-foreground text-5xl md:text-7xl lg:text-[90px] font-semibold tracking-tighter uppercase leading-[0.95]"
                        >
                            WYBIERZ SWÓJ <br />IDEALNY AZYL
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex flex-col gap-6 max-w-sm"
                    >
                        <p className="text-foreground/65 text-sm leading-relaxed">
                            Przeglądaj naszą kolekcję apartamentów stworzonych dla Twojego komfortu i spokoju.
                        </p>
                        <a href="#" className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground border-b border-foreground w-max pb-0.5 hover:opacity-50 transition-opacity">
                            PEŁNA OFERTA →
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                MOBILE: Framer Motion scroll-driven stack
                Każda karta animuje się z translateY(100%) → (0%)
                w swoim przedziale scrollYProgress kontenera.
                Brak CSS sticky — brak bugów z overflow/dvh/lazy.
            ════════════════════════════════════════════ */}
            <MobileStack apartments={apartments} />

            {/* ════════════════════════════════════════════
                DESKTOP: Classic 2-column grid
            ════════════════════════════════════════════ */}
            <section className="hidden md:block bg-background border-b border-foreground/15">
                <div className="grid grid-cols-2 gap-x-10 gap-y-32 px-8 pb-32">
                    {apartments.map((apt, idx) => {
                        const isOddTotal = apartments.length % 2 !== 0
                        const isLastAndAlone = isOddTotal && idx === apartments.length - 1

                        // ── 5th (or any lone last) card: full-width horizontal layout ──
                        if (isLastAndAlone) {
                            return (
                                <motion.article
                                    key={apt.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.8 }}
                                    className="col-span-2 group flex flex-row gap-12 cursor-pointer border-t border-foreground/10 pt-12"
                                >
                                    {/* Image — left half */}
                                    <div className="w-1/2 aspect-[16/9] bg-foreground/5 overflow-hidden border border-foreground/10 shrink-0">
                                        <div
                                            className="w-full h-full bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-105"
                                            style={{ backgroundImage: `url('${apt.image}')` }}
                                        />
                                    </div>

                                    {/* Info — right half, vertically centered */}
                                    <div className="flex-1 flex flex-col justify-center gap-6 border-l border-foreground/10 pl-12">
                                        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-foreground/35">
                                            {String(idx + 1).padStart(2, "0")} / {String(apartments.length).padStart(2, "0")}
                                        </span>
                                        <h3 className="text-4xl lg:text-5xl font-semibold tracking-tighter uppercase text-foreground group-hover:opacity-70 transition-opacity">
                                            {apt.title}
                                        </h3>
                                        <p className="text-sm text-foreground/60 leading-relaxed max-w-md">
                                            {apt.description}
                                        </p>
                                        <div className="flex items-center gap-8 pt-2">
                                            <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/40">{apt.guests}</span>
                                            <a href={`/apartament/${apt.id}`}
                                                className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground border-b border-foreground pb-0.5 hover:opacity-50 transition-opacity">
                                                SZCZEGÓŁY LOKALU →
                                            </a>
                                        </div>
                                    </div>
                                </motion.article>
                            )
                        }

                        // ── Regular 2-column card ──
                        return (
                            <motion.article
                                key={apt.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                                className="group flex flex-col cursor-pointer"
                            >
                                <div className="w-full aspect-[4/3] bg-foreground/5 overflow-hidden border border-foreground/10 mb-6">
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-105"
                                        style={{ backgroundImage: `url('${apt.image}')` }}
                                    />
                                </div>

                                <div className="flex flex-col border-t border-foreground/15 pt-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tighter uppercase text-foreground group-hover:opacity-70 transition-opacity">
                                            {apt.title}
                                        </h3>
                                        <span className="text-xs font-semibold tracking-widest uppercase text-foreground/50 whitespace-nowrap pt-1.5 ml-4">
                                            {apt.guests}
                                        </span>
                                    </div>
                                    <p className="text-sm text-foreground/60 leading-relaxed mb-6">
                                        {apt.description}
                                    </p>
                                    <div className="flex justify-between items-center mt-auto border-t border-foreground/5 pt-4">
                                        <a href={`/apartament/${apt.id}`} className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground border-b border-transparent group-hover:border-foreground pb-0.5 transition-colors">
                                            SZCZEGÓŁY LOKALU →
                                        </a>
                                    </div>
                                </div>
                            </motion.article>
                        )
                    })}
                </div>
            </section>
        </>
    )
}
