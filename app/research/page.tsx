'use client';

import React from 'react';
import Link from 'next/link';
import { RESEARCH_DATASETS } from '@/lib/mock-data';
import { Microscope, Database, Code, Lock, Download, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ResearchLabPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4 border border-cyan-800/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200 text-xs font-bold border border-cyan-400/30">
          <Microscope className="w-4 h-4 text-cyan-400" />
          <span>Open Academic & Institutional Civic Research</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          JanVaani Civic Data Research Lab
        </h1>
        <p className="text-xs sm:text-sm text-cyan-100/90 max-w-2xl leading-relaxed">
          Access privacy-preserving, spatially-fuzzed, high-resolution geospatial datasets on urban infrastructure failure patterns, monsoon inundation, and municipal resolution latency.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/research/datasets"
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Database className="w-4 h-4" />
            <span>Explore Open Datasets</span>
          </Link>
          <Link
            href="/research/api"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors flex items-center gap-1.5"
          >
            <Code className="w-4 h-4" />
            <span>Research API Documentation</span>
          </Link>
        </div>
      </div>

      {/* Privacy Guarantee Ribbon */}
      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3 text-xs text-emerald-950">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold">Privacy-by-Design & SAIF Compliant Data Governance</div>
          <p className="text-emerald-800 text-[11px] mt-0.5 leading-relaxed">
            All public research datasets have PII completely stripped, temporal timestamps jittered, and geographic coordinates fuzzed to 500m mesh grids to prevent individual re-identification while preserving spatial statistical rigor.
          </p>
        </div>
      </div>

      {/* Datasets Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-950">Featured Open Civic Datasets</h2>
          <Link href="/research/datasets" className="text-xs font-bold text-blue-600 hover:underline">
            View All ({RESEARCH_DATASETS.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESEARCH_DATASETS.map((ds) => (
            <div key={ds.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded border border-cyan-200">
                  {ds.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2 line-clamp-2">{ds.title}</h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">{ds.description}</p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Records: <strong className="text-slate-900">{ds.recordsCount.toLocaleString()}</strong></span>
                  <span>Size: {ds.sizeMb} MB</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {ds.downloadFormats.map((fmt) => (
                    <span key={fmt} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
