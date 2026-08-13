'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Globe, MapPin, CheckCircle2 } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Vadodara, Gujarat');
  const [language, setLanguage] = useState('en');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950">Join JanVaani</h1>
        <p className="text-xs text-slate-500">Become a verified citizen contributor in your ward.</p>
      </div>

      <form onSubmit={handleSignUp} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-card space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase text-slate-600">Full Name</label>
          <input
            type="text"
            placeholder="e.g. Neha Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase text-slate-600">Mobile Number (for OTP verification)</label>
          <input
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase text-slate-600">City / District</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase text-slate-600">Preferred Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="gu">ગુજરાતી (Gujarati)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="mr">मराठी (Marathi)</option>
            <option value="bn">বাংলা (Bengali)</option>
            <option value="te">తెలుగు (Telugu)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-colors mt-2"
        >
          Create Account & Earn 50 Welcome Pts
        </button>

        <div className="pt-3 text-center text-xs text-slate-500 border-t border-slate-100">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
