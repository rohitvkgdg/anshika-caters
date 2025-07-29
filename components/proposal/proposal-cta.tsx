"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"
import { Heart, Phone, Mail, MapPin, Sparkles } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    partnerName: z.string().min(2, "Partner's name is required"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    eventDate: z.string().min(1, "Please select your special day"),
    vibe: z.string().min(1, "Please select your preferred vibe"),
})

export function ProposalCTA() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            partnerName: "",
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
        <section className="py-20 bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <motion.div
                className="container mx-auto px-4 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Main CTA Header */}
                <motion.div className="text-center mb-16" variants={itemVariants}>
                    <motion.div
                        className="flex justify-center mb-6"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex gap-2">
                            <Sparkles className="w-8 h-8 text-rose-300" />
                            <Heart className="w-8 h-8 text-pink-300" />
                            <Sparkles className="w-8 h-8 text-rose-300" />
                        </div>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                        This Day Happens Once.
                        <br />
                        <span className="text-rose-300">Let's Make It Effortless, Beautiful,</span>
                        <br />
                        <span className="text-pink-300">and Full of Joy.</span>
                    </h2>
                    <p className="text-xl text-rose-100 max-w-3xl mx-auto leading-relaxed">
                        From haldi to vidaai — your family deserves to enjoy the day, not manage it.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <motion.div variants={itemVariants}>
                        <div className="text-white space-y-8">
                            <h3 className="text-2xl font-serif font-bold mb-6">Get in Touch</h3>

                            <div className="space-y-6">
                                <motion.a
                                    href="tel:+917311129675"
                                    className="flex items-center gap-4 text-lg hover:text-rose-300 transition-colors duration-300 group"
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="bg-rose-500/20 p-3 rounded-full group-hover:bg-rose-500/30 transition-colors duration-300">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Call Us</div>
                                        <div className="text-rose-200">+91 73111 29675</div>
                                    </div>
                                </motion.a>

                                <motion.a
                                    href="mailto:contact@acaterers.com"
                                    className="flex items-center gap-4 text-lg hover:text-rose-300 transition-colors duration-300 group"
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="bg-pink-500/20 p-3 rounded-full group-hover:bg-pink-500/30 transition-colors duration-300">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Email Us</div>
                                        <div className="text-pink-200">contact@acaterers.com</div>
                                    </div>
                                </motion.a>

                                <motion.div
                                    className="flex items-center gap-4 text-lg"
                                    variants={itemVariants}
                                >
                                    <div className="bg-purple-500/20 p-3 rounded-full">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Location</div>
                                        <div className="text-purple-200">Based in Varanasi. Serving all nearby regions.</div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Final Lead Form */}
                    <motion.div variants={itemVariants}>
                        <Card className="bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 rounded-2xl">
                            <CardHeader className="text-center pb-4">
                                <motion.div
                                    className="flex justify-center mb-2"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="bg-rose-500/20 p-2 rounded-full">
                                        <Heart className="w-6 h-6 text-rose-300" />
                                    </div>
                                </motion.div>
                                <CardTitle className="text-xl font-serif text-white leading-tight">
                                    Ready to Create Something Beautiful?
                                </CardTitle>
                                <motion.div
                                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full mt-2 inline-block"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                    viewport={{ once: true }}
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
                                                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-rose-400 focus:ring-rose-400/20 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-rose-300 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="partnerName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-rose-100 font-medium">Partner's Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter your partner's name"
                                                            {...field}
                                                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-rose-400 focus:ring-rose-400/20 rounded-lg"
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
                                                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-rose-400 focus:ring-rose-400/20 rounded-lg"
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
                                                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-rose-400 focus:ring-rose-400/20 rounded-lg"
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
                                                            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-rose-400 focus:ring-rose-400/20 rounded-lg">
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
