'use client';

import React from 'react';
import Link from 'next/link';
import { RESEARCH_DATASETS } from '@/lib/mock-data';
import { Database, Download, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function DatasetsExplorerPage() {
  return (
    <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-8">
      <div className="flex items-center gap-3">
        <Link href="/research" className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-950">Privacy-Preserving Dataset Explorer</h1>
          <p className="text-xs text-slate-500">Download sanitized geospatial data bundles for academic and policy analytics.</p>
        </div>
      </div>

      <div className="space-y-6">
        {RESEARCH_DATASETS.map((ds) => (
          <div key={ds.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded border border-cyan-200">
                  {ds.id} • {ds.category}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-950 mt-2">{ds.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed max-w-3xl">{ds.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0">
                {ds.downloadFormats.map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => alert(`Simulated Download of ${ds.title} (${fmt}) initiated.`)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download {fmt}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Records</span>
                <span className="font-bold text-slate-900 font-mono">{ds.recordsCount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Geographic Scope</span>
                <span className="font-bold text-slate-900">{ds.geographicScope}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Time Span</span>
                <span className="font-bold text-slate-900">{ds.timeRange}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">File Size</span>
                <span className="font-bold text-slate-900">{ds.sizeMb} MB</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Applied Privacy Measures</span>
              <div className="flex flex-wrap gap-2">
                {ds.privacyMeasures.map((pm, i) => (
                  <span key={i} className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{pm}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
