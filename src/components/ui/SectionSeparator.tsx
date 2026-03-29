"use client"

import { motion } from "framer-motion"

export function SectionSeparator() {
    return (
        <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent relative flex items-center justify-center overflow-visible">
            <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-3 h-3 border border-foreground/15 bg-background rotate-45 z-10"
            />
        </div>
    )
}
