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
        <section ref={containerRef} className="relative z-10 bg-background w-full h-[200vh] md:h-[500vh]">
            
            {/* ── Sticky Content Wrapper (The Letter) ── */}
            <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
                
                {/* ── Background Layer (Dynamic Shadow/Light) ── BOTTOM LAYER ── */}
                <div className="absolute inset-0 z-0 select-none overflow-hidden transition-all duration-700">
                    
                    {/* LIGHT MODE: Static Shadow Blinds (Gobo) */}
                    <div 
                        className="absolute inset-0 z-0 pointer-events-none opacity-[0.35] dark:opacity-0 contrast-150 brightness-90 transition-opacity duration-700"
                        style={{ 
                            backgroundImage: "url('/shadow-blinds.png')", 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center',
                            mixBlendMode: 'multiply',
                            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
                        }} 
                    />

                    {/* DARK MODE: Dynamic Light Streaks (Option 3) */}
                    <motion.div 
                        className="absolute inset-x-0 top-0 h-full hidden dark:block opacity-30 pointer-events-none"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.3 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                    >
                        <motion.div 
                            className="absolute inset-0"
                            animate={{ 
                                background: [
                                    "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.03) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.02) 0%, transparent 50%)",
                                    "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.04) 0%, transparent 45%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.03) 0%, transparent 55%)",
                                    "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.03) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.02) 0%, transparent 50%)",
                                ]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                        {/* Static Light Beam for Structure */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />
                    </motion.div>
                </div>

                {/* ── Gallery Layer ── MID LAYER (Restricted to 1440px) ── */}
                <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10 hidden md:block">
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

                {/* ── The Letter Content ── TOP LAYER (Compressed and offset for relative centering) ── */}
                <div className="relative z-20 max-w-[600px] mx-auto flex flex-col items-center text-center px-6">
                    
                    {/* Monogram (Compressed) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-150px" }}
                        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8 h-12 w-48 bg-foreground transition-colors" 
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

                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-150px" }}
                        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="eye-brow mb-4 !text-primary"
                    >
                        Witaj w Kołłątaja 23
                    </motion.span>

                    <motion.h2 
                        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="section-heading !text-center !leading-[1.1] mb-8 dark:text-foreground"
                    >
                        Miejsce, gdzie historia <br className="hidden md:block" /> spotyka spokój
                    </motion.h2>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-6 text-foreground/60 text-base md:text-[17px] leading-relaxed font-light tracking-wide"
                    >
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
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-12 flex flex-col items-center"
                    >
                         <div className="mb-1">
                              <p className="text-[20px] font-serif text-foreground tracking-tight transition-colors">Agnieszka & Piotr Rola</p>
                         </div>
                        <p className="font-sans text-[15px] leading-[18px] font-light text-[#a1826a]">
                             Właściciele Kołłątaja 23
                         </p>
                    </motion.div>
                </div>

            </div>
        </section>
    )
}
