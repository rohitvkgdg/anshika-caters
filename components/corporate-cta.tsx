"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import StarBorder from "@/components/ui/StarBorder"
import { Phone, Mail, MapPin } from 'lucide-react'
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  eventDate: z.string().min(1, "Please select an event date"),
  guestCount: z.string().min(1, "Please specify guest count"),
  message: z.string().min(10, "Please provide more details about your event requirements"),
})

export function CorporateCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      eventDate: "",
      guestCount: "",
      message: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values)
      // Handle form submission here
      
      toast({
        title: "Event Planning Request Sent!",
        description: "We'll contact you soon to discuss your corporate event.",
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
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  }

  const contactInfo = [
    {
      icon: Phone,
      label: "Call Us",
      value: "+91 73111 29675",
      href: "tel:+917311129675"
    },
    {
      icon: Mail,
      label: "Email Us",
      value: "contact@acaterers.com",
      href: "mailto:contact@acaterers.com"
    },
    {
      icon: MapPin,
      label: "Service Area",
      value: "Serving All of Varanasi & Nearby Areas",
      href: null
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-[#021631]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-serif font-medium text-white mb-6"
          >
            Let's Make Your Next Corporate Event a <span className="text-[#bc9c22]">Success</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-sans font-light"
          >
            From setup to service, we handle it all — professionally, promptly, and with care.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="grid gap-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center space-x-4 text-white"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[#bc9c22]/20 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-[#bc9c22]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-400">{item.label}</div>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        className="text-lg font-medium hover:text-[#bc9c22] transition-colors text-white"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-lg font-medium text-white">{item.value}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="p-4 lg:p-6">
            <Card className="bg-[#0d223d]/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 drop-shadow-2xl rounded-2xl border border-white/10">
              <CardHeader className="text-center pb-4 px-8 pt-8">
                <CardTitle className="text-2xl font-serif text-white drop-shadow-lg">Plan My Event</CardTitle>
                <p className="text-gray-300 text-sm mt-2 font-light">Let's bring your corporate vision to life</p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200 font-medium">Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter company name" {...field} className="border-gray-500/50 bg-white/5 text-white focus:border-[#bc9c22] focus:ring-2 focus:ring-[#bc9c22]/20 transition-all duration-300 rounded-lg px-4 py-3 shadow-sm" />
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
                        name="eventDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200 font-medium">Event Date</FormLabel>
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
                                <SelectContent className="bg-[#0d223d] text-gray-200 border-gray-500/50 rounded-lg shadow-xl">
                                  <SelectItem value="10-25">10-25 attendees</SelectItem>
                                  <SelectItem value="26-50">26-50 attendees</SelectItem>
                                  <SelectItem value="51-100">51-100 attendees</SelectItem>
                                  <SelectItem value="101-200">101-200 attendees</SelectItem>
                                  <SelectItem value="201-500">201-500 attendees</SelectItem>
                                  <SelectItem value="500+">500+ attendees</SelectItem>
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
                          <FormLabel className="text-gray-200 font-medium">Event Details</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your event requirements..."
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
                        color="#bc9c22"
                        speed="3s"
                      >
                        <span className="font-medium py-1">PLAN MY EVENT</span>
                      </StarBorder>
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
