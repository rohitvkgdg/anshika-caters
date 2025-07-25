import { HeroSection } from "@/components/hero-section"
import { SocialProof } from "@/components/social-proof"
import { ServicesSection } from "@/components/services-section"
import { FeaturedEventsSection } from "@/components/featured-events-section"
import { ProcessSection } from "@/components/process-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactSection } from "@/components/contact-section"
import { WhatsAppFloat } from "@/components/whatsapp-float"

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
