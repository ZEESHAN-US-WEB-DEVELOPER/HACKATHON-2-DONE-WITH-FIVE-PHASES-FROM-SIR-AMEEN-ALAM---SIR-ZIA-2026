"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, Layout, Shield, Zap, Star, CheckCircle2, Brain, Target, Globe } from 'lucide-react';
import HeroFull from '@/components/layout/HeroFull';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-80px)] overflow-x-hidden bg-gradient-to-br from-slate-50 to-emerald-50">
      {/* Full-screen Landing Hero */}
      <HeroFull />
      {/* Features Grid */}
      <section className="section-horizontal section-vertical bg-gradient-to-br from-emerald-50/50 to-cyan-50/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="h2 mb-4 text-emerald-800">Why Choose MindFlow AI?</h2>
            <p className="body text-slate-600">Advanced AI technology designed to revolutionize your productivity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="AI-Powered Insights"
              description="Our advanced algorithms analyze your workflow patterns to provide personalized recommendations and optimize your productivity."
            />
            <FeatureCard
              icon={<Target className="w-8 h-8" />}
              title="Smart Goal Setting"
              description="Set intelligent, adaptive goals that evolve with your progress and automatically adjust based on your achievements."
            />
            <FeatureCard
              icon={<Globe className="w-8 h-8" />}
              title="Seamless Integration"
              description="Connect with your favorite tools and platforms for a unified productivity ecosystem across all devices."
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6 border-y border-emerald-200/50 overflow-hidden relative bg-gradient-to-r from-emerald-500/5 to-cyan-500/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex -space-x-4 mb-8">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-bold text-white ring-2 ring-emerald-300">
                U{i}
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-white bg-gradient-to-br from-emerald-600 to-cyan-600 text-white flex items-center justify-center font-bold text-sm">+</div>
          </div>
          <h3 className="h3 mb-2 text-emerald-800">Trusted by 50,000+ Professionals Worldwide</h3>
          <p className="body uppercase tracking-widest font-black text-xs opacity-70 text-emerald-600">Leading organizations rely on our AI</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-emerald-200/50 bg-gradient-to-t from-slate-100 to-emerald-100/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                <Brain className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black tracking-tighter text-emerald-800">MindFlow AI</h3>
            </div>
            <p className="body max-w-sm text-slate-600">
              The future of productivity is here. Experience intelligent task management that adapts to your unique workflow.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-xs opacity-70 text-emerald-700">Product</h4>
            <ul className="space-y-2 font-bold text-sm">
              <li><Link href="/dashboard" className="hover:text-emerald-600 transition-colors text-slate-700">AI Features</Link></li>
              <li><Link href="/dashboard" className="hover:text-emerald-600 transition-colors text-slate-700">Intelligence Suite</Link></li>
              <li><Link href="/dashboard" className="hover:text-emerald-600 transition-colors text-slate-700">Workflow Tools</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-xs opacity-70 text-emerald-700">Company</h4>
            <ul className="space-y-2 font-bold text-sm">
              <li><Link href="/" className="hover:text-emerald-600 transition-colors text-slate-700">About Us</Link></li>
              <li><Link href="/" className="hover:text-emerald-600 transition-colors text-slate-700">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-emerald-600 transition-colors text-slate-700">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-emerald-200/30 text-center text-sm font-bold opacity-60 text-emerald-700">
          &copy; 2026 MindFlow AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass-premium rounded-[2rem] p-10 border border-emerald-200/30 hover:border-emerald-400/50 transition-all duration-500 hover:-translate-y-2 group bg-white/70 shadow-lg shadow-emerald-100">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-8 group-hover:rotate-6 transition-transform duration-500 shadow-lg shadow-emerald-500/30">
        {icon}
      </div>
      <h3 className="h3 mb-4 text-emerald-800">{title}</h3>
      <p className="body text-base opacity-80 text-slate-700 group-hover:opacity-100 transition-opacity">
        {description}
      </p>
    </div>
  );
}
