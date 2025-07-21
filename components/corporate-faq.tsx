"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function CorporateFAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const faqs = [
    {
      question: "Do you only serve in Varanasi?",
      answer: "Yes, we offer full-service event planning and catering across all of Varanasi."
    },
    {
      question: "Can we include our branding in the event setup?",
      answer: "Absolutely. We offer branded welcome counters, signage, and custom packaging to incorporate your company's branding throughout the event."
    },
    {
      question: "Is your service available for small office gatherings?",
      answer: "Yes, we handle everything from intimate business lunches to large-scale events. No event is too small or too big for our professional team."
    },
    {
      question: "Do you help with finding venues?",
      answer: "Yes, we're partnered with top venues across Varanasi and help you choose the right fit for your event type, guest count, and budget requirements."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6"
          >
            Frequently Asked <span className="text-[#bc9c22]">Questions</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Get answers to common questions about our corporate event services
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-white shadow-lg rounded-lg border-0 overflow-hidden"
                >
                  <AccordionTrigger className="px-8 py-6 text-left text-lg font-semibold text-gray-900 hover:text-[#bc9c22] transition-colors [&[data-state=open]]:text-[#bc9c22]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
