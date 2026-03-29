"use client"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { apartments } from "@/lib/apartments"

// ── Build flat image list from apartments data ────────────────────────────────
const allPhotos = apartments.flatMap(apt =>
    apt.images.map((url, i) => ({
        url,
        apt: apt.id,
        label: apt.title,
        sub: i === 0 ? "Zdjęcie główne" : `Zdjęcie ${i + 1}`,
    }))
)

export function GallerySection() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "20%" : "-20%",
            opacity: 0,
            scale: 1.05
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? "20%" : "-20%",
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.6,
                ease: "easeIn"
            }
        })
    }

    const paginate = (newDirection: number) => {
        let nextIndex = currentIndex + newDirection
        if (nextIndex < 0) nextIndex = allPhotos.length - 1
        if (nextIndex >= allPhotos.length) nextIndex = 0
        
        setDirection(newDirection)
        setCurrentIndex(nextIndex)
    }

    const currentPhoto = allPhotos[currentIndex]

    return (
        <section id="galeria" className="w-full bg-background pt-32 pb-48 overflow-hidden scroll-mt-24">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                {/* ── Header Area (Centered) ── */}
                <div className="flex flex-col items-center text-center mb-16 md:mb-24 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center"
                    >
                        <span className="eye-brow mb-6">Galeria</span>
                        <h2 className="section-heading !text-center !leading-[1.1] max-w-3xl text-balance">
                            Poczuj atmosferę <br className="hidden md:block" /> naszych wnętrz.
                        </h2>
                    </motion.div>
                </div>


                {/* ── Slider Main ── */}
                <div className="relative aspect-[16/9] md:aspect-[21/9] w-full mb-12 group">
                    <div className="w-full h-full relative overflow-hidden bg-foreground/5">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants as any}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0"
                            >
                                <img 
                                    src={currentPhoto.url} 
                                    className="w-full h-full object-cover" 
                                    alt={currentPhoto.label} 
                                />
                                {/* Bottom Subtle Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* ── Below Gallery Controls (Centered Area) ── */}
                <div className="flex flex-col items-center justify-center gap-8 pt-4">

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => paginate(-1)}
                            className="w-[46px] h-[46px] rounded-full border border-foreground/20 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/40 transition-colors"
                            aria-label="Previous image"
                        >
                            <ArrowLeft className="w-5 h-5 stroke-[1.2]" />
                        </button>
                        <button 
                            onClick={() => paginate(1)}
                            className="w-[46px] h-[46px] rounded-full border border-foreground/20 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/40 transition-colors"
                            aria-label="Next image"
                        >
                            <ArrowRight className="w-5 h-5 stroke-[1.2]" />
                        </button>
                    </div>
                </div>


            </div>
        </section>
    )
}
