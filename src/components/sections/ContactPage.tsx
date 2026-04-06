"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, MapPin, Plus, Minus } from "lucide-react"
import { LeafletMap } from "@/components/ui/LeafletMap"
import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/sections/Footer"

// ── FAQ data ──────────────────────────────────────────────────────────────────
const faqItems = [
    {
        q: "O której godzinie można się zameldować i wymeldować?",
        a: "Standardowo zameldowanie możliwe jest od godziny 15:00, a wymeldowanie do godziny 11:00. Jeśli planujesz przyjazd wcześniej lub wyjazd później, daj nam znać — w miarę dostępności apartamentów postaramy się dostosować do Twoich potrzeb.",
    },
    {
        q: "Czy oferujecie system bezkontaktowego zameldowania?",
        a: "Tak, dla pełnego komfortu naszych gości korzystamy z systemu self check-in. Klucze odbierzesz ze skrytki na kod o dowolnej porze po godzinie 15:00. Wszystkie instrukcje prześlemy Ci przed przyjazdem.",
    },
    {
        q: "Czy w kamienicy jest parking dla gości?",
        a: "Bezpośrednio przy kamienicy nie posiadamy własnego parkingu. Kołłątaja 23 znajduje się jednak w strefie z dostępnymi płatnymi miejscami postojowymi, a w promieniu 300 metrów działają dwa parkingi strzeżone.",
    },
    {
        q: "Czy apartamenty są przyjazne zwierzętom?",
        a: "Niestety, ze względu na zabytkowy charakter wykończenia i dbając o komfort alergików, nie przyjmujemy gości ze zwierzętami. Dziękujemy za zrozumienie.",
    },
    {
        q: "Czy wystawiacie faktury VAT?",
        a: "Tak, oczywiście. Jeśli potrzebujesz faktury za pobyt, prosimy o kontakt lub podanie danych firmy podczas dokonywania rezerwacji.",
    },
]

