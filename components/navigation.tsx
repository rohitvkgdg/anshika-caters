"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { 
  Navbar, 
  NavBody, 
  MobileNav, 
  MobileNavHeader, 
  MobileNavMenu, 
  MobileNavToggle 
} from "@/components/ui/resizable-navbar"
import { useLoading } from "@/components/loading-context"
import { useLenis } from "@/hooks/use-lenis"
import { ASSETS } from "@/lib/assets"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false)
  const { setIsLoading } = useLoading()
  const { scrollTo } = useLenis()
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Gallery", link: "#gallery" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Contact", link: "#contact" },
  ]

  const eventTypes = [
    { name: "Corporate Events", href: "/corporate-events-varanasi", description: "Professional business events and catering" },
    { name: "Wedding Events", href: "/wedding-events-varanasi", description: "Beautiful wedding ceremonies and receptions" },
    { name: "Personal Celebrations", href: "/personal-events-varanasi", description: "Birthdays, anniversaries, and special occasions" },
    { name: "View All Events", href: "/events", description: "Explore our complete event portfolio" },
  ]

  const handleMobileItemClick = () => {
    setIsOpen(false)
  }

  const handleLogoClick = () => {
    router.push("/")
  }

  const handleNavItemClick = (item: typeof navItems[0]) => {
    if (item.link === "/") {
      // Navigate to home page
      router.push("/")
    } else if (item.link.startsWith("#")) {
      // For section links like #gallery, #testimonials, #contact
      if (pathname === "/") {
        // Already on home page, just scroll to section
        scrollTo(item.link)
      } else {
        // On different page, navigate to home page with hash
        router.push(`/${item.link}`)
      }
    } else {
      // For other links, just scroll
      scrollTo(item.link)
    }
  }

  return (
    <Navbar className="fixed top-0 z-50">
      {/* Desktop Navigation */}
      <NavBody className="bg-transparent/30 shadow-2xl border border-white/10">
        {/* Logo */}
        <motion.div 
          className="relative z-20 drop-shadow-md"
          whileHover={{ scale: 1.05 }} 
          transition={{ duration: 0.2 }}
        >
          <button onClick={handleLogoClick} className="flex items-center space-x-2">
            <motion.div
              className="drop-shadow-md"
            >
              <Image 
                src={ASSETS.logo} 
                alt="Anshika Caters Logo" 
                width={40} 
                height={40} 
                className="rounded-full" 
              />
            </motion.div>
          </button>
        </motion.div>

        {/* Navigation Items */}
        <motion.div
          className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-md transition duration-200 lg:flex lg:space-x-1 text-gray-100 font-bold drop-shadow-sm text-shadow-sm"
        >
          {/* Home Button */}
          <button
            onClick={() => handleNavItemClick(navItems[0])}
            className="relative px-3 py-2 font-extrabold transition-colors duration-200 text-gray-100 hover:text-[#bc9c22]"
          >
            <span className="relative z-20">Home</span>
          </button>

          {/* Events Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsEventsDropdownOpen(true)}
            onMouseLeave={() => setIsEventsDropdownOpen(false)}
          >
            <button
              className="relative px-3 py-2 font-extrabold transition-colors duration-200 text-gray-100 hover:text-[#bc9c22] flex items-center"
            >
              <span className="relative z-20">Events</span>
              <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${isEventsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isEventsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-[320px] bg-white shadow-2xl rounded-xl border border-gray-200 z-[9999] overflow-hidden"
                  style={{ 
                    position: 'absolute', 
                    zIndex: 9999
                  }}
                >
                  <div className="p-4">
                    {eventTypes.map((eventType, index) => (
                      <Link
                        key={eventType.name}
                        href={eventType.href}
                        className="group block p-4 hover:bg-[#bc9c22]/10 rounded-xl transition-all duration-200 border-b border-gray-100/60 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800 group-hover:text-[#bc9c22] transition-colors">
                              {eventType.name}
                            </div>
                            <div className="text-sm text-gray-600 group-hover:text-[#bc9c22]/70 transition-colors mt-1">
                              {eventType.description}
                            </div>
                          </div>
                          <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-[#bc9c22] transition-colors rotate-[-90deg] ml-3 flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other Navigation Items */}
          {navItems.slice(1).map((item, idx) => {
            return (
              <button
                key={`nav-${idx + 1}`}
                onClick={() => handleNavItemClick(item)}
                className="relative px-3 py-2 font-extrabold transition-colors duration-200 text-gray-100 hover:text-[#bc9c22]"
              >
                <span className="relative z-20">{item.name}</span>
              </button>
            )
          })}
        </motion.div>

        {/* CTA Button */}
        <div className="relative z-20">
          <Link href="/contact" onClick={() => handleNavItemClick({ name: "Contact", link: "#contact" })}>
            <InteractiveHoverButton className="bg-[#bc9c22] hover:bg-[#a08820] text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200">
              Plan Event
            </InteractiveHoverButton>
          </Link>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav className="bg-transparent/25 backdrop-blur-3xl border border-[#bc9c22]/20 shadow-lg backdrop-saturate-200">
        <MobileNavHeader>
          {/* Mobile Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.2 }}
            className="drop-shadow-md"
          >
            <button onClick={handleLogoClick} className="flex items-center space-x-2">
              <motion.div 
                className="relative drop-shadow-md"
                whileHover={{ rotate: 360 }} 
                transition={{ duration: 0.6 }}
              >
                <Image 
                  src={ASSETS.logo} 
                  alt="Anshika Caters Logo" 
                  width={40} 
                  height={20} 
                  className="rounded-full" 
                />
              </motion.div>
              <span className="text-lg font-serif text-gray-100 font-semibold drop-shadow-md">
                Anshika Caterers
              </span>
            </button>
          </motion.div>

          {/* Mobile Toggle */}
          <MobileNavToggle 
            isOpen={isOpen} 
            onClick={() => setIsOpen(!isOpen)} 
          />
        </MobileNavHeader>

        {/* Mobile Menu */}
        <MobileNavMenu 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
         
        >
          {navItems.map((item, i) => (
            <div key={i} className="border-b border-[#bc9c22]/20 last:border-0">
              <button
                onClick={() => {
                  handleNavItemClick(item)
                  handleMobileItemClick()
                }}
                className="block py-3 font-semibold  text-gray-200 hover:text-[#bc9c22] transition-colors text-lg drop-shadow-sm w-full text-left"
              >
                {item.name}
              </button>
            </div>
          ))}

          {/* Mobile Events Section */}
          <div className="border-b border-[#bc9c22]/20">
            <div className="py-3">
              <div className="font-semibold text-gray-200 text-lg mb-2">Events</div>
              {eventTypes.map((eventType, i) => (
                <Link
                  key={i}
                  href={eventType.href}
                  onClick={handleMobileItemClick}
                  className="block py-2 pl-4 text-gray-300 hover:text-[#bc9c22] transition-colors"
                >
                  {eventType.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Link href="/contact" onClick={() => {
              handleMobileItemClick()
              handleNavItemClick({ name: "Contact", link: "#contact" })
            }}>
              <InteractiveHoverButton className="bg-[#bc9c22] hover:bg-[#a08820] text-white border-[#bc9c22] font-semibold w-full shadow-lg hover:shadow-xl transition-shadow duration-200">
                Plan Event
              </InteractiveHoverButton>
            </Link>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}
