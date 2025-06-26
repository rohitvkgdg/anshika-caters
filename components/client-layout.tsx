"use client"

import { useLoading } from "@/components/loading-context"
import { LoadingScreen } from "@/components/loading-screen"
import { Navigation } from "@/components/navigation"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { motion, AnimatePresence } from "framer-motion"

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const { isLoading, setIsLoading, isInitialLoad } = useLoading()

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
          >
            <SmoothScrollProvider>
              <ScrollProgress className="top-[0px]"/>
              <Navigation />
              <ScrollIndicator />
              <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {children}
              </motion.main>
              <Footer />
              <Toaster />
            </SmoothScrollProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
