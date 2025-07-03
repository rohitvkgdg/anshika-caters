"use client"

import { useLoading } from "@/components/loading-context"
import { LoadingScreen } from "@/components/loading-screen"
import { Navigation } from "@/components/navigation"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const { isLoading, setIsLoading, isInitialLoad } = useLoading()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis when component mounts and loading is complete
    if (!isLoading) {
      lenisRef.current = new Lenis({
        duration: 1.2,
      })

      function raf(time: number) {
        lenisRef.current?.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }

    return () => {
      lenisRef.current?.destroy()
    }
  }, [isLoading])

  // Make Lenis instance available globally for navigation
  useEffect(() => {
    if (lenisRef.current) {
      (window as any).lenis = lenisRef.current
    }
  }, [lenisRef.current])

  return (
    <>
      <LoadingScreen 
        isLoading={isLoading} 
        onComplete={() => setIsLoading(false)}
        isInitialLoad={isInitialLoad}
      />
      
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="full-width-container"
          >
            <ScrollProgress className="top-[0px]"/>
            <Navigation />
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {children}
            </motion.main>
            <Footer />
            <Toaster />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
