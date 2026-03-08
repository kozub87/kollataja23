import { apartments, getApartmentById, getOtherApartments } from "@/lib/apartments"
import { notFound } from "next/navigation"
import { ApartamentDetail } from "@/components/sections/ApartamentDetail"

// Pre-render all 4 apartment pages at build time
export function generateStaticParams() {
    return apartments.map(a => ({ id: String(a.id) }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const apt = getApartmentById(Number(id))
    if (!apt) return { title: "Nie znaleziono" }
    return {
        title: `${apt.title} — Kołłątaja 23, Wrocław`,
        description: apt.description,
    }
}

export default async function ApartamentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const apt = getApartmentById(Number(id))
    if (!apt) return notFound()

    const others = getOtherApartments(apt.id)

    return <ApartamentDetail apartment={apt} others={others} />
}
