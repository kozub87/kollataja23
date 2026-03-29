import type { Metadata } from "next";
import { Bricolage_Grotesque, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AgentationSetup } from "@/components/AgentationSetup";
import "./globals.css";

const fontSans = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const siteUrl = "https://kollataja23.pl"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kołłątaja 23 — Apartamenty we Wrocławiu",
    template: "%s | Kołłątaja 23 Wrocław",
  },
  description: "Nowoczesne, wyciszone apartamenty w zabytkowej kamienicy 400m od Dworca Głównego we Wrocławiu. 9.7/10 na Booking.com. Self check-in 24/7.",
  keywords: ["apartamenty Wrocław", "noclegi Wrocław centrum", "apartament Kołłątaja", "wynajem krótkoterminowy Wrocław", "apartamenty Wrocław Booking"],
  authors: [{ name: "Kołłątaja 23" }],
  creator: "Kołłątaja 23",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: siteUrl,
    siteName: "Kołłątaja 23 Apartamenty",
    title: "Kołłątaja 23 — Apartamenty we Wrocławiu",
    description: "Nowoczesne, wyciszone apartamenty w zabytkowej kamienicy 400m od Dworca Głównego we Wrocławiu. 9.7/10 na Booking.com.",
    images: [
      {
        url: "/Hero.png",
        width: 1200,
        height: 630,
        alt: "Kołłątaja 23 — Apartamenty we Wrocławiu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kołłątaja 23 — Apartamenty we Wrocławiu",
    description: "Nowoczesne, wyciszone apartamenty w zabytkowej kamienicy 400m od Dworca Głównego we Wrocławiu.",
    images: ["/Hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontSerif.variable} antialiased bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <div className="flex flex-col min-h-screen">
            {children}
            <AgentationSetup />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
