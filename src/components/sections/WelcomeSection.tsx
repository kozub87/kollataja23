"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const images = [
    { src: "/apt1.png", side: "left" },
    { src: "/apt2.png", side: "right" },
    { src: "/apt3.png", side: "left" },
    { src: "/apt4.png", side: "right" },
    { src: "/apt5.png", side: "left" },
]

export function WelcomeSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    return (
        <section ref={containerRef} className="relative z-10 bg-background w-full h-[500vh]">
            
            {/* ── Sticky Content Wrapper (The Letter) ── */}
            <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
                
                {/* ── Shadow Overlay (Gobo Effect) ── BOTTOM LAYER ── */}
                <div 
                    className="absolute inset-0 z-0 pointer-events-none opacity-[0.35] select-none contrast-150 brightness-90"
                    style={{ 
                        backgroundImage: "url('/shadow-blinds.png')", 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        mixBlendMode: 'multiply',
                        maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
                    }} 
                />

                {/* ── Gallery Layer ── MID LAYER (Restricted to 1440px) ── */}
                <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10">
                    <div className="max-w-[1440px] mx-auto w-full h-full relative px-6 md:px-12">
                    {images.map((img, i) => {
                        const start = i * 0.18 // Shorter range for better timing
                        const end = (i + 1) * 0.18
                        const center = (start + end) / 2

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const y = useTransform(scrollYProgress, [start, end], [500, -500])
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const imageY = useTransform(scrollYProgress, [start, end], [-100, 100])
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const opacity = useTransform(scrollYProgress, [start, center, end], [0, 1, 0])
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const rotate = useTransform(scrollYProgress, [start, end], [i % 2 === 0 ? -1 : 1, i % 2 === 0 ? 1 : -1])

                        return (
                            <motion.div
                                key={i}
                                style={{ 
                                    y, opacity, rotate,
                                    left: img.side === "left" ? "4%" : "auto",
                                    right: img.side === "right" ? "4%" : "auto",
                                    top: "20%",
                                }}
                                className="absolute w-[180px] md:w-[320px] aspect-[4/5] bg-white/5 overflow-hidden shadow-none border-none"
                            >
                                <motion.div 
                                    style={{ y: imageY, scale: 1.15 }}
                                    className="w-full h-full"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                        src={img.src} 
                                        className="w-full h-full object-cover" 
                                        alt={`Apartament ${i + 1}`} 
                                        loading="eager"
                                        onError={(e) => {
                                            console.error("Failed to load image:", img.src);
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        )
                    })}
                    </div>
                </div>

                {/* ── The Letter Content ── TOP LAYER (Compressed and offset for Navbar) ── */}
                <div className="relative z-20 max-w-[600px] mx-auto flex flex-col items-center text-center px-6 pt-24 md:pt-32">
                    
                    {/* Monogram (Compressed) */}
                    <motion.div className="mb-8 h-12 w-48 bg-foreground" 
                        style={{ 
                            maskImage: "url('/Loga/kollataja_logo.svg')", 
                            maskRepeat: "no-repeat", 
                            maskSize: "contain", 
                            maskPosition: "center",
                            WebkitMaskImage: "url('/Loga/kollataja_logo.svg')",
                            WebkitMaskRepeat: "no-repeat",
                            WebkitMaskSize: "contain",
                            WebkitMaskPosition: "center"
                        }}
                    />

                    <span className="eye-brow mb-4">
                        Witaj w Kołłątaja 23
                    </span>

                    <h2 className="section-heading !text-center !leading-[1.1] mb-8">
                        Miejsce, gdzie historia <br className="hidden md:block" /> spotyka spokój.
                    </h2>

                    <div className="flex flex-col gap-6 text-foreground/60 text-base md:text-[17px] leading-relaxed font-light tracking-wide">
                        <p>
                            Witaj w Kołłątaja 23, Twojej nowej oazie w tętniącym sercu Wrocławia. 
                            Wierzymy, że prawdziwy luksus to nie tylko piękny design, ale przede wszystkim 
                            cisza, która pozwala na głęboki odpoczynek.
                        </p>
                        <p>
                            Nasze odrestaurowane apartamenty zostały zaprojektowane z myślą o tych, 
                            którzy szukają ukojenia bez rezygnacji z bliskości miejskiego życia. 
                            Cieszę się, że jesteś naszym gościem — zrobimy wszystko, 
                            abyś poczuł się u nas jak w domu.
                        </p>
                    </div>

                    <div className="mt-12 flex flex-col items-center">
                        <div className="mb-1">
                             <p className="text-[20px] font-serif text-foreground tracking-tight">Agnieszka & Piotr Rola</p>
                        </div>
                        <p className="font-sans text-[15px] leading-[18px] font-light text-[#a1826a]">
                             Właściciele Kołłątaja 23
                         </p>
                    </div>
                </div>

            </div>
        </section>
    )
}
