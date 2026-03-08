"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Cloud, Droplets, Sun, Wind, CloudRain, Snowflake } from "lucide-react"

// Types matching wttr.in JSON structure
interface WeatherData {
    current_condition: Array<{
        temp_C: string
        FeelsLikeC: string
        humidity: string
        weatherDesc: Array<{ value: string }>
        weatherCode: string
        windspeedKmph: string
    }>
}

export function WeatherWidget() {
    const [weather, setWeather] = React.useState<WeatherData | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        async function fetchWeather() {
            try {
                setLoading(true)
                // Pobieramy pogodę dla Wrocławia w formacie JSON
                const response = await fetch("https://wttr.in/Wroclaw?format=j1")

                if (!response.ok) throw new Error("Weather fetch failed")

                const data = await response.json()
                setWeather(data)
                setError(false)
            } catch (err) {
                console.error("Błąd podczas pobierania pogody:", err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchWeather()
        // Odświeżaj co 30 minut
        const interval = setInterval(fetchWeather, 30 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    if (loading) {
        return (
            <div className="flex items-center gap-4 bg-transparent border-t border-foreground/15 px-6 py-4 rounded-none w-full animate-pulse">
                <div className="w-6 h-6 bg-foreground/10" />
                <div className="h-4 w-24 bg-foreground/10" />
            </div>
        )
    }

    if (error || !weather || !weather.current_condition[0]) {
        // Fallback
        return (
            <div className="flex items-center gap-3 bg-transparent border-t border-foreground/15 px-6 py-4 rounded-none w-full">
                <Sun className="w-4 h-4 text-foreground" />
                <span className="text-xs text-foreground/70 uppercase tracking-widest font-semibold">Wrocław</span>
            </div>
        )
    }

    const current = weather.current_condition[0]
    const temp = current.temp_C
    const feelsLike = current.FeelsLikeC
    const wind = current.windspeedKmph
    const description = current.weatherDesc[0]?.value || "Clear"
    const code = parseInt(current.weatherCode)

    // Map wttr.in weather codes to lucid icons
    // Clear/Sunny (113)
    // Cloudy (116, 119, 122)
    // Rain/Drizzle (176, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314, 353, 356, 359)
    // Snow/Ice (179, 182, 185, 227, 230, 317, 320, 323, 326, 329, 332, 335, 338, 350, 362, 365, 368, 371, 374, 377, 395)
    const isSunny = code === 113
    const isCloudy = [116, 119, 122].includes(code)
    const isRainy = code >= 176 && code < 315 && !isCloudy
    const isSnow = code >= 317 || code === 179 || code === 227

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-stretch w-full bg-transparent md:divide-x divide-y md:divide-y-0 divide-foreground/15"
        >
            {/* Główne info */}
            <div className="flex items-center gap-4 py-8 px-6 w-full md:w-auto flex-1">
                <div className="relative flex items-center justify-center text-foreground transition-colors">
                    {isSunny && <Sun className="w-6 h-6" strokeWidth={1.5} />}
                    {isCloudy && <Cloud className="w-6 h-6" strokeWidth={1.5} />}
                    {isRainy && <CloudRain className="w-6 h-6" strokeWidth={1.5} />}
                    {isSnow && <Snowflake className="w-6 h-6" strokeWidth={1.5} />}
                    {!isSunny && !isCloudy && !isRainy && !isSnow && <Sun className="w-6 h-6" strokeWidth={1.5} />}
                </div>

                <div className="flex flex-col">
                    <span className="text-2xl font-medium tracking-tight text-foreground leading-none">{temp}°C</span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/50 mt-1">{description}</span>
                </div>
            </div>

            {/* Ekstra info 1: Odczuwalna */}
            <div className="hidden lg:flex flex-col justify-center py-8 px-6 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                    <Droplets className="w-3 h-3 text-primary/60" />
                    <span className="text-[10px] uppercase tracking-wider text-foreground/60">Odczuwalna</span>
                </div>
                <span className="text-sm font-medium tracking-tight text-foreground">{feelsLike}°C</span>
            </div>

            {/* Ekstra info 2: Wiatr */}
            <div className="hidden lg:flex flex-col justify-center py-8 px-6 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                    <Wind className="w-3 h-3 text-primary/60" />
                    <span className="text-[10px] uppercase tracking-wider text-foreground/60">Wiatr</span>
                </div>
                <span className="text-sm font-medium tracking-tight text-foreground">{wind} km/h (Rynek)</span>
            </div>
        </motion.div>
    )
}
