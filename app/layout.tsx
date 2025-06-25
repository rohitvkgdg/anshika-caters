import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
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
  title: "Anshika Caters - Premium Wedding & Luxury Event Catering",
  description:
    "Your Dream Wedding Seamlessly Crafted. 20+ years of culinary excellence, 1000+ weddings across India. Premium wedding catering services.",
  keywords:
    "wedding catering, luxury events, Indian wedding catering, premium catering services, Mumbai wedding caterers",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${playfairSerif.variable} font-sans`}>
        <LoadingProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </LoadingProvider>
      </body>
    </html>
  )
}
