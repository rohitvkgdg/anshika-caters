import { ProposalHeroSection } from "@/components/proposal/proposal-hero-section"
import { ProposalTypes } from "@/components/proposal/proposal-types"
import { ProposalFeatures } from "@/components/proposal/proposal-features"
import { ProposalTestimonials } from "@/components/proposal/proposal-testimonials"
import { ContactSection } from "@/components/landing/contact-section"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Best Proposal Planner in Varanasi | Anshika Caterers",
    description: "Anshika Caterers is the best proposal planner in Varanasi. We craft magical, personalized setups that turn \"Will you?\" into a cinematic and unforgettable moment.",
    robots: "index,follow",
    alternates: {
        canonical: "https://acaterers.com/best-proposal-planners-in-varanasi"
    }
}

export default function BestProposalPlannersInVaranasiPage() {
    return (
        <>
            {/* Structured Data for Proposal Service */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Best Proposal Planner in Varanasi | Anshika Caterers",
                        "description": "Anshika Caterers is the best proposal planner in Varanasi. We craft magical, personalized setups that turn 'Will you?' into a cinematic and unforgettable moment.",
                        "serviceType": "Proposal Planning & Surprise Event Setup",
                        "category": ["romantic proposals", "destination proposal setup", "surprise planning", "drone shows", "ghat proposals"],
                        "url": "https://acaterers.com/best-proposal-planners-in-varanasi",
                        "areaServed": {
                            "@type": "Place",
                            "name": "Varanasi and nearby"
                        },
                        "image": [
                            "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/corporate-images/Corporate-event-decor.webp",
                            "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/proposal/a-film-a-game.webp",
                            "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/proposal/drone-show.webp",
                            "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev/proposal/ghat-sunset.webp"
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
                    <ProposalHeroSection />
                </section>

                {/* Proposal Types */}
                <section id="proposal-types">
                    <ProposalTypes />
                </section>

                {/* Features - Why Choose Us */}
                <section id="features">
                    <ProposalFeatures />
                </section>

                {/* Testimonials */}
                <section id="testimonials">
                    <ProposalTestimonials />
                </section>

                {/* Contact Section */}
                <section id="contact">
                    <ContactSection category="Proposal Planning" />
                </section>

                <WhatsAppFloat />
            </div>
        </>
    )
}
