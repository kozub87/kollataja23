"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { LeafletMap } from "@/components/ui/LeafletMap"
import { MobileMenu } from "@/components/ui/MobileMenu"

// ── FAQ data ──────────────────────────────────────────────────────────────────
const faq = [
    {
        q: "O której godzinie można się zameldować i wymeldować?",
        a: "Zameldowanie możliwe jest od godziny 15:00, wymeldowanie do 11:00. W przypadku dostępności możemy ustalić inny termin — skontaktuj się z nami.",
    },
    {
        q: "Czy możliwe jest wcześniejsze/późniejsze zameldowanie?",
        a: "Tak, w miarę możliwości staramy się to umożliwić. Prosimy o kontakt z wyprzedzeniem, aby potwierdzić dostępność apartamentu.",
    },
    {
        q: "Czy obowiązuje minimalny czas pobytu?",
        a: "Minimalny pobyt to 2 noce. W sezonie letnim i świątecznym może obowiązywać minimalny pobyt 3 noce.",
    },
    {
        q: "Czy możliwe jest zakwaterowanie ze zwierzętami?",
        a: "Niestety nie akceptujemy zwierząt domowych. Nasze apartamenty są zaprojektowane z myślą o komforcie wszystkich gości.",
    },
    {
        q: "Jak przebiega zameldowanie? Czy jest recepcja?",
        a: "Korzystamy z systemu self check-in — klucze dostępne są w skrzynce na kody 24/7. Przed przyjazdem wyślemy szczegółowe instrukcje.",
    },
    {
        q: "Czy jest dostępny parking?",
        a: "Bezpośrednio przy budynku nie ma naszego parkingu. W okolicy dostępne są płatne parkingi publiczne (ok. 5 min piechotą). Chętnie doradzimy.",
    },
    {
        q: "Czy dostępna jest faktura VAT?",
        a: "Tak, na życzenie wystawiamy fakturę VAT. Prosimy podać dane firmy przy rezerwacji lub drogą mailową.",
    },
]

