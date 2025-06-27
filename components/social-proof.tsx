"use client"

import { Award, Users, Calendar, Star } from 'lucide-react'
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function SocialProof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { icon: Calendar, number: "20+", label: "Years of Culinary Excellence" },
    { icon: Users, number: "1000+", label: "Events Across India" },
    { icon: Award, number: "50+", label: "Luxury Venue Partners" },
    { icon: Star, number: "4.9", label: "Average Client Rating" },
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
    hidden: { opacity: 0, y: 50, scale: 0.8 },
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

  const numberVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "backOut" as const,
        delay: 0.2,
      },
    },
  }

  return (
    <section id="social-proof" className="py-16 bg-[#021631] text-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group cursor-pointer"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-8 h-8 text-[#bc9c22] mx-auto mb-4 group-hover:text-white transition-colors duration-300" />
              </motion.div>
              
              <motion.div
                className="text-3xl md:text-4xl font-bold text-[#bc9c22] mb-2"
                variants={numberVariants}
              >
                {stat.number}
              </motion.div>
              
              <motion.div
                className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
