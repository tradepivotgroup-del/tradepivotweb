"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="relative min-h-[400px] w-full">
        <AnimatePresence mode="wait">
        {status === 'success' ? (
            <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center py-12"
            >
            <div className="w-20 h-20 bg-[var(--foreground)] text-[var(--background)] rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} />
            </div>
            <h4 className="text-3xl font-black uppercase tracking-tighter mb-4">Message Sent</h4>
            <p className="text-[14px] text-[var(--text-muted)] font-medium max-w-xs">
                Thank you for reaching out. Our team will review your inquiry and connect with you shortly.
            </p>
            </motion.div>
        ) : (
            <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full"
            >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
                <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-[var(--text-muted)] ml-2">Your Name</label>
                <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[var(--alt-bg)] border border-[var(--border-subtle)] rounded-xl px-6 py-4 outline-none focus:border-[var(--foreground)] transition-colors text-[14px]"
                    placeholder="John Doe"
                />
                </div>
                <div className="flex flex-col gap-2 relative z-20">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-[var(--text-muted)] ml-2">Email Address</label>
                <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[var(--alt-bg)] border border-[var(--border-subtle)] rounded-xl px-6 py-4 outline-none focus:border-[var(--foreground)] transition-colors text-[14px]"
                    placeholder="john@example.com"
                />
                </div>
            </div>

            <div className="flex flex-col gap-2 relative z-20">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-[var(--text-muted)] ml-2">Subject</label>
                <input 
                type="text" 
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-[var(--alt-bg)] border border-[var(--border-subtle)] rounded-xl px-6 py-4 outline-none focus:border-[var(--foreground)] transition-colors text-[14px]"
                placeholder="Project Inquiry"
                />
            </div>

            <div className="flex flex-col gap-2 relative z-20">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-[var(--text-muted)] ml-2">Message</label>
                <textarea 
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-[var(--alt-bg)] border border-[var(--border-subtle)] rounded-xl px-6 py-4 outline-none focus:border-[var(--foreground)] transition-colors text-[14px] resize-none"
                placeholder="Tell us about your project..."
                />
            </div>
            
            {status === 'error' && (
                <p className="text-red-500 text-xs font-bold text-center">Failed to send message. Please try again later.</p>
            )}

            <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full lg:w-max ml-auto mt-2 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 rounded-xl px-12 py-5 text-[12px] font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all disabled:opacity-50 relative z-20"
            >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                {status !== 'submitting' && <Send size={16} />}
            </button>
            </motion.form>
        )}
        </AnimatePresence>
    </div>
  );
}
