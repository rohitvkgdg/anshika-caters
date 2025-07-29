"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, TrendingUp, Camera, Users } from "lucide-react"

const features = [
    {
        title: "It Feels Personal",
        description: "We listen to your love story and create something that feels like you two. No cookie-cutter moments here.",
        icon: Heart,
        gradient: "from-rose-500 to-pink-500"
    },
    {
        title: "It's Trendy",
        description: "Modern, tasteful setups inspired by real proposal trends — not overdone clichés.",
        icon: TrendingUp,
        gradient: "from-purple-500 to-indigo-500"
    },
    {
        title: "It's Executed Like a Film Scene",
        description: "You don't just propose. You create a moment with pacing, mood, lighting, and story.",
        icon: Camera,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        title: "It's Handled With Love",
        description: "You stay focused on your partner and the moment. We stay behind the scenes making sure every beat hits perfectly.",
        icon: Users,
        gradient: "from-emerald-500 to-green-500"
    }
]

export function ProposalFeatures() {
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
                        We're Here to Help You{" "}
                        <span className="text-rose-500">Pull It Off</span>
                    </h2>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                >
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon
                        return (
                            <motion.div key={index} variants={itemVariants}>
                                <Card className="h-full text-center p-6 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group bg-white">
                                    <CardContent className="p-0">
                                        {/* Icon */}
                                        <motion.div
                                            className="flex justify-center mb-6"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-full text-white shadow-lg group-hover:shadow-xl transition-shadow duration-500`}>
                                                <IconComponent className="w-8 h-8" />
                                            </div>
                                        </motion.div>

                                        {/* Title */}
                                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors duration-300">
                                            {feature.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Bottom Quote Section */}
                <motion.div
                    className="mt-20 text-center"
                    variants={itemVariants}
                >
                    <div className="max-w-4xl mx-auto bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-12">
                        <motion.div
                            className="flex justify-center mb-6"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Heart className="w-12 h-12 text-rose-500" />
                        </motion.div>

                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                            You Just Focus on the Moment
                        </h3>

                        <p className="text-xl text-gray-700 mb-4 leading-relaxed">
                            You already know what you want to say.
                        </p>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            We're just here to make the space around that one sentence feel as big, warm, and beautiful as the love behind it.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}
