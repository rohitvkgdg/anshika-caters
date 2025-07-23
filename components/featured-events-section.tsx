"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import FlowingMenu from "@/components/ui/FlowingMenu"
import { ASSETS } from "@/lib/assets"

export function FeaturedEventsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const featuredEvents = [
    {
      link: "/destination-weddings",
      text: "Destination Weddings",
      image: ASSETS.events.feature1
    },
    {
      link: "/ghat-side-weddings",
      text: "Ghat Side Weddings",
      image: ASSETS.events.feature2
    },
    {
      link: "/royal-weddings",
      text: "Royal Weddings",
      image: ASSETS.events.feature3
    },
    {
      link: "/classic-weddings",
      text: "Classic Weddings",
      image: ASSETS.events.feature4
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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
    <section className="py-12 sm:py-16 md:py-20 bg-[#021631] text-white" ref={ref}>
      <div className="flex flex-col mx-0 w-full px-0">
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12 px-4"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          data-animate
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 sm:mb-6 drop-shadow-lg leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            data-animate
          >
            Featured{" "}
            <motion.span
              className="text-[#bc9c22] bg-gradient-to-r from-[#bc9c22] to-[#d4af37] bg-clip-text text-transparent drop-shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Events
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto drop-shadow-sm leading-relaxed px-2 font-sans font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            data-animate
          >
            From intimate celebrations to grand corporate gatherings, we create memorable experiences for every occasion.
          </motion.p>
        </motion.div>

        <motion.div
          className="w-full h-[60vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] xl:h-[70vh] overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          data-animate
        >
          <FlowingMenu items={featuredEvents} />
        </motion.div>
      </div>
    </section>
  )
}
