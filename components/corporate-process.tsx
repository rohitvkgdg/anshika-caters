"use client"

import { MessageSquare, ClipboardList, CheckCircle, Star } from 'lucide-react'
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function CorporateProcess() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = [
    {
      icon: MessageSquare,
      title: "Share Your Event Goals",
      description: "Let us know what you're planning — we listen carefully.",
      number: "01"
    },
    {
      icon: ClipboardList,
      title: "Get a Custom Plan",
      description: "Receive a tailored proposal with menus, décor, and cost estimate.",
      number: "02"
    },
    {
      icon: CheckCircle,
      title: "Confirm & Relax",
      description: "We coordinate everything — vendors, food, setup, and flow.",
      number: "03"
    },
    {
      icon: Star,
      title: "Enjoy a Flawless Event",
      description: "Focus on your team and guests while we handle the rest.",
      number: "04"
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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
    <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 to-white">
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
            How It <span className="text-[#bc9c22]">Works</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Our simple 4-step process ensures your corporate event is perfectly planned and executed
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gray-200 transform -translate-y-1/2 z-0">
            <motion.div
              variants={lineVariants}
              className="h-full bg-gradient-to-r from-[#bc9c22] to-[#d4af37] origin-left"
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardContent className="p-8 text-center relative">
                    {/* Step Number */}
                    <motion.div
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#bc9c22] text-white rounded-full flex items-center justify-center font-bold text-sm"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.number}
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-[#bc9c22]/10 rounded-full mb-6 mt-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className="w-8 h-8 text-[#bc9c22]" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
