"use client";

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-32 px-8 md:px-24 bg-[var(--background)] text-[var(--foreground)] overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-24">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-[var(--border-subtle)] pb-12 overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="md:w-1/2"
            >
                <div className="text-silver-primary text-[11px] font-black uppercase tracking-[0.5em] mb-8 flex items-center">
                    <motion.span 
                        initial={{ width: 0 }}
                        whileInView={{ width: "1rem" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="inline-block h-[1px] bg-silver-primary mr-4"
                    />
                    About our company
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter">
                    <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="block">Experience the difference that</motion.span></span>
                    <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="block text-[var(--text-muted)]">precision and passion make.</motion.span></span>
                </h2>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
                className="md:w-1/4"
            >
                <p className="text-[12px] uppercase tracking-widest font-black text-[var(--text-muted)] leading-relaxed mb-6">
                    Melding Zimbabwean ingenuity with global structural standards.
                </p>
                <a 
                    href="https://firebasestorage.googleapis.com/v0/b/tradepivotweb.firebasestorage.app/o/Tradepivot%20Company%20Profile.pdf?alt=media&token=e45feedc-84da-46a0-b2d0-d73a820e2a7b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] font-black uppercase tracking-[0.3em] text-[var(--foreground)] border-b border-[var(--foreground)]/20 pb-2 hover:border-[var(--foreground)] transition-all"
                >
                    Download Our Profile
                </a>
            </motion.div>
          </div>

          {/* Core Story Grid */}
          <div className="grid md:grid-cols-2 gap-24 items-start relative">
             <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
             >
                <div className="text-[11px] uppercase tracking-[0.4em] font-black text-neutral-600 dark:text-neutral-500 mb-8">[ Vision ]</div>
                <p className="text-[16px] text-[var(--text-muted)] leading-relaxed font-medium mb-12">
                    From the heart of Bulawayo to the world’s most ambitious horizons, we bridge the gap between "it’s a plan" and "it’s a masterpiece."
                </p>
             </motion.div>
             <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
                className="pt-12 md:pt-32"
             >
                <div className="text-[11px] uppercase tracking-[0.4em] font-black text-neutral-600 dark:text-neutral-500 mb-8">[ Mission ]</div>
                <p className="text-[16px] text-[var(--text-muted)] leading-relaxed font-medium mb-12">
                    We are dedicated to sustainable growth at all levels. TradePivot is committed to delivering projects on time, within budget, and to the highest quality standards.
                </p>
                <div className="grid grid-cols-2 gap-8">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }} viewport={{ once: true }}>
                        <div className="text-3xl font-black text-[var(--foreground)] mb-2">12+</div>
                        <div className="text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)]">Years Experience</div>
                    </motion.div>
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }} viewport={{ once: true }}>
                        <div className="text-3xl font-black text-[var(--foreground)] mb-2">100%</div>
                        <div className="text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)]">Client Satisfaction</div>
                    </motion.div>
                </div>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
