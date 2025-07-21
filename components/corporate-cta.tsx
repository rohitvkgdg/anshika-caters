"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
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
  contact: z.string().min(10, "Please enter a valid contact number"),
  date: z.string().min(1, "Please select a date"),
  guestCount: z.string().min(1, "Please specify guest count"),
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
      contact: "",
      date: "",
      guestCount: "",
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
    <section ref={ref} className="py-24 bg-gradient-to-br from-[#bc9c22] to-[#a08820]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            Let's Make Your Next Corporate Event a <span className="text-yellow-200">Success</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
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
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/80">{item.label}</div>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        className="text-lg font-semibold hover:text-yellow-200 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-lg font-semibold">{item.value}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white shadow-2xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Plan My Event
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
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
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your contact number" {...field} />
                          </FormControl>
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
                          Plan My Event
                        </Button>
                      </StarBorder>
                    </div>
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
