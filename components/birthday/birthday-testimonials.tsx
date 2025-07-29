"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"

const testimonials = [
    {
        quote: "They made it feel like me without me having to explain much. Just got it.",
        name: "Aayushi",
        context: "Planned her own birthday",
        gradient: "from-pink-500 to-purple-500"
    },
    {
        quote: "It was emotional, elegant, and calm — exactly what my dad would've loved. They made it feel personal.",
        name: "Kunal",
        context: "Planned for his father",
        gradient: "from-purple-500 to-indigo-500"
    },
    {
        quote: "It looked like a Pinterest board, but in real life. Everyone asked who did it.",
        name: "Reetika",
        context: "Planned for her son",
        gradient: "from-indigo-500 to-blue-500"
    }
]

export function BirthdayTestimonials() {
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
        <section className="py-20 bg-white">
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
                        <div className="bg-pink-100 p-3 rounded-full">
                            <Star className="w-8 h-8 text-pink-500" />
                        </div>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                        What <span className="text-pink-500">Hosts</span> Say
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
                                <CardContent className="p-8 text-center h-full flex flex-col">
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
                                    <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed italic flex-grow">
                                        "{testimonial.quote}"
                                    </blockquote>

                                    {/* Author Info */}
                                    <div className="mt-auto">
                                        <div className="flex items-center justify-center mb-2">
                                            <div className={`w-10 h-10 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold`}>
                                                {testimonial.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div className="font-semibold text-gray-900 mb-1">— {testimonial.name}</div>
                                        <div className="text-sm text-gray-500">({testimonial.context})</div>
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
                            Ready to create your own memorable celebration?
                        </p>
                        <motion.a
                            href="#hero"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Star className="w-5 h-5" />
                            Start Your Birthday Planning
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}
