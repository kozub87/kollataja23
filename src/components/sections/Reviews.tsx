"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

const StarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-[#e8ded1] w-5 h-5 lg:w-6 lg:h-6">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
)

const reviews = [
    {
        id: 1,
        headline: "Najpewniej najpiękniejszy apartament we Wrocławiu",
        content: "Apartament w kamienicy Kołłątaja 23 przerósł nasze oczekiwania. Ogromna dbałość o każdy detal wnętrza, widok z balkonu wart każdej złotówki, a do tego fenomenalna czystość. Zdecydowanie polecam.",
        author: "Marta i Jan K.",
        city: "Warszawa, Polska",
        platform: "Booking.com",
        logo: "/Loga/booking.svg"
    },
    {
        id: 2,
        headline: "Cisza, spokój i niezwykły luksus w samym centrum",
        content: "Położenie apartamentu to strzał w dziesiątkę – wszędzie blisko, a jednocześnie można było świetnie odpocząć. Design wnętrza zachwyca na żywo jeszcze bardziej niż na zdjęciach. Wrócimy tu z pewnością na kolejną rocznicę.",
        author: "Piotr W.",
        city: "Kraków, Polska",
        platform: "Airbnb",
        logo: "/Loga/airbnb.svg"
    },
    {
        id: 3,
        headline: "Idealna baza wypadowa na romantyczny weekend",
        content: "Bezbłędny kontakt z obsługą. Sam apartament był wyposażony we wszystko, co niezbędne, a stylowe meble i wygodne łóżko połączone z bliskością Rynku sprawiły, że nie chcieliśmy stamtąd wyjeżdżać.",
        author: "Anna M.",
        city: "Gdańsk, Polska",
        platform: "Booking.com",
        logo: "/Loga/booking.svg"
    },
]

export function Reviews() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }

    const prevReview = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
    }

    return (
        <section id="opinie" className="bg-background py-24 lg:py-40 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center">
                
                {/* ── Header Ratings ── */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center gap-12 sm:gap-16 mb-24 lg:mb-32"
                >
                    <div className="flex items-center gap-5">
                        <img src="/Loga/booking.svg" alt="Booking.com" className="h-6 lg:h-8 object-contain opacity-60 dark:invert" />
                        <div className="flex flex-col border-l border-foreground/15 pl-5">
                            <span className="font-serif text-2xl lg:text-3xl text-foreground leading-none mb-1">9.8<span className="text-sm text-foreground/50 font-sans">/10</span></span>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/40 font-semibold">Znakomity</span>
                        </div>
                    </div>
                    {/* <div className="w-px h-10 bg-foreground/10 hidden sm:block"></div> */}
                    <div className="flex items-center gap-5">
                        <img src="/Loga/airbnb.svg" alt="Airbnb" className="h-6 lg:h-8 object-contain opacity-60 dark:invert" />
                        <div className="flex flex-col border-l border-foreground/15 pl-5">
                            <span className="font-serif text-2xl lg:text-3xl text-foreground leading-none mb-1">4.96<span className="text-sm text-foreground/50 font-sans">/5</span></span>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/40 font-semibold">Superhost</span>
                        </div>
                    </div>
                </motion.div>

                {/* ── Focused Review Display ── */}
                <div className="w-full max-w-4xl flex flex-col items-center text-center min-h-[500px] sm:min-h-[400px] justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="flex flex-col items-center w-full"
                        >
                            {/* Logo */}
                            {reviews[currentIndex].logo ? (
                                <img 
                                    src={reviews[currentIndex].logo} 
                                    alt={reviews[currentIndex].platform} 
                                    className="h-5 lg:h-6 opacity-80 mb-10 dark:invert" 
                                />
                            ) : (
                                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/50 mb-10 border border-foreground/10 px-3 py-1">
                                    {reviews[currentIndex].platform}
                                </span>
                            )}

                            {/* Big Headline */}
                            <h3 className="font-serif text-4xl md:text-5xl lg:text-[64px] leading-[1.1] text-[#1f3a40] mb-10 tracking-tight text-balance max-w-3xl">
                                "{reviews[currentIndex].headline}"
                            </h3>

                            {/* Stars */}
                            <div className="flex gap-2.5 mb-10">
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                            </div>

                            {/* Content text */}
                            <p className="font-sans text-[16px] md:text-[18px] leading-[28px] tracking-[-0.32px] text-foreground/70 max-w-2xl text-balance mb-8">
                                {reviews[currentIndex].content}
                            </p>

                            {/* Author */}
                            <span className="text-[14px] font-sans text-foreground/90">
                                {reviews[currentIndex].author}, {reviews[currentIndex].city}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── Controls ── */}
                <div className="flex items-center gap-4 mt-8">
                    <button 
                        onClick={prevReview}
                        className="w-[46px] h-[46px] rounded-full border border-foreground/20 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/40 transition-colors"
                        aria-label="Previous review"
                    >
                        <ArrowLeft className="w-5 h-5 stroke-[1.2]" />
                    </button>
                    <button 
                        onClick={nextReview}
                        className="w-[46px] h-[46px] rounded-full border border-foreground/20 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/40 transition-colors"
                        aria-label="Next review"
                    >
                        <ArrowRight className="w-5 h-5 stroke-[1.2]" />
                    </button>
                </div>

            </div>
        </section>
    )
}
