'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { CIVIC_BADGES } from '@/lib/mock-data';
import {
  Award,
  Trophy,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  Gift,
  Coins,
} from 'lucide-react';

export default function RewardsPage() {
  const { user } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-blue-200">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Civic Recognition & Impact Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Your Meaningful Civic Impact, Rewarded.
          </h1>

          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            JanVaani rewards verified ground truth, quality evidence, and actionable engineering solutions — never complaint spam.
          </p>
        </div>

        {/* User Balance Card */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center space-y-2 shrink-0 w-full sm:w-auto min-w-[240px]">
          <span className="text-xs font-bold text-blue-200 uppercase tracking-wider block">
            Total Civic Points
          </span>
          <div className="text-4xl sm:text-5xl font-black text-amber-300 font-mono">
            {user.points.toLocaleString()}
          </div>
          <div className="text-xs font-bold text-white bg-white/15 py-1 px-3 rounded-full inline-block">
            Level {user.level}: {user.levelTitle}
          </div>
        </div>
      </div>

      {/* Point Rules Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div>
          <h2 className="text-lg font-black text-slate-950">How to Earn Civic Points & Recognition</h2>
          <p className="text-xs text-slate-500">
            Quality-based scoring signals verified by multi-modal AI and community validation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
            <div className="text-xl font-black text-blue-700 font-mono">+120 PTS</div>
            <h4 className="text-xs font-bold text-slate-900">Verified Problem Discovery</h4>
            <p className="text-[11px] text-slate-600">
              Report an original problem verified by 5+ neighborhood endorsements.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="text-xl font-black text-emerald-700 font-mono">+80 PTS</div>
            <h4 className="text-xs font-bold text-slate-900">Tamper-Proof Evidence</h4>
            <p className="text-[11px] text-slate-600">
              Submit GPS-tagged photos, videos, or acoustic voice memos.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
            <div className="text-xl font-black text-purple-700 font-mono">+50 PTS</div>
            <h4 className="text-xs font-bold text-slate-900">Independent Verification</h4>
            <p className="text-[11px] text-slate-600">
              Perform on-ground validation after municipal authority claims resolution.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="text-xl font-black text-amber-700 font-mono">+500 PTS</div>
            <h4 className="text-xs font-bold text-slate-900">Accepted Solution Proposal</h4>
            <p className="text-[11px] text-slate-600">
              Engineering or policy solution approved in KillCritic and adopted by Dept.
            </p>
          </div>
        </div>
      </div>

      {/* Badges Showcase */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-950">Civic Badges & Credentials</h2>
            <p className="text-xs text-slate-500">
              Verifiable proof of your real-world contributions to Indian public infrastructure.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-xl">
            5 / 6 Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CIVIC_BADGES.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                badge.unlocked
                  ? 'bg-slate-50 border-slate-200 shadow-xs'
                  : 'bg-slate-100/60 border-slate-200 opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-sm ${
                  badge.tier === 'platinum'
                    ? 'bg-slate-900 text-purple-300'
                    : badge.tier === 'gold'
                    ? 'bg-amber-400 text-slate-950'
                    : badge.tier === 'silver'
                    ? 'bg-slate-300 text-slate-800'
                    : 'bg-amber-700 text-white'
                }`}
              >
                {badge.unlocked ? <Award className="w-6 h-6" /> : <Lock className="w-5 h-5 text-slate-500" />}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{badge.name}</h4>
                  <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200">
                    {badge.tier}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">{badge.description}</p>
                {badge.earnedDate && (
                  <div className="text-[10px] text-emerald-600 font-semibold pt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Unlocked on {badge.earnedDate}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
