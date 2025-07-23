"use client"

import { MessageCircle, Menu, ChefHat, PartyPopper } from 'lucide-react'
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = [
    {
      icon: MessageCircle,
      title: "Share Your Vision",
      description: "Tell us about your event — whether it’s a wedding or corporate gathering. We’ll understand your goals, style, and preferences.",
    },
    {
      icon: Menu,
      title: "Design the Experience",
      description: "We craft a personalized event plan, covering everything from themes and décor to logistics, entertainment, and catering.",
    },
    {
      icon: ChefHat,
      title: "Confirm & Prepare",
      description: "Once you're happy with the plan, we finalize the details and coordinate everything behind the scenes — so you don’t have to.",
    },
    {
      icon: PartyPopper,
      title: "Enjoy Your Perfect Event",
      description: "Relax and celebrate while we bring your event to life — flawlessly executed, beautifully styled, and unforgettable.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const stepVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: "easeInOut" as const,
        delay: 0.5,
      },
    },
  }

  return (
    <section className="py-20 bg-[#021631] text-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            How{" "}
            <motion.span
              className="text-[#bc9c22]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              It Works
            </motion.span>
          </h2>
          <motion.p
            className="text-lg text-gray-300 max-w-3xl mx-auto font-sans font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Our all-in-one event planning process ensures every detail — from décor to dining — is handled with care and creativity.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center bg-[#0d223d] p-4 rounded-lg relative group"
              variants={stepVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative mb-6">
                <motion.div
                  className="w-20 h-20 bg-[#bc9c22] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <step.icon className="w-10 h-10 text-[#021631] group-hover:text-[#bc9c22] transition-colors duration-300" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-3 -right-2 w-8 h-8 bg-white text-[#021631] rounded-full flex items-center justify-center text-sm font-medium"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4, type: "spring" }}
                  whileHover={{ scale: 1.2 }}
                >
                  {index + 1}
                </motion.div>
              </div>
              
              <motion.h3
                className="text-xl font-serif mb-4 text-[#bc9c22] group-hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {step.title}
              </motion.h3>
              
              <motion.p
                className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300 font-sans font-light"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                {step.description}
              </motion.p>

              {/* Animated Connector Line */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-[#bc9c22]/30 origin-left"
                  variants={lineVariants}
                  style={{ transformOrigin: "left" }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
