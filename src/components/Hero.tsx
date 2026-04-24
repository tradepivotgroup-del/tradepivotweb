"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={targetRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[var(--background)]">
      {/* Background with Building Plan Overlay - Theme Specific Visibility */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0 bg-[url('/images/Background.jpg')] bg-cover bg-center transition-all duration-700 opacity-60 dark:opacity-50"
      >
        <div className="absolute inset-0 bg-[var(--background)]/70 dark:bg-black/60 z-[5]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/90 via-[var(--background)]/20 to-[var(--background)] z-10" />
      </motion.div>

      <motion.div 
        style={{ opacity, y: textY }}
        className="relative z-10 max-w-7xl mx-auto px-8 w-full flex flex-col items-center text-center pt-24 md:pt-32"
      >
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 3.2 }}
           className="text-silver-primary text-[11px] font-black uppercase tracking-[0.8em] mb-8"
        >
          Engineering Excellence
        </motion.div>

        <div className="overflow-hidden mb-8">
            <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 3.3 }}
                className="text-5xl md:text-[6rem] lg:text-[8rem] font-black leading-[0.8] tracking-tightest uppercase text-[var(--foreground)]"
            >
                Building <br/> The Future.
            </motion.h1>
        </div>

        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.6 }}
            className="max-w-xl text-[14px] md:text-[18px] text-[var(--text-muted)] font-medium leading-relaxed tracking-tight mb-12"
        >
            TradePivot Melds Zimbabwean ingenuity with global structural standards. Bridge the gap between vision and structural reality.
        </motion.p>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.8 }}
            className="flex flex-col md:flex-row items-center gap-8"
        >
            <a href="#projects" className="px-10 py-5 bg-[var(--foreground)] text-[var(--background)] text-[12px] font-black uppercase tracking-widest rounded-full hover:bg-[var(--silver-primary)] transition-all">
                Our Projects
            </a>
            <a href="#about" className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-[var(--foreground)]/20 flex items-center justify-center group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-all">
                    <ArrowDown className="w-4 h-4 text-[var(--foreground)]" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--foreground)] transition-colors">Learn More</span>
            </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-16 bg-gradient-to-b from-transparent via-[var(--foreground)]/50 to-transparent"
        />
      </div>
    </section>
  );
}
