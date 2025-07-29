"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Quote, Star } from "lucide-react"

export function WeddingTestimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const testimonials = [
    {
      quote: "They didn't just plan our wedding — they understood it. Every ritual flowed smoothly. The food was loved by everyone, and the mandap looked like something out of a movie.",
      author: "Ishita & Raghav",
      location: "Mumbai to Varanasi",
      rating: 5
    },
    {
      quote: "We were nervous about doing a destination wedding in Varanasi. But Anshika Caterers made it effortless. Every event — mehendi, sangeet, pheras — happened on time, with heart.",
      author: "Nitya & Pranav", 
      location: "Hyderabad to Varanasi",
      rating: 5
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
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

  const cardVariants = {
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
    <section className="bg-[#021631] py-16 sm:py-20 md:py-24" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-100 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            What Our{" "}
            <motion.span
              className="text-[#bc9c22] bg-gradient-to-r from-[#bc9c22] to-[#d4af37] bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Couples Say
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Real stories from couples who trusted us with their most important day.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative bg-gradient-to-br from-[#0d223d] to-[#1a2d44] rounded-3xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-[#bc9c22]/30">
                {/* Quote Icon */}
                <motion.div
                  className="absolute -top-4 -left-4 w-12 h-12 bg-[#bc9c22] rounded-full flex items-center justify-center shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.6, type: "spring" }}
                >
                  <Quote className="w-6 h-6 text-white" />
                </motion.div>

                {/* Stars */}
                <motion.div
                  className="flex items-center mb-6 pt-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#bc9c22] fill-current" />
                  ))}
                </motion.div>

                {/* Quote */}
                <motion.blockquote
                  className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 font-light italic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                >
                  "{testimonial.quote}"
                </motion.blockquote>

                {/* Author */}
                <motion.div
                  className="border-t border-gray-200/50 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                >
                  <div className="font-serif text-lg text-gray-100 mb-1">
                    {testimonial.author}
                  </div>
                  <div className="text-[#bc9c22] font-medium text-sm">
                    {testimonial.location}
                  </div>
                </motion.div>

                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#bc9c22]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 