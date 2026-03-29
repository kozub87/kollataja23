"use client"
import { Facebook, Instagram } from "lucide-react"
import { RollingLink } from "@/components/ui/RollingLink"

export function Footer() {
    return (
        <footer className="relative w-full bg-[#f9f6f3] text-foreground flex flex-col items-center pt-0 pb-12 overflow-visible">
            
            {/* ── 1. Top Separator with LARGER Logo Diamond (No Shadow) ── */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D6DDDF] to-transparent relative flex items-center justify-center overflow-visible mb-32">
                <div className="w-24 h-24 border border-[#D6DDDF] bg-[#f9f6f3] rotate-45 z-10 flex items-center justify-center p-3">
                    <img 
                        src="/Loga/kollataja_logo.svg" 
                        alt="Kołłątaja 23 Logo" 
                        className="-rotate-45 w-full h-full object-contain"
                        style={{ mixBlendMode: 'multiply' }}
                    />
                </div>
            </div>

            {/* Blinds Shadow Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('/shadow-blinds.png')] bg-cover bg-center mix-blend-multiply z-0" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1440px] px-6 md:px-12 flex flex-col items-center">
                
                {/* ── Navigation Grid (Increased top spacing from logo) ── */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24 text-[#1f3a40]">
                    
                    {/* Col 1 */}
                    <div className="flex flex-col gap-6">
                        <span className="font-sans text-[16px] leading-[18px] tracking-normal text-[#a1826a] font-normal">Nawigacja</span>
                        <div className="flex flex-col gap-3">
                            <RollingLink href="/">Strona Główna</RollingLink>
                            <RollingLink href="/#apartamenty">Apartamenty</RollingLink>
                            <RollingLink href="/o-nas">O nas</RollingLink>
                            <RollingLink href="/#lokalizacja">Lokalizacja</RollingLink>
                            <RollingLink href="/#opinie">Opinie</RollingLink>
                            <RollingLink href="/kontakt">Kontakt</RollingLink>
                            <RollingLink href="/404" className="underline opacity-30">Test 404</RollingLink>
                        </div>
                    </div>

                    {/* Col 2 */}
                    <div className="flex flex-col gap-6">
                        <span className="font-sans text-[16px] leading-[18px] tracking-normal text-[#a1826a] font-normal">Nasze Apartamenty</span>
                        <div className="flex flex-col gap-3">
                            <RollingLink href="/apartament/1">Apartament Nr 1 — Studio</RollingLink>
                            <RollingLink href="/apartament/2">Apartament Nr 2 — Salon</RollingLink>
                            <RollingLink href="/apartament/3">Apartament Nr 3 — Historia</RollingLink>
                            <RollingLink href="/apartament/4">Apartament Nr 4 — Flagowy</RollingLink>
                            <RollingLink href="/apartament/5">Apartament Nr 5 — Kameralny</RollingLink>
                        </div>
                    </div>

                    {/* Col 3 */}
                    <div className="flex flex-col gap-6">
                        <span className="font-sans text-[16px] leading-[18px] tracking-normal text-[#a1826a] font-normal">Kontakt</span>
                        <div className="flex flex-col gap-3">
                            <RollingLink href="tel:+48123456789">+48 123 456 789</RollingLink>
                            <RollingLink href="mailto:kontakt@kollataja23.pl">kontakt@kollataja23.pl</RollingLink>
                            <span className="text-[14px] font-medium text-foreground/80 leading-relaxed">
                                ul. Kołłątaja 23<br/>
                                50-007 Wrocław
                            </span>
                        </div>
                    </div>

                    {/* Col 4 */}
                    <div className="flex flex-col gap-6">
                        <span className="font-sans text-[16px] leading-[18px] tracking-normal text-[#a1826a] font-normal">Bądźmy w kontakcie</span>
                        
                        <div className="flex flex-col gap-6">
                            {/* Social Icons */}
                            <div className="flex items-center gap-5">
                                <a href="#" className="text-foreground/60 hover:text-[#0f677d] transition-colors">
                                    <Facebook className="w-[18px] h-[18px] stroke-[1.5]" />
                                </a>
                                <a href="#" className="text-foreground/60 hover:text-[#0f677d] transition-colors">
                                    <Instagram className="w-[18px] h-[18px] stroke-[1.5]" />
                                </a>
                            </div>
                            
                            <span className="font-sans text-[16px] leading-[18px] text-[#a1826a] font-normal">Rezerwuj bezpośrednio</span>
                        </div>
                        {/* Partner Logos */}
                        <div className="flex items-center gap-6">
                            <a href="https://booking.com" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                                <img src="/Loga/booking.svg" alt="Booking.com" className="h-[22px] w-auto mix-blend-multiply" />
                            </a>
                            <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
                                <img src="/Loga/airbnb.svg" alt="Airbnb" className="h-[22px] w-auto mix-blend-multiply" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* ── Bottom Line ── */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-foreground/10">
                    <span className="text-[12px] font-medium text-foreground/50">
                        Made by Kołłątaja 23 Team
                    </span>
                    <span className="text-[12px] font-medium text-foreground/50">
                        2026 © Wszelkie prawa zastrzeżone
                    </span>
                </div>

            </div>
        </footer>
    )
}
