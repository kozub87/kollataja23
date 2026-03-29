"use client"
import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"

// Coords: Kołłątaja 23, Wrocław
const LAT = 51.100991
const LNG = 17.036529

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
                attributionControl: false,
            })

            leaflet.tileLayer(
                "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
                {
                    subdomains: "abcd",
                    maxZoom: 20,
                }
            ).addTo(map)

            // ── Premium Circular Marker Definition ──
            const circularIcon = leaflet.divIcon({
                className: "premium-marker-circle",
                html: `
                    <div class="marker-circle-container">
                        <div class="marker-circle-outer">
                            <div class="marker-circle-inner"></div>
                        </div>
                    </div>
                `,
                iconSize: [44, 44],
                iconAnchor: [22, 22],
                popupAnchor: [0, -12],
            })

            leaflet.marker([LAT, LNG], { icon: circularIcon })
                .addTo(map)
                .bindPopup(
                    `<div class="premium-popup">
                        <span class="popup-title">UL. KOŁŁĄTAJA 23</span>
                        <span class="popup-subtitle">WROCŁAW, POLSKA</span>
                    </div>`,
                    { closeButton: false }
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
                    background: #f9f6f3;
                }
                
                /* Premium Circular Marker Styles */
                .premium-marker-circle {
                    background: transparent !important;
                    border: none !important;
                }
                
                .marker-circle-container {
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .marker-circle-outer {
                    width: 20px;
                    height: 20px;
                    background: #1f3a40; /* Marine Graphite */
                    border: 2px solid #f9f6f3; /* Sand White */
                    border-radius: 9999px; /* Perfect Circle */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 15px rgba(31, 58, 64, 0.25);
                    position: relative;
                }
                
                /* Elegant Pulse Effect */
                .marker-circle-outer::after {
                    content: '';
                    position: absolute;
                    inset: -10px;
                    border: 1px solid #1f3a40;
                    opacity: 0.3;
                    border-radius: 9999px;
                    animation: circle-pulse 2.5s infinite cubic-bezier(0.4, 0, 0.6, 1);
                }
                
                .marker-circle-inner {
                    width: 6px;
                    height: 6px;
                    background: #f9f6f3;
                    border-radius: 9999px;
                }
                
                @keyframes circle-pulse {
                    0% { transform: scale(0.6); opacity: 0.6; }
                    100% { transform: scale(1.8); opacity: 0; }
                }
                
                /* Premium Popup Styles */
                .premium-popup {
                    padding: 8px 12px;
                    background: #f9f6f3;
                    display: flex;
                    flex-direction: column;
                    gap: 1px;
                }
                
                .popup-title {
                    font-family: inherit;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    color: #1f3a40;
                }
                
                .popup-subtitle {
                    font-family: inherit;
                    font-size: 8px;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    color: #1f3a40;
                    opacity: 0.5;
                }
                
                /* Leaflet Overrides */
                .leaflet-popup-content-wrapper {
                    border-radius: 0 !important;
                    padding: 0 !important;
                    box-shadow: 0 8px 30px rgba(31, 58, 64, 0.12) !important;
                    border: 1px solid rgba(31, 58, 64, 0.1) !important;
                }
                
                .leaflet-popup-content {
                    margin: 0 !important;
                }
                
                .leaflet-popup-tip {
                    display: none !important;
                }
                
                .leaflet-control-zoom {
                    border: 1px solid rgba(31, 58, 64, 0.1) !important;
                    box-shadow: none !important;
                }
                
                .leaflet-control-zoom a {
                    background-color: #f9f6f3 !important;
                    color: #1f3a40 !important;
                    border: none !important;
                    border-bottom: 1px solid rgba(31, 58, 64, 0.05) !important;
                }
                
                .leaflet-control-zoom a:last-child {
                    border-bottom: none !important;
                }
            `}</style>
            <div
                ref={mapContainerRef}
                style={{ width: "100%", height: "100%" }}
            />
        </>
    )
}
