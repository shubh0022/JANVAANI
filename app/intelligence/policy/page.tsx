'use client';

import React from 'react';
import Link from 'next/link';
import { POLICY_INSIGHTS } from '@/lib/mock-data';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function PolicyIntelligencePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-3 border border-purple-800/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-400/30">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Macro Civic Intelligence & Policy Advisory</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          Policy Intelligence Center
        </h1>
        <p className="text-xs sm:text-sm text-purple-100/90 max-w-2xl leading-relaxed">
          Aggregating millions of ground reports into structured policy recommendations with strict epistemic separation between Observed Data, AI Inferences, Hypotheses, and Actions.
        </p>
      </div>

      {/* Epistemic Protocol Guide */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200">
          <span className="font-mono font-bold text-blue-700 block text-[10px] uppercase">1. Observed Data</span>
          <span className="text-slate-700 mt-1 block">Empirical geotagged facts from verified citizen submissions.</span>
        </div>
        <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200">
          <span className="font-mono font-bold text-purple-700 block text-[10px] uppercase">2. AI Inference</span>
          <span className="text-slate-700 mt-1 block">Statistical patterns & spatial anomaly correlations.</span>
        </div>
        <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
          <span className="font-mono font-bold text-amber-700 block text-[10px] uppercase">3. Hypothesis</span>
          <span className="text-slate-700 mt-1 block">Probable causal mechanisms under evaluation.</span>
        </div>
        <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
          <span className="font-mono font-bold text-emerald-700 block text-[10px] uppercase">4. Recommendation</span>
          <span className="text-slate-700 mt-1 block">Concrete legislative, budget, or engineering interventions.</span>
        </div>
      </div>

      {/* Policy Insights List */}
      <div className="space-y-6">
        {POLICY_INSIGHTS.map((insight) => (
          <div key={insight.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  {insight.id}
                </span>
                <h3 className="text-lg font-black text-slate-950 mt-1.5">{insight.title}</h3>
                <span className="text-xs text-slate-500">{insight.region} • {insight.category}</span>
              </div>

              <div className="bg-slate-900 text-purple-300 font-mono font-bold text-xs px-3 py-1.5 rounded-xl self-start sm:self-auto shadow-sm">
                AI Confidence: {insight.confidence}%
              </div>
            </div>

            {/* 4-Box Epistemic Separation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1">
                <span className="font-bold text-blue-900 uppercase text-[10px] block">Observed Empirical Data</span>
                <p className="text-slate-800 leading-relaxed font-medium">{insight.observedData}</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
                <span className="font-bold text-purple-900 uppercase text-[10px] block">AI Pattern Inference</span>
                <p className="text-slate-800 leading-relaxed font-medium">{insight.aiInference}</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <span className="font-bold text-amber-900 uppercase text-[10px] block">Underlying Causal Hypothesis</span>
                <p className="text-slate-800 leading-relaxed font-medium">{insight.hypothesis}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-900 uppercase text-[10px] block">Actionable Policy Recommendation</span>
                <p className="text-slate-800 leading-relaxed font-medium">{insight.policyRecommendation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
