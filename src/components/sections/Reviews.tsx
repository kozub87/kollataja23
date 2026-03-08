"use client"
import { motion } from "framer-motion"

const reviews = [
    {
        id: 1,
        score: "9.8",
        quote: "Fantastyczna lokalizacja — dosłownie kilka kroków od Rynku. Apartament czysty, urządzony z klasą i bardzo dobrze wyposażony.",
        author: "Marta K.",
        city: "Warszawa",
        platform: "Booking.com",
        date: "Luty 2025",
    },
    {
        id: 2,
        score: "10",
        quote: "Najpiękniejszy apartament w jakim nocowałem. Widok z okna, wykończenie, spokój — wszystko na najwyższym poziomie.",
        author: "Jacek W.",
        city: "Kraków",
        platform: "Airbnb",
        date: "Styczeń 2025",
    },
    {
        id: 3,
        score: "9.6",
        quote: "Perfekcyjne miejsce na romantyczny weekend. Bliskość Starego Miasta i cisza — połączenie którego się nie spodziewałam.",
        author: "Anna M.",
        city: "Gdańsk",
        platform: "Booking.com",
        date: "Grudzień 2024",
    },
]

export function Reviews() {
    return (
        <section className="bg-background border-b border-foreground/15">

            {/* ── Header ── */}
            <div className="px-4 pt-24 pb-16 md:px-8 md:pt-32 md:pb-24 flex flex-col lg:flex-row justify-between lg:items-end gap-12 border-b border-foreground/15">
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-2.5 h-2.5 bg-foreground" />
                        <span className="text-xs uppercase font-semibold tracking-widest text-foreground/60">Opinie Gości</span>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl lg:text-[90px] font-semibold tracking-tighter uppercase leading-[0.95] text-foreground"
                    >
                        GOŚCIE<br />O NAS
                    </motion.h2>
                </div>

                {/* Aggregate Rating Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="flex flex-col gap-2 lg:items-end"
                >
                    <div className="flex items-baseline gap-2">
                        <span className="text-6xl md:text-8xl font-semibold tracking-tighter text-foreground">9.7</span>
                        <span className="text-xl font-semibold tracking-tighter text-foreground/40">/10</span>
                    </div>
                    <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-foreground/50">
                        Średnia z 120+ opinii
                    </span>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40 border border-foreground/20 px-2.5 py-1">Booking.com</span>
                        <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40 border border-foreground/20 px-2.5 py-1">Airbnb</span>
                    </div>
                </motion.div>
            </div>

            {/* ── Reviews Grid ── */}
            <div className="flex flex-col md:grid md:grid-cols-3 border-b border-foreground/15">
                {reviews.map((review, idx) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className={`
                            flex flex-col px-6 py-12 md:px-8 md:py-14 gap-8
                            border-b md:border-b-0
                            ${idx < reviews.length - 1 ? "md:border-r" : ""}
                            border-foreground/15
                        `}
                    >
                        {/* Score */}
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-4xl md:text-5xl font-semibold tracking-tighter text-foreground">
                                {review.score}
                            </span>
                            <span className="text-base font-semibold text-foreground/30">/10</span>
                        </div>

                        {/* Quote */}
                        <p className="text-sm text-foreground/75 leading-relaxed flex-1 italic">
                            "{review.quote}"
                        </p>

                        {/* Footer */}
                        <div className="flex justify-between items-end border-t border-foreground/10 pt-5">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground">
                                    {review.author}
                                </span>
                                <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40">
                                    {review.city}
                                </span>
                            </div>
                            <div className="flex flex-col items-end gap-0.5">
                                <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/50 border border-foreground/15 px-2 py-0.5">
                                    {review.platform}
                                </span>
                                <span className="text-[8px] font-semibold tracking-widest uppercase text-foreground/30 mt-1">
                                    {review.date}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── CTA Bottom Bar ── */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-4 py-14 md:px-8">
                <p className="text-sm text-foreground/50 leading-relaxed max-w-sm">
                    Dołącz do setek zadowolonych gości, którzy wybrali Kołłątaja 23 jako swój azyl w sercu Wrocławia.
                </p>
                <div className="flex items-center gap-6">
                    <a
                        href="https://booking.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground border-b border-foreground pb-0.5 hover:opacity-50 transition-opacity whitespace-nowrap"
                    >
                        ZAREZERWUJ NA BOOKING →
                    </a>
                    <a
                        href="https://airbnb.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/50 hover:text-foreground hover:opacity-70 transition-all whitespace-nowrap"
                    >
                        LUB AIRBNB →
                    </a>
                </div>
            </div>
        </section>
    )
}
