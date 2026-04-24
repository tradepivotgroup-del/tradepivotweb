"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export default function Logo({ className = "", theme = "dark" }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <svg 
        viewBox="0 0 400 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Architectural Emblem */}
        <motion.g 
          className="logo-emblem"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Outer geometric circle */}
          <circle 
            cx="60" cy="60" r="50" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="opacity-20"
          />
          <motion.circle 
            cx="60" cy="60" r="45" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            strokeDasharray="4 4"
            className="opacity-40"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Geometric TP Monogram */}
          <motion.path 
            d="M38 45V52H53V85H61V52H76V45H38Z" 
            fill="currentColor"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
          <motion.path 
            d="M65 55V85H73V75H85C92 75 96 71 96 65V65C96 59 92 55 85 55H65ZM73 62H85V68H73V62Z" 
            fill="currentColor"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          
          {/* Compass/Grid lines */}
          <path d="M60 10V30" stroke="currentColor" strokeWidth="1" className="opacity-50"/>
          <path d="M60 90V110" stroke="currentColor" strokeWidth="1" className="opacity-50"/>
          <path d="M10 60V60" stroke="currentColor" strokeWidth="1" className="opacity-50"/>
          <path d="M110 60H130" stroke="currentColor" strokeWidth="1" className="opacity-50" />
        </motion.g>

        {/* Text Section */}
        <motion.g 
          className="logo-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
        >
          <text 
            x="120" y="65" 
            fontFamily="Outfit, sans-serif" 
            fontWeight="900" 
            fontSize="32" 
            fill="currentColor" 
            letterSpacing="0.05em"
            className="uppercase"
          >
            TRADEPIVOT
          </text>
          <text 
            x="120" y="85" 
            fontFamily="Outfit, sans-serif" 
            fontWeight="700" 
            fontSize="10" 
            fill="currentColor" 
            letterSpacing="0.5em"
            className="uppercase opacity-60"
          >
            TOGETHER WE WIN
          </text>
        </motion.g>
      </svg>
      
      {/* Subtle Glow in Dark Mode */}
      {theme === 'dark' && (
        <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full -z-10 pointer-events-none" />
      )}
    </div>
  );
}
