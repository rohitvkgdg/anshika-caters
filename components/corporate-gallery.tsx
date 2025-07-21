"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card } from "@/components/ui/card"
import { ASSETS } from "@/lib/assets"

export function CorporateGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const galleryImages = [
    {
      src: ASSETS.corporate.gourmetBuffet,
      alt: "Gourmet buffet counters",
      title: "Gourmet Buffet Counters"
    },
    {
      src: ASSETS.corporate.guestsServed,
      alt: "Guests being served",
      title: "Professional Service"
    },
    {
      src: ASSETS.corporate.logoMocktail,
      alt: "Logo-branded mocktail stations",
      title: "Branded Mocktail Stations"
    },
    {
      src: ASSETS.corporate.corporateDecor,
      alt: "Corporate event décor",
      title: "Corporate Event Décor"
    },
    {
      src: ASSETS.corporate.staffServing,
      alt: "Staff in uniform serving dignitaries",
      title: "Professional Staff Service"
    },
    {
      src: ASSETS.corporate.networking,
      alt: "Guests networking at corporate event",
      title: "Corporate Networking Setup"
    }
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6"
          >
            Corporate Event <span className="text-[#bc9c22]">Gallery</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Showcasing our professional corporate event setups and catering excellence
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((image, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=400&width=600&text=Corporate+Gallery"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-lg drop-shadow-lg">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