// ── FAQ Accordion Item ────────────────────────────────────────────────────────
function FaqAccordionItem({ q, a, idx }: { q: string; a: string; idx: number }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="border-b border-[#1f3a40]/15 last:border-b-0">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-6 text-left group"
                aria-expanded={open}
            >
                <span className="text-[17px] md:text-[19px] font-sans font-medium text-foreground tracking-[-0.01em] pr-8 group-hover:text-foreground/80 transition-colors">
                    {q}
                </span>
                <span className="text-foreground/50 transition-colors group-hover:text-foreground shrink-0">
                    {open ? <Minus className="w-5 h-5 stroke-[1.5]" /> : <Plus className="w-5 h-5 stroke-[1.5]" />}
                </span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="font-sans text-[16px] leading-[1.8] text-foreground/60 pb-8 max-w-3xl">
                            {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ── Main Page Component ───────────────────────────────────────────────────────
export function ContactPage() {
    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState({
        name: "", email: "", apartment: "Wybierz apartament", message: ""
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 5000)
    }

    return (
        <main className="min-h-screen bg-background text-foreground font-sans antialiased transition-colors duration-500 selection:bg-primary/10">

            {/* ── 1. Navbar ── */}
            <Navbar variant="subpage" activePath="/kontakt" />

            {/* ── 2. Hero Section ── */}
            <section className="pt-48 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] text-primary transitions-colors">
                        Kontakt
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-[88px] text-foreground leading-[1.1] mb-8 tracking-tighter">
                        Bądźmy w kontakcie.
                    </h1>
                    <p className="font-sans text-[16px] md:text-[18px] text-foreground/60 max-w-2xl mx-auto text-balance">
                        Masz pytania dotyczące pobytu lub potrzebujesz pomocy w rezerwacji? 
                        Jesteśmy tu, by zapewnić Ci bezproblemowy i wyjątkowy czas we Wrocławiu.
                    </p>
                </motion.div>
            </section>

            {/* ── 3. Contact & Form Layout ── */}
            <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                    
                    {/* INFO COLUMN (4/12) */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-4 flex flex-col gap-16"
                    >
                        <div className="flex flex-col gap-10">
                            {[
                                { icon: Mail, label: "Napisz do nas", value: "kontakt@kollataja23.pl", href: "mailto:kontakt@kollataja23.pl" },
                                { icon: Phone, label: "Zadzwoń", value: "+48 123 456 789", href: "tel:+48123456789" },
                                { icon: MapPin, label: "Odwiedź nas", value: "ul. Kołłątaja 23, 50-007 Wrocław", href: "https://maps.google.com/?q=Kołłątaja+23,+Wrocław" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] text-primary dark:text-foreground/60 font-normal transition-colors">
                                            {item.label}
                                        </span>
                                        <a 
                                            href={item.href} 
                                            target={item.href?.startsWith("http") ? "_blank" : undefined}
                                            className="font-serif text-xl text-foreground hover:text-primary transition-colors leading-tight"
                                        >
                                            {item.value}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Partner Logos */}
                        <div className="flex flex-col gap-6 pt-10 border-t border-foreground/10">
                            <span className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] text-primary dark:text-foreground/60 font-normal transition-colors">Nasze platformy</span>
                            <div className="flex gap-8 items-center">
                                <a href="https://booking.com" target="_blank" rel="noopener noreferrer" className="h-6 opacity-70 hover:opacity-100 transition-opacity">
                                    <img src="/Loga/booking.svg" alt="Booking.com" className="h-full w-auto mix-blend-multiply opacity-60 dark:invert dark:mix-blend-normal" />
                                </a>
                                <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer" className="h-6 opacity-70 hover:opacity-100 transition-opacity">
                                    <img src="/Loga/airbnb.svg" alt="Airbnb" className="h-full w-auto mix-blend-multiply opacity-60 dark:invert dark:mix-blend-normal" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* FORM COLUMN (8/12) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-8 bg-white dark:bg-white/5 p-8 md:p-16 rounded-[4px] shadow-sm border border-foreground/5"
                    >
                        {submitted ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-20"
                            >
                                <div className="w-20 h-20 bg-foreground text-background rounded-full flex items-center justify-center mb-8">
                                    <Plus className="w-10 h-10 rotate-45" />
                                </div>
                                <h3 className="font-serif text-4xl text-foreground mb-4">Wiadomość wysłana.</h3>
                                <p className="font-sans text-foreground/60">Dziękujemy! Skontaktujemy się z Tobą najszybciej jak to możliwe.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-3">
                                        <label className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] text-primary dark:text-foreground/80 font-normal transition-colors">Imię i nazwisko</label>
                                        <input 
                                            required name="name" value={form.name} onChange={handleChange}
                                            className="w-full bg-background border-foreground/10 text-foreground p-5 rounded-[4px] font-sans text-[16px] focus:border-[#a1826a] outline-none transition-all text-foreground placeholder:text-foreground/40"
                                            placeholder="Jan Kowalski"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] text-primary dark:text-foreground/80 font-normal transition-colors">Email</label>
                                        <input 
                                            required type="email" name="email" value={form.email} onChange={handleChange}
                                            className="w-full bg-background border-foreground/10 text-foreground p-5 rounded-[4px] font-sans text-[16px] focus:border-[#a1826a] outline-none transition-all text-foreground placeholder:text-foreground/40"
                                            placeholder="jan@kowalski.pl"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] text-primary dark:text-foreground/80 font-normal transition-colors">Temat rozmowy</label>
                                    <select 
                                        name="apartment" value={form.apartment} onChange={handleChange}
                                        className="w-full bg-background border-foreground/10 text-foreground p-5 rounded-[4px] font-sans text-[16px] focus:border-[#a1826a] outline-none transition-all cursor-pointer appearance-none text-foreground"
                                    >
                                        <option>Wybieram...</option>
                                        <option>Apartament 1 — Studio</option>
                                        <option>Apartament 2 — Salon</option>
                                        <option>Apartament 3 — Historia</option>
                                        <option>Apartament 4 — Flagowy</option>
                                        <option>Chcę o coś zapytać</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] text-primary dark:text-foreground/80 font-normal transition-colors">Wiadomość</label>
                                    <textarea 
                                        required name="message" value={form.message} onChange={handleChange}
                                        rows={6}
                                        className="w-full bg-background border-foreground/10 text-foreground p-5 rounded-[4px] font-sans text-[16px] focus:border-[#a1826a] outline-none transition-all resize-none text-foreground placeholder:text-foreground/40"
                                        placeholder="Jak możemy Ci pomóc?"
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    className="w-full py-5 bg-foreground text-background font-sans text-[11px] font-semibold tracking-[0.2em] uppercase rounded-[4px] hover:bg-primary hover:text-white transition-all duration-300"
                                >
                                    Wyślij Wiadomość
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* ── 4. Map Section ── */}
            <section className="w-full h-[500px] border-y border-foreground/5">
                <LeafletMap />
            </section>

            {/* ── 5. FAQ Section ── */}
            <section className="py-32 lg:py-48 px-6 md:px-12 max-w-[1440px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
                    <div className="lg:w-1/3 flex flex-col items-start">
                        <span className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] !text-primary transitions-colors mb-6">FAQ</span>
                        <h2 className="section-heading leading-tight tracking-tight">Często zadawane pytania</h2>
                    </div>
                    <div className="lg:w-2/3 flex flex-col">
                        {faqItems.map((item, idx) => (
                            <FaqAccordionItem key={idx} q={item.q} a={item.a} idx={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 6. Full Footer ── */}
            <Footer />
            
        </main>
    )
} 
