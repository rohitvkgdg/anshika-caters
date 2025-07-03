"use client"

import { Button } from "@/components/ui/button"
import StarBorder from "@/components/ui/StarBorder"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const heroImages = [
    {
      src: "/hero-1.webp",
      alt: "Elegant wedding catering setup",
      fallback: "/placeholder.svg?height=1080&width=1920&text=Wedding+Catering"
    },
    {
      src: "/hero-2.webp", 
      alt: "Luxury dining arrangement",
      fallback: "/placeholder.svg?height=1080&width=1920&text=Luxury+Dining"
    },
    {
      src: "/hero-3.webp",
      alt: "Wedding reception celebration",
      fallback: "/placeholder.svg?height=1080&width=1920&text=Wedding+Reception"
    },
    {
      src: "/hero-4.webp",
      alt: "Wedding reception celebration",
      fallback: "/placeholder.svg?height=1080&width=1920&text=Wedding+Reception"
    }
  ]

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 6000) // Change image every 7 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="relative w-full h-full bg-[#1a1a1a]">
          {/* Preload all images for better performance */}
          {heroImages.map((image, index) => (
            <div key={`preload-${index}`} className="hidden">
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.4, 0.0, 0.2, 1],
                opacity: { duration: 0.8 },
                scale: { duration: 1.5 }
              }}
            >
              <motion.img
                src={heroImages[currentImageIndex].src}
                alt={heroImages[currentImageIndex].alt}
                className="w-full h-full object-cover object-center"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 7, 
                  ease: "linear",
                  type: "tween"
                }}
                onError={(e) => {
                  console.error(`Failed to load image: ${heroImages[currentImageIndex].src}`)
                  e.currentTarget.src = "/placeholder.svg?height=1080&width=1920&text=Hero+Image"
                }}
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Professional gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/35 to-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
          
          {/* Subtle animated accent overlay */}
          <motion.div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(45deg, rgba(2,22,49,0.3), rgba(188,156,34,0.08))"
            }}
            animate={{ 
              opacity: [0.8, 0.9, 0.8]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-[#bc9c22] w-10 h-3' 
                  : 'bg-white/40 hover:bg-white/60 w-3 h-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentImageIndex && (
                <motion.div
                  className="absolute inset-0 bg-[#bc9c22] rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 7, ease: "linear" }}
                  key={`progress-${currentImageIndex}`}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-tight drop-shadow-2xl"
          variants={itemVariants}
        >
          <motion.span
            className="drop-shadow-2xl font-extrabold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Your Dream Events
          </motion.span>
          <br />
          <motion.span 
            className="text-[#bc9c22] bg-gradient-to-r font-black from-[#bc9c22] to-[#d4af37] bg-clip-text text-transparent drop-shadow-2xl"
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          >
            Seamlessly Crafted
          </motion.span>
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl mb-10 font-semibold text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-xl"
          variants={itemVariants}
        >
          From décor and planning to gourmet catering, we handle every detail to Make your event unforgettable.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={itemVariants}
        >
          <motion.div 
            variants={buttonVariants} 
            whileTap="tap"
            className="relative"
          >
            <Link href="/contact">
              <StarBorder
                as="div"
                className="inline-block"
                color="#ffd700"
                speed="3s"
              >
                <span className="text-lg font-semibold px-8 py-2">Plan With Us</span>
              </StarBorder>
            </Link>
          </motion.div>
          
          <motion.div variants={buttonVariants} whileTap="tap">
            <Button
              size="lg"
              variant="outline"
              className="text-white font-semibold hover:bg-white/10 hover:text-white px-10 py-6 text-lg bg-white/20 backdrop-blur-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 drop-shadow-lg rounded-full hover:drop-shadow-xl"
              asChild
            >
              <Link href="/menus">Explore Events</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
