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
import { Gift, Phone, Mail, MapPin, Cake, Clock } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    celebrationFor: z.string().min(1, "Please select who the celebration is for"),
    birthdayDate: z.string().min(1, "Please select the birthday date"),
})

export function BirthdayCTA() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            celebrationFor: "",
            birthdayDate: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values)
            // Handle form submission here

            toast({
                title: "Perfect! Let's Plan an Amazing Birthday! 🎉",
                description: "We'll reach out within 24 hours to start planning the celebration.",
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
        <section className="py-20 bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 relative overflow-hidden">
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
                            <Cake className="w-8 h-8 text-pink-300" />
                            <Gift className="w-8 h-8 text-purple-300" />
                            <Cake className="w-8 h-8 text-pink-300" />
                        </div>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                        Let's Make This One
                        <br />
                        <span className="text-pink-300">Feel Special</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <motion.div variants={itemVariants}>
                        <div className="text-white space-y-8">
                            <h3 className="text-2xl font-serif font-bold mb-6">Get in Touch</h3>

                            <div className="space-y-6">
                                <motion.a
                                    href="tel:+917311129675"
                                    className="flex items-center gap-4 text-lg hover:text-pink-300 transition-colors duration-300 group"
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="bg-pink-500/20 p-3 rounded-full group-hover:bg-pink-500/30 transition-colors duration-300">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Call</div>
                                        <div className="text-pink-200">+91 73111 29675</div>
                                    </div>
                                </motion.a>

                                <motion.a
                                    href="mailto:contact@acaterers.com"
                                    className="flex items-center gap-4 text-lg hover:text-purple-300 transition-colors duration-300 group"
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="bg-purple-500/20 p-3 rounded-full group-hover:bg-purple-500/30 transition-colors duration-300">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Email</div>
                                        <div className="text-purple-200">contact@acaterers.com</div>
                                    </div>
                                </motion.a>

                                <motion.div
                                    className="flex items-center gap-4 text-lg"
                                    variants={itemVariants}
                                >
                                    <div className="bg-indigo-500/20 p-3 rounded-full">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Location</div>
                                        <div className="text-indigo-200">Based in Varanasi | Limited dates available</div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="flex items-center gap-4 text-lg"
                                    variants={itemVariants}
                                >
                                    <div className="bg-yellow-500/20 p-3 rounded-full">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-yellow-200">Limited Time Offer</div>
                                        <div className="text-yellow-100 text-sm">20% off your first event booking!</div>
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
                                    <div className="bg-pink-500/20 p-2 rounded-full">
                                        <Cake className="w-6 h-6 text-pink-300" />
                                    </div>
                                </motion.div>
                                <CardTitle className="text-xl font-serif text-white leading-tight">
                                    Ready to Plan Your Birthday?
                                </CardTitle>
                                <motion.div
                                    className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full mt-2 inline-block"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                    viewport={{ once: true }}
                                >
                                    🎁 Get a flat 20% off as a birthday gift on your first event booking with us!
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
                                                    <FormLabel className="text-purple-100 font-medium">Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter your name"
                                                            {...field}
                                                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-pink-400 focus:ring-pink-400/20 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-pink-300 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-purple-100 font-medium">Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="+91 XXXXX XXXXX"
                                                            {...field}
                                                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-pink-400 focus:ring-pink-400/20 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-pink-300 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="celebrationFor"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-purple-100 font-medium">Who's the celebration for?</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-pink-400 focus:ring-pink-400/20 rounded-lg">
                                                                <SelectValue placeholder="Select celebration for" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="bg-purple-950 border-purple-800">
                                                            <SelectItem value="my-kid" className="text-white focus:bg-purple-800">My kid</SelectItem>
                                                            <SelectItem value="my-partner" className="text-white focus:bg-purple-800">My partner</SelectItem>
                                                            <SelectItem value="my-parent" className="text-white focus:bg-purple-800">My parent</SelectItem>
                                                            <SelectItem value="myself" className="text-white focus:bg-purple-800">Myself</SelectItem>
                                                            <SelectItem value="someone-else" className="text-white focus:bg-purple-800">Someone else</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-pink-300 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="birthdayDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-purple-100 font-medium">Birthday Date</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="date"
                                                            {...field}
                                                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-pink-400 focus:ring-pink-400/20 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-pink-300 text-xs" />
                                                </FormItem>
                                            )}
                                        />

                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                                disabled={form.formState.isSubmitting}
                                            >
                                                {form.formState.isSubmitting ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Planning...
                                                    </div>
                                                ) : (
                                                    "Plan My Birthday 🎉"
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
