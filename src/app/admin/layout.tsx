"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login' && pathname !== '/admin/setup') {
      router.push('/admin/login');
    }
  }, [user, loading, router, pathname]);

  // Don't show anything while loading or if not logged in (unless on login/setup)
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">
            Establishing Secure Connection...
        </div>
      </div>
    );
  }

  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/setup';

  if (!user && !isAuthPage) {
    return null;
  }

  // If on login/setup page, just render children without layout
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen overflow-hidden bg-[var(--background)] flex flex-col md:flex-row transition-colors">
      {/* Sidebar */}
      <aside className="w-full md:w-56 h-auto md:h-full bg-[var(--card-bg)] border-r border-[var(--border-subtle)] p-6 flex flex-col gap-8 flex-shrink-0 z-10">
        <div>
            <div className="text-silver-primary text-[9px] font-black uppercase tracking-[0.4em] mb-2">Admin Panel</div>
            <div className="text-xl font-black uppercase tracking-tighter">TradePivot</div>
        </div>

        <nav className="flex flex-col gap-4">
            <NavItem href="/admin" label="Dashboard" />
            <NavItem href="/admin/portfolio" label="Portfolio" />
            <NavItem href="/admin/gallery" label="Gallery" />
            <NavItem href="/admin/users" label="User Access" />
        </nav>

        <div className="mt-auto pt-8 border-t border-[var(--border-subtle)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-black uppercase text-[var(--text-muted)]">Operator</div>
              <ThemeToggle />
            </div>
            <div className="truncate text-[11px] font-bold">{user?.email}</div>
            <button 
                onClick={() => {
                  import('firebase/auth').then(({ getAuth, signOut }) => {
                    signOut(getAuth()).then(() => router.push('/admin/login'));
                  });
                }}
                className="w-full py-3 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest rounded-full hover:bg-red-500 hover:text-white transition-all"
            >
                Log Out
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}

function NavItem({ href, label }: { href: string, label: string }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <a 
            href={href}
            className={`text-[11px] font-black uppercase tracking-widest py-2.5 px-4 rounded-lg transition-all ${
                isActive 
                ? 'bg-silver-primary text-black' 
                : 'text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5'
            }`}
        >
            {label}
        </a>
    );
}
