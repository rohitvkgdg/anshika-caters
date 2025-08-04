import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Cinzel } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { LoadingProvider } from "@/components/loading-context"
import { ClientLayout } from "@/components/client-layout"
import { ASSETS } from "@/lib/assets"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const cinzel = Cinzel({
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
  metadataBase: new URL('https://acaterers.com'),
  applicationName: "Anshika Caterers",
  authors: [{ name: "Anshika Caterers" }],
  creator: "Anshika Caterers",
  publisher: "Anshika Caterers",
  robots: "index,follow",
  icons: {
    icon: [
      { url: ASSETS.logo, sizes: "16x16", type: "image/png" },
      { url: ASSETS.logo, sizes: "32x32", type: "image/png" },
      { url: ASSETS.logo, sizes: "48x48", type: "image/png" },
      { url: ASSETS.logo, sizes: "64x64", type: "image/png" },
      { url: ASSETS.logo, sizes: "128x128", type: "image/png" },
      { url: ASSETS.logo, sizes: "256x256", type: "image/png" },
    ],
    apple: [
      { url: ASSETS.logo, sizes: "120x120", type: "image/png" },
      { url: ASSETS.logo, sizes: "152x152", type: "image/png" },
      { url: ASSETS.logo, sizes: "180x180", type: "image/png" },
    ],
    shortcut: { url: ASSETS.logo, type: "image/png" },
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://acaterers.com",
    siteName: "Anshika Caterers",
    title: "Anshika Caterers - Best Caterers In Varanasi",
    description: "Your Dream Wedding Seamlessly Crafted. 20+ years of culinary excellence, 1000+ weddings across India. Premium event catering services.",
    images: [
      {
        url: ASSETS.logo,
        width: 1200,
        height: 630,
        alt: "Anshika Caterers Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AnshikaCaterers",
    creator: "@AnshikaCaterers",
  },
  other: {
    "theme-color": "#bc9c22",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Anshika Caterers",
    "application-name": "Anshika Caterers",
    "msapplication-TileColor": "#bc9c22",
    "msapplication-TileImage": "ASSETS.logo",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="no-horizontal-overflow">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PSZ3Q73F');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${cinzel.variable} font-sans no-horizontal-overflow`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PSZ3Q73F"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <LoadingProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </LoadingProvider>
      </body>
    </html>
  )
}
