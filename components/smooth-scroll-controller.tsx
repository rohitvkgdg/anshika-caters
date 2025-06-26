"use client"

import { useSmoothScrollContext } from "@/components/smooth-scroll-provider"
import { useEffect } from "react"

interface SmoothScrollControllerProps {
  children: React.ReactNode
  disableSnap?: boolean
}

export function SmoothScrollController({ children, disableSnap = false }: SmoothScrollControllerProps) {
  const { setSnapEnabled } = useSmoothScrollContext()

  useEffect(() => {
    if (disableSnap) {
      setSnapEnabled(false)
      return () => setSnapEnabled(true)
    }
  }, [disableSnap, setSnapEnabled])

  return <>{children}</>
}
