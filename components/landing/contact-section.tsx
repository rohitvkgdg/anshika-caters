"use client"

import StarBorder from "@/components/ui/StarBorder"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Calendar } from 'lucide-react'
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  weddingDate: z.string().min(1, "Please select a wedding date"),
  guestCount: z.string().min(1, "Please specify guest count"),
  message: z.string().min(10, "Please provide more details about your requirements"),
})

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      weddingDate: "",
      guestCount: "",
      message: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values)
      // Handle form submission here
      // You can integrate with your backend API
      
      toast({
        title: "Booking Request Sent!",
        description: "We'll contact you within 24 hours to schedule your tasting session.",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  }

  const contactInfoVariants = {
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

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section className="py-20 bg-[#021631]" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 drop-shadow-lg">
            Start Planning{" "}
            <motion.span
              className="text-[#bc9c22] drop-shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Your Perfect Event
            </motion.span>
          </h2>
          <motion.p
            className="text-lg text-gray-400 max-w-3xl mx-auto drop-shadow-sm font-sans font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            From weddings to corporate celebrations — we handle it all with flawless planning, elegant décor, and unforgettable cuisine.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid bg- lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Contact Form */}
          <motion.div variants={formVariants}>
            <Card className="bg-[#0d223d]/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 drop-shadow-lg rounded-xl border border-gray-500/20">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-serif text-white drop-shadow-sm">Get Started Today</CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200 font-medium">Name</FormLabel>
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
                            <FormLabel className="text-gray-200 font-medium">Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="Enter phone number" {...field} className="border-gray-500/50 bg-white/5 text-white focus:border-[#bc9c22] focus:ring-2 focus:ring-[#bc9c22]/20 transition-all duration-300 rounded-lg px-4 py-3 shadow-sm" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                  <SelectValue placeholder="Select guest count" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0d223d] text-gray-200 border-gray-500/50 rounded-lg shadow-xl">
                                  <SelectItem value="1-50">1-50 guests</SelectItem>
                                  <SelectItem value="51-100">51-100 guests</SelectItem>
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
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200 font-medium">Tell us about your dream wedding</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Share your vision, dietary requirements, special requests, and any other details..."
                              className="border-gray-500/50 bg-white/5 text-white min-h-[120px] focus:border-[#bc9c22] focus:ring-2 focus:ring-[#bc9c22]/20 transition-all duration-300 resize-none rounded-lg px-4 py-3 shadow-sm"
                              {...field}
                              autoComplete="off"
                              style={{ resize: 'none' }}
                            />
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
                        color="#ffd700"
                        speed="3s"
                      >
                        <span className="font-medium py-1">BOOK REQUEST</span>
                      </StarBorder>
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div className="space-y-8" variants={contactInfoVariants}>
            <Card className="border-0 shadow-lg bg-[#0d223d] hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                {[
                  { icon: Phone, title: "Call Us", info: "+91 73111 29675" },
                  { icon: Mail, title: "Email Us", info: "contact@acaterers.com" },
                  { icon: MapPin, title: "Visit Us", info: "C-32/47, Chandua Chhitupur, Vidya Vihar Colony, Shivpurwa, Varanasi, Uttar Pradesh, India" },
                  { icon: Calendar, title: "Business Hours", info: "Mon-Sat: 9AM-8PM, Sun: 10AM-6PM" },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center mb-4 group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <contact.icon className="w-6 h-6 text-[#bc9c22] mr-4 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                    <div>
                      <div className="font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                        {contact.title}
                      </div>
                      <div className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                        {contact.info}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <motion.div
              className="bg-[#0d223d] text-white p-8 rounded-lg relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#bc9c22]/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              <h3 className="text-2xl font-serif mb-4 text-[#bc9c22] relative z-10">Limited Availability</h3>
              <p className="mb-4 relative z-10">Only limited bookings left for Winter '25 season. Secure your date today!</p>
              <div className="text-sm text-gray-300 relative z-10">
                *Complimentary tasting sessions available for bookings above ₹2 lakhs
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
