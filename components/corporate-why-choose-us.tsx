"use client"

import { Award, Users, ChefHat, Building } from 'lucide-react'
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function CorporateWhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: Award,
      title: "20+ Years of Experience",
      description: "Decades of expertise in planning seamless, high-impact corporate events, trusted by leading businesses and organizations."
    },
    {
      icon: Users,
      title: "Professional Service Staff",
      description: "Uniformed, trained teams that understand corporate etiquette. We manage everything so you can focus on your guests."
    },
    {
      icon: ChefHat,
      title: "Tailored Corporate Menus",
      description: "Fully customizable menus, from formal lunches to themed buffets, matching your brand, budget, and guest preferences."
    },
    {
      icon: Building,
      title: "Top Venue Partnerships",
      description: "Collaborations with premium venues across Varanasi, offering one-stop solutions with décor, dining, and on-site coordination."
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

  return (
    <section ref={ref} className="py-24 bg-[#021631]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-serif font-medium text-white mb-6"
          >
            Why Choose <span className="text-[#bc9c22]">Anshika Caterers</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-sans font-light"
          >
            Professional corporate event planning and catering services that exceed expectations
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-[#0d223d] to-[#1a2d44]">
                <CardContent className="p-8 flex flex-col items-center justify-center">
                  <motion.div
                    className="flex items-center justify-center w-16 h-16 bg-[#bc9c22]/20 rounded-full mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-8 h-8 text-[#bc9c22]" />
                  </motion.div>
                  <h3 className="text-xl font-serif font-medium text-white mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-sans font-light text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
