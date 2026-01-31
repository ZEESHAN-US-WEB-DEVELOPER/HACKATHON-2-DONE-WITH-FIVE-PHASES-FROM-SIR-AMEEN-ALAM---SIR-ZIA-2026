"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { UserMenu } from '@/components/ui/UserMenu';
import { cn } from '@/lib/utils';
import { Layout, CheckCircle2 } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  // Hide header on auth pages for a cleaner focus on the forms
  if (isAuthPage) return null;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full',
        'border-b border-border',
        'transition-all duration-200',
        'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg'
      )}
    >
      <div className="section-horizontal py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 transition-all duration-200 hover:scale-105">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg">
                <CheckCircle2 className="w-6 h-6" strokeWidth={3} />
              </div>
              <h1 className="text-2xl font-bold text-white leading-none">
                TASK-<span className="text-yellow-300">CORE-</span><span className="text-green-300">AI-</span><span className="text-red-300">PRO</span>
              </h1>
            </Link>

            {/* Main Nav */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/20",
                  pathname === '/' ? "bg-white/30 text-white font-bold" : "text-white/90 hover:text-white"
                )}
              >
                🏠 Home
              </Link>
              <Link
                href="/dashboard"
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/20",
                  pathname === '/dashboard' ? "bg-white/30 text-white font-bold" : "text-white/90 hover:text-white"
                )}
              >
                📊 Dashboard
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle position="header" />
            <UserMenu />

            {!pathname?.includes('/dashboard') && (
              <Link href="/dashboard" className="hidden sm:block">
                <button className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 text-sm font-bold rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  🚀 Open Dashboard
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
