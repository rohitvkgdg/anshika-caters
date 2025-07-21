"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function WeddingEventsPage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <Heart className="w-16 h-16 text-[#bc9c22] mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Wedding Events
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Beautiful wedding planning and catering services coming soon. We specialize in creating magical moments for your special day.
          </p>
          <div className="space-y-4">
            <Link href="/corporate-events-varanasi">
              <Button className="bg-[#bc9c22] hover:bg-[#a08820] text-white font-semibold px-8 py-3 mr-4">
                View Corporate Events
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-[#bc9c22] text-[#bc9c22] hover:bg-[#bc9c22] hover:text-white px-8 py-3">
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      <WhatsAppFloat />
    </div>
  )
}
