"use client"

import { useState } from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { 
  Navbar, 
  NavBody, 
  NavItems, 
  MobileNav, 
  MobileNavHeader, 
  MobileNavMenu, 
  MobileNavToggle 
} from "@/components/ui/resizable-navbar"
import { useLoading } from "@/components/loading-context"
import { useLenis } from "@/hooks/use-lenis"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { setIsLoading } = useLoading()
  const { scrollTo } = useLenis()

  const navItems = [
    { name: "Home", link: "#hero" },
    { name: "Services", link: "#services" },
    { name: "Events", link: "#featured-events" },
    { name: "Gallery", link: "#gallery" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Contact", link: "#contact" },
  ]

  const handleMobileItemClick = () => {
    setIsOpen(false)
  }

  const handleLogoClick = () => {
    scrollTo(0)
  }

  const handleNavItemClick = (item: typeof navItems[0]) => {
    scrollTo(item.link)
  }

  return (
    <Navbar className="fixed top-0 z-50">
      {/* Desktop Navigation */}
      <NavBody className="bg-[#fdfaf5]/70 backdrop-blur-xl shadow-2xl border border-white/30 shadow-black/10 backdrop-saturate-150">
        {/* Logo */}
        <motion.div 
          className="relative z-20 drop-shadow-md"
          whileHover={{ scale: 1.05 }} 
          transition={{ duration: 0.2 }}
        >
          <button onClick={handleLogoClick} className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ rotate: 360 }} 
              transition={{ duration: 0.6 }}
              className="drop-shadow-md"
            >
              <Image 
                src="/AC.png" 
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
          className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm transition duration-200 lg:flex lg:space-x-1 text-black font-bold drop-shadow-sm text-shadow-sm"
        >
          {navItems.map((item, idx) => {
            return (
              <button
                key={`nav-${idx}`}
                onClick={() => handleNavItemClick(item)}
                className="relative px-3 py-2 font-bold transition-colors duration-200 text-gray-800 hover:text-[#bc9c22]"
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
      <MobileNav className="bg-[#fdfaf5]/70 backdrop-blur-2xl border border-[#bc9c22]/20 shadow-lg">
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
                  src="/AC.png" 
                  alt="Anshika Caters Logo" 
                  width={40} 
                  height={40} 
                  className="rounded-full" 
                />
              </motion.div>
              <span className="text-md font-serif text-[#021631] font-semibold drop-shadow-md">
                Anshika Caters
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
          className="bg-[#fdfaf5]/70 backdrop-blur-2xl border border-[#bc9c22]/20 shadow-lg"
        >
          {navItems.map((item, i) => (
            <div key={i} className="border-b border-[#bc9c22]/20 last:border-0">
              <button
                onClick={() => {
                  handleNavItemClick(item)
                  handleMobileItemClick()
                }}
                className="block py-3 font-medium text-[#021631] hover:text-[#bc9c22] transition-colors text-md drop-shadow-sm w-full text-left"
              >
                {item.name}
              </button>
            </div>
          ))}

          <div className="pt-4">
            <Link href="/contact" onClick={() => {
              handleMobileItemClick()
              handleNavItemClick({ name: "Contact", link: "#contact" })
            }}>
              <InteractiveHoverButton className="bg-[#bc9c22] hover:bg-[#a08820] text-white border-[#bc9c22] font-semibold w-full shadow-lg hover:shadow-xl transition-shadow duration-200">
                Book Tasting
              </InteractiveHoverButton>
            </Link>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}
