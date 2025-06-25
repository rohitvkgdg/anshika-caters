"use client"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import CircularGallery from "@/components/ui/CircularGallery"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Calendar } from "lucide-react"

export function GallerySection() {
  const ref = useRef(null)
  const galleryRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const isGalleryInView = useInView(galleryRef, { once: true, margin: "-50px" })
  
  // Scroll-based parallax effects
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 2])

  const galleryImages = [
    { 
      image: "/stack-1.webp?height=400&width=600", 
      text: "Live Cooking Station"
    },
    { 
      image: "/stack-2.webp?height=400&width=600", 
      text: "Gourmet Food Presentation"
    },
    { 
      image: "/stack-3.webp?height=400&width=600", 
      text: "Traditional Indian Cuisine"
    },
    { 
      image: "/stack-4.webp?height=400&width=600", 
      text: "Luxury Event Catering"
    },
    { 
      image: "/stack-5.webp?height=400&width=600", 
      text: "Wedding Dessert Table"
    },
    { 
      image: "/stack-6.webp?height=400&width=600", 
      text: "Elegant Wedding Setup"
    },
  ]

  return (
    <section className="py-20 bg-[#021631] text-white relative overflow-hidden" ref={ref}>
      {/* Animated background elements */}
      
      <div className="flex flex-col mx-0 w-full px-auto relative z-10">
        {/* Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="flex mb-8 mx-auto justify-center w-full"
        >
          <Alert className="border-[#bc9c22] bg-[#bc9c22]/5 w-fit">
            <Calendar className="h-4 w-4" />
            <AlertDescription className="text-white">
              <strong>Winter Wedding Season:</strong> Book now and save 15% on all packages! Limited slots available for December 2024 - February 2025.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Section Header */}
        <motion.div
          className="text-center mb-16 mx-4 md:mx-8 lg:mx-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-serif text-white mb-6"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Our{" "}
            <motion.span
              className="text-[#bc9c22]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Masterpieces
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-md md:text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Every event tells a story. Here are some of our favorite chapters we've had the honor to create.
          </motion.p>
        </motion.div>

        {/* Circular Gallery with Smooth Scroll Animation */}
        <motion.div
          ref={galleryRef}
          className="relative mb-24 w-full h-[500px] md:h-[700px] overflow-hidden"
        >
          <CircularGallery 
            items={galleryImages} 
            bend={1}
            textColor="white"
            borderRadius={0.05}
            font="bold 14px serif"
          />
        </motion.div>
      </div>
    </section>
  )
}
