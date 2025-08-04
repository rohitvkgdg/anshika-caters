"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import StarBorder from "@/components/ui/StarBorder"
import { CheckCircle } from 'lucide-react'
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { ASSETS } from "@/lib/assets"

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  weddingDate: z.string().min(1, "Please select a wedding date"),
  guestCount: z.string().min(1, "Please specify guest count"),
})

export function WeddingHeroSection() {
  const { toast } = useToast()
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      weddingDate: "",
      guestCount: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Prepare form data for Web3Forms
      const formData = new FormData()
      formData.append('access_key', 'a4e38aa8-a548-4c14-89c9-2a74db32e477')
      formData.append('name', values.name)
      formData.append('phone', values.phone)
      formData.append('event_date', values.weddingDate)
      formData.append('guest_count', values.guestCount)
      formData.append('service_category', 'Wedding Planning - Hero Form')
      formData.append('subject', `New Wedding Planning Inquiry from ${values.name} (Hero Form)`)
      formData.append('form_source', 'Wedding Hero Section')

      // Submit to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        setIsFormSubmitted(true)
        toast({
          title: "Wedding Plan Request Sent!",
          description: "We'll get back to you with a custom proposal within 24 hours.",
        })
        form.reset()
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    }
  }

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
    <section className="bg-[#021631] relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="relative w-full h-full bg-[#021631]">
          {/* Desktop Image */}
          <motion.img
            src={ASSETS.weddingPlanning.hero}
            alt="Beautiful wedding ceremony setup"
            className="hidden md:block w-full h-full object-cover object-center"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 4,
              ease: "linear",
              type: "tween"
            }}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=1080&width=1920&text=Wedding+Ceremony"
            }}
          />

          {/* Mobile Vertical Image */}
          <motion.img
            src={ASSETS.weddingPlanning.heroV}
            alt="Beautiful wedding ceremony setup"
            className="block md:hidden w-full h-full object-cover object-center"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 4,
              ease: "linear",
              type: "tween"
            }}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=1920&width=1080&text=Wedding+Ceremony"
            }}
          />

          {/* Romantic gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-rose-900/70 via-black/40 to-purple-900/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8 lg:items-center lg:min-h-[calc(100vh-4rem)]">
          {/* Left Content */}
          <motion.div className="lg:col-span-2 text-white order-1 text-center lg:text-left min-h-screen lg:min-h-0 flex flex-col justify-center" variants={itemVariants}>
            <div className="flex flex-col justify-center items-center lg:items-start h-full">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 sm:mb-6 leading-tight drop-shadow-2xl"
                variants={itemVariants}
              >
                <motion.span
                  className="drop-shadow-2xl font-medium"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  This Day Happens Once.
                </motion.span>
                <br />
                <motion.span
                  className="drop-shadow-2xl font-medium"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  We Make Sure It Feels
                </motion.span>
                <br />
                <motion.span
                  className="text-[#bc9c22] bg-gradient-to-r font-medium from-[#bc9c22] to-[#d4af37] bg-clip-text text-transparent drop-shadow-2xl"
                  initial={{ opacity: 0, x: -30, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                >
                  Like Forever.
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl mb-6 sm:mb-8 font-extralight text-gray-200 max-w-2xl leading-relaxed drop-shadow-xl font-sans mx-auto lg:mx-0"
                variants={itemVariants}
              >
                From Mehendi to Vidaai, we plan every detail — so you can focus on the people, the rituals, and the memories.
              </motion.p>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div variants={formVariants} className="lg:col-span-1 order-2 w-full min-h-screen lg:min-h-0 flex flex-col justify-center p-4 lg:p-6">
            <Card className="bg-[#021631]/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 drop-shadow-2xl w-full max-w-md mx-auto lg:mx-0 lg:max-w-none rounded-2xl border border-white/10">
              <CardHeader className="text-center pb-4 px-8 pt-8">
                <CardTitle className="text-xl font-serif text-white drop-shadow-lg leading-tight">
                  Plan Your Dream Wedding
                </CardTitle>
                <p className="text-gray-300 text-sm mt-2 font-light">Get One Event Décor as a Wedding Gift If You Book Your Wedding With Us</p>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                {isFormSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.6, type: "spring", bounce: 0.4 }}
                      className="mb-6"
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-2xl font-serif text-white mb-4"
                    >
                      Thanks for filling the form!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="text-gray-300 text-lg"
                    >
                      We'll reach out to you in the next 12 hours.
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      onClick={() => setIsFormSubmitted(false)}
                      className="mt-6 px-6 py-2 bg-[#bc9c22] text-white rounded-lg hover:bg-[#bc9c22]/80 transition-colors duration-300"
                    >
                      Submit Another Request
                    </motion.button>
                  </motion.div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200 font-medium">Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} className="border-gray-500/50 bg-white/5 text-white focus:border-[#bc9c22] focus:ring-2 focus:ring-[#bc9c22]/20 transition-all duration-300 rounded-lg px-4 py-3 shadow-sm" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200 font-medium">Contact Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="Enter phone number" {...field} className="border-gray-500/50 bg-white/5 text-white focus:border-[#bc9c22] focus:ring-2 focus:ring-[#bc9c22]/20 transition-all duration-300 rounded-lg px-4 py-3 shadow-sm" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="weddingDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200 font-medium">Wedding Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                className="border-gray-500/50 bg-white/5 text-gray-200 focus:border-[#bc9c22] focus:ring-2 focus:ring-[#bc9c22]/20 transition-all duration-300 rounded-lg px-4 py-3 shadow-sm"
                                {...field}
                              />
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
                            <FormLabel className="text-gray-200 font-medium">Guest Count</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="border-gray-500/50 bg-white/5 text-gray-200 focus:border-[#bc9c22] focus:ring-2 focus:ring-[#bc9c22]/20 transition-all duration-300 rounded-lg px-4 py-3 shadow-sm">
                                  <SelectValue placeholder="Guest count" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#021631] text-gray-200 px-4 py-2 border-gray-500/50 rounded-lg shadow-xl">
                                  <SelectItem value="50-100">50-100 guests</SelectItem>
                                  <SelectItem value="101-200">101-200 guests</SelectItem>
                                  <SelectItem value="201-300">201-300 guests</SelectItem>
                                  <SelectItem value="301-500">301-500 guests</SelectItem>
                                  <SelectItem value="500+">500+ guests</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="pt-4"
                      >
                        <StarBorder
                          as="button"
                          type="submit"
                          className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                          color="#bc9c22"
                          speed="3s"
                        >
                          <span className="font-medium py-1">PLAN YOUR DREAM WEDDING</span>
                        </StarBorder>
                      </motion.div>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
} 