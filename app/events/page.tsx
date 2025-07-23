"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Heart, PartyPopper, Calendar } from "lucide-react"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ASSETS } from "@/lib/assets"

export default function EventsPage() {
  const eventTypes = [
    {
      icon: Building,
      title: "Corporate Events",
      description: "Professional business events, product launches, seminars, and corporate parties with exceptional catering.",
      href: "/corporate-events-varanasi",
      image: ASSETS.hero.hero1,
      features: ["Product Launches", "Business Dinners", "Team Building", "Seminars"]
    },
    {
      icon: Heart,
      title: "Wedding Events",
      description: "Beautiful wedding ceremonies and receptions with traditional and modern catering options.",
      href: "/wedding-events- varanasi",
      image: ASSETS.wedding.wedding1,
      features: ["Wedding Ceremonies", "Receptions", "Sangeet", "Mehendi"]
    },
    {
      icon: PartyPopper,
      title: "Personal Celebrations",
      description: "Birthdays, anniversaries, and special occasions made memorable with our catering services.",
      href: "/personal-events-varanasi",
      image: ASSETS.events.feature1,
      features: ["Birthday Parties", "Anniversaries", "Family Gatherings", "Special Occasions"]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <div className="min-h-screen bg-[#fdfaf5]">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-[#bc9c22] to-[#a08820]">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-serif font-medium text-white mb-6"
            >
              Our <span className="text-yellow-200">Event Services</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed font-light"
            >
              From intimate gatherings to grand celebrations, we bring your vision to life with exceptional planning and catering.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {eventTypes.map((eventType, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={eventType.image}
                      alt={eventType.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=300&width=400&text=Event+Image"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <eventType.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-2xl font-serif font-medium text-gray-900 group-hover:text-[#bc9c22] transition-colors">
                      {eventType.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-600 leading-relaxed font-light">
                      {eventType.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">What We Offer:</h4>
                      <ul className="space-y-1">
                        {eventType.features.map((feature, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center">
                            <Calendar className="w-4 h-4 text-[#bc9c22] mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href={eventType.href}>
                      <Button className="w-full bg-[#bc9c22] hover:bg-[#a08820] text-white font-medium">
                        Learn More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6"
            >
              Ready to Plan Your <span className="text-[#bc9c22]">Perfect Event?</span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8 font-light"
            >
              Contact us today to discuss your event requirements and get a customized quote.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link href="/contact">
                <Button size="lg" className="bg-[#bc9c22] hover:bg-[#a08820] text-white font-semibold px-8 py-6 text-lg">
                  Get Started Today
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <WhatsAppFloat />
    </div>
  )
}
