"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  isInitialLoad: boolean
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const pathname = usePathname()

  // Handle initial load
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasInitiallyLoaded')
    console.log('Loading context initial effect:', { hasLoaded }) // Debug log
    if (hasLoaded) {
      setIsInitialLoad(false)
      setIsLoading(false)
    } else {
      // First time loading - keep loading true, let LoadingScreen handle timing
      setIsInitialLoad(true)
      setIsLoading(true)
    }
  }, [])

  // Handle route changes
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasInitiallyLoaded')
    if (hasLoaded) {
      // Show loading for route changes - let LoadingScreen handle timing
      setIsLoading(true)
    }
  }, [pathname])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    if (isInitialLoad) {
      sessionStorage.setItem('hasInitiallyLoaded', 'true')
      setIsInitialLoad(false)
    }
  }

  return (
    <LoadingContext.Provider value={{ 
      isLoading, 
      setIsLoading: (loading: boolean) => {
        if (!loading) {
          handleLoadingComplete()
        } else {
          setIsLoading(loading)
        }
      }, 
      isInitialLoad 
    }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
