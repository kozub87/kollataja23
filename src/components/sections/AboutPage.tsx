"use client"
import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useTheme } from "next-themes"
import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/sections/Footer"
import { SectionSeparator } from "@/components/ui/SectionSeparator"

const historySteps = [
    {
        year: "1895",
        title: "Początek Historii",
        description: "Kamienica zostaje wzniesiona w sercu metropolii według projektu Friedricha Manna. Jej kunsztowne detale stają się wizytówką miejskiej elegancji.",
        side: "right"
    },
    {
        year: "1910",
        title: "Zmysł Detalu",
        description: "Budynek zyskuje unikatowe wykończenia wnętrz — klatki schodowe z dębowymi poręczami i zdobione sufity, które zachwycają do dziś.",
        side: "left"
    },
    {
        year: "1945",
        title: "Przetrwanie",
        description: "Kamienica przetrwała najtrudniejsze chwile, stając się milczącym świadkiem powojennej odbudowy Wrocławia. Jej mury stanowiły bezpieczne schronienie.",
        side: "right"
    },
    {
        year: "1980",
        title: "Miejski Krajobraz",
        description: "Po dekadach stabilizacji kamienica stała się integralną częścią wrocławskiego centrum, łącząc tradycję z pulsującym życiem miasta.",
        side: "left"
    },
    {
        year: "2019",
        title: "Nowy Rozdział",
        description: "Z szacunkiem dla dziedzictwa rozpoczynamy renowację. Konserwujemy sztukaterie i odtwarzamy dębowe podłogi, przygotowując kamienicę dla gości.",
        side: "right"
    },
    {
        year: "2023",
        title: "Standard Butikowy",
        description: "Wdrażamy nowoczesne technologie klimatyczne i akustyczne, nie naruszając oryginalnej tkanki architektonicznej budynku.",
        side: "left"
    },
    {
        year: "Dziś",
        title: "Twój Azyl",
        description: "Otwieramy autorskie apartamenty. To projekt zrodzony z pasji, w którym historyczna dusza miesza się z bezkompromisowym komfortem butikowych wnętrz.",
        side: "right"
    }
]

function HistoryStep({ step, isRight }: { step: any, isRight: boolean }) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress: localProgress } = useScroll({
        target: ref,
        offset: ["start 80%", "end 20%"] 
    })

    const opacity = useTransform(localProgress, [0, 0.3, 0.7, 1], [0.15, 1, 1, 0.15])
    const blurValue = useTransform(localProgress, [0, 0.3, 0.7, 1], [15, 0, 0, 15])
    const blur = useTransform(blurValue, (v) => `blur(${v}px)`)
    const scale = useTransform(localProgress, [0, 0.3, 0.7, 1], [0.93, 1, 1, 0.93])

    return (
        <div ref={ref} className="w-full relative flex items-center min-h-[300px]">
            {isRight ? (
                <>
                    {/* Wypełniacz lewej połówki */}
                    <div className="hidden md:block w-1/2" />
                    {/* Treść na prawej połówce z mocnym odścięciem od środka */}
                    <motion.div 
                        style={{ opacity, filter: blur, scale }}
                        className="w-full md:w-1/2 pl-6 md:pl-[120px] lg:pl-[160px] xl:pl-[220px] flex justify-start relative z-10"
                    >
                        <StepContent step={step} />
                    </motion.div>
                </>
            ) : (
                <>
                    {/* Treść na lewej połówce z mocnym odcięciem od środka */}
                    <motion.div 
                        style={{ opacity, filter: blur, scale }}
                        className="w-full md:w-1/2 pr-6 md:pr-[120px] lg:pr-[160px] xl:pr-[220px] flex justify-end relative z-10"
                    >
                        <StepContent step={step} />
                    </motion.div>
                    <div className="hidden md:block w-1/2" />
                </>
            )}
        </div>
    )
}

function StepContent({ step }: { step: any }) {
    return (
        <div className="w-full max-w-[400px] text-left">
            <div className="mb-2">
                <span className="text-[13px] tracking-[0.2em] font-bold text-primary/80 uppercase">
                    {step.year}
                </span>
            </div>
            <h3 className="font-serif text-3xl md:text-5xl text-foreground mb-4 leading-[1.1] tracking-tight">
                {step.title}
            </h3>
            <p className="font-sans text-[16px] md:text-[18px] leading-[1.7] text-foreground/70 dark:text-foreground/50">
                {step.description}
            </p>
        </div>
    )
}

