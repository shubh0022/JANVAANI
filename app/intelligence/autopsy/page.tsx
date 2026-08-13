'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { ShieldCheck, AlertTriangle, CheckCircle2, ArrowLeft, Clock, Sparkles } from 'lucide-react';

export default function ProblemAutopsyPage() {
  const { problems } = useApp();
  const sampleAutopsy = problems[0]?.autopsy;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-900/40 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-400/30">
          <ShieldCheck className="w-4 h-4 text-rose-400" />
          <span>Forensic Post-Resolution Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          Problem Autopsy Lab
        </h1>
        <p className="text-xs sm:text-sm text-rose-100/90 max-w-2xl leading-relaxed">
          Deep post-resolution forensics: Why did the problem happen? Where did the institutional process fail? What engineering or policy fix prevents this entire class of problems forever?
        </p>
      </div>

      {/* Featured Autopsy Case (Matching Blueprint 21. Autopsy Report) */}
      {sampleAutopsy && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                {sampleAutopsy.id}
              </span>
              <h2 className="text-xl font-black text-slate-950 mt-1.5">
                {sampleAutopsy.problemTitle}
              </h2>
              <span className="text-xs text-slate-500">Case Ref: {sampleAutopsy.caseId}</span>
            </div>

            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 self-start sm:self-auto">
              Recurrence Risk: {sampleAutopsy.recurrenceRisk.toUpperCase()}
            </span>
          </div>

          {/* Forensic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
              <span className="font-bold text-rose-900 uppercase text-[10px] block">
                Primary Root Cause Analysis
              </span>
              <p className="text-slate-800 leading-relaxed font-medium">
                {sampleAutopsy.rootCause}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <span className="font-bold text-amber-900 uppercase text-[10px] block">
                Institutional & Process Failure
              </span>
              <p className="text-slate-800 leading-relaxed font-medium">
                {sampleAutopsy.processFailure}
              </p>
            </div>
          </div>

          {/* Prevention Recommendations */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Permanent Prevention & Engineering Standard
            </h3>
            <div className="space-y-2">
              {sampleAutopsy.preventionRecommendations.map((rec, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Systemic Policy Fix */}
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs space-y-1">
            <span className="font-bold text-purple-900 uppercase text-[10px] block">
              10X Systemic Policy Recommendation
            </span>
            <p className="text-slate-800 font-semibold leading-relaxed">
              {sampleAutopsy.systemicPolicyRecommendation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
