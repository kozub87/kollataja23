import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function SectionLabel({ className, children, ...props }: SectionLabelProps) {
    return (
        <div className={cn("flex items-center gap-4 text-sm font-medium tracking-wide uppercase", className)} {...props}>
            <div className="h-px w-6 bg-primary/40" />
            <span className="text-primary/70">{children}</span>
        </div>
    )
}
