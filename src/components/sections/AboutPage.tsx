"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/ui/Navbar"
import { Footer } from "@/components/sections/Footer"

const historySteps = [
    {
        year: "1895",
        title: "Początek Historii",
        description: "Kamienica przy ul. Kołłątaja 23 zostaje wzniesiona w samym sercu rosnącej metropolii według projektu wrocławskiego budowniczego Friedricha Manna. Jej eklektyczna fasada, wysokie okna i kunsztowne detale stają się wizytówką miejskiej elegancji, przyciągając wzrok przechodniów.",
        image: "/Budynek - zewnątrz/NR214_AK__________L57A0825aaa.JPG", 
        align: "right"
    },
    {
        year: "1945",
        title: "Przetrwanie",
        description: "Kamienica przetrwała najtrudniejsze chwile, stając się milczącym świadkiem powojennej odbudowy Wrocławia. Jej solidne mury stanowiły schronienie, a budynek przez dekady wpisywał się w żywy, tętniący życiem krajobraz odbudowującego się miasta.",
        image: "/Budynek - zewnątrz/NR006_AK__________7Z0A3335aaa.JPG", 
        align: "left"
    },
    {
        year: "2019",
        title: "Nowy Rozdział",
        description: "Z ogromnym szacunkiem dla dziedzictwa rozpoczynamy gruntowną renowację. Konserwujemy oryginalne sztukaterie, odtwarzamy dębowe podłogi i z namaszczeniem wzmacniamy konstrukcję, przygotowując kamienicę na przyjęcie nowej generacji gości.",
        image: "/Budynek - zewnątrz/NR003_AK__________DJI_0313aaa.JPG", 
        align: "right"
    },
    {
        year: "Dziś",
        title: "Twój Azyl",
        description: "Otwieramy przed Tobą autorskie apartamenty. To projekt zrodzony z pasji, w którym historyczna dusza miesza się z bezkompromisowym komfortem butikowych wnętrz. Tu znajdziesz swój spokój w samym sercu Wrocławia.",
        image: "/Budynek - zewnątrz/NR020_AK__________L57A0910aaa.JPG", 
        align: "left"
    }
]

export function AboutPage() {
    const { scrollY } = useScroll()
    const heroY = useTransform(scrollY, [0, 1000], [0, 300])

    return (
        <main className="min-h-screen bg-[#f9f6f3] text-foreground font-sans antialiased overflow-hidden">
            
            {/* ── 1. Navbar (Sticky variant for Hero overlay) ── */}
            <Navbar variant="hero" activePath="/o-nas" />

            {/* ── 2. Hero Section ── */}
            <section className="relative w-full h-[85vh] md:h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black">
                {/* Background Image with Parallax */}
                <motion.div 
                    className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center z-0"
                    style={{ 
                        backgroundImage: "url('/Budynek - zewnątrz/NR001_AK__________7Z0A3326aaa.JPG')",
                        y: heroY 
                    }}
                />
                
                {/* Dark Overlays for Text Readability */}
                <div className="absolute inset-0 bg-black/40 z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-[1]" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center px-6 mt-16 max-w-[1440px] w-full">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-[#f9f6f3] text-5xl md:text-7xl lg:text-[88px] font-serif font-medium leading-[1.1] max-w-5xl tracking-tight"
                    >
                        Ponad wiek historii, <br className="hidden md:block"/>jedna misja.
                    </motion.h1>
                </div>
            </section>

            {/* ── 3. Intro / Philosophy ── */}
            <section className="py-32 lg:py-48 px-6 max-w-[800px] mx-auto text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <img 
                        src="/Loga/kollataja_logo.svg" 
                        alt="Kołłątaja 23 Logo" 
                        className="h-16 md:h-20 w-auto opacity-90 mix-blend-multiply" 
                    />
                </motion.div>
                
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-serif text-3xl md:text-5xl text-[#1f3a40] leading-[1.2] mb-10 tracking-tight"
                >
                    Wierzymy, że podróżowanie to nie tylko nocleg — to doświadczanie architektury, czasu i ludzi.
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="font-sans text-[16px] md:text-[18px] leading-relaxed text-foreground/60 text-balance"
                >
                    Zamiast budować kolejny anonimowy hotel, wybraliśmy kamienicę z dumną przeszłością. 
                    Odrestaurowaliśmy ją powoli i uważnie, aby oddać hołd jej twórcom, jednocześnie adaptując wnętrza 
                    do standardów najwyższego, butikowego luksusu.
                </motion.p>
            </section>

            {/* ── 4. Asymmetric Story (History) ── */}
            <section className="pb-32 lg:pb-48 px-6 md:px-12 max-w-[1440px] mx-auto">
                <div className="flex flex-col gap-24 lg:gap-40">
                    {historySteps.map((step, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={step.year} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
                                
                                {/* Image Wrapper */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="w-full lg:w-1/2 relative group"
                                >
                                    <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-[4px] shadow-sm">
                                        <div 
                                            className="w-full h-full bg-cover bg-center transition-transform duration-[3000ms] group-hover:scale-105"
                                            style={{ backgroundImage: `url('${step.image}')` }}
                                        />
                                    </div>
                                    <div className="absolute -inset-4 bg-background/5 pointer-events-none -z-10 rounded-[8px]" />
                                </motion.div>

                                {/* Text Content */}
                                <motion.div 
                                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                    className="w-full lg:w-1/2 flex flex-col justify-center max-w-lg"
                                >
                                    <span className="font-sans text-[16px] leading-[24px] tracking-[-0.32px] text-[#0f677d] font-normal mb-2">
                                        {step.year}
                                    </span>
                                    <h3 className="font-serif text-3xl md:text-4xl text-[#1f3a40] tracking-tight mb-6">
                                        {step.title}
                                    </h3>
                                    <p className="font-sans text-[16px] leading-[1.8] text-foreground/70">
                                        {step.description}
                                    </p>
                                </motion.div>
                                
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* ── 5. Outro / Call to action ── */}
            <section className="py-24 lg:py-32 border-t border-foreground/10 px-6 text-center">
                <div className="max-w-2xl mx-auto flex flex-col items-center">
                    <span className="font-sans text-[11px] font-medium tracking-[0.2em] uppercase text-[#a1826a] mb-6">
                        Prawdziwa Gościnność
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl text-[#1f3a40] leading-tight mb-8">
                        To nie korporacja. <br/> To projekt z pasji.
                    </h2>
                    <p className="font-sans text-[16px] leading-relaxed text-foreground/60 mb-12">
                        Nie oferujemy tylko kluczy do pokoju. Jesteśmy tu, by zapewnić Ci autentyczne wrocławskie doświadczenie. 
                        Gdy nas potrzebujesz — odbieramy telefon. A gdy potrzebujesz spokoju — znikamy w cieniu.
                    </p>
                    <Link 
                        href="/#apartamenty" 
                        className="inline-block px-12 py-5 border border-[#1f3a40]/20 text-[#1f3a40] font-sans text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#a1826a] hover:text-[#f9f6f3] hover:border-[#a1826a] transition-all duration-300"
                    >
                        Pobyt u Nas
                    </Link>
                </div>
            </section>

            {/* ── 6. Standard Footer ── */}
            <Footer />
            
        </main>
    )
} 
