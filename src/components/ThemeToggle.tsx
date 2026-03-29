"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle({ isOverHero = false }: { isOverHero?: boolean }) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => setMounted(true), [])

    if (!mounted) return <div className={`p-2 h-[34px] w-[34px] rounded-full border ${isOverHero ? "border-[#f9f6f3]/20" : "border-primary/20"}`} />

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`p-2 flex items-center justify-center rounded-full border transition-colors duration-300
                ${isOverHero 
                    ? "border-[#f9f6f3]/20 text-[#f9f6f3] hover:bg-[#f9f6f3] hover:text-[#1f3a40]" 
                    : "border-foreground/20 text-foreground hover:bg-foreground hover:text-background"
                }`}
            aria-label="Toggle theme"
        >
            {theme === "light" ? <Moon className="h-[14px] w-[14px]" /> : <Sun className="h-[14px] w-[14px]" />}
        </button>
    )
}
