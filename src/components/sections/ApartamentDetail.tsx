"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRef } from "react"
import type { Apartment } from "@/lib/apartments"
import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/sections/Footer"
import { FAQ } from "@/components/sections/FAQ"
import { SectionSeparator } from "@/components/ui/SectionSeparator"
import { 
    ArrowLeft, 
    ArrowRight, 
    Wifi, 
    Tv, 
    Coffee, 
    Wind, 
    Utensils, 
    Bed, 
    Waves, 
    ShowerHead, 
    Refrigerator, 
    WashingMachine, 
    Monitor,
    Key,
    User,
    Square
} from "lucide-react"

interface Props {
    apartment: Apartment
    others: Apartment[]
}

// Icon mapping for amenities
const getAmenityIcon = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes('wi-fi') || n.includes('wifi')) return <Wifi className="w-4 h-4" />
    if (n.includes('tv') || n.includes('telewizor')) return <Tv className="w-4 h-4" />
    if (n.includes('kawa') || n.includes('ekspres')) return <Coffee className="w-4 h-4" />
    if (n.includes('klimatyzacja')) return <Wind className="w-4 h-4" />
    if (n.includes('kuchnia') || n.includes('aneks')) return <Utensils className="w-4 h-4" />
    if (n.includes('łóżko') || n.includes('materac')) return <Bed className="w-4 h-4" />
    if (n.includes('prysznic')) return <ShowerHead className="w-4 h-4" />
    if (n.includes('pralka')) return <WashingMachine className="w-4 h-4" />
    if (n.includes('lodówka')) return <Refrigerator className="w-4 h-4" />
    if (n.includes('ręczniki')) return <Waves className="w-4 h-4" />
    if (n.includes('self check-in') || n.includes('klucze')) return <Key className="w-4 h-4" />
    return <Square className="w-4 h-4" /> // Default
}

