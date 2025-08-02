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
  robots: "index,follow",
  alternates: {
    canonical: "https://acaterers.com"
  }
}

export default function HomePage() {
  return (
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
        <ContactSection />
      </section>

      {/* WhatsApp Float */}
      <WhatsAppFloat />
    </div>
  )
}
