'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, ShieldCheck, Users, Trophy, Building2, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Our Mission
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
          About JanVaani
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Jan = People. Vaani = Voice. Tagline: Speak. Share. Solve. Reward.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card space-y-6 text-sm text-slate-700 leading-relaxed">
        <h2 className="text-xl font-black text-slate-950">India&apos;s Citizen Problem & Solution Intelligence Platform</h2>
        <p>
          JanVaani was conceived to bridge the historic gap between everyday citizen grievances and municipal action. Rather than an unorganized complaint portal, JanVaani combines <strong>voice-first reporting</strong>, <strong>multi-modal AI duplicate clustering</strong>, <strong>decentralized community verification</strong>, <strong>student and expert engineering solutions</strong>, and <strong>quality-based civic rewards</strong> into one seamless loop.
        </p>

        <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200 space-y-2">
          <span className="font-bold text-blue-900 uppercase text-xs">The JanVaani Resolution Loop</span>
          <div className="text-xs font-mono font-bold text-blue-800 flex flex-wrap items-center gap-1.5 pt-1">
            <span>VOICE</span> → <span>PROBLEM</span> → <span>EVIDENCE</span> → <span>COMMUNITY VALIDATION</span> → <span>AI INTEL</span> → <span>SOLUTION</span> → <span>ACTION</span> → <span>VERIFICATION</span> → <span>REWARD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