export function AboutPage() {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const { scrollY } = useScroll()

    useEffect(() => {
        setMounted(true)
    }, [])

    const heroY = useTransform(scrollY, [0, 1000], [0, 300])
    const historyContainerRef = useRef<HTMLElement>(null)
    
    // Total section view
    const { scrollYProgress: mainProgress } = useScroll({
        target: historyContainerRef,
        offset: ["start center", "end center"]
    })

    // Używamy maskowania wysokości zamiast pathLength. To gwarantuje w 100%, że dół narysowanej linii 
    // jest idealnie w poziomie równy ze środkiem twojego ekranu, niezależnie od wężyków krzywej!
    // Wysokość viewBox wynosi 3400.
    const clipHeight = useTransform(mainProgress, [0, 1], [0, 3500])

    return (
        <main className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden">
            
            <Navbar variant="hero" activePath="/o-nas" />

            <section className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black z-0">
                {/* ── Background Image Layers (Cross-fade) ── */}
                <motion.div 
                    className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-[center_top_35%] z-0 origin-center transition-opacity duration-1000"
                    style={{ 
                        backgroundImage: "url('/Budynek - zewnątrz/NR001_AK__________7Z0A3326aaa.JPG')",
                        y: heroY,
                        scale: 1.1,
                        opacity: mounted && theme === "dark" ? 0 : 1
                    }}
                />
                <motion.div 
                    className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-[center_top_35%] z-0 origin-center transition-opacity duration-1000"
                    style={{ 
                        backgroundImage: "url('/Budynek - zewnątrz/O nas dark.png')",
                        y: heroY,
                        scale: 1.1,
                        opacity: mounted && theme === "dark" ? 1 : 0
                    }}
                />
                <div className="absolute inset-0 bg-black/40 z-[1]" />
                <div className="relative z-10 flex flex-col items-center px-6 max-w-[1440px] w-full">
                    <motion.h1
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[#f9f6f3] text-5xl md:text-7xl lg:text-[100px] font-serif font-medium leading-[1.05] tracking-tighter"
                    >
                        Ponad wiek historii, <br className="hidden md:block"/>jedna misja
                    </motion.h1>
                </div>
            </section>

            {/* 2. The PERFECTLY Synced Serpent (Clip Mask Method) */}
            <section ref={historyContainerRef} className="relative w-full max-w-[1100px] mx-auto py-32 px-6 overflow-visible mb-64 mt-20">
                
                {/* SVG CONTAINER - HEIGHT MAPS EXACTLY TO PARENT HEIGHT */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[340px] pointer-events-none z-0 hidden md:block select-none overflow-visible">
                    <svg viewBox="0 0 340 3400" fill="none" preserveAspectRatio="none" className="w-full h-full text-primary overflow-visible">
                        <defs>
                            {/* Gradient maskujący dla miękkiego startu i końca */}
                            <linearGradient id="line-fade" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                                <stop offset="5%" stopColor="currentColor" stopOpacity="0.4" />
                                <stop offset="95%" stopColor="currentColor" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                            </linearGradient>

                            {/* Klip maskujący - rośnie idealnie z postępem scrolla w dół */}
                            <clipPath id="reveal-clip">
                                <motion.rect x="-50" y="0" width="440" height={clipHeight} fill="white" />
                            </clipPath>
                        </defs>
                        
                        <path
                            clipPath="url(#reveal-clip)"
                            d="M 170 0 
                               C 170 100, 40 200, 40 400 
                               C 40 600, 300 700, 300 900 
                               C 300 1100, 40 1200, 40 1400 
                               C 40 1600, 300 1700, 300 1900 
                               C 300 2100, 40 2200, 40 2400 
                               C 40 2600, 300 2700, 300 2900 
                               C 300 3100, 40 3200, 40 3400"
                            stroke="url(#line-fade)"
                            strokeWidth="3" 
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* MOBILE VIEW */}
                <div className="absolute top-0 bottom-0 left-12 md:hidden pointer-events-none z-0 text-primary">
                    <svg viewBox="0 0 2 3400" className="w-[2px] h-full" preserveAspectRatio="none">
                        <path 
                            clipPath="url(#reveal-clip-mobile)"
                            d="M 1 0 L 1 3400" 
                            stroke="url(#line-fade)" 
                            strokeWidth="3" 
                        />
                    </svg>
                </div>

                {/* CONTENT ROWS (SYMMETRIC & SPACED) */}
                <div className="flex flex-col gap-[28rem] relative z-10 pt-20 pb-20">
                    {historySteps.map((step, idx) => (
                        <HistoryStep 
                            key={step.year} 
                            step={step} 
                            isRight={step.side === "right"} 
                        />
                    ))}
                </div>
            </section>

            <Footer />
            
        </main>
    )
}