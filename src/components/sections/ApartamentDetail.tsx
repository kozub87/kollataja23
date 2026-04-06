"use client"
import { motion } from "framer-motion"
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
    ShowerHead, 
    Refrigerator, 
    WashingMachine, 
    Key,
    Square,
    Zap,
    Thermometer,
    ChefHat,
    Waves,
    Bath,
    Home,
    Search
} from "lucide-react"

interface Props {
    apartment: Apartment
    others: Apartment[]
}

// Extended Icon mapping for amenities - replacing "dots/squares" with meaningful icons
const getAmenityIcon = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes('wi-fi') || n.includes('wifi')) return <Wifi className="w-4 h-4" />
    if (n.includes('tv') || n.includes('telewizor') || n.includes('ekran')) return <Tv className="w-4 h-4" />
    if (n.includes('kawa') || n.includes('ekspres')) return <Coffee className="w-4 h-4" />
    if (n.includes('klimatyzacja') || n.includes('nawiew')) return <Wind className="w-4 h-4" />
    if (n.includes('kuchnia') || n.includes('aneks') || n.includes('płyta') || n.includes('czajnik')) return <Utensils className="w-4 h-4" />
    if (n.includes('łóżko') || n.includes('materac') || n.includes('sypialnia')) return <Bed className="w-4 h-4" />
    if (n.includes('prysznic')) return <ShowerHead className="w-4 h-4" />
    if (n.includes('wanna')) return <Bath className="w-4 h-4" />
    if (n.includes('pralka') || n.includes('pranie')) return <WashingMachine className="w-4 h-4" />
    if (n.includes('lodówka')) return <Refrigerator className="w-4 h-4" />
    if (n.includes('ręczniki') || n.includes('kosmetyki')) return <Waves className="w-4 h-4" />
    if (n.includes('self check-in') || n.includes('klucze') || n.includes('kod')) return <Key className="w-4 h-4" />
    if (n.includes('ogrzewanie')) return <Thermometer className="w-4 h-4" />
    if (n.includes('śniadanie') || n.includes('jedzenie')) return <ChefHat className="w-4 h-4" />
    if (n.includes('widok')) return <Search className="w-4 h-4" />
    if (n.includes('balkon')) return <Home className="w-4 h-4" />
    return <Zap className="w-4 h-4" /> // More dynamic default than Square
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

    // Refined Label Class based on user feedback
    const headerLabelClass = "font-sans text-[16px] leading-[24px] text-primary font-normal tracking-[-0.32px] mb-10 block text-left transition-colors"

    return (
        <main className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/10 transition-colors duration-500">
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
                        className="text-white/80 font-sans text-[12px] font-medium tracking-[0.3em] uppercase mb-6"
                    >
                        {apt.subtitle}
                    </motion.span>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white text-5xl md:text-[88px] font-serif font-medium leading-[1.1] text-balance"
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
                          <a href="#o-apartamencie" className="px-10 py-5 bg-background text-foreground border border-foreground/10 text-[10px] font-semibold tracking-widest uppercase hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                              Odkryj Wnętrze
                          </a>
                    </motion.div>
                </div>
            </section>

            {/* ── 3. About Section (Parameters, Description, Booking Links) ── */}
            <section id="o-apartamencie" className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                {/* Fixed Grid Alignment (pt-0 on parent, specific spacing inside) */}
                <div className="lg:col-span-5 flex flex-col items-start border-t border-foreground/15 pt-8 mt-0">
                    <span className={headerLabelClass}>Przegląd</span>
                    
                    <ul className="flex flex-col w-full mb-12">
                        <li className="flex justify-between items-center py-5 border-b border-foreground/5">
                            <span className="font-sans text-[15px] text-foreground/60 w-1/3">Cena</span>
                            <span className="font-serif text-[24px] text-foreground font-medium text-right">{apt.price.weekday} PLN / noc</span>
                        </li>
                        <li className="flex justify-between items-center py-5 border-b border-foreground/5">
                            <span className="font-sans text-[15px] text-foreground/60 w-1/3">Rozmiar</span>
                            <span className="font-serif text-[18px] text-foreground text-right">{apt.area} m²</span>
                        </li>
                        <li className="flex justify-between items-center py-5 border-b border-foreground/5">
                            <span className="font-sans text-[15px] text-foreground/60 w-1/3">Goście</span>
                            <span className="font-serif text-[18px] text-foreground text-right">{apt.guests}</span>
                        </li>
                        <li className="flex justify-between items-center py-5 border-b border-foreground/5">
                            <span className="font-sans text-[15px] text-foreground/60 w-1/3">Pokoje</span>
                            <span className="font-serif text-[18px] text-foreground text-right">{apt.rooms}</span>
                        </li>
                        <li className="flex justify-between items-center py-5 border-b border-foreground/5">
                            <span className="font-sans text-[15px] text-foreground/60 w-1/3">Piętro</span>
                            <span className="font-serif text-[18px] text-foreground text-right">{apt.floor}</span>
                        </li>
                    </ul>

                    <div className="flex flex-col sm:flex-row lg:flex-col w-full gap-4">
                        <a 
                            href={apt.booking.bookingUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-center gap-4 bg-background text-foreground border border-foreground/10 px-10 py-5 hover:bg-primary hover:text-white transition-all w-full"
                        >
                            <span className="font-sans text-[12px] font-semibold tracking-widest uppercase">Zarezerwuj w</span>
                            <img src="/Loga/booking.svg" className="h-4 dark:invert opacity-90" alt="Booking.com" />
                        </a>
                        <a 
                            href={apt.booking.airbnbUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-center gap-4 bg-transparent border border-foreground/20 text-foreground px-10 py-5 hover:border-primary hover:text-primary hover:bg-transparent transition-all w-full"
                        >
                            <span className="font-sans text-[12px] font-semibold tracking-widest uppercase">Zarezerwuj w</span>
                            <img src="/Loga/airbnb.svg" className="h-4 opacity-90" alt="Airbnb" />
                        </a>
                    </div>
                </div>

                <div className="lg:col-span-7 flex flex-col pt-8 mt-0 border-t border-foreground/15">
                    <span className={headerLabelClass}>Opis Lokalu</span>
                    
                    <h2 className="font-serif text-3xl md:text-5xl text-foreground tracking-tight mb-8">
                        Odpocznij w luksusie
                    </h2>
                    <div className="space-y-6 text-[15px] leading-relaxed text-foreground/60 text-balance max-w-2xl">
                        {apt.longDescription.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                </div>
            </section>

            <SectionSeparator />

            {/* ── 4. Gallery Carousel ── */}
            <section className="w-full bg-background py-24 lg:py-32 text-foreground overflow-hidden transition-colors duration-500">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-12 flex flex-col items-center text-center">
                    <span className={headerLabelClass.replace('mb-10', 'mb-4').replace('text-left', 'text-center')}>Wnętrza</span>
                    <h2 className="font-serif text-4xl lg:text-[72px] tracking-tight text-foreground mb-12 transition-colors">Galeria</h2>
                </div>
                
                {/* Scroll Container */}
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-16 scrollbar-hide snap-x snap-mandatory [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}
                >
                    {apt.images.map((img, i) => (
                        <div key={i} className="min-w-[85vw] md:min-w-[70vw] lg:min-w-[1000px] aspect-[16/9] lg:h-[650px] shrink-0 snap-center relative overflow-hidden bg-foreground/5 group border border-foreground/5">
                            <img 
                                src={img} 
                                alt={`${apt.title} - Zdjęcie ${i+1}`} 
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.02]" 
                                loading={i === 0 ? "eager" : "lazy"}
                            />
                        </div>
                    ))}
                </div>

                {/* Reviews-style Centered Navigation Controls */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button 
                        onClick={() => scroll('left')}
                        className="w-[52px] h-[52px] rounded-full border border-foreground/20 flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/40 transition-all hover:scale-105"
                    >
                        <ArrowLeft className="w-5 h-5 stroke-[1.2]" />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="w-[52px] h-[52px] rounded-full border border-foreground/20 flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/40 transition-all hover:scale-105"
                    >
                        <ArrowRight className="w-5 h-5 stroke-[1.2]" />
                    </button>
                </div>
            </section>

            <SectionSeparator />

            {/* ── 5. Amenities ── */}
            <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <span className={headerLabelClass.replace('mb-10', 'mb-2')}>Detale</span>
                        <h2 className="font-serif text-4xl lg:text-[56px] tracking-tight text-foreground transition-colors">Wyposażenie</h2>
                    </div>
                    <div className="lg:col-span-8 flex flex-col">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 pt-4">
                            {apt.amenities.map(a => (
                                <div key={a} className="flex items-center gap-5 py-4 border-b border-foreground/5">
                                    <div className="text-primary transition-colors">
                                        {getAmenityIcon(a)}
                                    </div>
                                    <span className="font-sans text-[15px] text-foreground font-normal transition-colors">{a}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <SectionSeparator />

            {/* ── 6. FAQ from Main Page ── */}
            <FAQ />

            <Footer />

        </main>
    )
}
