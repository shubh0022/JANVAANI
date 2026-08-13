'use client';

import React from 'react';
import { Sparkles, Lightbulb, CheckCircle2, ArrowRight, ShieldAlert } from 'lucide-react';

export default function TenXThinkPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-800/40 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Systemic Problem Elimination</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          10X Think: Eliminate Entire Problem Classes
        </h1>
        <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl leading-relaxed">
          Instead of repeatedly filling individual potholes or desilting clogged grates every monsoon, 10X Think generates transformative operational, technological, and legislative reforms.
        </p>
      </div>

      {/* Featured 10X Case */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
            Case Study: Monsoonal Urban Road Washouts & Pothole Cycles
          </span>
          <h2 className="text-xl font-black text-slate-950 mt-2">
            The 10X Paradigm: Pre-Cast Permeable Sub-Bases & IoT Geo-Sensor Inlets
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
            <h4 className="font-bold text-rose-900 uppercase text-[10px]">The 1X Status Quo (Reactive)</h4>
            <p className="text-slate-800 leading-relaxed font-medium">
              Citizens report potholes → Dept issues manual cold-mix repair → First heavy rain washes away bitumen patch → Repeat next year. Cost: ₹45 Cr annually across Tier-2 city.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <h4 className="font-bold text-emerald-900 uppercase text-[10px]">The 10X Systemic Shift</h4>
            <p className="text-slate-800 leading-relaxed font-medium">
              Mandate modular porous concrete sub-bases with continuous side-curb drain channels during road construction. Water drains in 90 seconds without lifting asphalt layers. Cost: +8% initial CapEx, eliminates 92% lifetime maintenance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
