import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Toaster } from "sonner"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://interior-ai-xi.vercel.app"),
  title: {
    default: "Décoriai — Rediseña tu hogar con IA",
    template: "%s",
  },
  description:
    "Sube una foto de tu habitación, elige un estilo y obtén el rediseño en segundos. Powered by AI.",
  keywords: [
    "diseño de interiores",
    "inteligencia artificial",
    "rediseño hogar",
    "IA decoración",
    "interior design AI",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Décoriai — Rediseña tu hogar con IA",
    description:
      "Sube una foto de tu habitación, elige un estilo y obtén el rediseño en segundos.",
    type: "website",
    siteName: "Décoriai",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Décoriai — Rediseña tu hogar con IA",
    description:
      "Sube una foto de tu habitación, elige un estilo y obtén el rediseño en segundos.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster richColors position="top-right" />
        <Analytics />
      </body>
    </html>
  )
}
