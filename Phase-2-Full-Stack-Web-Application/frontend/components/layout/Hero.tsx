"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  userName?: string;
  pending?: number;
  onPrimaryAction?: () => void;
}

export default function Hero({ userName = 'User', pending = 0, onPrimaryAction }: HeroProps) {
  return (
    <section className="mb-12 relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 uppercase tracking-wide">Task Mastery Suite</span>
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Dashboard Hub</h2>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
      >
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Hey <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-black">{userName}</span>! 🌟
          </h1>

          <p className="text-lg text-white mb-8 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            You have <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400">{pending}</span> tasks waiting for your magic touch. Dominate your workflow like a productivity ninja! 🥷✨
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onPrimaryAction}
              className="rounded-xl h-14 text-lg font-black bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              🚀 Add Epic Task
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
              className="rounded-xl h-12 text-base font-bold bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-white shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              📊 View All Tasks
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="w-full lg:w-96"
        >
          {/* Decorative animated SVG card with colorful design */}
          <div className="rounded-2xl border-2 border-white/20 bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 shadow-2xl backdrop-blur-sm">
            <svg viewBox="0 0 320 180" className="w-full h-32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF5E62" />
                  <stop offset="25%" stopColor="#FF9966" />
                  <stop offset="50%" stopColor="#4A90E2" />
                  <stop offset="75%" stopColor="#7B68EE" />
                  <stop offset="100%" stopColor="#C77DFF" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#g1)" rx="12" ry="12" opacity="0.2" />
              <g fill="none" stroke="url(#g1)" strokeWidth="2">
                <path d="M20 150 Q100 30 200 150 T300 150" strokeOpacity="0.6" />
                <circle cx="80" cy="80" r="15" fill="url(#g1)" fillOpacity="0.3" />
                <circle cx="240" cy="60" r="10" fill="url(#g1)" fillOpacity="0.3" />
              </g>
            </svg>

            <div className="mt-4">
              <h4 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Productivity Dashboard</h4>
              <p className="text-sm text-white/80 font-medium">Track your success metrics and productivity gains.</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs text-green-300 font-bold">System Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
