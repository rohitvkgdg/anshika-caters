"use client"

import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

// Types
interface SelectContextValue {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
  placeholder?: string
}

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined)

function useSelectContext() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within a Select component")
  }
  return context
}

// Main Select component
interface SelectProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ children, value, onValueChange, defaultValue }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "")
    const [open, setOpen] = React.useState(false)
    
    const currentValue = value !== undefined ? value : internalValue
    
    const handleValueChange = React.useCallback((newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
      setOpen(false)
    }, [value, onValueChange])

    return (
      <SelectContext.Provider 
        value={{ 
          value: currentValue, 
          onValueChange: handleValueChange, 
          open, 
          setOpen 
        }}
      >
        <div ref={ref} className="relative">
          {children}
        </div>
      </SelectContext.Provider>
    )
  }
)
Select.displayName = "Select"

// SelectTrigger component
interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useSelectContext()
    
    return (
      <button
        ref={ref}
        type="button"
        role="combobox"
        aria-expanded={open}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onClick={() => setOpen(!open)}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

// SelectValue component
interface SelectValueProps {
  placeholder?: string
  className?: string
}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ placeholder, className }, ref) => {
    const { value } = useSelectContext()
    
    return (
      <span ref={ref} className={className}>
        {value || placeholder}
      </span>
    )
  }
)
SelectValue.displayName = "SelectValue"

// SelectContent component
interface SelectContentProps {
  children: React.ReactNode
  className?: string
  position?: "top" | "bottom"
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, className, position = "bottom" }, ref) => {
    const { open, setOpen } = useSelectContext()
    
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Element
        if (ref && typeof ref === 'object' && ref.current && !ref.current.contains(target)) {
          setOpen(false)
        }
      }
      
      if (open) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [open, setOpen, ref])
    
    if (!open) return null
    
    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          position === "bottom" ? "top-full mt-1" : "bottom-full mb-1",
          "animate-in fade-in-0 zoom-in-95",
          className
        )}
      >
        {children}
      </div>
    )
  }
)
SelectContent.displayName = "SelectContent"

// SelectItem component
interface SelectItemProps {
  children: React.ReactNode
  value: string
  className?: string
  disabled?: boolean
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, value, className, disabled = false }, ref) => {
    const { value: selectedValue, onValueChange } = useSelectContext()
    const isSelected = selectedValue === value
    
    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:bg-accent focus:text-accent-foreground",
          disabled && "pointer-events-none opacity-50",
          isSelected && "bg-accent text-accent-foreground",
          className
        )}
        onClick={() => !disabled && onValueChange(value)}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {isSelected && <Check className="h-4 w-4" />}
        </span>
        {children}
      </div>
    )
  }
)
SelectItem.displayName = "SelectItem"

// SelectLabel component
interface SelectLabelProps {
  children: React.ReactNode
  className?: string
}

const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
      >
        {children}
      </div>
    )
  }
)
SelectLabel.displayName = "SelectLabel"

// SelectSeparator component
interface SelectSeparatorProps {
  className?: string
}

const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-muted", className)}
      />
    )
  }
)
SelectSeparator.displayName = "SelectSeparator"

export {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
