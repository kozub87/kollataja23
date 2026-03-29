"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Cloud, Sun, CloudRain, Snowflake, Wind } from "lucide-react"

interface WeatherData {
    current_condition: Array<{
        temp_C: string
        weatherDesc: Array<{ value: string }>
        weatherCode: string
        windspeedKmph: string
    }>
}

export function WeatherWidget() {
    const [weather, setWeather] = React.useState<WeatherData | null>(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        async function fetchWeather() {
            try {
                const response = await fetch("https://wttr.in/Wroclaw?format=j1")
                if (!response.ok) throw new Error("Weather fetch failed")
                const data = await response.json()
                setWeather(data)
            } catch (err) {
                console.error("Błąd pogody:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchWeather()
        const interval = setInterval(fetchWeather, 30 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    if (loading || !weather?.current_condition?.[0]) {
        return (
            <div className="flex items-center gap-4 px-6 py-4 animate-pulse">
                <div className="w-5 h-5 rounded-full bg-white/10" />
                <div className="h-3 w-20 bg-white/10" />
            </div>
        )
    }

    const current = weather.current_condition[0]
    const code = parseInt(current.weatherCode)
    const description = current.weatherDesc[0]?.value || "Clear"

    const isSunny = code === 113
    const isCloudy = [116, 119, 122].includes(code)
    const isRainy = code >= 176 && code < 315 && !isCloudy
    const isSnow = code >= 317 || code === 179 || code === 227

    const subLabelStyle = "text-[8px] uppercase tracking-[0.2em] text-[#f9f6f3]/40 font-medium font-sans leading-none"
    const iconStyle = "text-[#f9f6f3]/80 group-hover:text-[#f9f6f3] transition-colors duration-500"

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center backdrop-blur-md bg-white/5 border border-white/10 overflow-hidden cursor-default group hover:bg-white/10 transition-all duration-500 rounded-none shadow-premium"
        >
            {/* LEFT: Temp + City */}
            <div className="flex items-center gap-4 py-4 px-6 border-r border-white/5">
                 <div className={iconStyle}>
                    {isSunny && <Sun className="w-5 h-5" strokeWidth={1} />}
                    {isCloudy && <Cloud className="w-5 h-5" strokeWidth={1} />}
                    {isRainy && <CloudRain className="w-5 h-5" strokeWidth={1} />}
                    {isSnow && <Snowflake className="w-5 h-5" strokeWidth={1} />}
                    {!isSunny && !isCloudy && !isRainy && !isSnow && <Sun className="w-5 h-5" strokeWidth={1} />}
                </div>
                
                <div className="flex flex-col items-start gap-1 justify-center">
                    {/* Fixed Height Primary Line for alignment */}
                    <div className="flex items-baseline gap-0.5 h-5">
                        <span className="text-xl font-sans font-light text-[#f9f6f3] tracking-tighter leading-none">{current.temp_C}</span>
                        <span className="text-[9px] text-[#f9f6f3]/60 font-light leading-none">°C</span>
                    </div>
                    <div className="h-2 flex items-center">
                        <span className={subLabelStyle}>Wrocław</span>
                    </div>
                </div>
            </div>

            {/* RIGHT: Wind + Condition */}
            <div className="hidden md:flex items-center gap-4 py-4 px-6">
                <div className={iconStyle}>
                    <Wind className="w-5 h-5" strokeWidth={1} />
                </div>
                <div className="flex flex-col items-start gap-1 justify-center">
                    {/* Fixed Height Primary Line (Mirroring Left Side) */}
                    <div className="flex items-center h-5">
                        <span className="text-[11px] font-sans text-[#f9f6f3] tracking-widest font-light uppercase leading-none">{description.toLowerCase()}</span>
                    </div>
                    <div className="h-2 flex items-center">
                        <span className={subLabelStyle}>{current.windspeedKmph} km/h</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
