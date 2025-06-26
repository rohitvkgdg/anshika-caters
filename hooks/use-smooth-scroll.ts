"use client"

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

interface SmoothScrollOptions {
  sections: string[]
  onSectionChange?: (activeSection: string, index: number) => void
  excludeSections?: string[]
  enableSnap?: boolean
  snapDuration?: number
}

export const useSmoothScroll = ({
  sections,
  onSectionChange,
  excludeSections = [],
  enableSnap = true,
  snapDuration = 1
}: SmoothScrollOptions) => {
  const currentSectionRef = useRef<number>(0)
  const isScrollingRef = useRef<boolean>(false)
  const lastScrollTime = useRef<number>(0)
  const scrollDelta = useRef<number>(0)

  // Filter out excluded sections
  const activeSections = sections.filter(section => !excludeSections.includes(section))

  const scrollToSection = useCallback((index: number, smooth: boolean = true) => {
    if (index < 0 || index >= activeSections.length) return

    const targetSection = document.querySelector(`#${activeSections[index]}`)
    if (!targetSection) return

    isScrollingRef.current = true
    currentSectionRef.current = index

    // Calculate offset to center content considering navbar height and viewport
    const isMobile = window.innerWidth < 768
    
    // Get actual navbar height from DOM for better accuracy
    const navbar = document.querySelector('[class*="fixed"][class*="top"]') as HTMLElement
    const actualNavbarHeight = navbar ? navbar.offsetHeight : (isMobile ? 70 : 80)
    
    const viewportHeight = window.innerHeight
    
    // For better centering, offset by navbar height plus some viewport-based spacing
    const baseOffset = actualNavbarHeight + (isMobile ? 10 : 20) // Less spacing on mobile
    const viewportOffset = Math.min(viewportHeight * 0.02, isMobile ? 30 : 60) // Smaller max offset for mobile
    const offset = baseOffset + viewportOffset

    if (smooth) {
      gsap.to(window, {
        duration: snapDuration * 0.8, // Slightly faster for better responsiveness
        scrollTo: { y: targetSection, offsetY: offset },
        ease: "power2.inOut",
        onComplete: () => {
          isScrollingRef.current = false
          onSectionChange?.(activeSections[index], index)
        }
      })
    } else {
      const targetPosition = (targetSection as HTMLElement).offsetTop - offset
      window.scrollTo({ top: targetPosition, behavior: 'instant' })
      isScrollingRef.current = false
      onSectionChange?.(activeSections[index], index)
    }
  }, [activeSections, snapDuration, onSectionChange])

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!enableSnap) return
    
    const now = Date.now()
    const timeDelta = now - lastScrollTime.current
    
    // Accumulate scroll delta for better sensitivity
    scrollDelta.current += e.deltaY
    
    // Improved debouncing for better performance
    if (timeDelta < 150) return
    
    // Only trigger if we've accumulated enough scroll or enough time has passed
    if (Math.abs(scrollDelta.current) < 30 && timeDelta < 250) return
    
    if (isScrollingRef.current) return

    const direction = scrollDelta.current > 0 ? 1 : -1
    const newIndex = currentSectionRef.current + direction

    // Prevent scrolling before first section
    if (direction < 0 && newIndex < 0) {
      e.preventDefault()
      lastScrollTime.current = now
      scrollDelta.current = 0
      return
    }

    // Prevent scrolling past last section
    if (direction > 0 && newIndex >= activeSections.length) {
      e.preventDefault()
      lastScrollTime.current = now
      scrollDelta.current = 0
      return
    }

    // Snap to the target section
    e.preventDefault()
    scrollToSection(newIndex)

    lastScrollTime.current = now
    scrollDelta.current = 0
  }, [enableSnap, activeSections.length, scrollToSection])

  const handleTouchStart = useRef<{ y: number; time: number }>({ y: 0, time: 0 })

  const handleTouchStartEvent = useCallback((e: TouchEvent) => {
    handleTouchStart.current = {
      y: e.touches[0].clientY,
      time: Date.now()
    }
  }, [])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!enableSnap) return
    
    // Ensure we have touch data
    if (!e.changedTouches || e.changedTouches.length === 0) return

    const touchEnd = e.changedTouches[0].clientY
    const touchDelta = handleTouchStart.current.y - touchEnd
    const timeDelta = Date.now() - handleTouchStart.current.time

    // Minimum swipe distance and maximum time for gesture recognition
    // Adjusted for better mobile responsiveness
    if (Math.abs(touchDelta) < 40 || timeDelta > 600) return
    if (isScrollingRef.current) return

    const direction = touchDelta > 0 ? 1 : -1
    const newIndex = currentSectionRef.current + direction

    // Prevent scrolling before first section
    if (direction < 0 && newIndex < 0) {
      return
    }

    // Prevent scrolling past last section
    if (direction > 0 && newIndex >= activeSections.length) {
      return
    }

    // Snap to the target section
    scrollToSection(newIndex)
  }, [enableSnap, activeSections.length, scrollToSection])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enableSnap) return
    if (isScrollingRef.current) return

    let direction = 0
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      direction = 1
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      direction = -1
    } else if (e.key === 'Home') {
      e.preventDefault()
      scrollToSection(0)
      return
    } else if (e.key === 'End') {
      e.preventDefault()
      scrollToSection(activeSections.length - 1)
      return
    }

    if (direction !== 0) {
      const newIndex = currentSectionRef.current + direction
      
      // Prevent scrolling before first section
      if (direction < 0 && newIndex < 0) {
        e.preventDefault()
        return
      }
      
      // Prevent scrolling past last section
      if (direction > 0 && newIndex >= activeSections.length) {
        e.preventDefault()
        return
      }
      
      // Snap to the target section
      e.preventDefault()
      scrollToSection(newIndex)
    }
  }, [enableSnap, activeSections.length, scrollToSection])

  useEffect(() => {
    // Setup ScrollTrigger for section detection with performance optimization
    const triggers: ScrollTrigger[] = []

    // Batch DOM queries for better performance
    const sectionElements = activeSections.map(sectionId => ({
      id: sectionId,
      element: document.querySelector(`#${sectionId}`)
    })).filter(item => item.element)

    sectionElements.forEach(({ id: sectionId, element }, index) => {
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top 65%", // Adjusted to account for mobile navbar differences
        end: "bottom 35%", // Adjusted for better section detection on mobile
        refreshPriority: -1, // Lower priority for better performance
        onEnter: () => {
          if (!isScrollingRef.current) {
            currentSectionRef.current = index
            onSectionChange?.(sectionId, index)
          }
        },
        onEnterBack: () => {
          if (!isScrollingRef.current) {
            currentSectionRef.current = index
            onSectionChange?.(sectionId, index)
          }
        }
      })

      triggers.push(trigger)
    })

    // Refresh ScrollTrigger after setup for better performance
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      triggers.forEach(trigger => trigger.kill())
    }
  }, [activeSections, onSectionChange])

  useEffect(() => {
    if (!enableSnap) return

    // Throttle event listeners for better performance
    const throttledWheel = (e: WheelEvent) => {
      requestAnimationFrame(() => handleWheel(e))
    }

    // Add event listeners
    window.addEventListener('wheel', throttledWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStartEvent, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', throttledWheel)
      window.removeEventListener('touchstart', handleTouchStartEvent)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleWheel, handleTouchStartEvent, handleTouchEnd, handleKeyDown, enableSnap])

  return {
    scrollToSection: (index: number) => scrollToSection(index, true),
    getCurrentSection: () => currentSectionRef.current,
    activeSections
  }
}
