"use client";

import { motion } from 'framer-motion';

export default function Marquee() {
  const words = Array(8).fill("TRADEPIVOT");

  return (
    <section className="relative w-full overflow-hidden bg-[var(--background)] py-12 md:py-24 border-y border-[var(--border-subtle)]/30">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          duration: 20, // Doubled speed
          ease: "linear" 
        }}
      >
        <div className="flex gap-12 md:gap-24 pr-12 md:pr-24 items-center">
            {words.map((word, i) => (
                <span 
                    key={i} 
                    className="text-6xl md:text-[9rem] font-black uppercase tracking-tightest text-[var(--foreground)] hover:text-silver-primary transition-colors duration-700 cursor-default select-none"
                >
                    {word}
                </span>
            ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex gap-12 md:gap-24 pr-12 md:pr-24 items-center">
            {words.map((word, i) => (
                <span 
                    key={i + words.length} 
                    className="text-6xl md:text-[9rem] font-black uppercase tracking-tightest text-[var(--foreground)] hover:text-silver-primary transition-colors duration-700 cursor-default select-none"
                >
                    {word}
                </span>
            ))}
        </div>
      </motion.div>
    </section>
  );
}
