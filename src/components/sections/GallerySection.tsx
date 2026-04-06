"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { apartments } from "@/lib/apartments"

export function GallerySection() {
    const [activeIndex, setActiveIndex] = useState(0)

    // We use the main image from each apartment for the accordion
    const accordionItems = apartments.map(apt => ({
        id: apt.id,
        title: apt.title,
        subtitle: apt.subtitle,
        image: apt.images[0],
        description: apt.description
    }))

    return (
        <section id="galeria" className="h-screen w-full bg-background flex flex-col justify-center pt-24 pb-24 md:pb-32 overflow-hidden scroll-mt-24">
            <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex flex-col h-full justify-center">
                
                {/* ── Header Area ── */}
                <div className="flex flex-col items-center text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: 1.4, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
                        className="flex flex-col items-center"
                    >
                        <span className="eye-brow mb-6 !text-primary">Galeria</span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="section-heading !text-center !leading-[1.1] max-w-3xl text-balance dark:text-foreground"
                        >
                            Poczuj atmosferę naszych wnętrz
                        </motion.h2>
                    </motion.div>
                </div>

                {/* ── Accordion Slider ── */}
                <div className="flex-1 w-full flex items-center mt-6 md:mt-0">
                    <div className="flex flex-col md:flex-row gap-2 h-[70vh] md:h-[60vh] w-full">
                        {accordionItems.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-150px" }}
                                transition={{ 
                                    duration: 1.2, 
                                    delay: 0.5 + (i * 0.15), 
                                    ease: [0.16, 1, 0.3, 1] 
                                }}
                                onClick={() => setActiveIndex(i)}
                                onMouseEnter={() => setActiveIndex(i)}
                                layout
                                className={`relative overflow-hidden cursor-pointer group transition-[flex] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full md:w-auto ${
                                    activeIndex === i 
                                        ? "flex-[4] md:flex-[5] min-h-[180px] md:min-h-0 md:h-full" 
                                        : "flex-[1] md:flex-1 md:h-full"
                                }`}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 w-full h-full">
                                    <motion.img 
                                        src={item.image} 
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        animate={{ 
                                            scale: activeIndex === i ? 1.05 : 1,
                                            filter: activeIndex === i ? "brightness(0.9)" : "brightness(0.7)"
                                        }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    />
                                    {/* Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 ${activeIndex === i ? "opacity-100" : "opacity-60"}`} />
                                </div>

                                {/* Vertical Title (Visible when collapsed on desktop) */}
                                <div className={`hidden md:block absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-500 origin-center ${activeIndex === i ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                                    <p className="whitespace-nowrap tracking-[0.2em] text-[11px] font-sans font-normal text-white/80 [writing-mode:vertical-lr] rotate-180">
                                        {item.subtitle}
                                    </p>
                                </div>

                                {/* Content Panel (Visible when expanded) */}
                                <div className={`absolute inset-0 flex flex-col justify-end p-6 md:p-10 transition-all duration-500 ${activeIndex === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
                                    <div className="max-w-md">
                                        <motion.span 
                                            initial={false}
                                            animate={{ opacity: activeIndex === i ? 1 : 0 }}
                                            className="text-white text-[11px] tracking-[0.2em] font-sans font-normal mb-3 block"
                                        >
                                            Odsłona {i + 1} — {item.title}
                                        </motion.span>
                                        <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 leading-tight">
                                            {item.subtitle}
                                        </h3>
                                        <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none font-sans font-light">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Mobile Title (Visible when collapsed on mobile) */}
                                <div className={`md:hidden absolute inset-0 flex items-center px-6 transition-all duration-500 ${activeIndex === i ? "opacity-0" : "opacity-100"}`}>
                                    <p className="tracking-[0.2em] text-[10px] font-sans font-normal text-white/90">
                                        {i + 1} — {item.subtitle}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
