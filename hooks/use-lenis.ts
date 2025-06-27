"use client"

import { useEffect, useState } from 'react'
import type Lenis from '@studio-freight/lenis'

export const useLenis = () => {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const checkLenis = () => {
      const lenisInstance = (window as any).lenis
      if (lenisInstance) {
        setLenis(lenisInstance)
      }
    }

    // Check immediately
    checkLenis()

    // Check periodically in case Lenis isn't ready yet
    const interval = setInterval(checkLenis, 100)

    // Cleanup
    return () => clearInterval(interval)
  }, [])

  const scrollTo = (target: string | number | HTMLElement, options?: any) => {
    if (lenis) {
      lenis.scrollTo(target, options)
    } else {
      // Fallback to native scroll
      if (typeof target === 'string') {
        const element = document.querySelector(target)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' })
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const start = () => lenis?.start()
  const stop = () => lenis?.stop()

  return {
    lenis,
    scrollTo,
    start,
    stop,
    isReady: !!lenis
  }
}
