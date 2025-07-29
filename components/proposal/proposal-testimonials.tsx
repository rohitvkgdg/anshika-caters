"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Heart } from "lucide-react"

const testimonials = [
    {
        quote: "I proposed under a canopy of lights, near the river. Her exact words were 'I didn't even need to think.'",
        name: "Kunal",
        gradient: "from-rose-500 to-pink-500"
    },
    {
        quote: "We had a rooftop setup with candles, music, and just the two of us. I didn't even finish asking before she said yes.",
        name: "Devansh",
        gradient: "from-purple-500 to-indigo-500"
    },
    {
        quote: "We told our story through photos on a wall. At the end was a small table with the ring. She cried before I even got on one knee.",
        name: "Arnav",
        gradient: "from-blue-500 to-cyan-500"
    }
]

export function ProposalTestimonials() {
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
        <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
            <motion.div
                className="container mx-auto px-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Section Header */}
                <motion.div className="text-center mb-16" variants={itemVariants}>
                    <motion.div
                        className="flex justify-center mb-4"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-rose-100 p-3 rounded-full">
                            <Heart className="w-8 h-8 text-rose-500" />
                        </div>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                        What Others Have Whispered{" "}
                        <span className="text-rose-500">"Yes"</span> To
                    </h2>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                    variants={containerVariants}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                                <CardContent className="p-8 text-center">
                                    {/* Quote Icon */}
                                    <motion.div
                                        className="flex justify-center mb-6"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className={`bg-gradient-to-r ${testimonial.gradient} p-3 rounded-full text-white shadow-lg`}>
                                            <Quote className="w-6 h-6" />
                                        </div>
                                    </motion.div>

                                    {/* Quote */}
                                    <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                                        "{testimonial.quote}"
                                    </blockquote>

                                    {/* Name */}
                                    <div className="flex items-center justify-center">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                                                {testimonial.name.charAt(0)}
                                            </div>
                                            <span className="font-semibold text-gray-900">— {testimonial.name}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    variants={itemVariants}
                >
                    <div className="max-w-2xl mx-auto">
                        <p className="text-xl text-gray-600 mb-8">
                            Ready to create your own unforgettable moment?
                        </p>
                        <motion.a
                            href="#hero"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Heart className="w-5 h-5" />
                            Start Planning Your Proposal
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}
