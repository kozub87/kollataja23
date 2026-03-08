"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { MobileMenu } from "@/components/ui/MobileMenu"

const timeline = [
    { year: "1895", title: "Budowa kamienicy", desc: "Kamienica przy ul. Kołłątaja 23 zostaje wzniesiona przez wrocławskiego budowniczego Friedricha Manna. Eklektyczny styl fasady, bogato zdobione sztukaterie i wysokie okna nawiązują do charakteru ówczesnej secesji." },
    { year: "1945", title: "Przejęcie i odbudowa", desc: "Po zakończeniu II wojny światowej budynek zostaje przejęty przez miasto. Kamienica ocalała w znacznej części — jej wysokie piwnice i masywne mury ochroniły ją przed zniszczeniem." },
    { year: "1970", title: "Podział na lokale", desc: "W ramach poPRL-owskich przekształceń górne piętra kamienicy zostają podzielone na lokale mieszkalne. Przez kolejne dekady budynek służy wrocławskim rodzinom." },
    { year: "2019", title: "Gruntowna renowacja", desc: "Nowi właściciele przejmują kamienicę i podejmują decyzję o kompleksowej renowacji. Projekt łączy oryginalny charakter budynku — zachowane sztukaterie, dębowe podłogi — z nowoczesnym standardem wyposażenia." },
    { year: "2021", title: "Otwarcie apartamentów", desc: "Po dwóch latach prac cztery apartamenty Kołłątaja 23 witają pierwszych gości. Od pierwszego dnia celem jest jedno — stworzenie miejsca wyjątkowego pobytu w sercu Wrocławia." },
    { year: "2025", title: "Dziś", desc: "Ponad 1000 zadowolonych gości, ocena 9.7/10 na Booking.com i Airbnb, oraz nieustanne doskonalenie oferty. Kołłątaja 23 to nie tylko miejsce noclegowe — to adres, do którego się wraca." },
]

const values = [
    { num: "01", title: "AUTENTYCZNOŚĆ", desc: "Nie budujemy bezimiennych hoteli. Każdy apartament ma duszę — oryginalną architekturę, historię, charakter miejsca." },
    { num: "02", title: "OBSŁUGA", desc: "Reagujemy szybko, rozwiązujemy problemy zanim staną się problemem. Nasi goście zawsze mają kogoś, kto odbierze telefon." },
    { num: "03", title: "WROCŁAW", desc: "Kochamy nasze miasto. Polecamy restauracje, miejsca, doświadczenia których nie znajdziesz w przewodniku. Dzielimy się Wrocławiem." },
]

