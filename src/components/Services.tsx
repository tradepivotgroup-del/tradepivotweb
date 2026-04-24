"use client";

import { motion } from 'framer-motion';

const services = [
  { 
    id: "01", 
    name: "FULL TURNKEY CONSTRUCTION SOLUTION", 
    desc: "From initial concept to final handover, we provide a comprehensive, integrated solution that manages every detail of the construction process, ensuring a seamless experience and a ready-to-use asset." 
  },
  { 
    id: "02", 
    name: "CONSTRUCTION PROJECT MANAGEMENT", 
    desc: "Our expert team provides dedicated oversight of scheduling, budgeting, and quality control. We coordinate all stakeholders to ensure your project is delivered on time, within budget, and to the highest standards." 
  },
  { 
    id: "03", 
    name: "CIVIL WORKS CONSTRUCTION", 
    desc: "Built on a foundation of engineering excellence, our civil works services include site preparation, road infrastructure, and utility networks designed for maximum durability and performance." 
  },
  { 
    id: "04", 
    name: "PROPERTY DEVELOPMENT", 
    desc: "We unlock the full potential of real estate through strategic site acquisition, feasibility analysis, and design management, transforming bold visions into high-performing commercial and residential developments." 
  },
  { 
    id: "05", 
    name: "PRE-CONSTRUCTION CONSULTING SERVICES", 
    desc: "Maximize your project’s success before breaking ground. We offer strategic advisory on site selection, cost estimation, and value engineering to optimize resources and reduce long-term risks." 
  }
];

export default function Services() {
  return (
    <section id="services" className="relative py-32 px-8 md:px-24 bg-[var(--alt-bg)] text-[var(--foreground)] transition-colors overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/Background.jpg" 
          alt="" 
          className="w-full h-full object-cover opacity-[0.2] dark:opacity-[0.25] grayscale-[0.05]"
        />
        <div className="absolute inset-0 bg-[var(--alt-bg)]/50 dark:bg-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--alt-bg)] via-transparent to-[var(--alt-bg)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
        >
            <div className="text-silver-primary text-[11px] font-black uppercase tracking-[0.5em] mb-8">Expertise</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter max-w-2xl">
                <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }} className="block">The Bedrock of</motion.span></span>
                <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="block text-[var(--text-muted)]">Structural Progress.</motion.span></span>
            </h2>
        </motion.div>

        <div className="flex flex-col border-t border-[var(--border-subtle)] overflow-hidden">
            {services.map((s, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="group border-b border-[var(--border-subtle)] py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-12 cursor-pointer hover:bg-[var(--foreground)]/[0.02] transition-colors duration-500 px-4 md:px-8"
                >
                    <div className="flex items-center gap-12 md:w-1/2">
                        <span className="text-[14px] font-black text-[var(--border-subtle)] group-hover:text-[var(--text-muted)] font-mono tracking-tighter transition-colors duration-500">
                            {"{"}{s.id}{"}"}
                        </span>
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-700">
                            {s.name}
                        </h3>
                    </div>

                    <div className="md:w-1/3 flex flex-col gap-6">
                        <p className="text-[13px] text-[var(--text-muted)] font-medium leading-relaxed group-hover:text-[var(--foreground)] transition-colors duration-500">
                            {s.desc}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
