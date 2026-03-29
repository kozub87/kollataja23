"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/sections/Footer"

export default function NotFound() {
    return (
        <main className="flex flex-col min-h-screen h-screen overflow-hidden bg-[#f9f6f3] text-foreground font-sans antialiased">
            {/* ── 1. Navbar (Subpage variant for dark links on light bg) ── */}
            <Navbar variant="subpage" activePath="/404" />

            {/* ── 2. 404 Content (Centered like the reference image) ── */}
            <section className="relative w-full flex-grow flex flex-col items-center justify-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-[100px] text-[#1f3a40] leading-[1.1] mb-8 tracking-tight">
                        Zabłądziłeś?
                    </h1>
                    
                    <p className="font-sans text-[16px] md:text-[18px] leading-relaxed text-foreground/60 max-w-xl mx-auto mb-16 text-balance">
                        Strona, której szukasz, nie została odnaleziona lub została przeniesiona do innej części naszej kamienicy. Pozwól, że zaprowadzimy Cię z powrotem.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                        {[
                            { name: "Home", href: "/" },
                            { name: "Apartamenty", href: "/#apartamenty" },
                            { name: "O nas", href: "/o-nas" },
                            { name: "Galeria", href: "/#galeria" },
                            { name: "Kontakt", href: "/kontakt" }
                        ].map((link) => (
                            <Link 
                                key={link.name}
                                href={link.href}
                                className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1f3a40]/60 hover:text-[#1f3a40] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ── 3. Footer (Optional in 100vh 404, keeping it minimal or removing if it breaks 100vh) ── */}
            {/* User wanted 100% viewport section, so we might want to skip the big footer here or keep it at the bottom */}
        </main>
    )
}
