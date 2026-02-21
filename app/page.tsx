'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    // Mock login delay for effect
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-slate-50">
      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-slate-200 flex flex-col lg:flex-row min-h-[600px]">
        {/* Left Column: Image / Branding */}
        <div className="lg:w-1/2 relative flex flex-col justify-center p-10 lg:p-16 overflow-hidden bg-slate-900 border-r-2 border-slate-200">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-600 rounded-2xl w-fit mb-8 shadow-lg">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            {t('app.title')}
          </h1>
          <p className="text-lg text-slate-200 font-medium leading-relaxed mb-8 max-w-md">
            {t('app.subtitle')}
          </p>
          <div className="flex items-center gap-4 text-blue-300">
            <div className="h-px bg-blue-300/40 flex-1" />
            <span className="text-sm font-semibold tracking-wider uppercase text-blue-400">AI Powered</span>
            <div className="h-px bg-blue-300/40 flex-1" />
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:w-1/2 p-10 lg:p-16 bg-white flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">{t('login.welcome')}</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">{t('login.email')}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 focus:border-blue-500 transition-colors shadow-sm"
                placeholder="farmer@example.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-slate-700">{t('login.password')}</label>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 focus:border-blue-500 transition-colors shadow-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-5 py-3.5 mt-8 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              <span>{loading ? '...' : t('login.submit')}</span>
              {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <a href="#" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
              Contact Admin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
