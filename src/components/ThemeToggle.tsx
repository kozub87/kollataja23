"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => setMounted(true), [])

    if (!mounted) return <div className="p-2 ml-4 md:ml-6 h-[34px] w-[34px] rounded-full border border-primary/20" />

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 ml-4 flex items-center justify-center rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-background transition-colors duration-300"
            aria-label="Toggle theme"
        >
            {theme === "light" ? <Moon className="h-[14px] w-[14px]" /> : <Sun className="h-[14px] w-[14px]" />}
        </button>
    )
}
