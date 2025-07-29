import { BirthdayHeroSection } from "@/components/birthday/birthday-hero-section"
import { BirthdayFeatures } from "@/components/birthday/birthday-features"
import { BirthdayProcess } from "@/components/birthday/birthday-process"
import { BirthdayGallery } from "@/components/birthday/birthday-gallery"
import { BirthdayTestimonials } from "@/components/birthday/birthday-testimonials"
import { BirthdayCTA } from "@/components/birthday/birthday-cta"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function BirthdayPlannersVaranasiPage() {
    return (
        <div className="min-h-screen bg-[#fdfaf5]">
            {/* Hero Section with Form */}
            <section id="hero">
                <BirthdayHeroSection />
            </section>

            {/* What We Bring to the Party */}
            <section id="features">
                <BirthdayFeatures />
            </section>

            {/* How It Works */}
            <section id="process">
                <BirthdayProcess />
            </section>

            {/* Gallery */}
            <section id="gallery">
                <BirthdayGallery />
            </section>

            {/* Testimonials */}
            <section id="testimonials">
                <BirthdayTestimonials />
            </section>

            {/* Final CTA */}
            <section id="cta">
                <BirthdayCTA />
            </section>

            <WhatsAppFloat />
        </div>
    )
}
