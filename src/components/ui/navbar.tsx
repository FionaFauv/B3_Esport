"use client" 

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { ROUTES } from "@/lib/constants/routes"
import Link from "next/link"
import { NAV_MENU_ITEMS } from "@/lib/constants/routes"
import ThemeToggle from "@/components/ThemeToggle"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="flex justify-center w-full py-6 px-4 fixed z-50">
      <div className="flex items-center justify-between meru-nav-backdrop px-6 py-3 bg-white rounded-full shadow-lg w-full max-w-3xl relative z-10">
        <div className="flex items-center">
          <motion.div
            className="w-8 h-8 mr-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
          <Link href={ROUTES.HOME} className="flex items-center gap-3 group">
            <div className="flex items-center pb-2 meru-nav-logo">
              <Image 
                src="/images/MeruSleep.png" 
                alt="Logo Esport" 
                width={52}
                height={52}
                className="mb-2 ml-2"
                priority
              />
              <h3 className="text-xl meru-nav-title">EZ</h3>
              </div>
          </Link>
          </motion.div>
        </div>
        
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_MENU_ITEMS.map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <a href={item.href} className="meru-nav-link px-3 py-2 rounded-lg">
                  {item.label}
                </a>
              </motion.div>
            ))}
          </nav>

        {/* Desktop CTA Button */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link 
                href={ROUTES.AUTH.LOGIN}
                className="hidden md:block px-4 py-2 rounded-lg meru-nav-btn-outline"
              >
                Connexion
              </Link>
              
              <Link 
                href={ROUTES.AUTH.SIGNUP}
                className="hidden md:block px-4 py-2 rounded-lg meru-nav-btn-solid"
              >
                S&apos;inscrire
              </Link>
            </div>
        

        {/* Mobile Menu Button */}
        <motion.button className="md:hidden flex items-center" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
          <Menu className="h-6 w-6 text-gray-900" />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-gray-900" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {NAV_MENU_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <a href={item.href} className="text-base text-gray-900 font-medium" onClick={toggleMenu}>
                    {item.label}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6"
              >
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link 
              href={ROUTES.AUTH.LOGIN}
              className="hidden md:inline-block px-4 py-2 rounded-lg meru-nav-btn-outline"
            >
              Connexion
            </Link>
            <Link 
              href={ROUTES.AUTH.SIGNUP}
              className="hidden md:inline-block px-4 py-2 rounded-lg meru-nav-btn-solid"
            >
              S&apos;inscrire
            </Link>
          </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


export { Navbar }