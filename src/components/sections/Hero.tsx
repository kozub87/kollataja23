"use client"
import { motion } from "framer-motion"
import { WeatherWidget } from "@/components/ui/WeatherWidget"
import { MobileMenu } from "@/components/ui/MobileMenu"

const T = { duration: 0.55, ease: "easeOut" } as const

export function Hero() {
    return (
        <section className="p-4 md:p-8 w-full min-h-screen flex flex-col bg-background transition-colors duration-500 selection:bg-foreground selection:text-background">

            {/* ── Navigation ── */}
            <nav className="flex justify-between items-center pb-6 border-b border-foreground/15">
                <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ ...T, delay: 0 }}
                    className="font-semibold text-xl tracking-tighter uppercase text-foreground flex items-start"
                >
                    KOŁŁĄTAJA 23<sup className="text-[10px] ml-0.5 mt-1 font-bold">®</sup>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ ...T, delay: 0.1 }}
                >
                    <MobileMenu activePath="/" />
                </motion.div>
            </nav>

            {/* ── Typography intro ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between py-12 md:py-24 gap-12 md:gap-8 border-b border-foreground/15">
                <div className="max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ ...T, delay: 0.2 }}
                        className="flex items-center gap-3 mb-12"
                    >
                        <div className="w-2.5 h-2.5 bg-foreground" />
                        <span className="text-xs uppercase font-semibold tracking-widest text-foreground/60">Nasza Wizja</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, delay: 0.3, ease: "easeOut" }}
                        className="text-foreground text-[12vw] md:text-8xl lg:text-[120px] font-semibold tracking-tighter uppercase leading-[0.85]"
                    >
                        TWORZYMY <br />TWÓJ SPOKÓJ.
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ ...T, delay: 0.55 }}
                    className="flex flex-col gap-8 md:max-w-xs lg:max-w-sm pb-2"
                >
                    <p className="text-foreground/60 text-xs md:text-sm leading-relaxed max-w-xs">
                        Odrestaurowane apartamenty tuż obok Dworca Głównego. Gwarancja doskonałego wypoczynku w samym sercu Wrocławia.
                    </p>
                    <a href="/#apartamenty" className="text-xs font-semibold tracking-widest uppercase text-foreground border-b border-foreground w-max pb-0.5 hover:opacity-50 transition-opacity">
                        ZOBACZ LOKALE →
                    </a>
                </motion.div>
            </div>

            {/* ── Hero Image ── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                className="relative w-full h-[55vh] md:h-[65vh] bg-black/5 overflow-hidden border-b border-foreground/15"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] hover:scale-105"
                    style={{ backgroundImage: "url('/Hero.png')" }}
                />
            </motion.div>

            {/* ── Stats Grid ── */}
            <div className="flex flex-col md:grid md:grid-cols-4 border-b border-foreground/15 md:border-b-0 w-full mt-4 md:mt-0">
                {[
                    { label: "Ocena", value: "9.7/10", delay: 0.6 },
                    { label: "Lokalizacja", value: "Wrocław", delay: 0.68 },
                    { label: "Do Dworca", value: "400M", delay: 0.76 },
                ].map((stat) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ ...T, delay: stat.delay }}
                        className="flex justify-between items-center md:items-start md:flex-col md:justify-center px-4 py-7 md:px-6 md:py-10 border-b md:border-r md:border-b-0 border-foreground/15 md:gap-3"
                    >
                        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/50">{stat.label}</span>
                        <span className="text-xl md:text-3xl font-semibold tracking-tighter uppercase text-foreground">{stat.value}</span>
                    </motion.div>
                ))}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ ...T, delay: 0.84 }}
                    className="p-0 border-none flex items-stretch"
                >
                    <div className="w-full flex">
                        <WeatherWidget />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
