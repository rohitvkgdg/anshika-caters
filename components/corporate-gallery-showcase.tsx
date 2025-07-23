"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ASSETS } from "@/lib/assets"

export function CorporateGalleryShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const galleryItems = [
    {
      title: "PRODUCT LAUNCHES",
      subtitle: "REDEFINED",
      description: "Make a lasting first impression with elegant setups, professional branding, and media-ready catering that showcases your brand in the best light.",
      image: ASSETS.corporate.corporateDecor,
      link: "/corporate-product-launches"
    },
    {
      title: "CORPORATE SEMINARS",
      subtitle: "ELEVATED",
      description: "Create a polished environment for important discussions and presentations with sophisticated decor and seamless service.",
      image: ASSETS.corporate.seminars,
      link: "/corporate-seminars"
    },
    {
      title: "BUSINESS DINNERS",
      subtitle: "PERFECTED",
      description: "Beautifully plated meals and elegant buffet spreads tailored for formal gatherings and executive meetings.",
      image: ASSETS.corporate.businessDinners,
      link: "/business-dinners"
    }
  ]

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % galleryItems.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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

  const currentItem = galleryItems[currentSlide]

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#021631] text-white" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          data-animate
        >
          <motion.div
            className="w-16 h-0.5 bg-[#bc9c22] mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            data-animate
          >
            CORPORATE{" "}
            <motion.span
              className="text-[#bc9c22] bg-gradient-to-r from-[#bc9c22] to-[#d4af37] bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              EXPERIENCES REDEFINED
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            data-animate
          >
            Your corporate vision comes alive with Anshika Caters. From sophisticated boardroom meetings to grand product launches, we create memorable experiences that reflect your brand's excellence and leave lasting impressions on your stakeholders.
          </motion.p>
        </motion.div>

        {/* Main Gallery */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          data-animate
        >
          {/* Left Navigation */}
          <motion.div 
            className="hidden lg:flex flex-col items-center justify-center space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button
              onClick={prevSlide}
              variant="outline"
              size="lg"
              className="w-16 h-16 rounded-full border-2 border-[#bc9c22] text-[#bc9c22] hover:bg-[#bc9c22] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="text-center">
              <motion.h3 
                key={`left-title-${currentSlide}`}
                className="text-xl font-serif text-[#bc9c22] mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {galleryItems[(currentSlide - 1 + galleryItems.length) % galleryItems.length].title.split(' ')[0]}
              </motion.h3>
              <motion.p 
                key={`left-subtitle-${currentSlide}`}
                className="text-lg font-serif text-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {galleryItems[(currentSlide - 1 + galleryItems.length) % galleryItems.length].title.split(' ').slice(1).join(' ')}
              </motion.p>
            </div>
          </motion.div>

          {/* Center Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-lg shadow-2xl border-4 border-[#bc9c22]">
              <motion.div
                key={currentSlide}
                className="relative h-[400px] sm:h-[500px] md:h-[600px] bg-cover bg-center"
                style={{ backgroundImage: `url(${currentItem.image})` }}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <motion.h3
                    key={`title-${currentSlide}`}
                    className="text-2xl sm:text-3xl md:text-5xl font-serif mb-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {currentItem.title}
                  </motion.h3>
                  <motion.p
                    key={`desc-${currentSlide}`}
                    className="text-sm sm:text-md font-light text-gray-300 mb-4 max-w-md"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    {currentItem.description}
                  </motion.p>
                </div>
              </motion.div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex lg:hidden justify-center space-x-4 mt-6">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="lg"
                className="w-12 h-12 rounded-full border-2 border-[#bc9c22] text-[#bc9c22] hover:bg-[#bc9c22] hover:text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={nextSlide}
                variant="outline"
                size="lg"
                className="w-12 h-12 rounded-full border-2 border-[#bc9c22] text-[#bc9c22] hover:bg-[#bc9c22] hover:text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Right Navigation */}
          <motion.div 
            className="hidden lg:flex flex-col items-center justify-center space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button
              onClick={nextSlide}
              variant="outline"
              size="lg"
              className="w-16 h-16 rounded-full border-2 border-[#bc9c22] text-[#bc9c22] hover:bg-[#bc9c22] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
            <div className="text-center">
              <motion.h3 
                key={`right-title-${currentSlide}`}
                className="text-xl font-serif text-[#bc9c22] mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {galleryItems[(currentSlide + 1) % galleryItems.length].title.split(' ')[0]}
              </motion.h3>
              <motion.p 
                key={`right-subtitle-${currentSlide}`}
                className="text-lg font-serif text-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {galleryItems[(currentSlide + 1) % galleryItems.length].title.split(' ').slice(1).join(' ')}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Slide Indicators */}
        <motion.div 
          className="flex justify-center space-x-3 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {galleryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isTransitioning || index === currentSlide) return
                setIsTransitioning(true)
                setCurrentSlide(index)
                setTimeout(() => setIsTransitioning(false), 500)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#bc9c22] w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
