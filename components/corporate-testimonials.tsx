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
    },
    {
      quote: "Professional service and attention to detail made our corporate event a huge success. Highly recommended.",
      name: "Neha Sharma",
      position: "Event Coordinator",
      company: "Elite Business Solutions",
      rating: 5
    }
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
            What Our Corporate{" "}
            <motion.span
              className="text-[#bc9c22]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Clients Say
            </motion.span>
          </h2>
          <motion.p
            className="text-lg text-gray-400 max-w-3xl mx-auto font-sans font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Trusted by leading businesses for exceptional corporate event experiences
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
                    className="text-gray-400 mb-6 italic leading-relaxed group-hover:text-gray-300 transition-colors duration-300 font-sans font-light"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    "{testimonial.quote}"
                  </motion.p>
                  
                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <motion.div
                      className="font-light text-gray-400 group-hover:text-white transition-colors duration-300 font-sans"
                      whileHover={{ scale: 1.05 }}
                    >
                      {testimonial.name}
                    </motion.div>
                    <div className="text-[#bc9c22] text-sm font-sans font-light">{testimonial.position}</div>
                    <div className="text-gray-400 text-sm font-sans font-light">{testimonial.company}</div>
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
