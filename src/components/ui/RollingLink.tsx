"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ReactNode } from "react"

interface RollingLinkProps {
    href: string
    children: ReactNode
    className?: string
    onClick?: () => void
    target?: string
    rel?: string
}

export function RollingLink({ href, children, className = "", onClick, target, rel }: RollingLinkProps) {
    const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")
    
    const content = (
        <motion.div
            initial="initial"
            whileHover="hover"
            className={`relative overflow-hidden flex flex-col group cursor-pointer font-sans text-[16px] leading-[24px] tracking-[-0.32px] font-normal ${className}`}
        >
            {/* Top Container (The one visible normally) */}
            <motion.div
                variants={{
                    initial: { y: 0 },
                    hover: { y: "-100%" }
                }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="flex items-baseline gap-inherit"
            >
                {children}
            </motion.div>
            
            {/* Bottom Container (The one that slides in from below) */}
            <motion.div
                variants={{
                    initial: { y: "100%" },
                    hover: { y: 0 }
                }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="absolute inset-0 flex items-baseline gap-inherit"
            >
                {children}
            </motion.div>
        </motion.div>
    )

    if (isExternal) {
        return (
            <a href={href} onClick={onClick} target={target} rel={rel} className="inline-block w-full lg:w-auto">
                {content}
            </a>
        )
    }

    return (
        <Link href={href} onClick={onClick} className="inline-block w-full lg:w-auto">
            {content}
        </Link>
    )
} 
