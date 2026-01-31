"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { UserMenu } from '@/components/ui/UserMenu';
import { cn } from '@/lib/utils';
import { Brain, CheckCircle2 } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  // Hide header on auth pages for a cleaner focus on the forms
  if (isAuthPage) return null;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full',
        'transition-all duration-500 ease-in-out',
        'gradient-header' // Using custom CSS class for better styling
      )}
    >
      <div className="section-horizontal py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/40 group-hover:shadow-emerald-500/60 group-hover:rotate-6 transition-all duration-500">
                <Brain className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <h1 className="text-2xl font-black tracking-tighter text-white leading-none">
                Mind<span className="text-emerald-300 italic">Flow</span> AI {/* Unique name with emerald text */}
              </h1>
            </Link>

            {/* Main Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className={cn(
                  "px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300",
                  pathname === '/' ? "bg-emerald-500/30 text-emerald-100" : "text-white/80 hover:text-emerald-200 hover:bg-emerald-500/20"
                )}
              >
                Intelligence Hub
              </Link>
              <Link
                href="/dashboard"
                className={cn(
                  "px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300",
                  pathname === '/dashboard' ? "bg-emerald-500/30 text-emerald-100" : "text-white/80 hover:text-emerald-200 hover:bg-emerald-500/20"
                )}
              >
                Productivity Suite
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 p-1.5 rounded-[1.25rem] bg-emerald-500/20 border border-emerald-400/30 shadow-inner">
              <ThemeToggle position="header" />
              <div className="w-px h-5 bg-emerald-400/50 mx-1" />
              <UserMenu />
            </div>

            {!pathname?.includes('/dashboard') && (
              <Link href="/dashboard" className="hidden sm:block">
                <button className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-black rounded-xl hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-emerald-500/30">
                  Enter Workspace
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