export function ApartamentDetail({ apartment: apt, others }: Props) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = window.innerWidth * 0.7
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    const headerLabelClass = "font-sans text-[16px] leading-[24px] text-[#0f677d] font-medium tracking-[-0.32px] mb-10 block text-left"

    return (
        <main className="min-h-screen bg-[#f9f6f3] text-foreground font-sans antialiased selection:bg-[#1f3a40]/10">
            {/* ── 1. Navbar (Hero variant) ── */}
            <Navbar variant="hero" activePath={`/apartament/${apt.id}`} />

            {/* ── 2. Hero Section ── */}
            <section className="relative w-full h-screen overflow-hidden bg-black z-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${apt.images[0]}')` }}
                />
                
                <div className="absolute inset-0 bg-black/35 z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-[1]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-[1]" />

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 text-center mt-6">
                    <motion.span 
                        initial={{ opacity: 0, y: 15 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8 }}
                        className="text-[#f9f6f3]/80 font-sans text-[12px] font-medium tracking-[0.3em] uppercase mb-6"
                    >
                        {apt.subtitle}
                    </motion.span>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-[#f9f6f3] text-5xl md:text-[88px] font-serif font-medium leading-[1.1] text-balance"
                        style={{ textTransform: "none" }}
                    >
                        {apt.title}
                    </motion.h1>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 15 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-12 flex flex-col items-center gap-10"
                    >
                         <a href="#o-apartamencie" className="px-10 py-5 bg-[#f9f6f3] text-[#1f3a40] text-[10px] font-semibold tracking-widest uppercase hover:bg-[#a1826a] hover:text-[#f9f6f3] transition-all duration-300">
                             Odkryj Wnętrze
                         </a>
                    </motion.div>
                </div>
            </section>

            {/* ── 3. About Section (Parameters, Description, Booking Links) ── */}
            <section id="o-apartamencie" className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                <div className="lg:col-span-5 flex flex-col items-start border-t border-foreground/15 pt-8">
                    <span className={headerLabelClass}>Przegląd</span>
                    
                    <ul className="flex flex-col w-full mb-12">
                        <li className="flex justify-between items-center py-5 border-b border-foreground/5">
                            <span className="font-sans text-[15px] text-foreground/60 w-1/3">Cena</span>
                            <span className="font-serif text-[24px] text-[#1f3a40] font-medium text-right">{apt.price.weekday} PLN / noc</span>
                        </li>
                        <li className="flex justify-between items-center py-5 border-b border-foreground/5">
                            <span className="font-sans text-[15px] text-foreground/60 w-1/3">Rozmiar</span>
                            <span className="font-serif text-[18px] text-[#1f3a40] text-right">{apt.area} m²</span>
                        </li>
                        <li className="flex justify-between items-center py-5 border-b border-foreground/5">
                            <span className="font-sans text-[15px] text-foreground/60 w-1/3">Goście</span>
                            <span className="font-serif text-[18px] text-[#1f3a40] text-right">{apt.guests}</span>
                        </li>
                        <li className="flex justify-between items-center py-5 border-b border-foreground/5">
                            <span className="font-sans text-[15px] text-foreground/60 w-1/3">Pokoje</span>
                            <span className="font-serif text-[18px] text-[#1f3a40] text-right">{apt.rooms}</span>
                        </li>
                        <li className="flex justify-between items-center py-5 border-b border-foreground/5">
                            <span className="font-sans text-[15px] text-foreground/60 w-1/3">Piętro</span>
                            <span className="font-serif text-[18px] text-[#1f3a40] text-right">{apt.floor}</span>
                        </li>
                    </ul>

                    <div className="flex flex-col sm:flex-row lg:flex-col w-full gap-4">
                        <a 
                            href={apt.booking.bookingUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-center gap-4 bg-[#1f3a40] text-[#f9f6f3] px-10 py-5 hover:bg-[#a1826a] hover:scale-105 transition-all w-full"
                        >
                            <span className="font-sans text-[12px] font-semibold tracking-widest uppercase">Zarezerwuj w</span>
                            <img src="/Loga/booking.svg" className="h-4 invert opacity-90" alt="Booking.com" />
                        </a>
                        <a 
                            href={apt.booking.airbnbUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-center gap-4 bg-transparent border border-[#1f3a40]/20 text-[#1f3a40] px-10 py-5 hover:border-[#a1826a] hover:text-[rgb(161,130,106)] hover:bg-transparent transition-all w-full"
                        >
                            <span className="font-sans text-[12px] font-semibold tracking-widest uppercase">Zarezerwuj w</span>
                            <img src="/Loga/airbnb.svg" className="h-4 opacity-90" alt="Airbnb" />
                        </a>
                    </div>
                </div>

                <div className="lg:col-span-7 flex flex-col pt-8 border-t border-foreground/15">
                    <span className={headerLabelClass}>Opis Lokalu</span>
                    
                    <h2 className="font-serif text-3xl md:text-5xl text-[#1f3a40] tracking-tight mb-8">
                        Odpocznij w luksusie
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-foreground/60 text-balance max-w-2xl">
                        {apt.longDescription.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                </div>
            </section>

            <SectionSeparator />

            {/* ── 4. Gallery Carousel ── */}
            <section className="w-full bg-[#f9f6f3] py-24 lg:py-32 text-foreground overflow-hidden">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-16 flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className={headerLabelClass.replace('mb-10', 'mb-4')}>Wnętrza</span>
                        <h2 className="font-serif text-4xl lg:text-[56px] tracking-tight text-[#1f3a40]">Galeria</h2>
                    </div>
                    
                    {/* Replaced Text with Reviews-style Navigation */}
                    <div className="flex items-center gap-4 hidden md:flex">
                        <button 
                            onClick={() => scroll('left')}
                            className="w-[46px] h-[46px] rounded-full border border-foreground/20 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/40 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 stroke-[1.2]" />
                        </button>
                        <button 
                            onClick={() => scroll('right')}
                            className="w-[46px] h-[46px] rounded-full border border-foreground/20 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/40 transition-colors"
                        >
                            <ArrowRight className="w-5 h-5 stroke-[1.2]" />
                        </button>
                    </div>
                </div>
                
                {/* Scroll Container */}
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-8 scrollbar-hide snap-x snap-mandatory [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}
                >
                    {apt.images.map((img, i) => (
                        <div key={i} className="min-w-[85vw] md:min-w-[65vw] lg:min-w-[900px] aspect-[4/3] md:h-[600px] shrink-0 snap-center relative overflow-hidden bg-foreground/5 group">
                            <img 
                                src={img} 
                                alt={`${apt.title} - Zdjęcie ${i+1}`} 
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03]" 
                                loading={i === 0 ? "eager" : "lazy"}
                            />
                        </div>
                    ))}
                </div>
            </section>

            <SectionSeparator />

            {/* ── 5. Amenities ── */}
            <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <span className={headerLabelClass.replace('mb-10', 'mb-2')}>Detale</span>
                        <h2 className="font-serif text-4xl lg:text-[56px] tracking-tight text-[#1f3a40]">Wyposażenie</h2>
                    </div>
                    <div className="lg:col-span-8 flex flex-col">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 pt-4">
                            {apt.amenities.map(a => (
                                <div key={a} className="flex items-center gap-4 py-2 border-b border-foreground/5">
                                    <div className="text-[#0f677d]">
                                        {getAmenityIcon(a)}
                                    </div>
                                    <span className="font-sans text-[15px] text-foreground/80">{a}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <SectionSeparator />

            {/* ── 6. FAQ from Main Page ── */}
            <FAQ />

            <SectionSeparator />

            {/* ── 7. Footer from Main Page ── */}
            <Footer />

        </main>
    )
}
