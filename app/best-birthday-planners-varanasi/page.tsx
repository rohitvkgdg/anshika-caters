import { BirthdayHeroSection } from "@/components/birthday/birthday-hero-section"
import { BirthdayFeatures } from "@/components/birthday/birthday-features"
import { BirthdayProcess } from "@/components/birthday/birthday-process"
import { BirthdayGallery } from "@/components/birthday/birthday-gallery"
import { BirthdayTestimonials } from "@/components/birthday/birthday-testimonials"
import { ContactSection } from "@/components/landing/contact-section"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Best Birthday Planner in Varanasi | Anshika Caterers",
    description: "Celebrate in style with the best birthday planner in Varanasi. Anshika Caterers creates magical, customized birthdays with décor, catering and joyful surprises.",
    robots: "index,follow",
    alternates: {
        canonical: "https://acaterers.com/best-birthday-planners-varanasi"
    }
}

export default function BirthdayPlannersVaranasiPage() {
    return (
        <>
            {/* Structured Data for Birthday Service */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Best Birthday Planner in Varanasi | Anshika Caterers",
                        "description": "Celebrate in style with the best birthday planner in Varanasi. Anshika Caterers creates magical, customized birthdays with décor, catering and joyful surprises.",
                        "serviceType": "Birthday Party Planning & Catering",
                        "category": ["kids birthday", "theme parties", "custom cakes"],
                        "url": "https://acaterers.com/best-birthday-planners-varanasi",
                        "areaServed": {
                            "@type": "Place",
                            "name": "Varanasi and nearby"
                        },
                        "image": [
                            "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/birthday/gallery/gallery-1.webp",
                            "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/birthday/gallery/gallery-3.webp",
                            "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/birthday/gallery/gallery-4.webp",
                            "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/birthday/gallery/gallery-5.webp"
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

                {/* Contact Section */}
                <section id="contact">
                    <ContactSection category="Birthday Party Planning" />
                </section>

                <WhatsAppFloat />
            </div>
        </>
    )
}
