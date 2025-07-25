"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { 
  Calendar,
  MapPin,
  Palette,
  ChefHat,
  Music,
  Users,
  Shield,
  Heart
} from "lucide-react"

export function WeddingWhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: Calendar,
      title: "Complete Wedding Planning & Coordination",
      description: "We handle it all — timelines, logistics, vendor management, and on-the-day execution so you don't have to chase a dozen people, just live your moments."
    },
    {
      icon: MapPin,
      title: "Venue Selection & Setup",
      description: "From riverfront ghats to heritage lawns, we help you choose the perfect venue and manage everything from layout to guest flow."
    },
    {
      icon: Palette,
      title: "Custom Décor & Floral Styling",
      description: "Whether you imagine a pastel haldi, a royal varmala stage, or a candlelit mandap — we bring your aesthetic to life."
    },
    {
      icon: ChefHat,
      title: "Gourmet Catering & Curated Menus",
      description: "Live stations, traditional thalis, satvik menus or global fusion — we customize menus to fit your culture, tastes, and guests."
    },
    {
      icon: Heart,
      title: "Pre-Wedding Functions Management",
      description: "Mehendi, Sangeet, Haldi — each event styled and timed with care, complete with performers, lighting, and thematic setups."
    },
    {
      icon: Music,
      title: "Lights, Sound & Baraat Arrangements",
      description: "From dhols to DJs, from stage lighting to soundtracks for rituals — we create immersive atmospheres without technical hiccups."
    },
    {
      icon: Users,
      title: "Guest Hospitality & Artist Coordination",
      description: "Welcoming guests, handling artist riders, and making sure everyone feels looked after — we manage both front and backstage."
    },
    {
      icon: Shield,
      title: "Contingency Planning & On-Site Team",
      description: "Weddings rarely go exactly as planned. That's why we're always on-site — adjusting, solving, and ensuring things run smoothly."
    }
  ]

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            Why Couples Trust Us With Their{" "}
            <motion.span
              className="text-[#bc9c22] bg-gradient-to-r from-[#bc9c22] to-[#d4af37] bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Wedding
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            From planning to plating, from the first dance to the final farewell — we take care of everything, beautifully and professionally.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-xl hover:border-[#bc9c22] transition-all duration-500 hover:shadow-[0_0_32px_0_#bc9c22aa]"
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              >
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-[#bc9c22]/20 border border-[#bc9c22]/40 rounded-xl group-hover:bg-[#bc9c22]/40 transition-colors duration-300 shadow-md">
                    <feature.icon className="w-7 h-7 text-[#bc9c22]" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-serif text-white mb-2 group-hover:text-[#bc9c22] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-base font-light">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 