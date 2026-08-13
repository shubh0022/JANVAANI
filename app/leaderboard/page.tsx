'use client';

import React, { useState } from 'react';
import { TOP_CONTRIBUTORS } from '@/lib/mock-data';
import { ContributorCard } from '@/components/cards/ContributorCard';
import { Trophy, Award, MapPin, Users, Sparkles, Filter } from 'lucide-react';

export default function LeaderboardPage() {
  const [scope, setScope] = useState<'all_india' | 'gujarat' | 'vadodara' | 'students' | 'experts'>('all_india');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>National Civic Leaderboard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Top Citizen Champions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Recognizing the citizens, students, and engineers driving the highest validated public impact across India.
        </p>
      </div>

      {/* Scope Filter Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-card flex items-center justify-center gap-1 overflow-x-auto">
        {[
          { id: 'all_india', label: 'All India' },
          { id: 'gujarat', label: 'Gujarat State' },
          { id: 'vadodara', label: 'Vadodara City' },
          { id: 'students', label: 'Student Innovators' },
          { id: 'experts', label: 'Civic Experts' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setScope(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all min-w-max ${
              scope === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        {TOP_CONTRIBUTORS.slice(0, 3).map((c) => (
          <div
            key={c.id}
            className={`bg-white rounded-3xl p-6 border text-center space-y-4 shadow-card ${
              c.rank === 1
                ? 'border-amber-400 ring-2 ring-amber-100 relative sm:-translate-y-2'
                : 'border-slate-200'
            }`}
          >
            {c.rank === 1 && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-sm">
                👑 #1 National Champion
              </span>
            )}

            <img
              src={c.avatar}
              alt={c.name}
              className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-slate-100 shadow-md"
            />

            <div>
              <h3 className="text-base font-black text-slate-950">{c.name}</h3>
              <p className="text-xs text-blue-600 font-semibold">{c.role}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{c.location}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-around text-xs">
              <div>
                <span className="font-mono font-black text-slate-900 block">{c.points.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400">Points</span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div>
                <span className="font-mono font-black text-emerald-600 block">{c.problemsReported}</span>
                <span className="text-[10px] text-slate-400">Reported</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
          All Ranked Contributors
        </h3>
        <div className="space-y-3">
          {TOP_CONTRIBUTORS.map((contributor) => (
            <ContributorCard key={contributor.id} contributor={contributor} />
          ))}
        </div>
      </div>
    </div>
  );
}
