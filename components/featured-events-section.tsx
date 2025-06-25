"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import FlowingMenu from "@/components/ui/FlowingMenu"

export function FeaturedEventsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const featuredEvents = [
    {
      link: "/destination-weddings",
      text: "Destination Weddings",
      image: "/feature-events-1.webp"
    },
    {
      link: "/ghat-side-weddings",
      text: "Ghat Side Weddings",
      image: "/feature-events-2.webp"
    },
    {
      link: "/royal-weddings",
      text: "Royal Weddings",
      image: "/feature-events-3.webp"
    },
    {
      link: "/classic-weddings",
      text: "Classic Weddings",
      image: "/feature-events-4.webp"
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
    <section className="py-20 bg-gradient-to-br from-[#021631] to-[#1a365d] text-white" ref={ref}>
      <div className="flex flex-col mx-0 w-full px-0">
        <motion.div
          className="text-center mb-12"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-serif text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            Featured{" "}
            <motion.span
              className="text-[#bc9c22] bg-gradient-to-r from-[#bc9c22] to-[#d4af37] bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Events
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            From intimate celebrations to grand corporate gatherings, we create memorable experiences for every occasion.
          </motion.p>
        </motion.div>

        <motion.div
          className="w-full h-[60vh] overflow-hidden shadow-2xl bg-gradient-to-br from-[#bc9c22] to-[#d4af37]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <FlowingMenu items={featuredEvents} />
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Hover over each event type to discover our specialized catering solutions tailored for your unique needs.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
