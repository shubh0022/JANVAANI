'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { GraduationCap, Award, Lightbulb, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function StudentHubPage() {
  const { bounties, solutions } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
          <GraduationCap className="w-4 h-4 text-blue-400" />
          <span>Academic Civic Innovation Network</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          Student Civic Hub: Turn Real Problems into Capstone Projects
        </h1>
        <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl leading-relaxed">
          Engineering, architecture, law, and public policy students across India collaborate on live municipal problem statements, earn academic credits, win bounties, and secure government innovation internships.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/bounties"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Trophy className="w-4 h-4" />
            <span>Explore Innovation Challenges</span>
          </Link>
          <Link
            href="/solutions"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
          >
            <span>Submit Solution Blueprint</span>
          </Link>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Real-World Municipal Data</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            No hypothetical textbook examples. Build models with real GIS data from 100+ Indian cities.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Verified Civic Credentials</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Earn cryptographic certificates signed by JanVaani and participating municipal corporations.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Sponsored Hackathons</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Compete in quarterly inter-collegiate civic hackathons with ₹5,00,000+ total prize pools.
          </p>
        </div>
      </div>
    </div>
  );
}
