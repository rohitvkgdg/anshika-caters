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
import { useSmoothScrollContext } from "@/components/smooth-scroll-provider"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { setIsLoading } = useLoading()
  const { activeSection, scrollToSection, activeSections } = useSmoothScrollContext()

  const navItems = [
    { name: "Home", link: "#hero", sectionIndex: 0 },
    { name: "Services", link: "#services", sectionIndex: 1 },
    { name: "Events", link: "#featured-events", sectionIndex: 2 },
    { name: "Gallery", link: "#gallery", sectionIndex: 4 },
    { name: "Testimonials", link: "#testimonials", sectionIndex: 5 },
    { name: "Contact", link: "#contact", sectionIndex: 6 },
  ]

  const handleMobileItemClick = () => {
    setIsOpen(false)
  }

  const handleLogoClick = () => {
    scrollToSection(0) // Go to hero section
  }

  const handleContactClick = () => {
    // Contact is now part of smooth scroll, so use scrollToSection
    scrollToSection(6) // Contact section index
  }
  const handleNavItemClick = (item: typeof navItems[0]) => {
    if (item.sectionIndex >= 0) {
      // Internal smooth scroll
      scrollToSection(item.sectionIndex)
    } else {
      // External navigation - let the link handle it
      setIsLoading(true)
    }
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
            // Special handling for Gallery nav item - it should be active for both process (3) and gallery (4) sections
            const isActive = item.name === "Gallery" 
              ? (activeSection === activeSections[3] || activeSection === activeSections[4]) // process or gallery sections
              : item.sectionIndex >= 0 
                ? activeSection === activeSections[item.sectionIndex]
                : false;
            
            return (
              <button
                key={`nav-${idx}`}
                onClick={() => handleNavItemClick(item)}
                className={`relative px-3 py-2 font-bold transition-colors duration-200 ${
                  isActive 
                    ? "text-[#bc9c22]" 
                    : "text-gray-800 hover:text-[#bc9c22]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 h-full w-full rounded-full bg-[#bc9c22]/10"
                  />
                )}
                <span className="relative z-20">{item.name}</span>
              </button>
            )
          })}
        </motion.div>

        {/* CTA Button */}
        <div className="relative z-20">
          <Link href="/contact" onClick={handleContactClick}>
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
              handleContactClick()
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
