'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { ProblemCard } from '@/components/cards/ProblemCard';
import { SolutionCard } from '@/components/cards/SolutionCard';
import {
  User,
  Award,
  Trophy,
  CheckCircle2,
  Clock,
  Sparkles,
  PlusCircle,
  Settings,
  Bell,
  Activity,
  Heart,
  TrendingUp,
  MapPin,
  Building2,
  FileCheck,
} from 'lucide-react';

export default function CitizenDashboardPage() {
  const { user, problems, solutions } = useApp();
  const [activeTab, setActiveTab] = useState<'my_problems' | 'my_solutions' | 'activity'>('my_problems');

  const myProblems = problems.filter((p) => p.reportedBy.id === user.id || p.reportedBy.name.includes(user.name));
  const mySolutions = solutions.filter((s) => s.author.id === user.id || s.author.name.includes(user.name));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* User Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-950">{user.name}</h1>
                {user.verified && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
              </div>
              <div className="text-xs text-blue-600 font-semibold flex items-center gap-2">
                <span className="capitalize">{user.role} Contributor</span>
                <span>•</span>
                <span className="text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  {user.location}
                </span>
              </div>
              <p className="text-xs text-slate-600 max-w-md line-clamp-1">{user.bio}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <Link
              href="/report"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Problem</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4-Stat Metric Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
          <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100">
            <span className="text-[10px] font-bold text-blue-900 uppercase">Civic Points</span>
            <div className="text-xl font-black text-blue-700 font-mono mt-0.5">{user.points.toLocaleString()}</div>
            <span className="text-[10px] text-blue-600 font-semibold">Level {user.level}: {user.levelTitle}</span>
          </div>

          <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-100">
            <span className="text-[10px] font-bold text-amber-900 uppercase">Badges Earned</span>
            <div className="text-xl font-black text-amber-700 font-mono mt-0.5">{user.badgesCount}</div>
            <span className="text-[10px] text-amber-600 font-semibold">Civic Credentials</span>
          </div>

          <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100">
            <span className="text-[10px] font-bold text-emerald-900 uppercase">Problems Reported</span>
            <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">34</div>
            <span className="text-[10px] text-emerald-600 font-semibold">18 Confirmed Resolved</span>
          </div>

          <div className="p-3.5 bg-purple-50/70 rounded-2xl border border-purple-100">
            <span className="text-[10px] font-bold text-purple-900 uppercase">People Reached</span>
            <div className="text-xl font-black text-purple-700 font-mono mt-0.5">24.5K</div>
            <span className="text-[10px] text-purple-600 font-semibold">Community Impact</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('my_problems')}
            className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'my_problems'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            My Reported Problems ({myProblems.length || 1})
          </button>
          <button
            onClick={() => setActiveTab('my_solutions')}
            className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'my_solutions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            My Solutions ({mySolutions.length || 1})
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'activity'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Live Activity Log
          </button>
        </div>

        {activeTab === 'my_problems' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(myProblems.length > 0 ? myProblems : problems.slice(0, 2)).map((p) => (
              <ProblemCard key={p.id} problem={p} />
            ))}
          </div>
        )}

        {activeTab === 'my_solutions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {solutions.slice(0, 2).map((s) => (
              <SolutionCard key={s.id} solution={s} />
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Recent Account Timeline
            </h3>
            <div className="space-y-3 divide-y divide-slate-100 text-xs">
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">Earned +120 Civic Points</span>
                  <p className="text-slate-500">Report on Karelibaug Waterlogging reached 25+ endorsements.</p>
                </div>
                <span className="text-[10px] text-slate-400">1 hour ago</span>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">Verified Akota Park Sanitation</span>
                  <p className="text-slate-500">Confirmed &ldquo;I face this too&rdquo; with 1 geotagged image.</p>
                </div>
                <span className="text-[10px] text-slate-400">6 hours ago</span>
              </div>
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">Upvoted Drainage Solution</span>
                  <p className="text-slate-500">Endorsed Er. Rohan Mehta dual-chamber sump design.</p>
                </div>
                <span className="text-[10px] text-slate-400">1 day ago</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
