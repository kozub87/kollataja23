"use client"
import { motion } from "framer-motion"
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
            <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[#101010]/95 via-[#101010]/40 to-transparent pointer-events-none" />
            
            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 lg:p-10 flex flex-col justify-end items-start z-20">
                <h3 className="font-serif font-normal text-[32px] md:text-[40px] leading-[1.1] tracking-[-0.02em] text-left text-[#f9f6f3] mb-0 drop-shadow-md">
                    {apt.title}
                </h3>
                
                {/* Reveal container using grid-rows transition */}
                <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                    <div className="overflow-hidden">
                        <div className="pt-3 lg:pt-4 flex flex-wrap items-center justify-start gap-3 lg:gap-4 font-sans text-[16px] leading-[24px] tracking-[-0.32px] font-normal text-[#f9f6f3]/90">
                            <span>{apt.price}</span>
                            <span className="w-1 h-1 rounded-full bg-[#f9f6f3]/50 hidden sm:block" />
                            <span>{apt.guests}</span>
                            <span className="w-1 h-1 rounded-full bg-[#f9f6f3]/50 hidden sm:block" />
                            <RollingLink href={`/apartament/${apt.id}`} className="text-[#f9f6f3] text-[16px] border-b border-[#f9f6f3]/80 pb-[1px] hidden sm:block">
                                Zobacz Lokal
                            </RollingLink>
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
    return (
        <>
            {/* ════════════════════════════════════════════
                SECTION HEADER
            ════════════════════════════════════════════ */}
            <section id="apartamenty" className="bg-background pt-16 lg:pt-32 relative z-0">
                <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-12 max-w-[1440px] mx-auto px-6 md:px-12">
                    <div className="max-w-2xl">
                        <div className="mb-6">
                            <span className="eye-brow !text-left">Kolekcja</span>
                        </div>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="section-heading leading-[1.1] mb-12 lg:mb-0"
                        >
                            Wybierz swój <br />idealny azyl
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex flex-col gap-6 max-w-sm mb-6 lg:mb-12"
                    >
                        <p className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] text-center text-foreground/60">
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
                DESKTOP: Grid (1 + 2 + 2)
            ════════════════════════════════════════════ */}
            <section className="hidden lg:block bg-background pb-32 pt-16">
                <div className="flex flex-col gap-6 max-w-[1440px] mx-auto px-12">
                    {/* Top element: full width (Apt 1) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="w-full"
                    >
                        <ApartmentCard apt={apartments[0]} isFullWidth={true} />
                    </motion.div>
                    
                    {/* Next rows: 2 per row */}
                    <div className="grid grid-cols-2 gap-6 w-full">
                        {apartments.slice(1).map((apt, idx) => (
                            <motion.div
                                key={apt.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: idx * 0.1 }}
                            >
                                <ApartmentCard apt={apt} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
