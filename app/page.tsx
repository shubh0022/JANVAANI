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
import { DataSourceBadge } from '@/components/ui/DataSourceBadge';
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
  Database,
  Bot,
  Activity,
  ChevronRight,
  Clock,
  Radio,
} from 'lucide-react';

const LIVE_AREAS = [
  { city: 'Vadodara', state: 'Gujarat', wards: 19, roads: 342, water: 156, sanitation: 192, electricity: 117, solved: 29412 },
  { city: 'Ahmedabad', state: 'Gujarat', wards: 48, roads: 840, water: 312, sanitation: 490, electricity: 245, solved: 78210 },
  { city: 'Surat', state: 'Gujarat', wards: 30, roads: 512, water: 210, sanitation: 380, electricity: 180, solved: 52140 },
  { city: 'Mumbai', state: 'Maharashtra', wards: 24, roads: 1240, water: 620, sanitation: 890, electricity: 410, solved: 142300 },
  { city: 'Bengaluru', state: 'Karnataka', wards: 198, roads: 1150, water: 540, sanitation: 760, electricity: 390, solved: 118900 },
];

export default function HomePage() {
  const { problems, bounties } = useApp();
  const [trendingTab, setTrendingTab] = useState<'all' | 'nearby' | 'unresolved' | 'high_priority'>('all');
  const [selectedAreaIdx, setSelectedAreaIdx] = useState<number>(0);

  const activeArea = LIVE_AREAS[selectedAreaIdx];

  // Filter trending problems based on active tab
  const filteredProblems = problems.filter((p) => {
    if (trendingTab === 'unresolved') return p.status !== 'resolved';
    if (trendingTab === 'high_priority') return p.severity === 'high' || p.severity === 'critical';
    return true;
  });

  return (
    <div className="space-y-16 pb-20 w-full">
      {/* 01. HERO SECTION (EXPANSIVE WIDESCREEN LAYOUT) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 via-white to-slate-50 pt-8 sm:pt-14 pb-14 border-b border-slate-200/80">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/10 w-96 h-96 bg-sky-300/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 border border-blue-200 text-blue-900 text-xs font-bold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>India&apos;s Citizen Problem &amp; Solution Intelligence Platform</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                  <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                  <span>Real-time Civic AI</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-950 tracking-tight leading-[1.1]">
                Your Voice Can Change <br className="hidden sm:inline" />
                What Happens <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2">Around You.</span>
              </h1>

              <p className="text-base sm:text-lg xl:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
                Report real problems in your own language. Find people facing the same issues. Discover solutions. Help decision-makers take verifiable action.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/report"
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 transition-all transform hover:-translate-y-0.5"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Report a Problem</span>
                </Link>

                <Link
                  href="/explore"
                  className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200 shadow-sm hover:shadow transition-all flex items-center gap-2"
                >
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Explore Nearby</span>
                </Link>

                <Link
                  href="/ai-assistant"
                  className="px-5 py-3.5 sm:py-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 font-bold text-sm sm:text-base border border-indigo-200 transition-all flex items-center gap-2"
                >
                  <Bot className="w-5 h-5 text-indigo-600" />
                  <span>AI Saathi</span>
                </Link>
              </div>

              {/* Voice-First Multilingual Indicator Pills */}
              <div className="pt-3 space-y-2 border-t border-slate-200/60">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <Mic className="w-3.5 h-3.5 text-blue-600" />
                  <span>Voice-First Reporting in 7 Indian Languages with Multi-Modal AI:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {['हिन्दी (Hindi)', 'ગુજરાતી (Gujarati)', 'தமிழ் (Tamil)', 'తెలుగు (Telugu)', 'বাংলা (Bengali)', 'मराठी (Marathi)', 'English'].map((l) => (
                    <span
                      key={l}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-700 shadow-2xs hover:border-blue-300 transition-colors"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Hero Graphic: Interactive Live Area Activity Hub */}
            <div className="lg:col-span-5 xl:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-xl bg-gradient-to-tr from-slate-900 via-blue-950 to-indigo-900 rounded-3xl p-6 sm:p-7 shadow-2xl text-white overflow-hidden border border-slate-800/80">
                <div className="absolute -right-12 -bottom-12 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-12 -top-12 w-44 h-44 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Header inside graphic */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-[11px] font-extrabold text-blue-300 uppercase tracking-wider block">
                        Live Area Activity
                      </span>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-white block mt-0.5">
                      {activeArea.city} Municipal Area
                    </span>
                  </div>

                  {/* City Selector Pills */}
                  <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl border border-white/10 backdrop-blur-md">
                    {LIVE_AREAS.map((a, idx) => (
                      <button
                        key={a.city}
                        type="button"
                        onClick={() => setSelectedAreaIdx(idx)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          selectedAreaIdx === idx
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {a.city.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-300 mb-5 flex items-center gap-2">
                  <span className="bg-white/15 px-2 py-0.5 rounded font-mono font-bold text-blue-200">
                    {activeArea.wards} Wards
                  </span>
                  <span>•</span>
                  <span>{activeArea.state}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">Active Dispatch Feeds</span>
                </div>

                {/* Floating Metric Chips */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-white/10 hover:bg-white/15 transition-colors backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-black text-white font-mono">{activeArea.roads}</div>
                      <span className="text-[10px] font-bold text-rose-300 bg-rose-500/20 px-1.5 py-0.5 rounded">
                        High Priority
                      </span>
                    </div>
                    <div className="text-xs text-blue-200 font-semibold flex items-center gap-1 mt-1">
                      <span>🚗 Roads &amp; Infra</span>
                    </div>
                  </div>

                  <div className="bg-white/10 hover:bg-white/15 transition-colors backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-black text-white font-mono">{activeArea.water}</div>
                      <span className="text-[10px] font-bold text-sky-300 bg-sky-500/20 px-1.5 py-0.5 rounded">
                        Water Dept
                      </span>
                    </div>
                    <div className="text-xs text-sky-200 font-semibold flex items-center gap-1 mt-1">
                      <span>💧 Water Supply</span>
                    </div>
                  </div>

                  <div className="bg-white/10 hover:bg-white/15 transition-colors backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-black text-white font-mono">{activeArea.sanitation}</div>
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                        94% Cleared
                      </span>
                    </div>
                    <div className="text-xs text-emerald-200 font-semibold flex items-center gap-1 mt-1">
                      <span>🗑️ Sanitation</span>
                    </div>
                  </div>

                  <div className="bg-white/10 hover:bg-white/15 transition-colors backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-black text-white font-mono">{activeArea.electricity}</div>
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded">
                        Streetlights
                      </span>
                    </div>
                    <div className="text-xs text-amber-200 font-semibold flex items-center gap-1 mt-1">
                      <span>⚡ Electricity</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Graphic Snippet */}
                <div className="p-3.5 bg-slate-950/60 backdrop-blur-md rounded-2xl border border-white/10 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-slate-100">
                      {activeArea.solved.toLocaleString()} Verified Resolutions
                    </span>
                  </div>
                  <Link
                    href="/map"
                    className="text-blue-300 font-bold hover:text-white hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>View Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* LIVE CIVIC INTELLIGENCE & PROVENANCE METRICS BAR */}
          <div className="mt-14 pt-8 border-t border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Live Civic Intelligence &amp; Provenance
                </span>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  All-India Verification
                </span>
              </div>
              <Link
                href="/data-catalog"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>National Open Data Catalog &amp; Licenses →</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-card space-y-2 hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Citizen Reports
                  </span>
                  <DataSourceBadge sourceId="src_janvaani_citizen" size="sm" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-mono">
                  12,642
                </div>
                <span className="text-[10px] text-slate-500 font-medium block">
                  Geotagged &amp; verified by community
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-card space-y-2 hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Census Districts
                  </span>
                  <DataSourceBadge sourceId="src_census_pca_2011" size="sm" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight font-mono">
                  640
                </div>
                <span className="text-[10px] text-slate-500 font-medium block">
                  100% All-India Demographic Baseline
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-card space-y-2 hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Air Quality Stations
                  </span>
                  <DataSourceBadge sourceId="src_cpcb_aqi" size="sm" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight font-mono">
                  428 CAAQMS
                </div>
                <span className="text-[10px] text-slate-500 font-medium block">
                  CPCB Continuous Real-Time Feeds
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-card space-y-2 hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Verified Solved
                  </span>
                  <DataSourceBadge trustLevel="COMMUNITY_VERIFIED" size="sm" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-purple-700 tracking-tight font-mono">
                  8,155
                </div>
                <span className="text-[10px] text-slate-500 font-medium block">
                  91.4% Citizen Proof Verified
                </span>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-card space-y-2 hover:border-blue-300 transition-all col-span-2 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    SLA Compliance
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
                  88.2%
                </div>
                <span className="text-[10px] text-slate-500 font-medium block">
                  28.4 Hours Median Resolution
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. TRENDING PROBLEMS SECTION (EXPANSIVE GRID) */}
      <section className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
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

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProblems.slice(0, 4).map((p) => (
            <ProblemCard key={p.id} problem={p} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-xl transition-colors border border-blue-200 shadow-xs"
          >
            <span>Explore All 1,284,531 Problem Cases Across India</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 03. THREE-COLUMN INTELLIGENCE SECTION: HEATMAP + BOUNTIES + TOP CONTRIBUTORS */}
      <section className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
          {/* Col 1: Problem Heatmap GIS */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-black text-slate-950">Problem Heatmap GIS</h3>
              </div>
              <Link href="/map" className="text-xs font-bold text-blue-600 hover:underline">
                View Full GIS →
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-card">
              <InteractiveMap height="h-[420px]" initialCity="Vadodara" />
            </div>
          </div>

          {/* Col 2: Active Challenges / Bounties */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-black text-slate-950">Active Challenges &amp; Bounties</h3>
              </div>
              <Link href="/bounties" className="text-xs font-bold text-blue-600 hover:underline">
                View All ({bounties.length}) →
              </Link>
            </div>

            <div className="space-y-3">
              {bounties.slice(0, 3).map((bounty) => (
                <div
                  key={bounty.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200/90 hover:border-amber-300 transition-all flex items-center justify-between gap-3 group shadow-xs"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/bounties/${bounty.id}`}
                      className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1 block"
                    >
                      {bounty.title}
                    </Link>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                      <span className="font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
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
                    className="p-2 rounded-xl bg-slate-100 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-600 transition-colors shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Top Contributors Leaderboard */}
          <div className="lg:col-span-3 xl:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-black text-slate-950">Top Contributors</h3>
              </div>
              <Link href="/leaderboard" className="text-xs font-bold text-blue-600 hover:underline">
                Leaderboard →
              </Link>
            </div>

            <div className="space-y-2.5">
              {TOP_CONTRIBUTORS.slice(0, 4).map((contributor) => (
                <ContributorCard key={contributor.id} contributor={contributor} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04. 6 CORE PLATFORM PILLARS */}
      <section className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Platform Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-2">
            The Complete Civic Problem-to-Impact Engine
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-card-hover transition-all text-center space-y-2 group shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Mic className="w-6 h-6" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">Voice First</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Speak in your own native Indian language
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-emerald-300 hover:shadow-card-hover transition-all text-center space-y-2 group shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <FileCheck className="w-6 h-6" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">Evidence Based</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Photos, audio, GPS &amp; tamper-checks
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-indigo-300 hover:shadow-card-hover transition-all text-center space-y-2 group shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">Community Driven</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              People validate &amp; support issues
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-purple-300 hover:shadow-card-hover transition-all text-center space-y-2 group shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">AI Intelligence</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Smart categorization &amp; clustering
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-amber-300 hover:shadow-card-hover transition-all text-center space-y-2 group shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">Solutions &amp; Action</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Authorities take action &amp; update status
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-yellow-300 hover:shadow-card-hover transition-all text-center space-y-2 group shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">Rewards &amp; Impact</h4>
            <p className="text-[11px] text-slate-500 leading-tight">
              Earn points, badges &amp; cash prizes
            </p>
          </div>
        </div>
      </section>

      {/* 05. 100+ CATEGORIES DISCOVERY STRIP */}
      <section className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-blue-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                100+ Civic Categories
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Covering Every Aspect of Urban &amp; Rural Daily Life
              </h3>
            </div>
            <Link
              href="/categories"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs sm:text-sm text-white transition-colors shadow-md"
            >
              Browse Full Taxonomy →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {CIVIC_TAXONOMY.slice(0, 4).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories#${cat.id}`}
                className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 transition-all block"
              >
                <div className="text-xs sm:text-sm font-bold text-white mb-1">{cat.name}</div>
                <div className="text-[11px] text-slate-400">{cat.subcategories.length} Subcategories</div>
                <div className="text-[11px] text-blue-300 font-mono mt-2 font-semibold">
                  {cat.reportCount.toLocaleString()} Reports Active
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 06. SEVEN-STEP VISUAL JOURNEY: HOW IT WORKS */}
      <section className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            How JanVaani Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-2">
            The 7-Step Citizen Resolution Journey
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
          {[
            { step: '01', name: 'Speak', icon: '🎙️', desc: 'Report in your own language with voice & photo evidence.' },
            { step: '02', name: 'Share', icon: '📍', desc: 'Geolocate precisely down to street and ward level.' },
            { step: '03', name: 'Validate', icon: '👥', desc: 'Nearby citizens confirm "I face this too".' },
            { step: '04', name: 'Understand', icon: '🧠', desc: 'AI clusters duplicates & routes to correct dept.' },
            { step: '05', name: 'Solve', icon: '💡', desc: 'Students & experts propose vetted engineering fixes.' },
            { step: '06', name: 'Act', icon: '🚜', desc: 'Authorities dispatch crews with active SLA tracking.' },
            { step: '07', name: 'Reward', icon: '🏆', desc: 'Citizens verify resolution & earn civic points.' },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 text-center space-y-2 hover:border-blue-300 hover:shadow-card transition-all shadow-xs"
            >
              <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                STEP {item.step}
              </span>
              <div className="text-3xl pt-1">{item.icon}</div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.name}</h4>
              <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 07. APP DOWNLOAD & CITIZEN ACTION BANNER */}
      <section className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
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
              className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span>Launch Web App</span>
            </Link>

            <Link
              href="/explore"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
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

