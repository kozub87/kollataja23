"use client"
"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { RollingLink } from "@/components/ui/RollingLink"

// ─── Types ───────────────────────────────────────────────────────────────────
interface Apartment {
    id: number
    title: string
    guests: string
    description: string
    image: string
    price: string
}

const apartments: Apartment[] = [
    {
        id: 1,
        title: "Apartament Nr 1",
        guests: "2 Osoby",
        description: "Intymna przestrzeń z dużym oknem wychodzącym na ciche patio. Idealny wybór na romantyczny weekend.",
        image: "/Apartament%201/The%20Grand%20Suite.png",
        price: "Od 350 PLN"
    },
    {
        id: 2,
        title: "Apartament Nr 2",
        guests: "4 Osoby",
        description: "Przestronny salon z aneksem kuchennym. Zaprojektowany z myślą o rodzinach ceniących dobry design.",
        image: "/Apartament%202/Balcony%20Residence.png",
        price: "Od 450 PLN"
    },
    {
        id: 3,
        title: "Apartament Nr 3",
        guests: "3 Osoby",
        description: "Słoneczne wnętrze z wydzieloną strefą sypialną. Zachowane oryginalne sztukaterie na sufitach.",
        image: "/Apartament%203/Loft%20Studio.png",
        price: "Od 400 PLN"
    },
    {
        id: 4,
        title: "Apartament Nr 4",
        guests: "4 Osoby",
        description: "Nasz flagowy apartament z dwiema sypialniami. Najwyższy standard wykończenia i pełne wyposażenie.",
        image: "/Apartament%204/Studio%20Deluxe.png",
        price: "Od 550 PLN"
    },
    {
        id: 5,
        title: "Apartament Nr 5",
        guests: "2 Osoby",
        description: "Kameralny apartament na II piętrze z widokiem na wewnętrzne podwórko. Przytulny charakter i pełne wyposażenie.",
        image: "/Apartament%205/Terrace%20Studio.png",
        price: "Od 300 PLN"
    },
]

