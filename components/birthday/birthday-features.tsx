"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ASSETS } from "@/lib/assets"
import { Palette, UtensilsCrossed, Gift, Heart, Calendar } from "lucide-react"

const features = [
    {
        title: "Aesthetic Decor That Fits the Vibe",
        description: "From playful to elegant, we style the space so it feels personal and looks amazing.",
        image: ASSETS.birthday.aestheticDecor,
        icon: Palette,
        gradient: "from-pink-500/20 to-purple-500/20"
    },
    {
        title: "Food People Actually Talk About",
        description: "From live counters to curated menus, everything is tailored to your guest list.",
        image: ASSETS.birthday.foodTalkAbout,
        icon: UtensilsCrossed,
        gradient: "from-orange-500/20 to-red-500/20"
    },
    {
        title: "Thoughtful Return Gifts",
        description: "Curated gifts that your guests actually appreciate — useful, stylish, and theme-aligned.",
        image: ASSETS.birthday.returnGifts,
        icon: Gift,
        gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
        title: "Moments That Feel Personal",
        description: "Well-timed surprises, a beautiful cake reveal, the right lighting at the right time — it all adds up to something unforgettable.",
        image: ASSETS.birthday.personalMoments,
        icon: Heart,
        gradient: "from-rose-500/20 to-pink-500/20"
    },
    {
        title: "Smooth Planning, Start to Finish",
        description: "You tell us what you want. We make it happen on the best budget. No last-minute chaos.",
        image: ASSETS.birthday.smoothPlanning,
        icon: Calendar,
        gradient: "from-blue-500/20 to-cyan-500/20"
    }
]

export function BirthdayFeatures() {
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
        <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
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
                            <Gift className="w-8 h-8 text-pink-500" />
                        </div>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                        What We Bring to the{" "}
                        <span className="text-pink-500">Party</span>
                    </h2>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                >
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={index === 4 ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""}
                            >
                                <Card className="group h-full overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 border-0 shadow-lg">
                                    <div className="relative overflow-hidden">
                                        <motion.img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                console.error(`Failed to load image: ${feature.image}`)
                                                e.currentTarget.src = "/placeholder.svg?height=400&width=600&text=Birthday+Feature"
                                            }}
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-60`} />

                                        {/* Icon Overlay */}
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                                                <IconComponent className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </motion.div>
        </section>
    )
}
