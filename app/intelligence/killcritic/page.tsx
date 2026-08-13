'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { Sparkles, ShieldAlert, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';

export default function KillCriticPage() {
  const { solutions } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-800/40 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-400/30">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Autonomous Solution Red-Teaming Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          KillCritic: Solution Stress-Testing
        </h1>
        <p className="text-xs sm:text-sm text-purple-100/90 max-w-2xl leading-relaxed">
          Before taxpayers or municipalities invest crores into civic proposals, KillCritic ruthlessly audits hidden assumptions, cost fallacies, maintenance overheads, and unintended consequences.
        </p>
      </div>

      {/* Solutions Red-Team Showcase */}
      <div className="space-y-6">
        {solutions.map((sol) => (
          <div key={sol.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  {sol.id}
                </span>
                <h3 className="text-lg font-black text-slate-950 mt-1.5">{sol.title}</h3>
                <span className="text-xs text-slate-500">Proposed by {sol.author.name} • {sol.estimatedCost}</span>
              </div>

              <div className="bg-slate-900 text-purple-300 font-mono font-bold text-xs px-3 py-1.5 rounded-xl self-start sm:self-auto shadow-sm">
                KillCritic Score: {sol.killCriticAnalysis.confidenceScore}%
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs sm:text-sm text-purple-950 italic leading-relaxed">
              &ldquo;{sol.killCriticAnalysis.critique}&rdquo;
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <span className="font-bold text-rose-900 uppercase text-[10px] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Challenged Assumptions</span>
                </span>
                <ul className="space-y-1 text-slate-700">
                  {sol.killCriticAnalysis.assumptionsChallenged.map((a, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-500">•</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <span className="font-bold text-amber-900 uppercase text-[10px] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Unintended Consequences</span>
                </span>
                <ul className="space-y-1 text-slate-700">
                  {sol.killCriticAnalysis.unintendedConsequences.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-500">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link
                href={`/solutions/${sol.id}`}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
              >
                <span>View Full Technical Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
