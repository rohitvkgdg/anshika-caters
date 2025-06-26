"use client"

import { motion } from "framer-motion"
import { useSmoothScrollContext } from "@/components/smooth-scroll-provider"

export function ScrollIndicator() {
  const { activeSections, activeSectionIndex, scrollToSection } = useSmoothScrollContext()

  const handleDotClick = (index: number) => {
    scrollToSection(index)
  }

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col space-y-3">
        {activeSections.map((section, index) => (
          <motion.button
            key={section}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-125 ${
              index === activeSectionIndex
                ? 'bg-[#bc9c22] border-[#bc9c22] shadow-lg'
                : 'bg-transparent border-white/50 hover:border-[#bc9c22]'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to ${section} section`}
          >
            <span className="sr-only">{section}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
