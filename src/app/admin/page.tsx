"use client";

import { motion } from 'framer-motion';
import { LayoutGrid, Image as ImageIcon, Users, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    portfolio: 0,
    gallery: 0,
    users: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [portfolioSnap, gallerySnap, usersSnap] = await Promise.all([
          getDocs(collection(db, "projects_portfolio")),
          getDocs(collection(db, "gallery")),
          getDocs(collection(db, "users"))
        ]);
        
        setStats({
          portfolio: portfolioSnap.size,
          gallery: gallerySnap.size,
          users: usersSnap.size
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <div className="text-silver-primary text-[9px] font-black uppercase tracking-[0.5em] mb-2">Overview</div>
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-4">
            Control <br/> <span className="text-[var(--text-muted)]">Center.</span>
        </h1>
        <p className="max-w-xl text-[14px] text-[var(--text-muted)] font-medium leading-relaxed">
            Welcome to the command hub. From here, you can manage your visual portfolio, team visibility, and secure access protocols.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
            icon={<LayoutGrid className="w-6 h-6" />}
            label="Portfolio Items"
            value={stats.portfolio.toString()}
            href="/admin/portfolio"
        />
        <StatCard 
            icon={<ImageIcon className="w-6 h-6" />}
            label="Gallery Assets"
            value={stats.gallery.toString()}
            href="/admin/gallery"
        />
        <StatCard 
            icon={<Users className="w-6 h-6" />}
            label="Admin Accounts"
            value={stats.users.toString()}
            href="/admin/users"
        />
      </div>

      <div className="pt-8 border-t border-[var(--border-subtle)]">
        <div className="text-[10px] font-black uppercase tracking-widest text-silver-primary mb-6">Recent Activity</div>
        <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--border-subtle)]">
            <p className="text-[12px] text-[var(--text-muted)] italic">
                Logs and real-time updates will appear here as you interact with the database.
            </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, href }: { icon: any, label: string, value: string, href: string }) {
    return (
        <Link href={href} className="group block h-full">
            <div className="h-full bg-[var(--card-bg)] p-6 rounded-xl border border-[var(--border-subtle)] group-hover:border-silver-primary/50 transition-all flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[var(--background)] flex items-center justify-center text-silver-primary">
                        {icon}
                    </div>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-[var(--text-muted)] mb-1">{label}</div>
                    <div className="text-2xl font-black">{value}</div>
                </div>
            </div>
        </Link>
    );
}
