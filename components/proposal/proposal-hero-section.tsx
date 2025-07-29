"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { ASSETS } from "@/lib/assets"
import { Heart, Sparkles } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    eventDate: z.string().min(1, "Please select your special day"),
    vibe: z.string().min(1, "Please select your preferred vibe"),
})

export function ProposalHeroSection() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            eventDate: "",
            vibe: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values)
            // Handle form submission here

            toast({
                title: "Perfect! Let's Create Magic ✨",
                description: "We'll reach out within 24 hours to plan your unforgettable moment.",
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
                duration: 1,
                staggerChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut" as const,
            },
        },
    }

    const formVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut" as const,
            },
        },
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 2, ease: "easeOut" }}
            >
                <div className="relative w-full h-full bg-[#1a1a1a]">
                    <motion.img
                        src={ASSETS.proposal.hero}
                        alt="Romantic proposal setup"
                        className="w-full h-full object-cover object-center"
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{
                            duration: 4,
                            ease: "linear",
                            type: "tween"
                        }}
                        onError={(e) => {
                            console.error(`Failed to load image: ${ASSETS.proposal.hero}`)
                            e.currentTarget.src = "/placeholder.svg?height=1080&width=1920&text=Proposal+Setup"
                        }}
                    />

                    {/* Romantic gradient overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-rose-900/60 via-black/40 to-purple-900/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                    />
                </div>
            </motion.div>

            {/* Content Container */}
            <motion.div
                className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8 lg:items-center lg:min-h-[calc(100vh-4rem)]">
                    {/* Left Content */}
                    <motion.div className="lg:col-span-2 text-white order-1 text-center lg:text-left min-h-screen lg:min-h-0 flex flex-col justify-center" variants={itemVariants}>
                        <div className="flex flex-col justify-center items-center lg:items-start h-full">
                            <motion.div
                                className="flex items-center gap-2 mb-4"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <Heart className="w-8 h-8 text-rose-400" />
                                <Sparkles className="w-6 h-6 text-yellow-400" />
                            </motion.div>

                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 sm:mb-6 leading-tight drop-shadow-2xl"
                                variants={itemVariants}
                            >
                                <motion.span
                                    className="drop-shadow-2xl font-medium"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                >
                                    When You Ask,
                                </motion.span>
                                <br />
                                <motion.span
                                    className="text-rose-300 bg-gradient-to-r font-medium from-rose-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl"
                                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                                >
                                    Make It Unforgettable
                                </motion.span>
                            </motion.h1>

                            <motion.p
                                className="text-lg sm:text-xl mb-6 sm:mb-8 font-extralight text-gray-200 max-w-2xl leading-relaxed drop-shadow-xl font-sans mx-auto lg:mx-0"
                                variants={itemVariants}
                            >
                                We design proposals so magical, saying yes becomes the only answer.
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Right Form */}
                    <motion.div variants={formVariants} className="lg:col-span-1 order-2 w-full min-h-screen lg:min-h-0 flex flex-col justify-center p-4 lg:p-6">
                        <Card className="bg-rose-900/20 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 drop-shadow-2xl w-full max-w-md mx-auto lg:mx-0 lg:max-w-none rounded-2xl border border-rose-300/20">
                            <CardHeader className="text-center pb-4 px-8 pt-8">
                                <motion.div
                                    className="flex justify-center mb-2"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 1 }}
                                >
                                    <div className="bg-rose-500/20 p-2 rounded-full">
                                        <Heart className="w-6 h-6 text-rose-300" />
                                    </div>
                                </motion.div>
                                <CardTitle className="text-xl font-serif text-white drop-shadow-lg leading-tight">
                                    We'll help plan your perfect proposal
                                </CardTitle>
                                <p className="text-rose-200 text-sm mt-2 font-light">Just start here:</p>
                                <motion.div
                                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full mt-2 inline-block"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 1.2 }}
                                >
                                    ✨ Propose perfectly — with 20% off your first event!
                                </motion.div>
                            </CardHeader>
                            <CardContent className="px-6 pb-6">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-rose-100 font-medium">Your Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter your name"
                                                            {...field}
                                                            className="bg-white/10 border-rose-300/30 text-white placeholder:text-gray-300 focus:border-rose-400 focus:ring-rose-400/20 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-rose-300 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-rose-100 font-medium">Contact Number</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="+91 XXXXX XXXXX"
                                                            {...field}
                                                            className="bg-white/10 border-rose-300/30 text-white placeholder:text-gray-300 focus:border-rose-400 focus:ring-rose-400/20 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-rose-300 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="eventDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-rose-100 font-medium">Choose Your Special Day</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="date"
                                                            {...field}
                                                            className="bg-white/10 border-rose-300/30 text-white placeholder:text-gray-300 focus:border-rose-400 focus:ring-rose-400/20 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-rose-300 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="vibe"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-rose-100 font-medium">What kind of vibe are you thinking?</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="bg-white/10 border-rose-300/30 text-white focus:border-rose-400 focus:ring-rose-400/20 rounded-lg">
                                                                <SelectValue placeholder="Select your vibe" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="bg-rose-950 border-rose-800">
                                                            <SelectItem value="romantic-ghat" className="text-white focus:bg-rose-800">Romantic Ghat-side</SelectItem>
                                                            <SelectItem value="rooftop-stars" className="text-white focus:bg-rose-800">Rooftop Under Stars</SelectItem>
                                                            <SelectItem value="drone-show" className="text-white focus:bg-rose-800">Drone Show</SelectItem>
                                                            <SelectItem value="private-concert" className="text-white focus:bg-rose-800">Private Concert</SelectItem>
                                                            <SelectItem value="story-game" className="text-white focus:bg-rose-800">Story/Game Theme</SelectItem>
                                                            <SelectItem value="intimate-simple" className="text-white focus:bg-rose-800">Intimate & Simple</SelectItem>
                                                            <SelectItem value="other" className="text-white focus:bg-rose-800">Something Else</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-rose-300 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                                disabled={form.formState.isSubmitting}
                                            >
                                                {form.formState.isSubmitting ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Planning Magic...
                                                    </div>
                                                ) : (
                                                    "Let's Plan the Moment ✨"
                                                )}
                                            </Button>
                                        </motion.div>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
