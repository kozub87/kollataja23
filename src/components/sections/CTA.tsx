"use client"
import { motion } from "framer-motion"

export function CTA() {
    return (
        <section id="kontakt" className="relative w-full min-h-[500px] lg:min-h-[650px] flex items-center justify-center overflow-hidden">
            {/* Background Video (Removed Filters) */}
            <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="absolute inset-0 z-0 w-full h-full object-cover"
            >
                <source src="/CTA.mp4" type="video/mp4" />
            </video>
            
            {/* Premium Overlay (Same as Hero) */}
            <div className="absolute inset-0 bg-black/35 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-[1]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-[1]" />

            {/* Content Container (Overlay Restored) */}
            <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center pt-20 pb-20">
                <motion.h2 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="font-serif text-5xl md:text-6xl lg:text-[88px] text-[#f9f6f3] mb-8 leading-[1.1] tracking-tight"
                >
                    Skontaktuj Się
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="font-sans text-[15px] md:text-[18px] text-[#f9f6f3]/80 mb-12 max-w-xl leading-relaxed text-balance"
                >
                    Twój perfekcyjny pobyt w sercu Wrocławia to tylko jedna wiadomość. Nasz zespół jest do Twojej dyspozycji, aby przygotować w pełni spersonalizowane doświadczenie.
                </motion.p>

                <motion.a
                    href="mailto:kontakt@kollataja23.pl"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-[#f9f6f3] text-[#1f3a40] font-sans font-semibold text-[13px] tracking-[0.1em] uppercase px-10 py-4 hover:bg-[#a1826a] hover:text-[#f9f6f3] hover:scale-105 transition-all duration-300 shadow-xl"
                >
                    Napisz Do Nas
                </motion.a>
            </div>
        </section>
    )
}
