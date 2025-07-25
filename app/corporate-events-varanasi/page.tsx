import { CorporateHeroSection } from "@/components/corporate-hero-section"
import { CorporateWhyChooseUs } from "@/components/corporate-why-choose-us"
import { CorporateEventTypes } from "@/components/corporate-event-types"
import { CorporateGalleryShowcase } from "@/components/corporate-gallery-showcase"
import { CorporateProcess } from "@/components/corporate-process"
import { CorporateTestimonials } from "@/components/corporate-testimonials"
import { CorporateFAQ } from "@/components/corporate-faq"
import { CorporateCTA } from "@/components/corporate-cta"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function CorporateEventsVaranasiPage() {
  return (
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

      {/* Final CTA */}
      <section id="cta">
        <CorporateCTA />
      </section>

      {/* WhatsApp Float */}
      <WhatsAppFloat />
    </div>
  )
}