// ── FAQ Item ──────────────────────────────────────────────────────────────────
function FaqItem({ q, a, idx }: { q: string; a: string; idx: number }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="border-b border-foreground/12 last:border-b-0">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-start justify-between gap-4 py-5 text-left group"
            >
                <div className="flex items-start gap-4">
                    <span className="text-[9px] font-semibold tracking-widest text-foreground/30 mt-0.5 shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-foreground leading-relaxed">
                        {q}
                    </span>
                </div>
                <span className={`text-foreground/50 text-lg shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
                    +
                </span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                    >
                        <p className="text-sm text-foreground/65 leading-relaxed pb-5 pl-9">
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
        name: "", email: "", phone: "", dateFrom: "", dateTo: "",
        apartment: "", message: "",
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        // In production: replace with Formspree / EmailJS / API route
        setSubmitted(true)
    }

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
                    <MobileMenu activePath="/kontakt" />
                </div>
            </nav>

            {/* ── Section header ── */}
            <div className="px-4 md:px-8 pt-14 pb-10 border-b border-foreground/15">
                <div className="flex items-center gap-3 mb-7">
                    <div className="w-2.5 h-2.5 bg-foreground" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-foreground/55">Kontakt</span>
                </div>
                <motion.h1
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-[90px] font-semibold tracking-tighter uppercase leading-[0.95] text-foreground"
                >
                    NAPISZ<br />DO NAS.
                </motion.h1>
            </div>

            {/* ── Two-column body ── */}
            <div className="flex flex-col lg:grid lg:grid-cols-[3fr_2fr]">

                {/* ── LEFT: Form ── */}
                <div className="px-4 md:px-8 py-12 border-b lg:border-b-0 lg:border-r border-foreground/15">
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col gap-5 py-12"
                        >
                            <div className="w-10 h-10 bg-foreground flex items-center justify-center">
                                <span className="text-background text-lg font-bold">✓</span>
                            </div>
                            <h2 className="text-3xl font-semibold tracking-tighter uppercase text-foreground">
                                WIADOMOŚĆ WYSŁANA
                            </h2>
                            <p className="text-sm text-foreground/60 leading-relaxed max-w-md">
                                Dziękujemy za kontakt! Odezwiemy się w ciągu 24 godzin (zazwyczaj szybciej).
                                W pilnych sprawach zadzwoń bezpośrednio.
                            </p>
                            <button
                                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", dateFrom: "", dateTo: "", apartment: "", message: "" }) }}
                                className="text-[10px] font-semibold tracking-widest uppercase text-foreground border-b border-foreground w-max pb-0.5 hover:opacity-50 transition-opacity mt-4"
                            >
                                WYŚLIJ KOLEJNĄ →
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                            <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/50 mb-8 block">
                                Formularz kontaktowy
                            </span>

                            {/* Row: Name + Email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-foreground/12">
                                <div className="flex flex-col gap-1.5 py-5 pr-0 sm:pr-6 border-b sm:border-b-0 border-foreground/12 sm:border-r">
                                    <label className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40">Imię i nazwisko *</label>
                                    <input
                                        required name="name" value={form.name} onChange={handleChange}
                                        className="bg-transparent text-sm font-medium text-foreground placeholder:text-foreground/25 outline-none border-none w-full py-1"
                                        placeholder="Jan Kowalski"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 py-5 sm:pl-6">
                                    <label className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40">Email *</label>
                                    <input
                                        required type="email" name="email" value={form.email} onChange={handleChange}
                                        className="bg-transparent text-sm font-medium text-foreground placeholder:text-foreground/25 outline-none border-none w-full py-1"
                                        placeholder="jan@email.pl"
                                    />
                                </div>
                            </div>

                            {/* Row: Phone + Apartment */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-foreground/12">
                                <div className="flex flex-col gap-1.5 py-5 pr-0 sm:pr-6 border-b sm:border-b-0 border-foreground/12 sm:border-r">
                                    <label className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40">Telefon</label>
                                    <input
                                        type="tel" name="phone" value={form.phone} onChange={handleChange}
                                        className="bg-transparent text-sm font-medium text-foreground placeholder:text-foreground/25 outline-none border-none w-full py-1"
                                        placeholder="+48 000 000 000"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 py-5 sm:pl-6">
                                    <label className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40">Apartament</label>
                                    <select
                                        name="apartment" value={form.apartment} onChange={handleChange}
                                        className="bg-transparent text-sm font-medium text-foreground outline-none border-none w-full py-1 cursor-pointer"
                                    >
                                        <option value="">Wybieram...</option>
                                        <option value="1">Apartament nr 1 — Studio z Patio</option>
                                        <option value="2">Apartament nr 2 — Salon z Aneksem</option>
                                        <option value="3">Apartament nr 3 — Wnętrze z Historią</option>
                                        <option value="4">Apartament nr 4 — Flagowy (2 sypialnie)</option>
                                        <option value="any">Dowolny — doradzę</option>
                                    </select>
                                </div>
                            </div>

                            {/* Row: Dates */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-foreground/12">
                                <div className="flex flex-col gap-1.5 py-5 pr-0 sm:pr-6 border-b sm:border-b-0 border-foreground/12 sm:border-r">
                                    <label className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40">Data przyjazdu</label>
                                    <input
                                        type="date" name="dateFrom" value={form.dateFrom} onChange={handleChange}
                                        className="bg-transparent text-sm font-medium text-foreground outline-none border-none w-full py-1 cursor-pointer"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5 py-5 sm:pl-6">
                                    <label className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40">Data wyjazdu</label>
                                    <input
                                        type="date" name="dateTo" value={form.dateTo} onChange={handleChange}
                                        className="bg-transparent text-sm font-medium text-foreground outline-none border-none w-full py-1 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-1.5 py-5 border-t border-foreground/12">
                                <label className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40">Wiadomość *</label>
                                <textarea
                                    required name="message" value={form.message} onChange={handleChange}
                                    rows={5}
                                    className="bg-transparent text-sm font-medium text-foreground placeholder:text-foreground/25 outline-none border-none w-full py-1 resize-none"
                                    placeholder="Opisz swoje oczekiwania, zapytaj o dostępność..."
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex items-center justify-between pt-6 border-t border-foreground/12">
                                <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/35">
                                    * Pola obowiązkowe
                                </span>
                                <button
                                    type="submit"
                                    className="flex items-center gap-4 bg-foreground text-background px-8 py-4 hover:opacity-85 transition-opacity"
                                >
                                    <span className="text-[10px] font-semibold tracking-widest uppercase">WYŚLIJ WIADOMOŚĆ</span>
                                    <span className="text-background/60">→</span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* ── RIGHT: Info + Map + FAQ ── */}
                <div className="flex flex-col">

                    {/* Contact details */}
                    <div className="px-4 md:px-8 py-10 flex flex-col gap-6 border-b border-foreground/15">
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/50">Dane kontaktowe</span>
                        <div className="flex flex-col gap-4">
                            {[
                                { label: "Email", value: "kontakt@kollataja23.pl", href: "mailto:kontakt@kollataja23.pl" },
                                { label: "Telefon", value: "+48 123 456 789", href: "tel:+48123456789" },
                                { label: "Adres", value: "ul. Kołłątaja 23\n50-002 Wrocław", href: undefined },
                            ].map(c => (
                                <div key={c.label} className="flex flex-col gap-0.5">
                                    <span className="text-[9px] font-semibold tracking-widest uppercase text-foreground/35">{c.label}</span>
                                    {c.href ? (
                                        <a href={c.href} className="text-sm font-semibold text-foreground hover:opacity-60 transition-opacity whitespace-pre-line">{c.value}</a>
                                    ) : (
                                        <span className="text-sm font-semibold text-foreground whitespace-pre-line">{c.value}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3 pt-2">
                            <a href="https://booking.com" target="_blank" rel="noopener noreferrer" className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40 border border-foreground/20 px-3 py-1.5 hover:border-foreground/50 transition-colors">Booking.com</a>
                            <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer" className="text-[9px] font-semibold tracking-widest uppercase text-foreground/40 border border-foreground/20 px-3 py-1.5 hover:border-foreground/50 transition-colors">Airbnb</a>
                        </div>
                    </div>

                    {/* Mini map */}
                    <div className="border-b border-foreground/15" style={{ height: "200px" }}>
                        <LeafletMap />
                    </div>

                    {/* FAQ */}
                    <div className="px-4 md:px-8 py-10">
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-foreground/50 mb-6 block">FAQ</span>
                        <div className="flex flex-col">
                            {faq.map((item, idx) => (
                                <FaqItem key={idx} q={item.q} a={item.a} idx={idx} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Footer mini ── */}
            <div className="flex justify-center md:justify-between items-center px-4 md:px-8 py-5 bg-foreground text-background border-t border-foreground">
                <span className="text-[9px] font-semibold tracking-widest uppercase text-background/35">© 2026 KOŁŁĄTAJA 23 · WROCŁAW</span>
            </div>
        </main>
    )
}
