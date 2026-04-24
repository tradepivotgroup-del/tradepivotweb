"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/context/ThemeContext';
import Logo from './Logo';

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Expertise", href: "#services" },
  { name: "Portfolio", href: "#projects" },
  { name: "Leadership", href: "#leadership" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        (scrolled || isOpen) ? 'py-4 bg-background border-b border-[var(--border-subtle)]' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: 150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 3.2, ease: "easeOut" }}
          className="relative h-16 w-52 md:h-24 md:w-80 transition-all hover:scale-105"
        >
          <Logo theme={theme} className="w-full h-full text-[var(--foreground)]" />
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, x: -150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 3.2 + (i * 0.1), ease: "easeOut" }}
              className="text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          
          <motion.div 
              initial={{ opacity: 0, x: -150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 3.7, ease: "easeOut" }}
              className="flex items-center gap-4 ml-4"
          >
            <ThemeToggle />
            <button
              onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] text-[11px] font-black uppercase tracking-widest rounded-full hover:opacity-90 transition-all flex items-center gap-2 group"
            >
              Get In Touch
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-4 text-[var(--foreground)]">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[80px] bg-background z-40 lg:hidden flex flex-col p-12 gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-black uppercase tracking-tighter"
              >
                {link.name}
              </a>
            ))}
            <button 
                onClick={() => {
                   setIsOpen(false);
                   document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-8 px-8 py-5 bg-[var(--foreground)] text-[var(--background)] text-sm font-black uppercase tracking-widest rounded-full self-start"
            >
              Get In Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
