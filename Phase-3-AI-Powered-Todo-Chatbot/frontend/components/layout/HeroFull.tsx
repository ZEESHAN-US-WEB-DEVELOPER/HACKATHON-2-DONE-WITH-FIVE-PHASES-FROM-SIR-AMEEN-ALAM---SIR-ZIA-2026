"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

export default function HeroFull() {
  return (
    <header className="min-h-[calc(100vh-80px)] relative flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-5rem] top-20 w-[32rem] h-[32rem] rounded-full bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-500 opacity-40 blur-3xl animate-blob" />
        <div className="absolute right-[-6rem] bottom-10 w-[28rem] h-[28rem] rounded-full bg-gradient-to-r from-violet-500 via-purple-600 to-fuchsia-500 opacity-50 blur-3xl animate-blob" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 opacity-35 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
      </div>

      <motion.div
        className="z-10 max-w-6xl px-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 text-sm font-black tracking-widest uppercase mb-6 animate-glow">
          <Sparkles className="w-4 h-4" />
          AI-POWERED PRODUCTIVITY
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 mb-6">
          TRANSFORM YOUR WORKFLOW
          <br />
          WITH INTELLIGENT AUTOMATION
        </h1>

        <p className="text-xl md:text-2xl opacity-95 body max-w-4xl mx-auto mb-10 text-slate-700 font-medium">
          Experience next-generation task management powered by artificial intelligence.
          Our platform learns your habits, predicts your needs, and automates routine tasks
          to maximize your productivity and creativity.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
          <Link href="/auth/sign-up">
            <Button variant="primary" size="lg" className="h-16 px-10 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-700 text-white font-black text-lg shadow-2xl shadow-emerald-500/40 transform transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/60">
              START INTELLIGENT JOURNEY
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button variant="outline" size="lg" className="h-16 px-8 rounded-2xl border-2 border-emerald-500 text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white font-black text-lg transform transition-all duration-300 hover:scale-105">
              EXPLORE AI FEATURES <Zap className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </header>
  );
}
