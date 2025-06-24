import { ChefHat, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#021631] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={"/AC.png"} alt="Anshika Caters Logo" width={80} height={80} className="rounded-full" />
              <span className="text-2xl font-serif font-bold">Anshika Caters</span>
            </Link>
            <p className="text-gray-300">Creating unforgettable culinary experiences for your most precious moments.</p>
            <div className="flex space-x-4">
              <Instagram className="w-5 h-5 text-[#bc9c22] hover:text-white cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-[#bc9c22] hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-[#bc9c22] hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-serif text-[#bc9c22] mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/wedding-packages" className="hover:text-[#bc9c22]">
                  Wedding Catering
                </Link>
              </li>
              <li>
                <Link href="/corporate-events" className="hover:text-[#bc9c22]">
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link href="/private-parties" className="hover:text-[#bc9c22]">
                  Private Parties
                </Link>
              </li>
              <li>
                <Link href="/menu-builder" className="hover:text-[#bc9c22]">
                  Custom Menus
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif text-[#bc9c22] mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-[#bc9c22]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#bc9c22]">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-[#bc9c22]">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#bc9c22]">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif text-[#bc9c22] mb-4">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-[#bc9c22]" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-[#bc9c22]" />
                <span>hello@anshikacaters.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-[#bc9c22] mt-1" />
                <span>
                  123 Culinary Street
                  <br />
                  Mumbai, India 400001
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-serif text-[#bc9c22] mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4 text-sm">Get exclusive offers and wedding catering tips delivered to your inbox.</p>
            <div className="space-y-3">
              <Input 
                placeholder="Enter your email" 
                type="email"
                className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400"
              />
              <Button 
                size="sm" 
                className="w-full bg-[#bc9c22] hover:bg-[#a08820] text-[#021631] font-semibold"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Anshika Caters. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-[#bc9c22] text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-[#bc9c22] text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
