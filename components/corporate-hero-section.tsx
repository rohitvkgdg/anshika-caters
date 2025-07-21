"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import StarBorder from "@/components/ui/StarBorder"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { ASSETS } from "@/lib/assets"

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  companyName: z.string().min(2, "Company name is required"),
  contactNumber: z.string().min(10, "Please enter a valid contact number"),
  eventType: z.string().min(1, "Please select an event type"),
  date: z.string().min(1, "Please select a date"),
  guestCount: z.string().min(1, "Please specify guest count"),
})

export function CorporateHeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { toast } = useToast()
  
  const heroImages = [
    {
      src: ASSETS.corporate.hero,
      alt: "Corporate event setup",
      fallback: ASSETS.other.placeholder
    },
    {
      src: ASSETS.corporate.businessDinners, 
      alt: "Business lunch arrangement",
      fallback: ASSETS.other.placeholder
    },
    {
      src: ASSETS.corporate.corporateParties,
      alt: "Corporate party event",
      fallback: ASSETS.other.placeholder
    },
    {
      src: ASSETS.corporate.seminars,
      alt: "Corporate seminar setup",
      fallback: ASSETS.other.placeholder
    }
  ]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      contactNumber: "",
      eventType: "",
      date: "",
      guestCount: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values)
      // Handle form submission here
      
      toast({
        title: "Quote Request Sent!",
        description: "We'll get back to you with a quote within 24 hours.",
      })
      
      form.reset()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    }
  }

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [heroImages.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  }

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="relative w-full h-full bg-[#1a1a1a]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.4, 0.0, 0.2, 1],
                opacity: { duration: 0.8 },
                scale: { duration: 1.5 }
              }}
            >
              <motion.img
                src={heroImages[currentImageIndex].src}
                alt={heroImages[currentImageIndex].alt}
                className="w-full h-full object-cover object-center"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 7, 
                  ease: "linear",
                  type: "tween"
                }}
                onError={(e) => {
                  console.error(`Failed to load image: ${heroImages[currentImageIndex].src}`)
                  e.currentTarget.src = "/placeholder.svg?height=1080&width=1920&text=Corporate+Event"
                }}
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Professional gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-[#bc9c22] w-10 h-3' 
                  : 'bg-white/40 hover:bg-white/60 w-3 h-3'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentImageIndex && (
                <motion.div
                  className="absolute inset-0 bg-[#bc9c22] rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 6, ease: "linear" }}
                  key={`progress-${currentImageIndex}`}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div className="text-white" variants={itemVariants}>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight drop-shadow-2xl"
              variants={itemVariants}
            >
              <motion.span
                className="drop-shadow-2xl font-extrabold"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Professional Planning.
              </motion.span>
              <br />
              <motion.span
                className="drop-shadow-2xl font-extrabold"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Seamless Execution.
              </motion.span>
              <br />
              <motion.span 
                className="text-[#bc9c22] bg-gradient-to-r font-black from-[#bc9c22] to-[#d4af37] bg-clip-text text-transparent drop-shadow-2xl"
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              >
                Exceptional Catering.
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl mb-8 font-semibold text-gray-200 max-w-2xl leading-relaxed drop-shadow-xl"
              variants={itemVariants}
            >
              From business lunches to product launches, we plan and cater corporate events that leave a lasting impression.
            </motion.p>
          </motion.div>

          {/* Right Form */}
          <motion.div variants={formVariants}>
            <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Get flat 20% off on your first booking!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your contact number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="eventType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select event type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="conference">Conference</SelectItem>
                              <SelectItem value="launch">Launch</SelectItem>
                              <SelectItem value="office-party">Office Party</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="guestCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guest Count</FormLabel>
                          <FormControl>
                            <Input placeholder="Number of guests" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <StarBorder
                        as="div"
                        className="w-full"
                        color="#bc9c22"
                        speed="3s"
                      >
                        <Button
                          type="submit"
                          className="w-full bg-[#bc9c22] hover:bg-[#a08820] text-white font-semibold py-6 text-lg"
                        >
                          Get a Quote in 24 Hours
                        </Button>
                      </StarBorder>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
