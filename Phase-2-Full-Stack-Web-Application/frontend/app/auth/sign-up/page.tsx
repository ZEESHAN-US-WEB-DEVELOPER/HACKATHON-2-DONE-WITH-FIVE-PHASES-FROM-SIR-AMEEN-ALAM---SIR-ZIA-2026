'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { signUp } from '@/lib/api';
import { validateEmail } from '@/lib/utils';
import { ArrowRight, CheckCircle2, UserPlus, Sparkles } from 'lucide-react';

export default function SignUpPage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword || !name) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, name);
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="w-full max-w-md">
        <div className="border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white mb-4 shadow-lg">
              <UserPlus className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Join the Productivity Revolution! 🚀</h2>
            <p className="text-base text-white/80 font-medium">Create an account to unlock your colorful productivity journey.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 text-red-300 text-sm flex items-center gap-3 backdrop-blur-sm">
              <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="👤 Full Name"
              type="text"
              placeholder="Your awesome name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
            />

            <Input
              label="📧 Email Address"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
            />

            <Input
              label="🔒 Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
            />

            <Input
              label="🔑 Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              fullWidth
              className="h-12 rounded-xl text-base font-black bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              🎉 Create Magical Account
              {!loading && <ArrowRight className="ml-3 w-5 h-5" />}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-base text-white/80 font-medium">
              Already have an account?{' '}
              <Link
                href="/auth/sign-in"
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 hover:underline underline-offset-4 font-black"
              >
                Sign In ✨
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
