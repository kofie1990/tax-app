"use client";

import { motion } from "framer-motion";
import { Search, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Consider adding scroll listener in a generic hook later if needed
  // For now, static glassmorphic look
  
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none"
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        <Link 
          href="/" 
          className="text-xl font-medium tracking-tight hover:text-atelier-accent transition-colors duration-300"
        >
          GH Tax
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 glass rounded-full px-8 py-3">
          <Link href="#calculator" className="text-sm font-medium text-atelier-light hover:text-atelier-accent transition-colors duration-300">
            Calculator
          </Link>
          <Link href="#bands" className="text-sm font-medium text-atelier-light/70 hover:text-atelier-light transition-colors duration-300">
            2025 Bands
          </Link>
          <Link href="#guide" className="text-sm font-medium text-atelier-light/70 hover:text-atelier-light transition-colors duration-300">
            Guide
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full glass hover:bg-atelier-light/10 transition-colors duration-300" aria-label="Search">
            <Search className="w-4 h-4 text-atelier-light" />
          </button>
          <button className="md:hidden p-2 rounded-full glass hover:bg-atelier-light/10 transition-colors duration-300" aria-label="Menu">
            <Menu className="w-4 h-4 text-atelier-light" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
