"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { MessageCircle, FileText, CheckCircle, Heart } from "lucide-react"

export function WeddingProcess() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = [
    {
      icon: MessageCircle,
      number: "1",
      title: "Tell Us Your Vision",
      description: "We understand your traditions, preferences, and budget — and listen to what matters most."
    },
    {
      icon: FileText,
      number: "2", 
      title: "Receive Your Custom Plan",
      description: "We send you a tailored proposal — with ideas, costing, menus, and timelines."
    },
    {
      icon: CheckCircle,
      number: "3",
      title: "Confirm & Prepare", 
      description: "We begin coordination — site visits, vendor booking, menus, décor mockups, and everything in between."
    },
    {
      icon: Heart,
      number: "4",
      title: "Enjoy a Flawless Celebration",
      description: "We're with you till the last ritual is complete. You enjoy the moments. We handle the rest."
    }
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

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  return (
    <section className="bg-[#021631]" ref={ref}>
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
            How We{" "}
            <motion.span
              className="text-[#bc9c22] bg-gradient-to-r from-[#bc9c22] to-[#d4af37] bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Work
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            From your first call to the final farewell, we guide you through every step of creating your perfect wedding celebration.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative group"
              variants={stepVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative bg-gradient-to-br from-[#0d223d] to-[#1a2d44] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-[#bc9c22]/20 hover:border-[#bc9c22]/40">
                {/* Step Number */}
                <motion.div
                  className="absolute -top-4 -left-4 w-12 h-12 bg-[#bc9c22] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6, type: "spring" }}
                >
                  {step.number}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="mb-6 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#bc9c22]/20 rounded-xl group-hover:bg-[#bc9c22]/30 transition-colors duration-300">
                    <step.icon className="w-8 h-8 text-[#bc9c22]" />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                >
                  <h3 className="text-xl sm:text-2xl font-serif text-white mb-4 group-hover:text-[#bc9c22] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-light">
                    {step.description}
                  </p>
                </motion.div>

                {/* Connecting Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#bc9c22] to-transparent" />
                )}

                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#bc9c22]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 