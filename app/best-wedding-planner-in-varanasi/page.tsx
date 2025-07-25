"use client"

import { WeddingHeroSection } from "@/components/wedding-hero-section"
import { WeddingCeremonies } from "@/components/wedding-ceremonies"
import { WeddingWhyChooseUs } from "@/components/wedding-why-choose-us"
import { WeddingGalleryShowcase } from "@/components/wedding-gallery-showcase"
import { WeddingProcess } from "@/components/wedding-process"
import { WeddingTestimonials } from "@/components/wedding-testimonials"
import { WeddingFAQ } from "@/components/wedding-faq"
import { WeddingCTA } from "@/components/wedding-cta"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function BestWeddingPlannerVaranasiPage() {
  return (
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

      {/* Final CTA */}
      <section id="cta">
        <WeddingCTA />
      </section>

      {/* WhatsApp Float */}
      <WhatsAppFloat />
    </div>
  )
}
