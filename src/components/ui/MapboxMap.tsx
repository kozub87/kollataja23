"use client"
import { useEffect, useRef } from "react"
import "mapbox-gl/dist/mapbox-gl.css"

// ──────────────────────────────────────────────────────────────────
// 🗺️  WKLEJ TU SWÓJ MAPBOX TOKEN (po rejestracji na mapbox.com)
// Znajdziesz go w: mapbox.com/account → Access tokens → Default public token
// ──────────────────────────────────────────────────────────────────
const MAPBOX_TOKEN = "WKLEJ_SWOJ_TOKEN_TUTAJ"

// Coords: Kołłątaja 23, Wrocław
const CENTER: [number, number] = [17.038462, 51.107433]

// ──────────────────────────────────────────────────────────────────
// Custom map style — Monochrome / minimalist pasujący do brutalizmu
// Możesz zmienić 'mapbox/light-v11' na:
//   'mapbox/dark-v11'       → ciemna mapa
//   'mapbox/satellite-v9'   → satelita
//   'mapbox/outdoors-v12'   → teren
// ──────────────────────────────────────────────────────────────────
const MAP_STYLE = "mapbox://styles/mapbox/light-v11"

export function MapboxMap() {
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<mapboxgl.Map | null>(null)

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return
        if (MAPBOX_TOKEN === "WKLEJ_SWOJ_TOKEN_TUTAJ") return

        // Dynamically import mapbox-gl to avoid SSR issues
        import("mapbox-gl").then((mapboxgl) => {

            const mapboxgl_module = mapboxgl.default ?? mapboxgl
            mapboxgl_module.accessToken = MAPBOX_TOKEN

            const map = new mapboxgl_module.Map({
                container: mapContainerRef.current!,
                style: MAP_STYLE,
                center: CENTER,
                zoom: 15.5,
                pitch: 30,          // slight 3D tilt
                bearing: -10,
                attributionControl: false,
            })

            // Custom marker at the apartment
            const el = document.createElement("div")
            el.style.cssText = `
                width: 14px;
                height: 14px;
                background-color: var(--color-foreground, #111);
                border: 2px solid var(--color-background, #F3F3F3);
                box-shadow: 0 2px 8px rgba(0,0,0,0.4);
                cursor: pointer;
            `

            new mapboxgl_module.Marker({ element: el })
                .setLngLat(CENTER)
                .setPopup(
                    new mapboxgl_module.Popup({ offset: 16, closeButton: false })
                        .setHTML(`
                            <div style="font-family:Inter,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;padding:6px 10px;background:#F3F3F3;color:#111;border:1px solid #e0e0e0;">
                                UL. KOŁŁĄTAJA 23<br><span style="opacity:0.5;font-size:8px">WROCŁAW</span>
                            </div>
                        `)
                )
                .addTo(map)

            // Disable scroll zoom for better UX
            map.scrollZoom.disable()
            map.addControl(new mapboxgl_module.NavigationControl({ showCompass: false }), "bottom-right")

            mapRef.current = map
        })

        return () => {
            mapRef.current?.remove()
            mapRef.current = null
        }
    }, [])

    // Placeholder shown while token is not yet set
    if (MAPBOX_TOKEN === "WKLEJ_SWOJ_TOKEN_TUTAJ") {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-foreground/5 border border-foreground/10">
                <div className="w-2.5 h-2.5 bg-foreground mb-4" />
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-foreground/50 text-center">
                    Wklej MAPBOX_TOKEN<br />w pliku MapboxMap.tsx
                </p>
            </div>
        )
    }

    return (
        <div ref={mapContainerRef} className="w-full h-full" />
    )
}
