"use client"
import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"

// Coords: Kołłątaja 23, Wrocław
const LAT = 51.107433
const LNG = 17.038462

export function LeafletMap() {
    const mapContainerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<unknown>(null)
    const initialized = useRef(false)

    useEffect(() => {
        if (!mapContainerRef.current || initialized.current) return
        initialized.current = true

        let active = true

        import("leaflet").then((L) => {
            if (!active || !mapContainerRef.current) return

            const leaflet = L.default ?? L

            const map = leaflet.map(mapContainerRef.current, {
                center: [LAT, LNG],
                zoom: 16,
                zoomControl: false,
                scrollWheelZoom: false,
                attributionControl: true,
            })

            leaflet.tileLayer(
                "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
                {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
                        '&copy; <a href="https://carto.com/">CARTO</a>',
                    subdomains: "abcd",
                    maxZoom: 20,
                }
            ).addTo(map)

            const squareIcon = leaflet.divIcon({
                className: "",
                html: `<div style="width:14px;height:14px;background:#111;border:2px solid #F3F3F3;box-shadow:0 2px 10px rgba(0,0,0,0.35)"></div>`,
                iconSize: [14, 14],
                iconAnchor: [7, 7],
                popupAnchor: [0, -16],
            })

            leaflet.marker([LAT, LNG], { icon: squareIcon })
                .addTo(map)
                .bindPopup(
                    `<div style="font-family:Inter,sans-serif;font-size:9px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;padding:6px 10px;background:#F3F3F3;color:#111;border:1px solid #ddd;margin:0;line-height:1.6;">
                        UL. KOŁŁĄTAJA 23<br/>
                        <span style="opacity:0.4;font-size:8px">WROCŁAW, POLSKA</span>
                    </div>`,
                    { closeButton: false, className: "brutalist-popup" }
                )
                .openPopup()

            leaflet.control.zoom({ position: "bottomright" }).addTo(map)
            mapRef.current = map
        })

        return () => {
            active = false
            initialized.current = false
            if (mapRef.current) {
                (mapRef.current as { remove: () => void }).remove()
                mapRef.current = null
            }
        }
    }, [])

    return (
        <>
            <style>{`
                .leaflet-container {
                    width: 100% !important;
                    height: 100% !important;
                    background: #F3F3F3;
                }
                .leaflet-popup-content-wrapper {
                    border-radius: 0 !important;
                    padding: 0 !important;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.12) !important;
                    border: 1px solid rgba(17,17,17,0.2) !important;
                }
                .leaflet-popup-content { margin: 0 !important; }
                .leaflet-popup-tip { display: none !important; }
            `}</style>
            <div
                ref={mapContainerRef}
                style={{ width: "100%", height: "100%" }}
            />
        </>
    )
}
