"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ASSETS } from "@/lib/assets"

// Elegant gold floral SVG overlay for dark bg
const floralBg = (
  <svg width="100%" height="100%" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.18, zIndex: 1 }}>
    <g stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
      <path d="M200 200 Q300 100 400 200 T600 200" fill="none" />
      <path d="M1400 700 Q1300 800 1200 700 T1000 700" fill="none" />
      <path d="M800 100 Q850 200 900 100 Q950 0 1000 100" fill="none" />
      <path d="M300 800 Q400 700 500 800 T700 800" fill="none" />
      <path d="M1200 180 Q1250 100 1300 180 Q1350 260 1400 180" fill="none" />
      <path d="M400 300 Q420 320 440 300 Q460 280 480 300" fill="none" />
      <path d="M1300 600 Q1320 620 1340 600 Q1360 580 1380 600" fill="none" />
    </g>
    <g stroke="#ffe9a7" strokeWidth="1.2" opacity="0.5">
      <circle cx="400" cy="200" r="30" fill="none" />
      <circle cx="1200" cy="700" r="40" fill="none" />
      <ellipse cx="800" cy="450" rx="120" ry="40" fill="none" />
    </g>
  </svg>
)

const ceremonies = [
  {
    title: "Mehendi & Sangeet",
    description:
      "Colorful, musical, and full of joy. We design vibrant spaces, arrange dance floors, DJs, and mehendi artists, and serve bite-sized menus perfect for celebration.",
    image: ASSETS.weddingPlanning.mehendi,
  },
  {
    title: "Haldi & Choora",
    description:
      "We create warm, intimate settings for these beautiful pre-wedding rituals — with pastel décor, satvik menus, floral backdrops, and gentle coordination.",
    image: ASSETS.weddingPlanning.haldi,
  },
  {
    title: "Ganesh Puja & Pooja Setup",
    description:
      "We respect the sacred. From mandir décor to pooja essentials and priest coordination — everything is arranged with care and cultural understanding.",
    image: ASSETS.weddingPlanning.ganeshPooja,
  },
  {
    title: "Varmala & Baraat",
    description:
      "We time the music, light the stage, and create grand entrances. From floral varmala setups to dhol, band, and baraat logistics — we make the drama beautiful, not stressful.",
    image: ASSETS.weddingPlanning.varmala,
  },
  {
    title: "Mandap & Pheras",
    description:
      "Sacred vows under a custom-built mandap. Whether by the ghat or in a heritage venue, we design an atmosphere that’s traditional, elegant, and serene.",
    image: ASSETS.weddingPlanning.pheraa,
  },
  {
    title: "Sindoor & Mangalsutra",
    description:
      "These emotional moments need focused coordination — from lighting to music to camera cues. We ensure nothing feels rushed, missed, or unprepared.",
    image: ASSETS.weddingPlanning.mangalsutra,
  },
  {
    title: "Vidaai & Griha Pravesh",
    description:
      "We manage farewell arrangements with emotional sensitivity and tradition — including doli coordination, phool showers, and the warm welcome that follows.",
    image: ASSETS.weddingPlanning.vidaai,
  },
]

