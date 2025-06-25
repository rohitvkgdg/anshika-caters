"use client"

import { useLoading } from "@/components/loading-context"
import { LoadingScreen } from "@/components/loading-screen"
import { Navigation } from "@/components/navigation"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
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
