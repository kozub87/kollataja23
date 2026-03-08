"use client"
import { motion } from "framer-motion"
import { LeafletMap } from "@/components/ui/LeafletMap"



const distances = [
    { label: "RYNEK GŁÓWNY", value: "600M", sub: "7 min piechotą" },
    { label: "DWORZEC PKP", value: "400M", sub: "5 min piechotą" },
    { label: "HALA TARGOWA", value: "350M", sub: "4 min piechotą" },
    { label: "LOTNISKO", value: "11KM", sub: "20 min autem" },
]

export function Location() {
    return (
        <section className="bg-background border-b border-foreground/15">

            {/* ── Header row ── */}
            <div className="px-4 pt-24 pb-16 md:px-8 md:pt-32 md:pb-24 flex flex-col lg:flex-row justify-between lg:items-end gap-16 border-b border-foreground/15">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-2.5 h-2.5 bg-foreground" />
                        <span className="text-xs uppercase font-semibold tracking-widest text-foreground/60">Lokalizacja</span>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-foreground text-5xl md:text-7xl lg:text-[90px] font-semibold tracking-tighter uppercase leading-[1.05]"
                    >
                        SERCE<br />WROCŁAWIA
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
                        Ul. Kołłątaja 23 to jeden z najbardziej pożądanych adresów w centrum Wrocławia —
                        w zasięgu krótkiego spaceru od najważniejszych punktów miasta.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/50">
                            51.1079° N, 17.0385° E
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* ── Mapbox Map ── */}
            <div
                className="w-full border-b border-foreground/15 relative overflow-hidden"
                style={{ height: "clamp(260px, 55vw, 600px)" }}
            >
                <LeafletMap />

                {/* Floating address tag — absolute over map */}
                <div className="absolute bottom-6 left-4 md:bottom-8 md:left-8 bg-background px-4 py-3 border border-foreground/15 z-10 pointer-events-none">
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground">
                        UL. KOŁŁĄTAJA 23, WROCŁAW
                    </span>
                </div>
            </div>

            {/* ── Distance grid ── */}
            <div className="flex flex-col md:grid md:grid-cols-4 border-b border-foreground/15">
                {distances.map((item, idx) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                        className={`
                            flex justify-between items-center
                            md:flex-col md:items-start md:justify-center
                            px-4 py-6 md:px-6 md:py-10
                            md:gap-3
                            border-b border-foreground/15
                            ${idx < distances.length - 1 ? "md:border-r" : ""}
                            md:border-b-0
                        `}
                    >
                        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/50">
                            {item.label}
                        </span>
                        <div className="flex flex-col items-end md:items-start gap-0.5">
                            <span className="text-xl md:text-3xl font-semibold tracking-tighter uppercase text-foreground">
                                {item.value}
                            </span>
                            <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40">
                                {item.sub}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── Bottom text row ── */}
            <div className="flex flex-col md:flex-row gap-0 md:divide-x divide-foreground/15">
                {/* Left: bold statement */}
                <div className="flex-1 px-4 py-16 md:px-8 md:py-20 flex flex-col justify-between gap-10 border-b md:border-b-0 border-foreground/15">
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-2xl md:text-4xl font-semibold tracking-tighter uppercase text-foreground leading-tight max-w-lg"
                    >
                        IDEALNA BAZA WYPADOWA DO ZWIEDZANIA WROCŁAWIA I WYPOCZYNKU.
                    </motion.p>
                    <a
                        href="https://maps.google.com/?q=Kołłątaja+23,+Wrocław"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground border-b border-foreground w-max pb-0.5 hover:opacity-50 transition-opacity"
                    >
                        OTWÓRZ W MAPACH →
                    </a>
                </div>

                {/* Right: neighborhood tags */}
                <div className="flex-1 px-4 py-16 md:px-8 md:py-20 flex flex-col gap-8">
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/50 mb-2">
                        W OKOLICY
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            "Rynek Główny", "Panorama Racławicka",
                            "Ogród Botaniczny", "ZOO Wrocław",
                            "Mosty Tumskie", "Hala Stulecia",
                            "Ostrów Tumski", "Galeria Dominikańska",
                        ].map((place) => (
                            <div
                                key={place}
                                className="border border-foreground/15 px-3 py-2.5 flex items-center group hover:border-foreground/50 transition-colors"
                            >
                                <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/70 group-hover:text-foreground transition-colors">
                                    {place}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
