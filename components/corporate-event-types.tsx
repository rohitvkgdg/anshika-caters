"use client"

import { Rocket, Presentation, PartyPopper, Users, UtensilsCrossed } from 'lucide-react'
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CorporateEventTypes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const eventTypes = [
    {
      icon: Rocket,
      title: "Product Launches",
      description: "Make a lasting first impression with elegant setups, branding, and media-ready catering.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Presentation,
      title: "Seminars",
      description: "Create a polished environment for important discussions and presentations.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: PartyPopper,
      title: "Corporate Parties",
      description: "Celebrate achievements with stylish décor, live counters, and music-ready layouts.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Team-Building",
      description: "Relaxed outdoor or casual indoor settings with easy menus and fun setups.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: UtensilsCrossed,
      title: "Business Dinners",
      description: "Beautifully plated meals or buffet spreads tailored for formal gatherings.",
      color: "from-red-500 to-red-600"
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
            Corporate Event Types <span className="text-[#bc9c22]">We Handle</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Professional planning and execution for every type of corporate gathering
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {eventTypes.map((eventType, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${eventType.color} rounded-lg text-white`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <eventType.icon className="w-6 h-6" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-[#bc9c22] transition-colors">
                      {eventType.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {eventType.description}
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
