import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import "./globals.css"
import { LoadingProvider } from "@/components/loading-context"
import { ClientLayout } from "@/components/client-layout"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfairSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Anshika Caterers - Best Caterers In Varanasi",
  description:
    "Your Dream Wedding Seamlessly Crafted. 20+ years of culinary excellence, 1000+ weddings across India. Premium event catering services.",
  keywords:
    "wedding catering, luxury events, Indian wedding catering, premium catering services, Mumbai wedding caterers",
  icons: {
    icon: [
      { url: "/AC.png", sizes: "16x16", type: "image/png" },
      { url: "/AC.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/AC.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="no-horizontal-overflow">
      <body className={`${playfair.variable} ${playfairSerif.variable} font-sans no-horizontal-overflow`}>
        <LoadingProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </LoadingProvider>
      </body>
    </html>
  )
}
