"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Carousel from "@/components/ui/carousel"
import { ASSETS } from "@/lib/assets"

export function WeddingGalleryShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const slides = [
    {
      title: "",
      button: "",
      src: ASSETS.weddingPlanning.gallery1,
    },
    {
      title: "",
      button: "",
      src: ASSETS.weddingPlanning.gallery2,
    },
    {
      title: "",
      button: "",
      src: ASSETS.weddingPlanning.gallery3,
    },
    {
      title: "",
      button: "",
      src: ASSETS.weddingPlanning.gallery4,
    },
    {
      title: "",
      button: "",
      src: ASSETS.weddingPlanning.gallery5,
    },
    {
      title: "",
      button: "",
      src: ASSETS.weddingPlanning.gallery6,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
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

  return (
    <section className="bg-[#021631] py-16 sm:py-20 md:py-24" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            A Few Moments From Our{" "}
            <motion.span
              className="text-[#bc9c22] bg-gradient-to-r from-[#bc9c22] to-[#d4af37] bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Weddings
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Every wedding tells a unique story. Here are glimpses from celebrations where love, tradition, and joy came together beautifully.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative max-w-5xl mb-10 mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Carousel slides={slides} />
        </motion.div>
      </div>
    </section>
  )
} 