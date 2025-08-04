import { HeroSection } from "@/components/landing/hero-section"
import { SocialProof } from "@/components/landing/social-proof"
import { ServicesSection } from "@/components/landing/services-section"
import { FeaturedEventsSection } from "@/components/landing/featured-events-section"
import { ProcessSection } from "@/components/landing/process-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { GallerySection } from "@/components/landing/gallery-section"
import { ContactSection } from "@/components/landing/contact-section"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Event Planner in Varanasi | Anshika Caterers",
  description: "Anshika Caterers is the best event planner in Varanasi for weddings, proposals, and corporate events. Trusted for flawless execution and luxury experiences.",
  robots: "index,follow",
  alternates: {
    canonical: "https://acaterers.com"
  },
  openGraph: {
    title: "Anshika Caterers - Best Event Planner in Varanasi",
    description: "Anshika Caterers is the best event planner in Varanasi for weddings, proposals, and corporate events. Trusted for flawless execution and luxury experiences.",
    url: "https://acaterers.com",
    siteName: "Anshika Caterers",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/landing/AC.png",
        width: 1200,
        height: 630,
        alt: "Anshika Caterers Logo - Best Event Planner in Varanasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anshika Caterers - Best Event Planner in Varanasi",
    description: "Anshika Caterers is the best event planner in Varanasi for weddings, proposals, and corporate events. Trusted for flawless execution and luxury experiences.",
    images: ["https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/landing/AC.png"],
  },
}

export default function HomePage() {
  return (
    <>
      {/* Structured Data for LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "EventService"],
            "name": "Anshika Caterers",
            "description": "Your Dream Events Seamlessly Crafted. 20+ years of excellence, 1000+ events across India. Premium event management services.",
            "url": "https://acaterers.com",
            "logo": "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/landing/AC.png",
            "image": [
              "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/landing/AC.png",
              "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/landing/wedding-1.webp",
              "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/landing/stack-1.webp"
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "C-32/47, Vidya Vihar Colony, Chandua Chhittupur, Shivpurwa",
              "addressLocality": "Varanasi",
              "addressRegion": "Uttar Pradesh",
              "postalCode": "221002",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 25.309681660383266,
              "longitude": 82.97446417870087
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-7311129675",
              "email": "anshika@acaterers.com",
              "contactType": "Customer Service",
              "availableLanguage": ["en", "hi"]
            },
            "telephone": "+91-7311129675",
            "email": "anshika@acaterers.com",
            "openingHours": "Mo-Su 00:00-23:59",
            "areaServed": {
              "@type": "Place",
              "name": "Varanasi and nearby areas"
            },
            "sameAs": [
              "https://www.instagram.com/anshikacaterers/"
            ]
          })
        }}
      />

      {/* Structured Data for WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Anshika Caterers",
            "url": "https://acaterers.com"
          })
        }}
      />

      <div className="min-h-screen bg-[#021631]">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* Social Proof */}
        <SocialProof />

        {/* Services */}
        <section id="services">
          <ServicesSection />
        </section>

        {/* Featured Events */}
        <section id="featured-events">
          <FeaturedEventsSection />
        </section>

        {/* Process */}
        <section id="process">
          <ProcessSection />
        </section>

        {/* Gallery */}
        <section id="gallery">
          <GallerySection />
        </section>

        {/* Testimonials */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>

        {/* Contact */}
        <section id="contact">
          <ContactSection category="General Event Planning" />
        </section>

        {/* WhatsApp Float */}
        <WhatsAppFloat />
      </div>
    </>
  )
}
