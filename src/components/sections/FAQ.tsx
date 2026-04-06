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
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col gap-4 max-w-sm"
                    >
                        <p className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] text-foreground/60 transition-colors">
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
        <section id="faq" className="bg-background py-24 lg:py-40 transition-colors duration-500">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
                    
                    {/* ── Left Column: Headers ── */}
                    <div className="lg:col-span-4 flex flex-col">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-120px" }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] !text-primary dark:text-foreground/60 mb-8 font-normal lg:text-left text-center block transition-colors"
                        >
                            FAQ
                        </motion.span>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 25, filter: "blur(5px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-120px" }}
                            transition={{ duration: 1.4, delay: 0.4, ease: [0.2, 0.65, 0.3, 0.9] }}
                            className="font-serif text-4xl lg:text-[56px] leading-[1.1] tracking-tight text-foreground mb-8 transition-colors"
                        >
                            Często<br />Zadawane<br />Pytania
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-120px" }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="text-[15px] leading-relaxed text-foreground/60 max-w-sm text-balance"
                        >
                            Wszystko, co musisz wiedzieć dla bezproblemowego pobytu, od procesu check-in po zasady parkingu.
                        </motion.p>
                    </div>

                    {/* ── Right Column: Accordion ── */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="lg:col-span-8 flex flex-col border-t border-foreground/15"
                    >
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                item={faq}
                                isOpen={openIndex === index}
                                onClick={() => toggleItem(index)}
                            />
                        ))}
                    </motion.div>

                </div>

            </div>
        </section>
    )
}
