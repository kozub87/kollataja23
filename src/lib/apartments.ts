// ─── Single Source of Truth dla danych apartamentów ─────────────────────────
// Używane przez: Collection.tsx, /apartament/[id]/page.tsx, Footer, itp.

export interface Apartment {
    id: number
    slug: string
    title: string
    subtitle: string
    guests: number
    rooms: number
    area: number           // m²
    floor: string
    description: string
    longDescription: string
    price: {
        weekday: number    // PLN/noc
        weekend: number    // PLN/noc
    }
    booking: {
        bookingUrl: string
        airbnbUrl: string
    }
    images: string[]       // [0] = main/cover photo
    amenities: string[]
}

export const apartments: Apartment[] = [
    {
        id: 1,
        slug: "apartament-1",
        title: "APARTAMENT NR 1",
        subtitle: "STUDIO Z PATIO",
        guests: 2,
        rooms: 1,
        area: 38,
        floor: "I piętro",
        description: "Intymna przestrzeń z dużym oknem wychodzącym na ciche patio. Idealny wybór na romantyczny weekend.",
        longDescription: `Apartament nr 1 to kameralna przestrzeń stworzona z myślą o parach szukających oddechu w samym sercu Wrocławia. Duże okno wychodzące na ciche patio wpuszcza do wnętrza mnóstwo naturalnego światła, tworząc wyjątkowy nastrój o każdej porze dnia.

Wnętrze zostało zaprojektowane z dbałością o każdy detal — od starannie dobranego mebli po miękką pościel hotelowej jakości. Aneks kuchenny wyposażony jest we wszystko, czego potrzebujesz do przygotowania śniadania lub kolacji. Łazienka z prysznicem i zestawem kosmetyków dopełnia standard.

Cisza, prywatność i wyjątkowa lokalizacja — to właśnie oferuje Apartament nr 1.`,
        price: { weekday: 250, weekend: 320 },
        booking: {
            bookingUrl: "https://booking.com",
            airbnbUrl: "https://airbnb.com",
        },
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1400&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1400&q=80&auto=format&fit=crop",
        ],
        amenities: [
            "Szybkie Wi-Fi 100 Mbps",
            "Smart TV 55\"",
            "Klimatyzacja",
            "W pełni wyposażona kuchnia",
            "Ekspres do kawy",
            "Pościel hotelowa",
            "Ręczniki i kosmetyki",
            "Self check-in 24/7",
        ],
    },
    {
        id: 2,
        slug: "apartament-2",
        title: "APARTAMENT NR 2",
        subtitle: "SALON Z ANEKSEM",
        guests: 4,
        rooms: 2,
        area: 56,
        floor: "II piętro",
        description: "Przestronny salon z aneksem kuchennym. Zaprojektowany z myślą o rodzinach ceniących dobry design.",
        longDescription: `Apartament nr 2 to przestronne wnętrze z wyraźnie wydzieloną strefą dzienną i sypialną. Przestronny salon z wygodną sofą i jadalnią sprawdza się idealnie dla rodzin lub par podróżujących z dziećmi.

W pełni wyposażony aneks kuchenny z indukcją, zmywarką i ekspresem do kawy pozwala na przygotowanie domowych posiłków. Duże okna na II piętrze zapewniają widok na charakterystyczną kamienicę po drugiej stronie ulicy.

Wysoki standard wykończenia, spokój i wygoda — apartament nr 2 to doskonała propozycja dla wymagających rodzin.`,
        price: { weekday: 380, weekend: 460 },
        booking: {
            bookingUrl: "https://booking.com",
            airbnbUrl: "https://airbnb.com",
        },
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1400&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=80&auto=format&fit=crop",
        ],
        amenities: [
            "Szybkie Wi-Fi 100 Mbps",
            "2× Smart TV 55\"",
            "Klimatyzacja",
            "Kuchnia z indukcją i zmywarką",
            "Ekspres i kapsułki do kawy",
            "Pralka i suszarka",
            "Pościel hotelowa (2 sypialne)",
            "Self check-in 24/7",
            "Rozkładana sofa (dodatkowe 2 miejsca)",
        ],
    },
    {
        id: 3,
        slug: "apartament-3",
        title: "APARTAMENT NR 3",
        subtitle: "WNĘTRZE Z HISTORIĄ",
        guests: 3,
        rooms: 2,
        area: 48,
        floor: "I piętro",
        description: "Słoneczne wnętrze z wydzieloną strefą sypialną. Zachowane oryginalne sztukaterie na sufitach.",
        longDescription: `Apartament nr 3 to wyjątkowe połączenie historycznego charakteru kamienicy z nowoczesnym komfortem. Zachowane oryginalne sztukaterie na sufitach przywołują atmosferę dawnego Wrocławia, podczas gdy całe wyposażenie jest współczesne i funkcjonalne.

Jasna sypialnia z oknem wychodzącym na podwórko zapewnia spokojny sen, nawet w centrum miasta. Salon ze strefą jadalną jest idealny do relaksu i spędzania czasu razem.

Apartament polecany dla miłośników architektury i historii, którzy cenią autentyczność wnętrza.`,
        price: { weekday: 320, weekend: 400 },
        booking: {
            bookingUrl: "https://booking.com",
            airbnbUrl: "https://airbnb.com",
        },
        images: [
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1400&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1400&q=80&auto=format&fit=crop",
        ],
        amenities: [
            "Szybkie Wi-Fi 100 Mbps",
            "Smart TV 55\"",
            "Klimatyzacja",
            "W pełni wyposażona kuchnia",
            "Ekspres do kawy",
            "Pościel hotelowa",
            "Oryginalne sztukaterie XIX w.",
            "Self check-in 24/7",
        ],
    },
    {
        id: 4,
        slug: "apartament-4",
        title: "APARTAMENT NR 4",
        subtitle: "FLAGOWY — 2 SYPIALNIE",
        guests: 4,
        rooms: 3,
        area: 72,
        floor: "III piętro",
        description: "Nasz flagowy apartament z dwiema sypialniami. Najwyższy standard wykończenia i pełne wyposażenie.",
        longDescription: `Apartament nr 4 to nasz flagowy lokal — największy i najbardziej luksusowy w kolekcji Kołłątaja 23. Dwie osobne sypialnie, przestronny salon z kuchnią oraz dodatkowa łazienka sprawiają, że jest to idealne rozwiązanie dla dwóch par lub rodziny z dziećmi.

Najwyższe piętro (III) gwarantuje ciszę i wyjątkowy widok na dachy wrocławskich kamienic. Wykończenie w najwyższym standardzie — drewniana podłoga, marmurowe akcenty w łazience i designerskie meble tworzą spójną, elegancką całość.

Jeśli szukasz czegoś wyjątkowego i nie chcesz kompromisów — Apartament nr 4 jest dla Ciebie.`,
        price: { weekday: 480, weekend: 590 },
        booking: {
            bookingUrl: "https://booking.com",
            airbnbUrl: "https://airbnb.com",
        },
        images: [
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1400&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1400&q=80&auto=format&fit=crop",
        ],
        amenities: [
            "Szybkie Wi-Fi 100 Mbps",
            "2× Smart TV 55\"",
            "Klimatyzacja (osobna w każdym pokoju)",
            "Kuchnia z indukcją i zmywarką",
            "Ekspres Nespresso + kapsułki",
            "Pralka i suszarka",
            "2× Pościel hotelowa (sypialnie)",
            "2× Łazienka (prysznic + wanna)",
            "Widok na dachy kamienic",
            "Self check-in 24/7",
        ],
    },
    {
        id: 5,
        slug: "apartament-5",
        title: "APARTAMENT NR 5",
        subtitle: "KAMERALNY Z WIDOKIEM NA PODWÓRKO",
        guests: 2,
        rooms: 1,
        area: 42,
        floor: "II piętro",
        description: "Kameralny apartament z widokiem na wewnętrzne podwórko. Przytulny charakter i pełne wyposażenie.",
        longDescription: `Apartament nr 5 to kameralny lokal o przytulnym charakterze, usytuowany na II piętrze z widokiem na ciche, wewnętrzne podwórko. To idealne miejsce dla par i podróżnych ceniących spokój w sercu Wrocławia.

Starannie dobrane meble i ciepłe barwy wnętrza tworzą atmosferę, w której natychmiast czujesz się jak w domu. Aneks kuchenny jest w pełni wyposażony, a łazienka z prysznicem zachwyca eleganckim wykończeniem.

Apartament nr 5 — cisza i komfort w samym centrum miasta.`,
        price: { weekday: 280, weekend: 360 },
        booking: {
            bookingUrl: "https://booking.com",
            airbnbUrl: "https://airbnb.com",
        },
        images: [
            "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=1400&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1400&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1400&q=80&auto=format&fit=crop",
        ],
        amenities: [
            "Szybkie Wi-Fi 100 Mbps",
            "Smart TV 55\"",
            "Klimatyzacja",
            "W pełni wyposażona kuchnia",
            "Ekspres do kawy",
            "Pościel hotelowa",
            "Ręczniki i kosmetyki",
            "Self check-in 24/7",
        ],
    },
]

// Helper — znajdź apartament po id lub slug
export function getApartmentById(id: number): Apartment | undefined {
    return apartments.find(a => a.id === id)
}

export function getOtherApartments(currentId: number): Apartment[] {
    return apartments.filter(a => a.id !== currentId)
}
