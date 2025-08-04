"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { ASSETS } from "@/lib/assets"
import Image from "next/image"

interface LoadingScreenProps {
  isLoading: boolean
  onComplete: () => void
  isInitialLoad?: boolean
}

export function LoadingScreen({ isLoading, onComplete, isInitialLoad = false }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setIsVisible(false)
      return
    }

    // Show the loading screen immediately when loading starts
    setIsVisible(true)

    // Set the exact timing - 3 seconds for initial load, 1 second for navigation
    const loadingDuration = isInitialLoad ? 3000 : 1000

    const timer = setTimeout(() => {
      onComplete() // This will set isLoading to false in the context
    }, loadingDuration)

    return () => {
      clearTimeout(timer)
    }
  }, [isLoading, onComplete, isInitialLoad])

  return (
    <AnimatePresence>
      {isLoading && isVisible && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] bg-[#021631] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Logo with breathing fade animation */}
          <motion.div
            className="flex items-center justify-center"
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Image
              src={ASSETS.logo}
              alt="Anshika Caterers"
              width={150}
              height={60}
              className="mb-6"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
