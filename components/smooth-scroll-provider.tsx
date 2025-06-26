"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'

interface SmoothScrollContextType {
  activeSection: string
  activeSectionIndex: number
  scrollToSection: (index: number) => void
  activeSections: string[]
  isSnapEnabled: boolean
  setSnapEnabled: (enabled: boolean) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextType | undefined>(undefined)

interface SmoothScrollProviderProps {
  children: React.ReactNode
  sections?: string[]
  excludeSections?: string[]
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({
  children,
  sections = [
    'hero',
    'services',
    'featured-events', 
    'process',
    'gallery',
    'testimonials',
    'contact'
  ],
  excludeSections = [] // No excluded sections now
}) => {
  const [activeSection, setActiveSection] = useState<string>('')
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0)
  const [isSnapEnabled, setSnapEnabled] = useState<boolean>(true)

  const handleSectionChange = (section: string, index: number) => {
    setActiveSection(section)
    setActiveSectionIndex(index)
  }

  const { scrollToSection, activeSections } = useSmoothScroll({
    sections,
    excludeSections,
    enableSnap: isSnapEnabled,
    onSectionChange: handleSectionChange,
    snapDuration: 1.2
  })

  // Set initial active section on mount
  useEffect(() => {
    if (activeSections.length > 0 && !activeSection) {
      setActiveSection(activeSections[0])
      setActiveSectionIndex(0)
    }
  }, [activeSections, activeSection])

  const contextValue: SmoothScrollContextType = {
    activeSection,
    activeSectionIndex,
    scrollToSection,
    activeSections,
    isSnapEnabled,
    setSnapEnabled
  }

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

export const useSmoothScrollContext = () => {
  const context = useContext(SmoothScrollContext)
  if (context === undefined) {
    throw new Error('useSmoothScrollContext must be used within a SmoothScrollProvider')
  }
  return context
}
