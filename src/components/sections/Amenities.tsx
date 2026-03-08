"use client"
import { motion } from "framer-motion"

const amenities = [
    { num: "01", name: "SZYBKIE WI-FI", detail: "100 Mbps, sieć dedykowana" },
    { num: "02", name: "W PEŁNI WYPOSAŻONA KUCHNIA", detail: "Ekspres, zmywarka, indukcja" },
    { num: "03", name: "KLIMATYZACJA", detail: "Osobna regulacja w każdym pokoju" },
    { num: "04", name: "SMART TV 55\"", detail: "Netflix, YouTube, HDMI" },
    { num: "05", name: "PRALKA I SUSZARKA", detail: "Dostępne 24/7" },
    { num: "06", name: "POŚCIEL I RĘCZNIKI", detail: "Hotelowa jakość, zmieniane co pobyt" },
    { num: "07", name: "SCHOWEK NA BAGAŻ", detail: "Zamykany, dostępny całą dobę" },
    { num: "08", name: "KAWA I HERBATA", detail: "Powitalny zestaw gratis" },
    { num: "09", name: "SAMO-ZAMELDOWANIE", detail: "Skrzynka z kluczami 24/7" },
    { num: "10", name: "MIEJSCA PARKINGOWE", detail: "Dostępne w pobliżu, płatne" },
]

export function Amenities() {
    return (
        <section className="bg-background border-b border-foreground/15">

            {/* ── Two-column layout: image left, text + list right ── */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:min-h-[720px]">

                {/* LEFT — Full-bleed image */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative w-full h-[60vw] lg:h-auto border-b lg:border-b-0 lg:border-r border-foreground/15 overflow-hidden"
                >
                    <img
                        src="/Landing.jpg"
                        alt="Wyposażenie apartamentu"
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                    />
                    {/* Subtle overlay + corner label */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    <div className="absolute top-5 left-5 bg-background px-3 py-2 border border-foreground/15">
                        <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-foreground">
                            STANDARD HOTELOWY
                        </span>
                    </div>
                </motion.div>

                {/* RIGHT — Heading + amenities list */}
                <div className="flex flex-col">
                    {/* Heading block */}
                    <div className="px-5 pt-20 pb-14 md:px-8 md:pt-24 md:pb-16 border-b border-foreground/15">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-2.5 h-2.5 bg-foreground" />
                            <span className="text-xs uppercase font-semibold tracking-widest text-foreground/60">Wyposażenie</span>
                        </div>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter uppercase leading-[0.9] text-foreground"
                        >
                            WSZYSTKO<br />CZEGO<br />POTRZEBUJESZ
                        </motion.h2>
                    </div>

                    {/* Amenities numbered list */}
                    <div className="flex flex-col">
                        {amenities.map((item, idx) => (
                            <motion.div
                                key={item.num}
                                initial={{ opacity: 0, x: 8 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-30px" }}
                                transition={{ duration: 0.4, delay: idx * 0.04 }}
                                className="flex items-center justify-between px-5 md:px-8 py-5 border-b border-foreground/10 group hover:bg-foreground/3 transition-colors"
                            >
                                <div className="flex items-center gap-5">
                                    <span className="text-[9px] font-semibold tracking-[0.2em] text-foreground/30 w-5 shrink-0">
                                        {item.num}
                                    </span>
                                    <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-foreground">
                                        {item.name}
                                    </span>
                                </div>
                                <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40 text-right hidden sm:block ml-4 shrink-0">
                                    {item.detail}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Bottom strip — full-width stat bar ── */}
            <div className="flex flex-col md:grid md:grid-cols-3 border-t border-foreground/15">
                {[
                    { label: "WYPOSAŻENIE", value: "10 UDOGODNIEŃ" },
                    { label: "DOSTĘPNOŚĆ", value: "24 / 7" },
                    { label: "ZAMELDOWANIE", value: "SELF CHECK-IN" },
                ].map((stat, idx) => (
                    <div
                        key={stat.label}
                        className={`flex justify-between items-center md:flex-col md:items-start md:justify-center px-5 py-7 md:px-8 md:py-10 md:gap-3 border-b md:border-b-0 ${idx < 2 ? "md:border-r" : ""} border-foreground/15`}
                    >
                        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/50">{stat.label}</span>
                        <span className="text-lg md:text-2xl font-semibold tracking-tighter uppercase text-foreground">{stat.value}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}
