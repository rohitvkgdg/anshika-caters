"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import StarBorder from "@/components/ui/StarBorder"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, MapPin } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  partnerName: z.string().min(2, "Partner's name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  weddingDate: z.string().min(1, "Please select a wedding date"),
  guestCount: z.string().min(1, "Please specify guest count"),
})

export function WeddingCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      partnerName: "",
      phone: "",
      weddingDate: "",
      guestCount: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values)
      // Handle form submission here

      toast({
        title: "Wedding Plan Request Sent!",
        description: "We'll get back to you with a custom proposal within 24 hours.",
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
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 73111 29675",
      href: "tel:+917311129675"
    },
    {
      icon: Mail,
      label: "Email",
      value: "contact@acaterers.com",
      href: "mailto:contact@acaterers.com"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Based in Varanasi. Serving all nearby regions.",
      href: "#"
    }
  ]

  return (
    <section className="bg-[#021631] py-16 sm:py-20 md:py-24 text-white relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNiYzljMjIiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            This Day Happens Once.{" "}
            <motion.span
              className="text-[#bc9c22] bg-gradient-to-r from-[#bc9c22] to-[#d4af37] bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Let's Make It Effortless, Beautiful, and Full of Joy.
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            From haldi to vidaai — your family deserves to enjoy the day, not manage it.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {contactInfo.map((contact, index) => (
              <motion.div
                key={contact.label}
                className="flex items-center space-x-4 group"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-[#bc9c22]/20 rounded-xl flex items-center justify-center group-hover:bg-[#bc9c22]/30 transition-colors duration-300">
                  <contact.icon className="w-6 h-6 text-[#bc9c22]" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-medium">{contact.label}</div>
                  {contact.href !== "#" ? (
                    <a 
                      href={contact.href} 
                      className="text-lg sm:text-xl text-white hover:text-[#bc9c22] transition-colors duration-300 font-light"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <div className="text-lg sm:text-xl text-white font-light">
                      {contact.value}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Final Lead Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Card className="bg-white/10 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-2xl border border-white/20">
              <CardHeader className="text-center pb-4 px-8 pt-8">
                <CardTitle className="text-2xl font-serif text-white leading-tight">
                  Plan My Wedding
                </CardTitle>
                <p className="text-gray-300 text-sm mt-2 font-light">Get your personalized wedding proposal</p>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200 font-medium">Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} className="border-gray-500/50 bg-white/5 text-white focus:border-[#bc9c22] focus:ring-2 focus:ring-[#bc9c22]/20 transition-all duration-300 rounded-lg px-4 py-3" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="partnerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-200 font-medium">Partner's Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Partner's name" {...field} className="border-gray-500/50 bg-white/5 text-white focus:border-[#bc9c22] focus:ring-2 focus:ring-[#bc9c22]/20 transition-all duration-300 rounded-lg px-4 py-3" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200 font-medium">Contact Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Enter phone number" {...field} className="border-gray-500/50 bg-white/5 text-white focus:border-[#bc9c22] focus:ring-2 focus:ring-[#bc9c22]/20 transition-all duration-300 rounded-lg px-4 py-3" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                className="border-gray-500/50 bg-white/5 text-gray-200 focus:border-[#bc9c22] focus:ring-2 focus:ring-[#bc9c22]/20 transition-all duration-300 rounded-lg px-4 py-3"
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
                                <SelectTrigger className="border-gray-500/50 bg-white/5 text-gray-200 focus:border-[#bc9c22] focus:ring-2 focus:ring-[#bc9c22]/20 transition-all duration-300 rounded-lg px-4 py-3">
                                  <SelectValue placeholder="Guest count" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#2d1b69] text-gray-200 border-gray-500/50 rounded-lg shadow-xl">
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
                    </div>

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
                        <span className="font-medium py-1">PLAN MY WEDDING</span>
                      </StarBorder>
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 