export function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-sans antialiased">

            {/* ── Top nav ── */}
            <nav className="flex items-center px-4 md:px-8 py-5 border-b border-foreground/15 sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
                <Link href="/" className="flex items-center gap-2 hover:opacity-60 transition-opacity group">
                    <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-foreground/50 group-hover:text-foreground transition-colors">
                        ← Powrót
                    </span>
                </Link>
                <Link href="/" className="absolute left-1/2 -translate-x-1/2 font-semibold text-lg tracking-tighter uppercase text-foreground flex items-start hover:opacity-60 transition-opacity">
                    KOŁŁĄTAJA 23<sup className="text-[8px] ml-0.5 mt-1 font-bold">®</sup>
                </Link>
                <div className="ml-auto">
                    <MobileMenu activePath="/o-nas" />
                </div>
            </nav>

            {/* ── Hero header ── */}
            <div className="px-4 md:px-8 pt-14 pb-10 border-b border-foreground/15 flex flex-col md:flex-row justify-between md:items-end gap-10">
                <div>
                    <div className="flex items-center gap-3 mb-7">
                        <div className="w-2.5 h-2.5 bg-foreground" />
                        <span className="text-xs font-semibold tracking-widest uppercase text-foreground/55">O nas</span>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                        className="text-5xl md:text-7xl lg:text-[90px] font-semibold tracking-tighter uppercase leading-[0.95] text-foreground"
                    >
                        KAMIENICA<br />Z HISTORIĄ.
                    </motion.h1>
                </div>
                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="text-sm font-semibold uppercase tracking-widest text-foreground/65 leading-relaxed max-w-xs pb-1"
                >
                    UL. KOŁŁĄTAJA 23 STOI OD 1895 ROKU. PRZEZ PONAD 130 LAT BYŁA ŚWIADKIEM HISTORII WROCŁAWIA. DZIŚ OPOWIADA JĄ KAŻDEMU GOŚCIOWI.
                </motion.p>
            </div>

            {/* ── Full-width building photo ── */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="w-full relative border-b border-foreground/15 overflow-hidden"
                style={{ height: "clamp(280px, 50vw, 640px)" }}
            >
                <img
                    src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80&auto=format&fit=crop"
                    alt="Wrocław — centrum"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 right-5 bg-background/90 backdrop-blur-sm px-4 py-2.5 border border-foreground/10">
                    <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/70">WROCŁAW · EST. 1895</span>
                </div>
            </motion.div>

            {/* ── Intro text band ── */}
            <div className="flex flex-col md:grid md:grid-cols-2 border-b border-foreground/15">
                <div className="px-4 md:px-8 py-12 border-b md:border-b-0 md:border-r border-foreground/15">
                    <p className="text-lg md:text-xl font-semibold tracking-tight text-foreground leading-snug">
                        Wierzymy, że podróżowanie to nie tylko nocleg — to doświadczenie miejsca, architektury, historii i ludzi.
                    </p>
                </div>
                <div className="px-4 md:px-8 py-12">
                    <p className="text-sm text-foreground/70 leading-relaxed">
                        Dlatego zamiast budować kolejny anonimowy apartament, zdecydowaliśmy się na coś innego. Wybraliśmy kamienicę z ponad 100-letnią historią, odrestaurowaliśmy ją z szacunkiem dla jej charakteru i stworzyliśmy cztery unikalne wnętrza w samym centrum Wrocławia.
                        <br /><br />
                        Kołłątaja 23 to projekt z pasji. Nie korporacja — prawdziwi ludzie, którzy dbają o każdy detal, każdego gościa i każdy pobyt.
                    </p>
                </div>
            </div>

            {/* ── Timeline ── */}
            <section className="border-b border-foreground/15">
                <div className="px-4 md:px-8 py-10 border-b border-foreground/15 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-foreground" />
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/55">Historia</span>
                    </div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/30">1895 — 2025</span>
                </div>

                <div className="flex flex-col">
                    {timeline.map((item, idx) => (
                        <motion.div
                            key={item.year}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                            className="flex flex-col md:grid md:grid-cols-[120px_1fr] border-b last:border-b-0 border-foreground/12 group"
                        >
                            <div className="px-4 md:px-8 py-6 md:border-r border-foreground/12 flex items-start">
                                <span className="text-2xl md:text-3xl font-semibold tracking-tighter text-foreground/25 group-hover:text-foreground/50 transition-colors">{item.year}</span>
                            </div>
                            <div className="px-4 md:px-8 py-6 flex flex-col gap-2">
                                <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/50">{item.title}</span>
                                <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Values ── */}
            <section className="border-b border-foreground/15">
                <div className="px-4 md:px-8 py-10 border-b border-foreground/15">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-foreground" />
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/55">Nasze wartości</span>
                    </div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3">
                    {values.map((v, idx) => (
                        <motion.div
                            key={v.num}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`px-4 md:px-8 py-10 flex flex-col gap-5 border-b md:border-b-0 ${idx < 2 ? "md:border-r" : ""} border-foreground/12`}
                        >
                            <span className="text-[9px] font-semibold tracking-widest text-foreground/30">{v.num}</span>
                            <h3 className="text-xl md:text-2xl font-semibold tracking-tighter uppercase text-foreground">{v.title}</h3>
                            <p className="text-sm text-foreground/65 leading-relaxed">{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── CTA strip ── */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-4 md:px-8 py-12 border-b border-foreground/15">
                <p className="text-2xl md:text-4xl font-semibold tracking-tighter uppercase text-foreground leading-tight max-w-lg">
                    PRZEKONAJ SIĘ SAM — ZAREZERWUJ POBYT.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/kontakt"
                        className="flex items-center gap-3 bg-foreground text-background px-6 py-4 hover:opacity-85 transition-opacity"
                    >
                        <span className="text-[10px] font-semibold tracking-widest uppercase">NAPISZ DO NAS</span>
                        <span className="text-background/60">→</span>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-3 border border-foreground/20 px-6 py-4 hover:border-foreground/50 transition-colors"
                    >
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/60">ZOBACZ APARTAMENTY →</span>
                    </Link>
                </div>
            </div>

            {/* ── Footer mini ── */}
            <div className="flex justify-center md:justify-between items-center px-4 md:px-8 py-5 bg-foreground text-background">
                <span className="text-[9px] font-semibold tracking-widest uppercase text-background/35">© 2026 KOŁŁĄTAJA 23 · WROCŁAW</span>
            </div>
        </main>
    )
}
