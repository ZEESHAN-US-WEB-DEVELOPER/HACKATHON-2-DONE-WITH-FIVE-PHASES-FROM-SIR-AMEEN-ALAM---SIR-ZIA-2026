"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, Layout, Shield, Zap, Star, CheckCircle2 } from 'lucide-react';
import HeroFull from '@/components/layout/HeroFull';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-80px)] overflow-x-hidden bg-background">
      {/* Full-screen Landing Hero */}
      <HeroFull />
      {/* Features Grid */}
      <section className="section-horizontal section-vertical bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Revolutionize Your Productivity 🚀</h2>
            <p className="text-xl text-white/80 font-medium max-w-2xl mx-auto">Next-generation task management powered by intelligent algorithms and stunning visual experiences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon={
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
                  <Zap className="w-8 h-8" />
                </div>
              }
              title="⚡ Lightning Automation"
              description="Intelligently prioritize and schedule tasks based on deadlines and importance with AI-powered insights."
            />
            <FeatureCard
              icon={
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white shadow-lg">
                  <Shield className="w-8 h-8" />
                </div>
              }
              title="🔒 Military-Grade Security"
              description="Bank-level encryption keeps your sensitive projects and data completely protected at all times."
            />
            <FeatureCard
              icon={
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white shadow-lg">
                  <Star className="w-8 h-8" />
                </div>
              }
              title="📊 Insightful Analytics"
              description="Gain magical insights into your productivity patterns and optimize performance like a pro."
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-900/30 via-purple-900/30 to-pink-900/30">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="flex -space-x-4 mb-8">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-16 h-16 rounded-full border-4 border-white/30 bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-black text-lg shadow-2xl">
                U{i}
              </div>
            ))}
            <div className="w-16 h-16 rounded-full border-4 border-white/30 bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center font-black text-lg shadow-2xl">
              +50K
            </div>
          </div>
          <h3 className="text-3xl font-black mb-3 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Powering 50,000+ Professionals Worldwide 🌍</h3>
          <p className="text-lg text-white/80 font-bold">Trusted by Industry Leaders & Visionaries</p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-bold border border-white/20">Fortune 500</div>
            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-bold border border-white/20">Startups</div>
            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-bold border border-white/20">Teams</div>
            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-bold border border-white/20">Freelancers</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-indigo-900/40 border-t border-white/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg">
                <CheckCircle2 className="w-6 h-6" strokeWidth={3} />
              </div>
              <div>
                <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Task-Master-Pro</h3>
                <p className="text-white/60 text-sm">The ultimate productivity suite</p>
              </div>
            </div>
            <p className="text-white/70 max-w-sm leading-relaxed">
              The ultimate solution for organizing your projects and tasks. Intelligently designed,
              precision engineered, and beautifully crafted for maximum productivity.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                f
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                in
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                t
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-lg font-black text-white border-b border-white/20 pb-2">Solutions</h4>
            <ul className="space-y-3">
              <li><Link href="/dashboard" className="text-white/70 hover:text-cyan-400 transition-colors block font-medium">For Teams 🧑‍💼</Link></li>
              <li><Link href="/dashboard" className="text-white/70 hover:text-cyan-400 transition-colors block font-medium">Enterprise 🏢</Link></li>
              <li><Link href="/dashboard" className="text-white/70 hover:text-cyan-400 transition-colors block font-medium">Integrations 🔗</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-lg font-black text-white border-b border-white/20 pb-2">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/70 hover:text-cyan-400 transition-colors block font-medium">Documentation 📚</Link></li>
              <li><Link href="/" className="text-white/70 hover:text-cyan-400 transition-colors block font-medium">Support Center 🛠️</Link></li>
              <li><Link href="/" className="text-white/70 hover:text-cyan-400 transition-colors block font-medium">Community 👥</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/20 text-center">
          <p className="text-white/50 text-sm">
            &copy; 2026 Task-Master-Pro. All rights reserved. Crafted with ❤️ for productivity enthusiasts worldwide.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-xs text-white/40">
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-cyan-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-2xl p-8 border-2 border-white/20 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group transform hover:-translate-y-2">
      <div className="flex justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 text-white text-center">{title}</h3>
      <p className="text-white/80 text-center leading-relaxed">
        {description}
      </p>
    </div>
  );
}
