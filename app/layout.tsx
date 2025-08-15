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
  title: "Anshika Caterers | Best Event Planner in Varanasi",
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
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://acaterers.com",
    siteName: "Anshika Caterers",
    title: "Anshika Caterers | Best Event Planner in Varanasi",
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
    title: "Anshika Caterers | Best Event Planner in Varanasi",
  },
  other: {
    "theme-color": "#bc9c22",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Anshika Caterers",
    "application-name": "Anshika Caterers",
    "msapplication-TileColor": "#bc9c22",
    "msapplication-TileImage": ASSETS.logo,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://acaterers.com/#org",
        "name": "Anshika Caterers",
        "url": "https://acaterers.com",
        "logo": {
          "@type": "ImageObject",
          "url": ASSETS.logo,
        },
        "sameAs": [
          "https://www.instagram.com/anshikacaterers/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://acaterers.com/#website",
        "url": "https://acaterers.com",
        "name": "Anshika Caterers",
        "alternateName": "Anshika Caterers | Best Event Planner in Varanasi",
        "publisher": { "@id": "https://acaterers.com/#org" }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://acaterers.com/#local",
        "name": "Anshika Caterers",
        "description": "Best Event Planner in Varanasi for weddings, proposals, corporate events, and birthday celebrations. 20+ years of culinary excellence.",
        "url": "https://acaterers.com",
        "image": ASSETS.logo,
        "logo": ASSETS.logo,
        "telephone": "+91-9876543210",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Varanasi",
          "addressRegion": "Uttar Pradesh",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "25.3176",
          "longitude": "82.9739"
        },
        "openingHours": "Mo-Su 08:00-22:00",
        "priceRange": "₹₹₹"
      }
    ]
  };

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

        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
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
