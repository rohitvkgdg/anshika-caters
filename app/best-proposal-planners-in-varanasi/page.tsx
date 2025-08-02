import { ProposalHeroSection } from "@/components/proposal/proposal-hero-section"
import { ProposalTypes } from "@/components/proposal/proposal-types"
import { ProposalFeatures } from "@/components/proposal/proposal-features"
import { ProposalTestimonials } from "@/components/proposal/proposal-testimonials"
import { ProposalCTA } from "@/components/proposal/proposal-cta"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import type { Metadata } from "next"

export const metadata: Metadata = {
    robots: "index,follow",
    alternates: {
        canonical: "https://acaterers.com/best-proposal-planners-in-varanasi"
    }
}

export default function BestProposalPlannersInVaranasiPage() {
    return (
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

            {/* Final CTA */}
            <section id="cta">
                <ProposalCTA />
            </section>

            <WhatsAppFloat />
        </div>
    )
}
