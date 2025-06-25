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
    <div className="min-h-screen bg-[#fdfaf5]">
      {/* Hero Section */}
      <HeroSection />

      {/* Social Proof */}
      <SocialProof />

      {/* Services */}
      <ServicesSection />

      {/* Featured Events */}
      <FeaturedEventsSection />

      {/* Process */}
      <ProcessSection />

      {/* Gallery */}
      <GallerySection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Contact */}
      <ContactSection />

      {/* WhatsApp Float */}
      <WhatsAppFloat />
    </div>
  )
}
