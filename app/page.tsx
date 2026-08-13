'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { CIVIC_TAXONOMY } from '@/lib/taxonomy';
import { ProblemCard } from '@/components/cards/ProblemCard';
import { BountyCard } from '@/components/cards/BountyCard';
import { ContributorCard } from '@/components/cards/ContributorCard';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { TOP_CONTRIBUTORS } from '@/lib/mock-data';
import {
  Mic,
  PlusCircle,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Award,
  Lightbulb,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Building2,
  Flame,
  FileCheck,
  Download,
  Smartphone,
} from 'lucide-react';

export default function HomePage() {
  const { problems, bounties } = useApp();
  const [trendingTab, setTrendingTab] = useState<'all' | 'nearby' | 'unresolved' | 'high_priority'>('all');

  // Filter trending problems based on active tab
  const filteredProblems = problems.filter((p) => {
    if (trendingTab === 'unresolved') return p.status !== 'resolved';
    if (trendingTab === 'high_priority') return p.severity === 'high' || p.severity === 'critical';
    return true;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* 01. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-8 sm:pt-14 pb-12 border-b border-slate-200/80">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/10 w-72 h-72 bg-sky-300/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>India&apos;s Citizen Problem & Solution Intelligence Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
                Your Voice Can Change <br className="hidden sm:inline" />
                What Happens <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2">Around You.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                Report real problems in your own language. Find people facing the same issues. Discover solutions. Help decision-makers take verifiable action.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/report"
                  className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 transition-all transform hover:-translate-y-0.5"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Report a Problem</span>
                </Link>

                <Link
                  href="/explore"
                  className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200 shadow-sm hover:shadow transition-all flex items-center gap-2"
                >
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Explore Nearby</span>
                </Link>
              </div>

              {/* Voice First Pill Indicator */}
              <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Voice-First Reporting in 7 Indian Languages with Multi-Modal AI</span>
              </div>
            </div>

            {/* Right Hero Graphic & Floating Sector Report Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-gradient-to-tr from-blue-600 to-indigo-800 rounded-3xl p-6 shadow-2xl text-white overflow-hidden">
                <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-sky-400/20 rounded-full blur-2xl" />

                {/* Header inside graphic */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold text-blue-200 uppercase tracking-wider block">
                      Live Area Activity
                    </span>
                    <span className="text-lg font-black text-white">Vadodara Municipal Area</span>
                  </div>
                  <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-mono font-bold">
                    19 Wards
                  </span>
                </div>

                {/* Floating Metric Chips */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                    <div className="text-xl font-black text-white">342</div>
                    <div className="text-xs text-blue-200 font-semibold flex items-center gap-1 mt-0.5">
                      <span>🚗 Roads & Infra</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                    <div className="text-xl font-black text-white">156</div>
                    <div className="text-xs text-sky-200 font-semibold flex items-center gap-1 mt-0.5">
                      <span>💧 Water Supply</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                    <div className="text-xl font-black text-white">192</div>
                    <div className="text-xs text-emerald-200 font-semibold flex items-center gap-1 mt-0.5">
                      <span>🗑️ Sanitation</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                    <div className="text-xl font-black text-white">117</div>
                    <div className="text-xs text-amber-200 font-semibold flex items-center gap-1 mt-0.5">
                      <span>⚡ Electricity</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Graphic Snippet */}
                <div className="p-3 bg-slate-950/40 backdrop-blur-md rounded-xl border border-white/10 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium text-slate-200">29,412 Verified Resolutions</span>
                  </div>
                  <Link href="/map" className="text-blue-300 font-bold hover:underline flex items-center gap-1">
                    <span>View Map</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* LIVE PLATFORM METRICS COUNTER BAR */}
          <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-card">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Problems Reported
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-mono">
                1,284,531
              </div>
              <span className="inline-block mt-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                ↑ +12.4% this month
              </span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-card">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Verified Problems
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-mono">
                432,891
              </div>
              <span className="inline-block mt-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                ↑ +8.7% this month
              </span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-card">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Solutions Submitted
              </span>
              <div className="text-2xl sm:text-3xl font-black text-purple-700 tracking-tight font-mono">
                182,410
              </div>
              <span className="inline-block mt-1 text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                ↑ +15.3% this month
              </span>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-card">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Problems Resolved
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight font-mono">
                29,412
              </div>
              <span className="inline-block mt-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                ↑ +18.1% this month
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 02. TRENDING PROBLEMS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5 text-rose-500" />
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Trending Problems
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Active citizen reports gaining high neighborhood validation and authority attention.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-xs self-start sm:self-auto">
            <button
              onClick={() => setTrendingTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                trendingTab === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTrendingTab('nearby')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                trendingTab === 'nearby'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Nearby
            </button>
            <button
              onClick={() => setTrendingTab('unresolved')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                trendingTab === 'unresolved'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Unresolved
            </button>
            <button
              onClick={() => setTrendingTab('high_priority')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                trendingTab === 'high_priority'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              High Priority
            </button>
          </div>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProblems.slice(0, 4).map((p) => (
            <ProblemCard key={p.id} problem={p} />
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/problems"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-4 py-2 rounded-xl transition-colors border border-blue-200"
          >
            <span>Explore All 1,284,531 Problem Cases</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 03. THREE-COLUMN INTELLIGENCE SECTION: HEATMAP + BOUNTIES + TOP CONTRIBUTORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Col 1: Problem Heatmap GIS */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-black text-slate-950">Problem Heatmap</h3>
              </div>
              <Link href="/map" className="text-xs font-bold text-blue-600 hover:underline">
                View Full GIS →
              </Link>
            </div>
            <InteractiveMap height="h-[380px]" initialCity="Vadodara" />
          </div>

          {/* Col 2: Active Challenges / Bounties */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-black text-slate-950">Active Challenges</h3>
              </div>
              <Link href="/bounties" className="text-xs font-bold text-blue-600 hover:underline">
                View All ({bounties.length}) →
              </Link>
            </div>

            <div className="space-y-3">
              {bounties.slice(0, 3).map((bounty) => (
                <div
                  key={bounty.id}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200/90 hover:border-amber-300 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/bounties/${bounty.id}`}
                      className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1 block"
                    >
                      {bounty.title}
                    </Link>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                      <span className="font-bold text-amber-600">
                        {bounty.currency}{bounty.rewardAmount.toLocaleString()}
                      </span>
                      <span>•</span>
                      <span>{bounty.daysLeft} days left</span>
                      <span>•</span>
                      <span>{bounty.participantsCount} entries</span>
                    </div>
                  </div>
                  <Link
                    href={`/bounties/${bounty.id}`}
                    className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-600 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Top Contributors Leaderboard */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-black text-slate-950">Top Contributors</h3>
              </div>
              <Link href="/leaderboard" className="text-xs font-bold text-blue-600 hover:underline">
                Leaderboard →
              </Link>
            </div>

            <div className="space-y-2">
              {TOP_CONTRIBUTORS.slice(0, 4).map((contributor) => (
                <ContributorCard key={contributor.id} contributor={contributor} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04. 6 CORE PLATFORM PILLARS (MATCHING BLUEPRINT BOTTOM BAR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Platform Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-2">
            The Complete Civic Problem-to-Impact Engine
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 hover:border-blue-300 transition-all text-center space-y-2 group shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Mic className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Voice First</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Speak in your own native language
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 hover:border-emerald-300 transition-all text-center space-y-2 group shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Evidence Based</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Photos, audio, GPS & tamper-checks
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 hover:border-indigo-300 transition-all text-center space-y-2 group shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Community Driven</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              People validate & support issues
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 hover:border-purple-300 transition-all text-center space-y-2 group shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">AI Intelligence</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Smart categorization & clustering
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 hover:border-amber-300 transition-all text-center space-y-2 group shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Solutions & Action</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Authorities take action & update status
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 hover:border-yellow-300 transition-all text-center space-y-2 group shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900">Rewards & Recognition</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Earn points, badges & cash prizes
            </p>
          </div>
        </div>
      </section>

      {/* 05. 100+ CATEGORIES DISCOVERY STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-navy-950 rounded-3xl p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                100+ Civic Categories
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Covering Every Aspect of Urban & Rural Daily Life
              </h3>
            </div>
            <Link
              href="/categories"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs text-white transition-colors"
            >
              Browse Taxonomy →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CIVIC_TAXONOMY.slice(0, 4).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories#${cat.id}`}
                className="bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl border border-white/10 transition-all block"
              >
                <div className="text-xs font-bold text-white mb-1">{cat.name}</div>
                <div className="text-[11px] text-slate-400">{cat.subcategories.length} Subcategories</div>
                <div className="text-[10px] text-blue-300 font-mono mt-1 font-semibold">
                  {cat.reportCount.toLocaleString()} Reports
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 06. SEVEN-STEP VISUAL JOURNEY: HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            How JanVaani Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-2">
            The 7-Step Citizen Resolution Journey
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
          {[
            { step: '01', name: 'Speak', icon: '🎙️', desc: 'Report in your own language with voice & photo evidence.' },
            { step: '02', name: 'Share', icon: '📍', desc: 'Geolocate precisely down to street and ward.' },
            { step: '03', name: 'Validate', icon: '👥', desc: 'Nearby citizens confirm "I face this too".' },
            { step: '04', name: 'Understand', icon: '🧠', desc: 'AI extracts entities, clusters duplicates & routes to dept.' },
            { step: '05', name: 'Solve', icon: '💡', desc: 'Students & experts propose vetted engineering solutions.' },
            { step: '06', name: 'Act', icon: '🚜', desc: 'Authorities dispatch crews with active SLA tracking.' },
            { step: '07', name: 'Reward', icon: '🏆', desc: 'Citizens verify resolution & earn civic points.' },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white p-4 rounded-2xl border border-slate-200/90 text-center space-y-2 hover:border-blue-300 transition-all shadow-xs"
            >
              <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                STEP {item.step}
              </span>
              <div className="text-2xl">{item.icon}</div>
              <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
              <p className="text-[10px] text-slate-500 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 07. APP DOWNLOAD & CITIZEN ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Mobile Civic Experience
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
              Carry JanVaani in Your Pocket. Report in 30 Seconds.
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Available as a responsive Web App with offline voice memo capture, GPS geo-stamping, and real-time push updates when municipal crews take action.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/report"
              className="px-6 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span>Launch Web App</span>
            </Link>

            <Link
              href="/explore"
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
