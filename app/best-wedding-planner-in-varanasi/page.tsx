import { WeddingHeroSection } from "@/components/wedding/wedding-hero-section"
import { WeddingCeremonies } from "@/components/wedding/wedding-ceremonies"
import { WeddingWhyChooseUs } from "@/components/wedding/wedding-why-choose-us"
import { WeddingGalleryShowcase } from "@/components/wedding/wedding-gallery-showcase"
import { WeddingProcess } from "@/components/wedding/wedding-process"
import { WeddingTestimonials } from "@/components/wedding/wedding-testimonials"
import { WeddingFAQ } from "@/components/wedding/wedding-faq"
import { ContactSection } from "@/components/landing/contact-section"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Wedding Planner in Varanasi | Anshika Caterers",
  description: "Anshika Caterers is the best wedding planner in Varanasi. We provide complete planning, décor, catering, and on-site coordination for unforgettable celebrations.",
  robots: "index,follow",
  alternates: {
    canonical: "https://acaterers.com/best-wedding-planner-in-varanasi"
  }
}

export default function BestWeddingPlannerVaranasiPage() {
  return (
    <>
      {/* Structured Data for Wedding Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Best Wedding Planner in Varanasi | Anshika Caterers",
            "description": "Anshika Caterers is the best wedding planner in Varanasi. We provide complete planning, décor, catering, and on-site coordination for unforgettable celebrations.",
            "serviceType": "Wedding Planning & Catering",
            "category": ["Indian weddings", "Destination weddings", "Full-service catering"],
            "url": "https://acaterers.com/best-wedding-planner-in-varanasi",
            "areaServed": {
              "@type": "Place",
              "name": "Varanasi and nearby"
            },
            "image": [
              "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/wedding/ganesh-pooja.webp",
              "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/wedding/Varmala.webp",
              "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/wedding/Pheraa.webp"
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

      <div className="min-h-screen bg-[#021631]">
        {/* Hero Section with Form */}
        <section id="hero">
          <WeddingHeroSection />
        </section>

        {/* Wedding Ceremonies Section */}
        <section id="ceremonies">
          <WeddingCeremonies />
        </section>

        {/* Why Choose Us */}
        <section id="why-choose-us">
          <WeddingWhyChooseUs />
        </section>

        {/* Gallery */}
        <section id="gallery">
          <WeddingGalleryShowcase />
        </section>

        {/* How It Works */}
        <section id="process">
          <WeddingProcess />
        </section>

        {/* Testimonials */}
        <section id="testimonials">
          <WeddingTestimonials />
        </section>

        {/* FAQ */}
        <section id="faq">
          <WeddingFAQ />
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
