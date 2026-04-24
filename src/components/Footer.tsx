"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import { useRef } from 'react';
import ContactForm from './ContactForm';
import { useTheme } from '@/context/ThemeContext';
import Logo from './Logo';

export default function Footer() {
  const ref = useRef(null);
  const { theme } = useTheme();

  return (
    <footer id="footer" ref={ref} className="bg-[var(--alt-bg)] text-[var(--foreground)] w-full border-t border-[var(--border-subtle)] transition-colors overflow-hidden">
      
      <div className="max-w-7xl mx-auto py-24 px-8 md:px-24">
        
        {/* Contact Form Section */}
        <div className="mb-24 bg-[var(--background)] p-8 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[3rem] border border-[var(--border-subtle)] overflow-hidden relative shadow-2xl">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
             <div className="flex flex-col lg:flex-row gap-16 relative z-10 w-full">
                <div className="lg:w-1/3">
                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Get In Touch</h3>
                    <p className="text-[12px] md:text-[14px] uppercase tracking-widest text-[var(--text-muted)] font-black mt-4">We build the undisputed.</p>
                </div>
                <div className="lg:w-2/3">
                    <ContactForm />
                </div>
             </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand/Logo Column */}
          <div className="flex flex-col gap-8 w-full max-w-sm">
            <div className="relative h-16 w-64 md:h-20 md:w-80 -ml-4">
               <Logo theme={theme} className="w-full h-full text-[var(--foreground)]" />
            </div>
            <p className="text-[13px] text-[var(--text-muted)] font-medium leading-relaxed italic max-w-xs">
              “ Engineering isn’t just about property — it’s about people, trust, and long-term value. ”
            </p>
            <div className="mt-4">
                 <div className="text-[10px] uppercase tracking-[0.4em] font-black text-[var(--text-muted)] mb-2">Director</div>
                 <h4 className="text-[13px] font-black uppercase text-[var(--foreground)]">Khumbulani Mlambo</h4>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[var(--text-muted)]">Navigation</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <a href="#about" className="text-[13px] font-bold text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">About Us</a>
                <a href="#services" className="text-[13px] font-bold text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Services</a>
                <a href="#projects" className="text-[13px] font-bold text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Portfolio</a>
              </div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-[13px] font-bold text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Insights</a>
                <a href="#" className="text-[13px] font-bold text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Contact</a>
                <a href="#" className="text-[13px] font-bold text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Careers</a>
              </div>
            </div>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[var(--text-muted)]">Contact Point</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-all">
                  <Phone size={14} />
                </div>
                <div>
                  <div className="text-[9px] uppercase font-black text-[var(--text-muted)]">Call Us</div>
                  <a href="tel:+263789366969" className="text-[13px] font-black text-[var(--foreground)]">+263 78 936 6969</a>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)] transition-all">
                  <Mail size={14} />
                </div>
                <div>
                  <div className="text-[9px] uppercase font-black text-[var(--text-muted)]">Email Address</div>
                  <a href="mailto:info@tradepivotgroup.com" className="text-[13px] font-black text-[var(--foreground)]">info@tradepivotgroup.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Office Column */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[var(--text-muted)]">Zimbabwe Headquarters</h4>
            <div className="flex items-start gap-4">
                <MapPin size={16} className="text-silver-primary mt-1" />
                <p className="text-[13px] text-[var(--text-muted)] font-medium leading-relaxed transition-colors">
                    Bulawayo, <br/> Zimbabwe
                </p>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <a href="#" className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center hover:bg-[var(--card-bg)] transition-all"><Instagram size={14} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center hover:bg-[var(--card-bg)] transition-all"><Facebook size={14} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center hover:bg-[var(--card-bg)] transition-all"><Linkedin size={14} /></a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border-subtle)] pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">
            Tradepivot © 2026. <span className="text-[var(--foreground)]">Engineering Excellence.</span>
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
