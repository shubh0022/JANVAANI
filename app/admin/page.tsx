'use client';

import React from 'react';
import Link from 'next/link';
import { AUDIT_LOGS } from '@/lib/mock-data';
import { ShieldCheck, Users, AlertTriangle, Sparkles, Activity, FileText, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-800/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-400/30">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              <span>Platform Integrity & Moderation Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
              JanVaani Administration & Safety Console
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/admin/moderation"
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 font-bold text-xs text-white transition-colors"
            >
              Moderation Queue
            </Link>
          </div>
        </div>

        {/* 4 Admin Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Citizens</span>
            <div className="text-2xl font-black text-white font-mono mt-1">482,190</div>
            <span className="text-[10px] text-emerald-400">99.8% Trust Score</span>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">AI Triage Jobs (24h)</span>
            <div className="text-2xl font-black text-purple-400 font-mono mt-1">14,280</div>
            <span className="text-[10px] text-purple-200">0.02% Error Rate</span>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Flagged Reports</span>
            <div className="text-2xl font-black text-rose-400 font-mono mt-1">18</div>
            <span className="text-[10px] text-rose-300">Under Human Review</span>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Tamper Check Passed</span>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1">99.4%</div>
            <span className="text-[10px] text-emerald-300">Exif + GPS Matched</span>
          </div>
        </div>
      </div>

      {/* Audit Trail Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
        <h2 className="text-base font-black text-slate-950">Real-Time Cryptographic Audit Logs</h2>
        <div className="divide-y divide-slate-100 text-xs font-mono">
          {AUDIT_LOGS.map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">{log.id}</span>
                  <span className="font-bold text-slate-900 font-sans">{log.actor} ({log.actorRole})</span>
                  <span className="text-[10px] text-slate-400 font-sans">{log.timestamp}</span>
                </div>
                <div className="text-slate-600 font-sans">{log.details}</div>
              </div>

              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold self-start sm:self-auto">
                {log.action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
