"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const testimonials = [
    {
      name: "Priya & Arjun Sharma",
      location: "Varanasi",
      image: "/couple-image-1.webp?height=80&width=80",
      rating: 5,
      text: "Anshika Caterers made our wedding absolutely magical. The food was exceptional, and every guest couldn't stop praising the flavors. They handled everything with such grace and professionalism.",
    },
    {
      name: "Kavya & Rohit Gupta",
      location: "Varanasi",
      image: "/couple-image-2.webp?height=80&width=80",
      rating: 5,
      text: "From the initial consultation to the final service, everything was perfect. The team understood our vision and delivered beyond our expectations. Highly recommended for luxury weddings.",
    },
    {
      name: "Ananya & Vikram Singh",
      location: "Jaipur",
      image: "/couple-image-3.webp?height=80&width=80",
      rating: 5,
      text: "The attention to detail was remarkable. Every dish was a masterpiece, and the presentation was stunning. Our families are still talking about the incredible food months later.",
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  }

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "backOut" as const,
      },
    },
  }

  return (
    <section className="py-20 bg-[#021631]" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Love Stories &{" "}
            <motion.span
              className="text-[#bc9c22]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Happy Couples
            </motion.span>
          </h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Hear from the couples who trusted us with their most important day.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="border-0 bg-[#0d223d] shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                <CardContent className="p-8">
                  <motion.div
                    className="flex mb-4"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.5 + index * 0.2,
                        },
                      },
                    }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        variants={starVariants}
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Star className="w-5 h-5 text-[#bc9c22] fill-current" />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.p
                    className="text-gray-400 mb-6 italic leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    "{testimonial.text}"
                  </motion.p>
                  
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-4 border-2 border-[#bc9c22]/20"
                      />
                    </motion.div>
                    <div>
                      <motion.div
                        className="font-semibold text-gray-400 group-hover:text-white transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {testimonial.name}
                      </motion.div>
                      <div className="text-[#bc9c22] text-sm">{testimonial.location}</div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
