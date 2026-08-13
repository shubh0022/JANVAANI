'use client';

import React from 'react';
import Link from 'next/link';
import { Mic, MapPin, Users, Sparkles, Lightbulb, Building2, Trophy, ArrowRight } from 'lucide-react';

const STEPS = [
  { num: '01', title: 'Speak Your Problem', icon: Mic, color: 'bg-blue-50 text-blue-600 border-blue-200', desc: 'Record in your own native tongue (Hindi, Gujarati, Tamil, Bengali, English) or type in plain text.' },
  { num: '02', title: 'Pin Exact Location', icon: MapPin, color: 'bg-rose-50 text-rose-600 border-rose-200', desc: 'Auto-geotag coordinates with street, ward, and municipal jurisdiction boundaries.' },
  { num: '03', title: 'Community Validation', icon: Users, color: 'bg-indigo-50 text-indigo-600 border-indigo-200', desc: 'Nearby citizens endorse "I face this too" and upload supporting photos.' },
  { num: '04', title: 'AI Intelligence & Triage', icon: Sparkles, color: 'bg-purple-50 text-purple-600 border-purple-200', desc: 'Extracts entities, clusters duplicates, and auto-routes to the exact responsible department.' },
  { num: '05', title: 'Solution Engineering', icon: Lightbulb, color: 'bg-amber-50 text-amber-600 border-amber-200', desc: 'Students and experts propose low-cost designs vetted by KillCritic red-team analysis.' },
  { num: '06', title: 'Authority Action & SLA', icon: Building2, color: 'bg-emerald-50 text-emerald-600 border-emerald-200', desc: 'Municipal crews deploy workforce and update real-time progress logs.' },
  { num: '07', title: 'Citizen Verification & Rewards', icon: Trophy, color: 'bg-yellow-50 text-yellow-700 border-yellow-200', desc: 'Citizens vote on resolution truth and earn civic points, badges, and recognition.' },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          7-Step Resolution Journey
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
          How JanVaani Works
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          From a 30-second voice memo to verifiable municipal resolution on the ground.
        </p>
      </div>

      <div className="space-y-4">
        {STEPS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.num} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shrink-0 border ${s.color}`}>
                <Icon className="w-7 h-7" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">STEP {s.num}</span>
                  <h3 className="text-base font-black text-slate-900">{s.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <Link
          href="/report"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-lg shadow-blue-600/25"
        >
          <span>Experience It Now: Report a Problem</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
