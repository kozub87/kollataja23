"use client"
import { motion } from "framer-motion"
import { LeafletMap } from "@/components/ui/LeafletMap"

const distances = [
    { label: "Rynek Główny", value: "600m", sub: "7 min piechotą", image: "/Lokalizacja/Rynek Główny.png" },
    { label: "Dworzec PKP", value: "400m", sub: "5 min piechotą", image: "/Lokalizacja/Dworzec PKP.png" },
    { label: "Hala Targowa", value: "350m", sub: "4 min piechotą", image: "/Lokalizacja/Hala Targowa.png" },
    { label: "Lotnisko", value: "11km", sub: "20 min autem", image: "/Lokalizacja/Lotnisko.png" },
]

const attractions = [
    { name: "Rynek Główny", dist: "600m" },
    { name: "Panorama Racławicka", dist: "1.2km" },
    { name: "Ogród Botaniczny", dist: "1.8km" },
    { name: "ZOO Wrocław", dist: "3.2km" },
    { name: "Mosty Tumskie", dist: "1.4km" },
    { name: "Hala Stulecia", dist: "3.1km" },
    { name: "Ostrów Tumski", dist: "1.3km" },
    { name: "Galeria Dominikańska", dist: "450m" },
    { name: "Dworzec Główny", dist: "400m" },
    { name: "Opera Wrocławska", dist: "900m" },
    { name: "Muzeum Narodowe", dist: "1.5km" },
    { name: "Bulwar Dunikowskiego", dist: "1.1km" },
    { name: "Sky Tower", dist: "1.7km" },
    { name: "Kino Nowe Horyzonty", dist: "1.1km" },
]

export function Location() {
    return (
        <section id="lokalizacja" className="bg-background py-24 lg:py-40 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                
                {/* ── Section Header ── */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-12 mb-16 lg:mb-24">
                    <div className="max-w-2xl">
                        <div className="mb-6">
                            <span className="eye-brow !text-left">Lokalizacja</span>
                        </div>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="section-heading leading-[1.1]"
                        >
                            Serce<br />Wrocławia
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex flex-col gap-6 max-w-sm"
                    >
                        <p className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] text-foreground/60">
                            Ul. Kołłątaja 23 to jeden z najbardziej pożądanych adresów w centrum Wrocławia —
                            w zasięgu krótkiego spaceru od najważniejszych punktów miasta.
                        </p>
                        <div className="flex items-center gap-2">
                             <a
                                 href="https://maps.google.com/?q=Kołłątaja+23,+Wrocław"
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="font-sans text-[16px] leading-[18px] text-[#a1826a] font-normal border-b border-[#a1826a] w-max pb-0.5 hover:opacity-50 transition-opacity"
                             >
                                 Sprawdź nas na mapie →
                             </a>
                         </div>
                    </motion.div>
                </div>

                {/* ── Bento Grid Discovery ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[350px] lg:auto-rows-[480px]">
                    
                    {/* Big Map Block (2/3 width) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-2 row-span-1 lg:row-span-1 border border-foreground/10 bg-[#f4f1ee] relative overflow-hidden group shadow-premium"
                    >
                        <LeafletMap />
                        <div className="absolute bottom-6 left-6 z-10 bg-background/90 backdrop-blur-sm px-4 py-2 border border-foreground/15 shadow-xl pointer-events-none">
                             <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground">
                                51.1079° N, 17.0385° E
                            </span>
                        </div>
                    </motion.div>

                    {/* Architecture Detail (1/3 width) */}
                    <motion.div 
                         initial={{ opacity: 0, x: 20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.8, delay: 0.2 }}
                         className="lg:col-span-1 relative overflow-hidden border border-foreground/10 group bg-[#f4f1ee]"
                    >
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] ease-out group-hover:scale-110"
                            style={{ backgroundImage: `url('/Lokalizacja/Obok mapy.png')` }}
                        />
                         <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                    </motion.div>

                    {/* Distance Tiles Row (Span 3 cols) */}
                    <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-6 min-h-[300px]">
                        {distances.map((item, idx) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                className="relative overflow-hidden group border border-foreground/10 flex flex-col justify-between p-8 min-h-[220px] lg:min-h-0"
                            >
                                {/* Background Image */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 z-0 grayscale-[0.3] group-hover:grayscale-0"
                                    style={{ backgroundImage: `url('${item.image}')` }}
                                />
                                {/* Bottom Subtle Overlay for readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1f3a40]/90 via-[#1f3a40]/30 to-transparent z-[1]" />

                                <div className="relative z-10">
                                    <span className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] font-normal text-[#f9f6f3]">
                                        {item.label}
                                    </span>
                                </div>
                                
                                <div className="relative z-10 flex flex-col gap-1">
                                    <span className="text-4xl lg:text-5xl font-serif text-[#f9f6f3] leading-[1.1] transition-transform duration-500 group-hover:translate-x-2">
                                        {item.value}
                                    </span>
                                    <span className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] font-normal text-[#f9f6f3]/80">
                                        {item.sub}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── Neighborhood Tags (Ticker) ── */}
                <div className="mt-32 w-full max-w-[1440px] mx-auto relative overflow-hidden">
                    {/* Fade Out Gradients */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

                    <div className="flex flex-col items-center mb-16">
                        <span className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] text-center text-[#0f677d]">
                            Atrakcje w okolicy
                        </span>
                    </div>
                    
                    {/* Row 1: Leftward */}
                    <div className="mb-8">
                        <div className="flex whitespace-nowrap">
                            <motion.div 
                                animate={{ x: [0, -1000] }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
                                whileHover={{ animationPlayState: 'paused' }}
                                className="flex gap-x-12 pr-12"
                            >
                                {[...attractions, ...attractions].slice(0, 14).map((attr, i) => (
                                    <div key={i} className="group cursor-default py-4">
                                        <div className="relative h-12 flex flex-col items-center overflow-hidden">
                                            <div className="flex flex-col items-center transition-transform duration-500 group-hover:-translate-y-1/2">
                                                <span className="h-12 flex items-center text-xl lg:text-3xl font-serif text-[#1f3a40]/20">
                                                    {attr.name}
                                                </span>
                                                <span className="h-12 flex items-center font-sans text-[16px] leading-[24px] tracking-[-0.32px] text-[#0f677d] font-normal">
                                                    {attr.dist}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* Row 2: Rightward */}
                    <div>
                        <div className="flex whitespace-nowrap">
                            <motion.div 
                                animate={{ x: [-1000, 0] }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
                                whileHover={{ animationPlayState: 'paused' }}
                                className="flex gap-x-12 pr-12"
                            >
                                {[...attractions, ...attractions].slice(7, 21).map((attr, i) => (
                                    <div key={i} className="group cursor-default py-4">
                                        <div className="relative h-12 flex flex-col items-center overflow-hidden">
                                            <div className="flex flex-col items-center transition-transform duration-500 group-hover:-translate-y-1/2">
                                                <span className="h-12 flex items-center text-xl lg:text-3xl font-serif text-[#1f3a40]/20">
                                                    {attr.name}
                                                </span>
                                                <span className="h-12 flex items-center font-sans text-[16px] leading-[24px] tracking-[-0.32px] text-[#0f677d] font-normal">
                                                    {attr.dist}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
