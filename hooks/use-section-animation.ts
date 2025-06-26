"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SectionAnimationOptions {
  triggerElement?: string
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn'
  duration?: number
  delay?: number
  stagger?: number
}

export const useSectionAnimation = (
  sectionId: string,
  options: SectionAnimationOptions = {}
) => {
  const animationRef = useRef<ScrollTrigger | null>(null)

  const {
    triggerElement = sectionId,
    animation = 'fadeInUp',
    duration = 1,
    delay = 0,
    stagger = 0.1
  } = options

  useEffect(() => {
    const trigger = document.querySelector(`#${triggerElement}`)
    if (!trigger) return

    // Define animation variants
    const animations = {
      fadeInUp: {
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0 }
      },
      fadeInLeft: {
        from: { opacity: 0, x: -60 },
        to: { opacity: 1, x: 0 }
      },
      fadeInRight: {
        from: { opacity: 0, x: 60 },
        to: { opacity: 1, x: 0 }
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      scaleIn: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 }
      }
    }

    const selectedAnimation = animations[animation]

    // Find all animated elements within the section
    const elements = trigger.querySelectorAll('[data-animate]')
    
    if (elements.length === 0) {
      // If no specific elements are marked, animate the whole section
      gsap.set(trigger, selectedAnimation.from)
      
      animationRef.current = ScrollTrigger.create({
        trigger: trigger,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(trigger, {
            ...selectedAnimation.to,
            duration,
            delay,
            ease: "power2.out"
          })
        }
      })
    } else {
      // Animate individual elements with stagger
      gsap.set(elements, selectedAnimation.from)
      
      animationRef.current = ScrollTrigger.create({
        trigger: trigger,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(elements, {
            ...selectedAnimation.to,
            duration,
            delay,
            stagger,
            ease: "power2.out"
          })
        }
      })
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [sectionId, triggerElement, animation, duration, delay, stagger])

  return animationRef
}

// Hook for animating individual elements
export const useElementAnimation = (
  elementRef: React.RefObject<HTMLElement>,
  options: SectionAnimationOptions = {}
) => {
  const {
    animation = 'fadeInUp',
    duration = 1,
    delay = 0
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const animations = {
      fadeInUp: {
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0 }
      },
      fadeInLeft: {
        from: { opacity: 0, x: -60 },
        to: { opacity: 1, x: 0 }
      },
      fadeInRight: {
        from: { opacity: 0, x: 60 },
        to: { opacity: 1, x: 0 }
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      scaleIn: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 }
      }
    }

    const selectedAnimation = animations[animation]
    gsap.set(element, selectedAnimation.from)

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(element, {
          ...selectedAnimation.to,
          duration,
          delay,
          ease: "power2.out"
        })
      }
    })

    return () => {
      trigger.kill()
    }
  }, [elementRef, animation, duration, delay])
}
