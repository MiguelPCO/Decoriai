import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Toaster } from "sonner"
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
  title: "Décoriai — Rediseña tu hogar con IA",
  description:
    "Sube una foto de tu habitación, elige un estilo y obtén el rediseño en segundos. Powered by AI.",
  openGraph: {
    title: "Décoriai — Rediseña tu hogar con IA",
    description:
      "Sube una foto de tu habitación, elige un estilo y obtén el rediseño en segundos.",
    type: "website",
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
      </body>
    </html>
  )
}
