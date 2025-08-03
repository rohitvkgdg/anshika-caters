import { CorporateHeroSection } from "@/components/corporate/corporate-hero-section"
import { CorporateWhyChooseUs } from "@/components/corporate/corporate-why-choose-us"
import { CorporateEventTypes } from "@/components/corporate/corporate-event-types"
import { CorporateGalleryShowcase } from "@/components/corporate/corporate-gallery-showcase"
import { CorporateProcess } from "@/components/corporate/corporate-process"
import { CorporateTestimonials } from "@/components/corporate/corporate-testimonials"
import { CorporateFAQ } from "@/components/corporate/corporate-faq"
import { ContactSection } from "@/components/landing/contact-section"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Corporate Event Planner in Varanasi | Anshika Caterers",
  description: "Anshika Caterers is the best corporate event planner in Varanasi. We offer expert planning, custom catering, and flawless execution for business gatherings.",
  robots: "index,follow",
  alternates: {
    canonical: "https://acaterers.com/corporate-events-varanasi"
  }
}

export default function CorporateEventsVaranasiPage() {
  return (
    <>
      {/* Structured Data for Corporate Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Best Corporate Event Planner in Varanasi | Anshika Caterers",
            "description": "Anshika Caterers is the best corporate event planner in Varanasi. We offer expert planning, custom catering, and flawless execution for business gatherings.",
            "serviceType": "Corporate Event Planning & Catering",
            "category": ["corporate catering", "business events", "product launch event", "team offsite decor"],
            "url": "https://acaterers.com/best-corporate-events-planners-in-varanasi",
            "areaServed": {
              "@type": "Place",
              "name": "Varanasi and nearby"
            },
            "image": [
              "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/corporate-images/hero-v.webp",
              "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/corporate-images/Corporate-Parties.webp",
              "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/corporate-images/Corporate-event-decor.webp"
            ],
            "provider": {
              "@type": ["LocalBusiness", "EventService"],
              "name": "Anshika Caterers",
              "url": "https://acaterers.com",
              "logo": "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/landing/AC.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "C-32/47, Vidya Vihar Colony, Chandua Chhittupur, Shivpurwa",
                "addressLocality": "Varanasi",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "221002",
                "addressCountry": "IN"
              },
              "telephone": "+91-7311129675",
              "email": "anshika@acaterers.com",
              "openingHours": "Mo-Su 00:00-23:59",
              "areaServed": {
                "@type": "Place",
                "name": "Varanasi and nearby areas"
              }
            }
          })
        }}
      />

      <div className="min-h-screen bg-[#fdfaf5]">
        {/* Hero Section with Form */}
        <section id="hero">
          <CorporateHeroSection />
        </section>

        {/* Why Choose Us */}
        <section id="why-choose-us">
          <CorporateWhyChooseUs />
        </section>

        {/* Corporate Event Types */}
        <section id="event-types">
          <CorporateEventTypes />
        </section>

        {/* Gallery */}
        <section id="gallery">
          <CorporateGalleryShowcase />
        </section>

        {/* How It Works */}
        <section id="process">
          <CorporateProcess />
        </section>

        {/* Testimonials */}
        <section id="testimonials">
          <CorporateTestimonials />
        </section>

        {/* FAQ */}
        <section id="faq">
          <CorporateFAQ />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>

        {/* WhatsApp Float */}
        <WhatsAppFloat />
      </div>
    </>
  )
}