// ─── Apartment Card (w/ Hover Reveal Effect) ──────────────────────────────────
function ApartmentCard({ apt, isFullWidth }: { apt: Apartment, isFullWidth?: boolean }) {
    return (
        <a href={`/apartament/${apt.id}`} className={`group relative block overflow-hidden bg-foreground/5 w-full ${isFullWidth ? 'aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/3]'}`}>
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${apt.image}')` }}
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
            
            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 lg:p-10 flex flex-col justify-end items-start z-20">
                <h3 className="font-serif font-normal text-[32px] md:text-[40px] leading-[1.1] tracking-[-0.02em] text-left text-white mb-0 drop-shadow-md">
                    {apt.title}
                </h3>
                
                {/* Reveal container using grid-rows transition */}
                <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                    <div className="overflow-hidden">
                        <div className="pt-3 lg:pt-4 flex flex-wrap items-center justify-start gap-3 lg:gap-4 font-sans text-[16px] leading-[24px] tracking-[-0.32px] font-normal text-white/90">
                            <span>{apt.price}</span>
                            <span className="w-1 h-1 rounded-full bg-[#f9f6f3]/50 hidden sm:block" />
                            <span>{apt.guests}</span>
                            <span className="w-1 h-1 rounded-full bg-[#f9f6f3]/50 hidden sm:block" />
                            <div className="flex items-center gap-1 text-white text-[16px] border-b border-white/80 pb-[1px] hidden sm:flex group-hover:border-primary transition-colors">
                                <span>Zobacz Lokal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}

// ─── Mobile Horizontal Slider ────────────────────────────────────────────────
function MobileSlider({ apartments }: { apartments: Apartment[] }) {
    return (
        <div 
            className="block lg:hidden w-full overflow-x-auto snap-x snap-mandatory pt-8 pb-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <div className="flex w-max gap-4 px-5">
                {apartments.map((apt) => (
                    <div 
                        key={apt.id}
                        className="snap-center w-[85vw] sm:w-[80vw] shrink-0"
                    >
                        <ApartmentCard apt={apt} />
                    </div>
                ))}
            </div>
            <style>
                {`
                div::-webkit-scrollbar {
                    display: none;
                }
                `}
            </style>
        </div>
    )
}

export function Collection() {
    const containerRef = useRef<HTMLDivElement>(null)
    
    // Track scroll for each row to apply exit animations to previous rows
    const row2Ref = useRef<HTMLDivElement>(null)
    const row3Ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress: row2Progress } = useScroll({
        target: row2Ref,
        offset: ["start end", "start start"]
    })

    const { scrollYProgress: row3Progress } = useScroll({
        target: row3Ref,
        offset: ["start end", "start start"]
    })

    // Exit transforms for Row 1 (when Row 2 comes in)
    const row1Scale = useTransform(row2Progress, [0, 1], [1, 0.92])
    const row1Opacity = useTransform(row2Progress, [0, 1], [1, 0])
    const row1Filter = useTransform(row2Progress, [0, 1], ["brightness(1)", "brightness(0.5)"])

    // Exit transforms for Row 2 (when Row 3 comes in)
    const row2Scale = useTransform(row3Progress, [0, 1], [1, 0.94])
    const row2Opacity = useTransform(row3Progress, [0, 1], [1, 0])
    const row2Filter = useTransform(row3Progress, [0, 1], ["brightness(1)", "brightness(0.7)"])

    return (
        <div ref={containerRef}>
            {/* ════════════════════════════════════════════
                SECTION HEADER
            ════════════════════════════════════════════ */}
            <section id="apartamenty" className="bg-background pt-12 relative z-0">
                <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="max-w-2xl text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-120px" }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="mb-6 text-left"
                        >
                            <span className="eye-brow !text-left">Kolekcja</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-150px" }}
                            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="section-heading leading-[1.1] mb-12 lg:mb-0 dark:text-foreground"
                        >
                            Wybierz swój <br />idealny azyl
                        </motion.h2>
                    </div>

                    {/* ── Focused Review Display ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-6 max-w-sm mb-0 lg:mb-0"
                    >
                        <p className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] lg:text-left text-foreground/60">
                            Przeglądaj naszą kolekcję apartamentów stworzonych dla Twojego komfortu i spokoju.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                MOBILE: Horizontal Carousel
            ════════════════════════════════════════════ */}
            <MobileSlider apartments={apartments} />

            {/* ════════════════════════════════════════════
                DESKTOP: Sticky Stacking Grid (1 + 2 + 2)
            ════════════════════════════════════════════ */}
            <section className="hidden lg:block relative w-full mb-20 z-10">
                <div className="relative w-full max-w-[1440px] mx-auto px-12">
                    
                    {/* Row 1 / Sticky Container */}
                    <div className="sticky top-28 z-10 w-full h-[85vh] flex flex-col justify-start pt-4 pointer-events-none">
                        <motion.div 
                            style={{ scale: row1Scale, opacity: row1Opacity, filter: row1Filter }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="w-full origin-bottom pointer-events-auto"
                        >
                            <ApartmentCard apt={apartments[0]} isFullWidth={true} />
                        </motion.div>
                    </div>
                    
                    {/* Skok Scrolla */}
                    <div ref={row2Ref} className="h-[60vh] w-full" />

                    {/* Row 2 / Sticky Container */}
                    <div className="sticky top-28 z-20 w-full h-[85vh] flex flex-col justify-start pt-4 pointer-events-none">
                        <motion.div 
                            style={{ scale: row2Scale, opacity: row2Opacity, filter: row2Filter }}
                            className="grid grid-cols-2 gap-6 w-full origin-bottom pointer-events-auto"
                        >
                            <ApartmentCard apt={apartments[1]} />
                            <ApartmentCard apt={apartments[2]} />
                        </motion.div>
                    </div>

                    {/* Skok Scrolla */}
                    <div ref={row3Ref} className="h-[60vh] w-full" />

                    {/* Row 3 / Sticky Container */}
                    <div className="sticky top-28 z-30 w-full h-[85vh] flex flex-col justify-start pt-4 pointer-events-none">
                        <div className="grid grid-cols-2 gap-6 w-full pointer-events-auto">
                            <ApartmentCard apt={apartments[3]} />
                            <ApartmentCard apt={apartments[4]} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
