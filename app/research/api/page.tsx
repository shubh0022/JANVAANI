'use client';

import React from 'react';
import Link from 'next/link';
import { Code, ArrowLeft, Terminal, Key, ShieldCheck } from 'lucide-react';

const ENDPOINTS = [
  { method: 'GET', path: '/api/v1/problems/spatial-clusters', desc: 'Returns geo-clustered problem densities fuzzed to 500m mesh.' },
  { method: 'GET', path: '/api/v1/problems/{case_id}', desc: 'Retrieves public timeline, evidence metadata, and official responses.' },
  { method: 'GET', path: '/api/v1/departments/sla-matrix', desc: 'Returns anonymized municipal SLA response latencies across 19 wards.' },
  { method: 'GET', path: '/api/v1/intelligence/autopsies', desc: 'Returns root-cause and prevention audit archives.' },
];

export default function ResearchApiPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center gap-3">
        <Link href="/research" className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-950">Research & Institutional API Portal</h1>
          <p className="text-xs text-slate-500">RESTful interfaces for authorized academic, NGO, and public policy partners.</p>
        </div>
      </div>

      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
          <Terminal className="w-4 h-4" />
          <span>https://api.janvaani.org/v1</span>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Available Endpoints</h3>
          <div className="space-y-3">
            {ENDPOINTS.map((ep, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-black text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    {ep.method}
                  </span>
                  <span className="text-slate-200">{ep.path}</span>
                </div>
                <p className="text-slate-400 text-[11px] font-sans mt-1">{ep.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
