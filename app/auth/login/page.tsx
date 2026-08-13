'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { Lock, Smartphone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [identifier, setIdentifier] = useState('+91 98765 43210');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'input' | 'otp'>('input');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950">Welcome to JanVaani</h1>
        <p className="text-xs text-slate-500">Sign in to report, validate problems, and earn civic points.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-card space-y-5">
        {step === 'input' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthMethod('phone')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${authMethod === 'phone' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
              >
                Phone OTP
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${authMethod === 'email' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
              >
                Email
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-600">
                {authMethod === 'phone' ? 'Mobile Number' : 'Email Address'}
              </label>
              <input
                type={authMethod === 'phone' ? 'tel' : 'email'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-colors"
            >
              Send Verification Code
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center space-y-1">
              <span className="text-xs text-slate-500">Code sent to {identifier}</span>
              <div className="font-mono text-xs font-bold text-blue-600">Enter Demo OTP: 123456</div>
            </div>

            <input
              type="text"
              maxLength={6}
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full text-center text-xl font-mono font-bold tracking-widest px-4 py-2.5 rounded-xl border border-slate-200"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-colors"
            >
              Verify & Sign In
            </button>
          </form>
        )}

        <div className="pt-3 text-center text-xs text-slate-500 border-t border-slate-100">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-blue-600 font-bold hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
