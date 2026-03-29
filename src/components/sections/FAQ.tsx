"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
    {
        question: "W jakich godzinach odbywa się check-in oraz check-out?",
        answer: "Standardowe zameldowanie rozpoczyna się o godzinie 15:00, natomiast wymeldowanie trwa do godziny 11:00. Jeśli ze względu na plan podróży potrzebujesz elastyczności — przedłużone wymeldowanie możliwe jest po wcześniejszym ustaleniu z obsługą."
    },
    {
        question: "Czy dostępny jest parking dla gości apartamentów?",
        answer: "Tak, oferujemy prywatny, monitorowany parking podziemny w obrębie budynku we współpracy z naszym partnerem. Ze względu na ograniczoną liczbę miejsc w ścisłym centrum, wymagana jest wcześniejsza rezerwacja w momencie potwierdzenia pobytu."
    },
    {
        question: "Czy akceptujecie pobyt ze zwierzętami?",
        answer: "W trosce o komfort wszystkich gości oraz, jako że wykończenia obejmują naturalne materiały wysokiej klasy, nasze apartamenty nie są przystosowane do przyjmowania zwierząt. Zwierzęta asystujące posiadające odpowiednie certyfikaty są oczywiście wyłączone z tej zasady."
    },
    {
        question: "Czy do apartamentów przynależy balkon z widokiem?",
        answer: "Wybrane apartamenty Premium obejmują przestronne okna oraz prywatne balkony ze świetnym widokiem na kamienice Wrocławia oraz tętniącą życiem ulicę Kołłątaja. Pełną listę oferowanych udogodnień dla danego mieszkania sprawdzisz podczas procesu rezerwacji na platformie."
    },
    {
        question: "Czy w pobliżu obiektu znajdują się miejsca na śniadanie?",
        answer: "Tak. Stawiamy na doświadczanie miasta, jak lokalsi. Zaledwie kilka kroków od apartamentów znajdziesz świetne rzemieślnicze piekarnie i topowe wrocławskie kawiarnie (typu Dinette czy Gniazdo)."
    },
]

function AccordionItem({ item, isOpen, onClick }: { item: { question: string, answer: string }, isOpen: boolean, onClick: () => void }) {
    return (
        <div className="border-b border-foreground/15 last:border-b-0">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                aria-expanded={isOpen}
            >
                <span className="text-[17px] font-sans font-medium text-foreground tracking-[-0.01em] pr-8 group-hover:text-foreground/80 transition-colors">
                    {item.question}
                </span>
                <span className="text-foreground/50 transition-colors group-hover:text-foreground">
                    {isOpen ? <Minus className="w-5 h-5 stroke-[1.5]" /> : <Plus className="w-5 h-5 stroke-[1.5]" />}
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 pt-2 text-[15px] leading-relaxed text-foreground/60 pr-12 text-balance">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section id="faq" className="bg-[#f9f6f3] py-24 lg:py-40">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
                    
                    {/* ── Left Column: Headers ── */}
                    <div className="lg:col-span-4 flex flex-col">
                        <span className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] text-[#0f677d] mb-8 font-normal lg:text-left text-center block">
                            FAQ
                        </span>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="font-serif text-4xl lg:text-[56px] leading-[1.1] tracking-tight text-[#1f3a40] mb-8"
                        >
                            Często<br />Zadawane<br />Pytania
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-[15px] leading-relaxed text-foreground/60 max-w-sm text-balance"
                        >
                            Wszystko, co musisz wiedzieć dla bezproblemowego pobytu, od procesu check-in po zasady parkingu.
                        </motion.p>
                    </div>

                    {/* ── Right Column: Accordion ── */}
                    <div className="lg:col-span-8 flex flex-col border-t border-foreground/15">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                item={faq}
                                isOpen={openIndex === index}
                                onClick={() => toggleItem(index)}
                            />
                        ))}
                    </div>

                </div>

            </div>
        </section>
    )
}
