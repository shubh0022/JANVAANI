'use client';

import React, { useState } from 'react';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { useApp } from '@/lib/store';
import { ProblemCard } from '@/components/cards/ProblemCard';
import { CIVIC_TAXONOMY } from '@/lib/taxonomy';
import {
  MapPin,
  Layers,
  Flame,
  Filter,
  Building2,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Clock,
  Award,
  AlertTriangle,
  Droplets,
  Zap,
  Activity,
  PlusCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function FullMapViewPage() {
  const { problems } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const filteredProblems = problems.filter((p) => {
    if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) return false;
    if (selectedSeverity !== 'all' && p.severity !== selectedSeverity) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Map Header & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="p-2 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  Interactive GIS Map Intelligence
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  Spatial Engine v3.2
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Multi-layer spatial clustering, municipal ward polygons, differential privacy, and flood risk topography.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/report"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report at Current Location</span>
          </Link>
        </div>
      </div>

      {/* Real-Time Spatial KPI Cards Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Total Geotagged Issues</div>
            <div className="text-lg font-black text-slate-900">{problems.length * 18} Issues</div>
            <div className="text-[10px] text-emerald-600 font-semibold">Across 19 Wards</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Median SLA Resolution</div>
            <div className="text-lg font-black text-slate-900">28.4 Hours</div>
            <div className="text-[10px] text-emerald-600 font-semibold">88.2% on-time close</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Active Spatial Bounties</div>
            <div className="text-lg font-black text-slate-900">₹4.85 Lakhs</div>
            <div className="text-[10px] text-amber-600 font-semibold">8 Active Challenges</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Top Performing Ward</div>
            <div className="text-lg font-black text-slate-900">Ward 15 (Alkapuri)</div>
            <div className="text-[10px] text-purple-600 font-semibold">96.2% SLA Compliance</div>
          </div>
        </div>
      </div>

      {/* Main Interactive GIS Map Component */}
      <InteractiveMap height="h-[640px]" initialCity="Vadodara" />

      {/* Ward Performance Leaderboard & Spatial Taxonomy Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Ward SLA Index Table */}
        <div className="lg:col-span-1 bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-950 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Ward SLA Performance Index</span>
            </h3>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              Live Feed
            </span>
          </div>

          <div className="space-y-2.5 divide-y divide-slate-100">
            {[
              { rank: 1, ward: 'Ward 15 (Alkapuri)', zone: 'West', score: 96.2, color: 'text-emerald-600 bg-emerald-50' },
              { rank: 2, ward: 'Ward 12 (Manjalpur)', zone: 'South', score: 94.8, color: 'text-emerald-600 bg-emerald-50' },
              { rank: 3, ward: 'Ward 7 (Karelibaug)', zone: 'East', score: 92.4, color: 'text-emerald-600 bg-emerald-50' },
              { rank: 4, ward: 'Ward 4 (Sayajigunj)', zone: 'Central', score: 84.1, color: 'text-blue-600 bg-blue-50' },
              { rank: 5, ward: 'Ward 9 (Akota)', zone: 'West', score: 78.5, color: 'text-amber-600 bg-amber-50' },
            ].map((item) => (
              <div key={item.ward} className="pt-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-100 font-bold text-slate-600 text-[10px] flex items-center justify-center">
                    {item.rank}
                  </span>
                  <div>
                    <div className="font-bold text-slate-900">{item.ward}</div>
                    <div className="text-[10px] text-slate-400">{item.zone} Zone</div>
                  </div>
                </div>
                <span className={`font-black text-xs px-2 py-0.5 rounded-lg ${item.color}`}>
                  {item.score}% SLA
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/government/wards"
            className="block text-center text-xs font-bold text-blue-600 hover:text-blue-700 pt-2 border-t border-slate-100"
          >
            View All 19 Municipal Wards →
          </Link>
        </div>

        {/* Right: Category Spatial Hotspot Filters */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-950 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Filter Nearby Issues by Civic Category</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">
              Showing {filteredProblems.length} cases
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Categories
            </button>
            {CIVIC_TAXONOMY.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Nearby Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {filteredProblems.slice(0, 4).map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
