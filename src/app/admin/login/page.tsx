"use client";

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center p-8 transition-colors">
      <div className="max-w-md w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--card-bg)] p-12 rounded-[2.5rem] border border-[var(--border-subtle)] shadow-2xl relative overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-silver-primary/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="mb-12">
              <div className="text-silver-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">Secure Access</div>
              <h1 className="text-4xl font-black uppercase tracking-tighter leading-none mb-4">
                Admin <br/> Control.
              </h1>
              <p className="text-[13px] text-[var(--text-muted)] font-medium">
                Enter your credentials to manage the Tradepivot ecosystem.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)] ml-4">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@tradepivot.co.zw"
                    className="w-full bg-[var(--background)] border border-[var(--border-subtle)] rounded-full py-4 pl-14 pr-6 text-[14px] outline-none focus:border-silver-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)] ml-4">Password</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[var(--background)] border border-[var(--border-subtle)] rounded-full py-4 pl-14 pr-6 text-[14px] outline-none focus:border-silver-primary transition-all"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-[12px] font-bold text-center bg-red-500/10 py-3 rounded-xl border border-red-500/20">
                  {error}
                </p>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="group w-full py-5 bg-[var(--foreground)] text-[var(--background)] rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-silver-primary hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> }
              </button>
            </form>
          </div>
        </motion.div>
        
        <p className="mt-8 text-center text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]/50">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
