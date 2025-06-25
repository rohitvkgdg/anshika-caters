"use client"

import { Button } from "@/components/ui/button"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import SpotlightCard from "@/components/ui/SpotlightCard"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      image: "/wedding-1.webp",
      title: "Personal Events",
      description: "Tailored menus for weddings, anniversaries, and family gatherings. Celebrate with flavors that resonate.",
      features: ["Traditional Indian Cuisine", "Fusion Delicacies", "Live Cooking Stations", "Custom Desserts"],
    },
    {
      image: "/stack-1.webp",
      title: "Corporate Events",
      description: "Elegant catering for conferences, product launches, and corporate parties. Impress your guests with our gourmet offerings.",
      features: ["Business Lunches", "Cocktail Receptions", "Themed Buffets", "Custom Branding Options"],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.68, -0.55, 0.265, 1.55] as const,
      },
    },
  }

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-serif text-[#021631] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            Curated{" "}
            <motion.span
              className="text-[#bc9c22]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Culinary Experiences
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            From traditional Indian delicacies to international gourmet cuisine, we craft menus that reflect your unique
            taste and style.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
                <SpotlightCard 
                  spotlightColor="rgba(188, 156, 34, 0.4)" 
                  className="h-full"
                >
                  <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col"
                  >
                    {/* Image Section - Responsive */}
                    <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg overflow-hidden">
                      <img 
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover rounded-lg"
                      />
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1 p-4 sm:p-6 flex flex-col">
                      <h3 className="text-lg sm:text-xl font-serif text-[#021631] mb-3">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <Badge 
                            key={idx} 
                            variant="secondary" 
                            className="bg-[#bc9c22]/10 text-[#021631] hover:bg-[#bc9c22]/20 transition-colors duration-300 text-xs sm:text-sm"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center space-y-4 items-center flex flex-col md:flex-row justify-center md:space-x-4 md:space-y-0"
          variants={buttonVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-full md:w-auto"
          >
            <Link href="/menu-builder" className="w-full md:w-auto">
              <InteractiveHoverButton className="bg-[#bc9c22] hover:bg-[#a08820] text-white text-center border-[#bc9c22] font-semibold px-8 py-3 shadow-lg h-12 w-full md:w-auto">
          Build Your Menu
              </InteractiveHoverButton>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-full md:w-auto"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-[#021631] text-[#021631] hover:bg-[#021631] hover:text-white px-8 shadow-lg h-12 w-full md:w-auto"
              asChild
            >
              <Link href="/budget-calculator">Calculate Budget</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
