"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroFull() {
  return (
    <header className="min-h-[calc(100vh-80px)] relative flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 w-96 h-96 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500 opacity-30 blur-3xl animate-blob" />
        <div className="absolute right-[-8rem] bottom-0 w-96 h-96 rounded-full bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 opacity-25 blur-3xl animate-blob" style={{ animationDelay: '1.2s' }} />
        <div className="absolute left-1/2 top-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        className="z-10 max-w-4xl px-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-white/30 bg-gradient-to-r from-pink-500/20 to-rose-500/20 backdrop-blur-sm text-white text-xl font-bold mb-8 shadow-2xl">
          <Sparkles className="w-7 h-7 text-pink-300" />
          ✨ Ultimate Task Master Pro ✨
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent mb-8">
          Master Your
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Productivity</span> Empire.
        </h1>

        <p className="text-2xl md:text-3xl text-white/95 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
          Unlock <span className="font-bold text-yellow-300 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">superhuman efficiency</span> with our cutting-edge task management system:
          AI-powered insights, lightning-fast performance, and stunning visuals—all in one <span className="font-bold text-green-300 bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">magical platform</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/auth/sign-up">
            <Button
              variant="primary"
              size="lg"
              className="rounded-xl px-10 py-6 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              🎉 Start Free Trial
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              variant="secondary"
              size="lg"
              className="rounded-xl px-10 py-6 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              🎮 Live Demo <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </header>
  );
}