export function WeddingCeremonies() {
  const [activeIndex, setActiveIndex] = useState(2)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? ceremonies.length - 1 : prev - 1))
  }
  const handleNext = () => {
    setActiveIndex((prev) => (prev === ceremonies.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="relative py-16 sm:py-20 md:py-24 min-h-[900px] bg-[#021631] overflow-hidden flex flex-col justify-center">
      {/* Soft floral pastel background */}
      <div className="absolute inset-0 z-0">{floralBg}</div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center">
        {/* Section Title & Description */}
        <div className="flex flex-col items-center mb-10 sm:mb-14 w-full">
          <div className="flex flex-col items-center w-full">
            <h2 className="text-center">
              <span className="block text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight drop-shadow-lg uppercase font-medium leading-tight">
                Your Wedding, Start to Finish
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl font-serif bg-gradient-to-r from-[#bc9c22] to-[#d4af37] bg-clip-text text-transparent tracking-tight drop-shadow-lg uppercase font-medium leading-tight mt-2">
                We Handle Everything
              </span>
            </h2>
            <div className="h-1 w-32 rounded-full bg-gradient-to-r from-[#bc9c22] via-[#d4af37] to-[#bc9c22] opacity-80 my-5" />
          </div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-light text-center">
            Weddings are a festival of moments, emotions, and traditions. We take full responsibility for planning, décor, catering, and coordination so you and your family can truly enjoy the celebration.
          </p>
        </div>
        {/* Tabs Navigation */}
        <div className="flex items-center justify-center gap-2 mb-10 w-full max-w-4xl relative">
          <button
            aria-label="Previous"
            onClick={handlePrev}
            className="z-20 rounded-full border-2 border-[#d4af37] shadow p-2 mr-2 transition flex items-center justify-center w-12 h-12"
          >
            <span className="text-2xl font-serif text-[#d4af37]">&#8592;</span>
          </button>
          <div className="relative flex items-center justify-center w-[540px] h-[72px] select-none">
            {/* Previous Tab (faded, left) */}
            <div
              className="absolute hidden md:block left-0 top-1/2 -translate-y-1/2 z-10"
              style={{ width: 180, pointerEvents: 'none' }}
            >
              <button
                className="w-full px-8 py-5 font-serif text-lg tracking-wider uppercase text-[#7d6b4a] opacity-40 scale-90 transition-all duration-200 focus:outline-none"
                tabIndex={-1}
                aria-hidden="true"
                style={{ background: 'none', border: 'none' }}
                disabled
              >
                {ceremonies[(activeIndex - 1 + ceremonies.length) % ceremonies.length].title}
              </button>
            </div>
            {/* Active Tab (center) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <button
                className="px-8 py-5 min-w-[180px] font-serif text-lg tracking-wider uppercase text-white shadow-inner border-b-4 border-[#d4af37] z-20"
                style={{ boxShadow: '0 4px 24px 0 #d4af3722' }}
                tabIndex={0}
              >
                {ceremonies[activeIndex].title}
              </button>
            </div>
            {/* Next Tab (faded, right) */}
            <div
              className="absolute hidden md:block right-0 top-1/2 -translate-y-1/2 z-10"
              style={{ width: 180, pointerEvents: 'none' }}
            >
              <button
                className="w-full px-8 py-5 font-serif text-lg tracking-wider uppercase text-[#7d6b4a] opacity-40 scale-90 transition-all duration-200 focus:outline-none"
                tabIndex={-1}
                aria-hidden="true"
                style={{ background: 'none', border: 'none' }}
                disabled
              >
                {ceremonies[(activeIndex + 1) % ceremonies.length].title}
              </button>
            </div>
          </div>
          <button
            aria-label="Next"
            onClick={handleNext}
            className="z-20 rounded-full border-2 border-[#d4af37] shadow p-2 ml-2 transition flex items-center justify-center w-12 h-12"
          >
            <span className="text-2xl font-serif text-[#d4af37]">&#8594;</span>
          </button>
        </div>
        {/* Ceremony Content Card */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-12 backdrop-blur-lg rounded-3xl p-6 md:p-12 relative overflow-hidden w-screen">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex-shrink-0 flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={ceremonies[activeIndex].image}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="w-full relative"
              >
                <div className="overflow-hidden shadow-xl relative">
                  <img
                    src={ceremonies[activeIndex].image}
                    alt={ceremonies[activeIndex].title}
                    className="w-full h-72 md:h-96 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=300&width=400&text=" + encodeURIComponent(ceremonies[activeIndex].title)
                    }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Right: Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center relative z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={ceremonies[activeIndex].title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <h3 className="text-3xl sm:text-4xl font-serif text-white mb-4 tracking-tight drop-shadow-lg relative z-20 uppercase">
                  <span className=" pb-1">{ceremonies[activeIndex].title}</span>
                </h3>
                <p className="text-lg sm:text-xl text-gray-300 font-light mb-2 drop-shadow relative z-20">
                  {ceremonies[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
} 