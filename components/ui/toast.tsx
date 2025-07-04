// This file is replaced by Sonner - see components/ui/toaster.tsx
// All toast functionality is now handled by Sonner which is more modern and reliable

export interface ToastProps {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

// Re-export toast function from sonner for compatibility
export { toast } from "sonner"
