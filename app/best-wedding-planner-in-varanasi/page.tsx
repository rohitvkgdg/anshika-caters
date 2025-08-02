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
  robots: "index,follow",
  alternates: {
    canonical: "https://acaterers.com/best-wedding-planner-in-varanasi"
  }
}

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

      {/* Contact Section */}
      <section id="contact">
        <ContactSection />
      </section>

      {/* WhatsApp Float */}
      <WhatsAppFloat />
    </div>
  )
}
