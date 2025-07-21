"use client"

import { Quote, Star } from 'lucide-react'
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function CorporateTestimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const testimonials = [
    {
      quote: "Our product launch felt premium from start to finish. Elegant setup, trained staff, and delicious food.",
      name: "Ankita Tiwari",
      position: "Marketing Head",
      company: "Tiwari Tech Pvt. Ltd.",
      rating: 5
    },
    {
      quote: "Seamless planning and great execution. Their team understood exactly what we needed.",
      name: "Siddharth Rao",
      position: "Admin Manager",
      company: "Green Valley Infrastructure",
      rating: 5
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  }

  const quoteVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut" as const,
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
            What Our Corporate <span className="text-[#bc9c22]">Clients Say</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Trusted by leading businesses for exceptional corporate event experiences
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                <CardContent className="p-8 relative">
                  {/* Quote Icon */}
                  <motion.div
                    variants={quoteVariants}
                    className="absolute top-6 right-6 opacity-10"
                  >
                    <Quote className="w-16 h-16 text-[#bc9c22]" />
                  </motion.div>

                  {/* Rating Stars */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                      >
                        <Star className="w-5 h-5 fill-[#bc9c22] text-[#bc9c22]" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg text-gray-700 italic mb-6 leading-relaxed relative z-10">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="border-t pt-6">
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-[#bc9c22] font-semibold">
                      {testimonial.position}
                    </div>
                    <div className="text-gray-600">
                      {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
