"use client"
import { motion } from "framer-motion"
import { Facebook, Instagram } from "lucide-react"
import { RollingLink } from "@/components/ui/RollingLink"

export function Footer() {
    return (
        <footer className="relative w-full bg-background text-foreground flex flex-col min-h-screen overflow-hidden">
            
            {/* ── Section 1: CTA (Upper Part) ── */}
            <div id="kontakt" className="relative w-full flex-grow flex items-center justify-center overflow-hidden border-b border-foreground/5">
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="absolute inset-0 z-0 w-full h-full object-cover"
                >
                    <source src="/CTA.mp4" type="video/mp4" />
                </video>
                
                <div className="absolute inset-0 bg-black/40 z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-[1]" />
                
                <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center py-20 px-6">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif text-5xl md:text-7xl lg:text-[100px] text-[#f9f6f3] mb-8 leading-[1.05] tracking-tighter"
                    >
                        Skontaktuj Się
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-sans text-[15px] md:text-[20px] text-[#f9f6f3]/80 mb-12 max-w-xl leading-relaxed text-balance"
                    >
                        Twój perfekcyjny pobyt w sercu Wrocławia to tylko jedna wiadomość. Nasz zespół jest do Twojej dyspozycji.
                    </motion.p>

                    <motion.a
                        href="mailto:kontakt@kollataja23.pl"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-background text-foreground border border-foreground/10 font-sans font-normal text-[18px] tracking-[0.25px] px-8 py-3 hover:bg-primary hover:text-white transition-all duration-300 shadow-2xl"
                    >
                        Napisz do nas
                    </motion.a>
                </div>
            </div>

            {/* ── Section 2: Navigation (Lower Part) ── */}
            <div className="relative w-full bg-background pt-16 pb-12 flex flex-col items-center flex-shrink-0 border-t border-foreground/5 dark:border-none">
                
                {/* LIGHT MODE: Static Shadow Blinds (Gobo) - Mirroring Welcome Section */}
                <div 
                    className="absolute inset-0 z-0 pointer-events-none opacity-[0.3] dark:opacity-0 contrast-125 brightness-95 transition-opacity duration-700"
                    style={{ 
                        backgroundImage: "url('/shadow-blinds.png')", 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        mixBlendMode: 'multiply',
                        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
                    }} 
                />

                {/* Original Blinds Shadow Overlay (Subtle) */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.02] bg-[url('/shadow-blinds.png')] bg-cover bg-center mix-blend-multiply dark:mix-blend-overlay z-0" />

                <div className="relative z-10 w-full max-w-[1440px] px-6 md:px-12 flex flex-col items-center">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 text-foreground">
                        
                        {/* Col 1 */}
                        <div className="flex flex-col gap-4 text-left">
                            <span className="text-[12px] uppercase tracking-[0.2em] text-primary font-bold mb-3">Nawigacja</span>
                            <div className="flex flex-col gap-2">
                                <RollingLink href="/">Strona Główna</RollingLink>
                                <RollingLink href="/#apartamenty">Apartamenty</RollingLink>
                                <RollingLink href="/#galeria">Galeria</RollingLink>
                                <RollingLink href="/o-nas">O nas</RollingLink>
                                <RollingLink href="/#lokalizacja">Lokalizacja</RollingLink>
                                <RollingLink href="/#opinie">Opinie</RollingLink>
                            </div>
                        </div>

                        {/* Col 2 */}
                        <div className="flex flex-col gap-4 text-left">
                            <span className="text-[12px] uppercase tracking-[0.2em] text-primary font-bold mb-3">Apartamenty</span>
                            <div className="flex flex-col gap-2">
                                <RollingLink href="/apartament/1">Apartament Nr 1</RollingLink>
                                <RollingLink href="/apartament/2">Apartament Nr 2</RollingLink>
                                <RollingLink href="/apartament/3">Apartament Nr 3</RollingLink>
                                <RollingLink href="/apartament/4">Apartament Nr 4</RollingLink>
                                <RollingLink href="/apartament/5">Apartament Nr 5</RollingLink>
                            </div>
                        </div>

                        {/* Col 3 */}
                        <div className="flex flex-col gap-4 text-left">
                            <span className="text-[12px] uppercase tracking-[0.2em] text-primary font-bold mb-3">Kontakt</span>
                            <div className="flex flex-col gap-2 text-foreground/70">
                                <RollingLink href="tel:+48123456789">+48 123 456 789</RollingLink>
                                <RollingLink href="mailto:kontakt@kollataja23.pl">kontakt@kollataja23.pl</RollingLink>
                                <span className="text-[14px] leading-relaxed">ul. Kołłątaja 23, Wrocław</span>
                            </div>
                        </div>

                        {/* Col 4 */}
                        <div className="flex flex-col gap-4 text-left">
                            <span className="text-[12px] uppercase tracking-[0.2em] text-primary font-bold mb-3">Social Media</span>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-5">
                                    <a href="#" className="text-foreground/40 hover:text-primary transition-colors"><Facebook className="w-5 h-5 stroke-[1.5]" /></a>
                                    <a href="#" className="text-foreground/40 hover:text-primary transition-colors"><Instagram className="w-5 h-5 stroke-[1.5]" /></a>
                                </div>
                                <div className="flex items-center gap-6">
                                    <img src="/Loga/booking.svg" alt="Booking" className="h-5 w-auto dark:invert opacity-40" />
                                    <img src="/Loga/airbnb.svg" alt="Airbnb" className="h-5 w-auto dark:invert opacity-40" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Line */}
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-foreground/5">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-bold">
                            Designed with a sense of place — Kołłątaja 23
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 font-medium">
                            Crafted for meaningful stays — Wrocław
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
