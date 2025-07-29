"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, FileText, Lock, PartyPopper } from "lucide-react"

const steps = [
    {
        step: "Step 1",
        title: "Tell us the basics",
        description: "Even if you just know the date and guest count, that's enough to start.",
        icon: MessageCircle,
        gradient: "from-pink-500 to-purple-500"
    },
    {
        step: "Step 2",
        title: "Get your plan",
        description: "We send you a clear concept with theme, layout, menu, and costing.",
        icon: FileText,
        gradient: "from-purple-500 to-indigo-500"
    },
    {
        step: "Step 3",
        title: "Lock it in",
        description: "You confirm what feels right. We start prepping.",
        icon: Lock,
        gradient: "from-indigo-500 to-blue-500"
    },
    {
        step: "Step 4",
        title: "Show up and celebrate",
        description: "We handle the setup, flow, and coordination. You enjoy the day, fully present.",
        icon: PartyPopper,
        gradient: "from-blue-500 to-cyan-500"
    }
]

export function BirthdayProcess() {
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
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                        How It <span className="text-pink-500">Works</span>
                    </h2>
                </motion.div>

                {/* Steps Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                >
                    {steps.map((step, index) => {
                        const IconComponent = step.icon
                        return (
                            <motion.div key={index} variants={itemVariants}>
                                <Card className="h-full text-center p-6 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group bg-white relative overflow-hidden">
                                    {/* Background Pattern */}
                                    <div className="absolute inset-0 opacity-5">
                                        <div className={`w-full h-full bg-gradient-to-br ${step.gradient}`} />
                                    </div>

                                    <CardContent className="p-0 relative z-10">
                                        {/* Step Number */}
                                        <motion.div
                                            className="flex justify-center mb-4"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className={`bg-gradient-to-r ${step.gradient} w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-shadow duration-500`}>
                                                {index + 1}
                                            </div>
                                        </motion.div>

                                        {/* Icon */}
                                        <motion.div
                                            className="flex justify-center mb-4"
                                            whileHover={{ rotate: 10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="bg-gray-100 p-3 rounded-full group-hover:bg-gray-200 transition-colors duration-300">
                                                <IconComponent className="w-6 h-6 text-gray-700" />
                                            </div>
                                        </motion.div>

                                        {/* Step Label */}
                                        <p className="text-sm font-semibold text-pink-500 mb-2 uppercase tracking-wide">
                                            {step.step}
                                        </p>

                                        {/* Title */}
                                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors duration-300">
                                            {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    variants={itemVariants}
                >
                    <div className="max-w-2xl mx-auto">
                        <p className="text-xl text-gray-600 mb-8">
                            Ready to start planning an unforgettable birthday?
                        </p>
                        <motion.a
                            href="#hero"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <PartyPopper className="w-5 h-5" />
                            Start Planning Now
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}
