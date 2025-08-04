"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ASSETS } from "@/lib/assets"
import { Heart, Star, Sparkles, Music, Film, Home } from "lucide-react"

const proposalTypes = [
    {
        title: "Ghat-Side at Sunset",
        description: "A floral aisle, the Ganga shimmering beside you, and the sun dipping just low enough to frame the question.",
        image: ASSETS.proposal.ghatSideSunset,
        icon: Heart,
        gradient: "from-orange-500/20 to-rose-500/20"
    },
    {
        title: "Rooftop Under the Stars",
        description: "Your favorite playlist, fairy lights above, and that one breathtaking moment under an open sky.",
        image: ASSETS.proposal.rooftopStars,
        icon: Star,
        gradient: "from-purple-500/20 to-blue-500/20"
    },
    {
        title: "Drone Show Over the City",
        description: "Your story in the stars told in light, framed in silence, and ending with a \"Yes\" lit up above you both.",
        image: ASSETS.proposal.droneShow,
        icon: Sparkles,
        gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
        title: "A Private Concert Just for Two",
        description: "Your Favorite Songs. Live. Played softly as you walk them into the setup. A moment they'll relive in every beat forever.",
        image: ASSETS.proposal.privateConcert,
        icon: Music,
        gradient: "from-rose-500/20 to-pink-500/20"
    },
    {
        title: "A Film. A Game. A Story",
        description: "Your love turned into a scavenger hunt, a short movie, a flipped book and a surprise they never saw coming.",
        image: ASSETS.proposal.filmGame,
        icon: Film,
        gradient: "from-indigo-500/20 to-purple-500/20"
    },
    {
        title: "Something Intimate and Simple",
        description: "No lights. No crowd. Just you, a quiet space, and a question waiting at the end of a perfect evening.",
        image: ASSETS.proposal.intimateSimple,
        icon: Home,
        gradient: "from-green-500/20 to-emerald-500/20"
    }
]

export function ProposalTypes() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1,
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
                        Make It Magical in a Way That{" "}
                        <span className="text-rose-500">Feels Like You</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        There's no one right way to propose, only your way. We're here to help shape it, plan it, and set the scene exactly how you imagined.
                    </p>
                </motion.div>

                {/* Proposal Types Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                >
                    {proposalTypes.map((proposal, index) => {
                        const IconComponent = proposal.icon
                        return (
                            <motion.div key={index} variants={itemVariants}>
                                <Card className="group h-full overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 border-0 shadow-lg">
                                    <div className="relative overflow-hidden">
                                        <motion.img
                                            src={proposal.image}
                                            alt={proposal.title}
                                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.currentTarget.src = "/placeholder.svg?height=400&width=600&text=Proposal+Setup"
                                            }}
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t ${proposal.gradient} opacity-60`} />

                                        {/* Icon Overlay */}
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                                                <IconComponent className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors duration-300">
                                            {proposal.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {proposal.description}
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
                    <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                        <div className="flex justify-center mb-4">
                            <div className="flex gap-2">
                                <Sparkles className="w-6 h-6 text-rose-400" />
                                <Heart className="w-6 h-6 text-pink-400" />
                                <Sparkles className="w-6 h-6 text-rose-400" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                            Can't decide? Let's talk.
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Every love story is unique. We'll help you find the perfect way to ask the most important question of your life.
                        </p>
                        <motion.a
                            href="tel:+917311129675"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Heart className="w-4 h-4" />
                            Call Us Now
                        </motion.a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}
