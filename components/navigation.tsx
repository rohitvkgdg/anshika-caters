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
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { setIsLoading } = useLoading()

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Packages", link: "/wedding-packages" },
    { name: "Menu Builder", link: "/menu-builder" },
    { name: "Gallery", link: "/gallery" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
  ]

  const handleMobileItemClick = () => {
    setIsOpen(false)
  }

  const handleNavClick = () => {
    setIsLoading(true)
  }

  return (
    <Navbar className="fixed top-0 z-50">
      {/* Desktop Navigation */}
      <NavBody className="bg-[#fdfaf5]/70 backdrop-blur-2xl shadow-lg">
        {/* Logo */}
        <motion.div 
          className="relative z-20"
          whileHover={{ scale: 1.05 }} 
          transition={{ duration: 0.2 }}
        >
          <Link href="/" className="flex items-center space-x-2" onClick={handleNavClick}>
            <motion.div 
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
          </Link>
        </motion.div>

        {/* Navigation Items */}
        <NavItems 
          items={navItems} 
          className="text-[#021631] hover:text-[#bc9c22]"
          onItemClick={handleNavClick}
        />

        {/* CTA Button */}
        <div className="relative z-20">
          <Link href="/contact" onClick={handleNavClick}>
            <InteractiveHoverButton className="bg-[#bc9c22] hover:bg-[#a08820] text-white border-[#bc9c22] font-semibold">
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
          >
            <Link href="/" className="flex items-center space-x-2" onClick={handleNavClick}>
              <motion.div 
                className="relative"
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
              <span className="text-xl font-serif text-[#021631] font-bold">
                Anshika Caters
              </span>
            </Link>
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
          className="bg-[#fdfaf5]/80 backdrop-blur-2xl border border-[#bc9c22]/20"
        >
          {navItems.map((item, i) => (
            <div key={i} className="border-b border-[#bc9c22]/20 last:border-0">
              <Link
                href={item.link}
                className="block py-3 font-medium text-[#021631] hover:text-[#bc9c22] transition-colors text-lg"
                onClick={() => {
                  handleMobileItemClick()
                  handleNavClick()
                }}
              >
                {item.name}
              </Link>
            </div>
          ))}

          <div className="pt-4">
            <Link href="/contact" onClick={() => {
              handleMobileItemClick()
              handleNavClick()
            }}>
              <InteractiveHoverButton className="bg-[#bc9c22] hover:bg-[#a08820] text-white border-[#bc9c22] font-semibold w-full">
                Book Tasting
              </InteractiveHoverButton>
            </Link>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}
