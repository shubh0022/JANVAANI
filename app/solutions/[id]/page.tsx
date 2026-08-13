'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  Lightbulb,
  Sparkles,
  DollarSign,
  Clock,
  ThumbsUp,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Bookmark,
  UserCheck,
} from 'lucide-react';

export default function SolutionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { solutions, toggleUpvoteSolution } = useApp();

  const solution = solutions.find((s) => s.id === id) || solutions[0];
  if (!solution) return notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link href="/solutions" className="hover:text-purple-600 flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Solutions</span>
        </Link>
        <span className="font-mono text-purple-600 font-bold">{solution.id}</span>
      </div>

      {/* Main Solution Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-800 text-[11px] font-bold uppercase px-3 py-1 rounded-lg border border-purple-200">
              {solution.author.role.toUpperCase()} PROPOSAL
            </span>
            <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-lg">
              Status: Under Review
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleUpvoteSolution(solution.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                solution.userUpvoted
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{solution.upvotes} Upvotes</span>
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          {solution.title}
        </h1>

        {/* Target Problem Banner */}
        <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div>
            <span className="text-slate-500 font-medium">Addresses Reported Problem:</span>
            <div className="font-bold text-blue-900 text-sm mt-0.5">{solution.problemTitle}</div>
          </div>
          <Link
            href={`/problems/${solution.problemId}`}
            className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl font-bold self-start sm:self-auto hover:bg-blue-700 transition-colors"
          >
            View Problem Case →
          </Link>
        </div>

        {/* Author Bio Card */}
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <img
            src={solution.author.avatar}
            alt={solution.author.name}
            className="w-12 h-12 rounded-full object-cover border border-slate-300"
          />
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <span>{solution.author.name}</span>
              {solution.author.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
            </div>
            <div className="text-[11px] text-slate-500">{solution.author.title}</div>
            {solution.author.organization && (
              <div className="text-[10px] text-purple-700 font-semibold mt-0.5">
                {solution.author.organization}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metrics & Key Implementation Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400">Estimated Cost</span>
          <div className="text-xl font-black text-emerald-600">{solution.estimatedCost}</div>
          <span className="text-xs text-slate-500">CapEx + Installation Estimate</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400">Timeline</span>
          <div className="text-xl font-black text-blue-600">{solution.implementationTime}</div>
          <span className="text-xs text-slate-500">From approval to commissioning</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400">Feasibility Index</span>
          <div className="text-xl font-black text-purple-600">{solution.feasibilityScore}%</div>
          <span className="text-xs text-slate-500">Civil & Technical score</span>
        </div>
      </div>

      {/* Detailed Plan */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <h3 className="text-lg font-black text-slate-950">Implementation Methodology & Steps</h3>
        <div className="space-y-3">
          {solution.keySteps.map((step, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* KILLCRITIC RED-TEAM STRESS AUDIT */}
      <div className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-purple-800/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <div>
              <h3 className="text-lg font-black text-white">KillCritic Autonomous Red-Team Audit</h3>
              <p className="text-xs text-purple-200">
                Adversarial stress-testing of proposed solution assumptions & risks.
              </p>
            </div>
          </div>

          <div className="bg-purple-900/80 px-4 py-1.5 rounded-xl border border-purple-500/50 text-xs font-mono font-bold text-purple-200 self-start sm:self-auto">
            Confidence Score: {solution.killCriticAnalysis.confidenceScore}%
          </div>
        </div>

        {/* Critique text */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed italic">
          &ldquo;{solution.killCriticAnalysis.critique}&rdquo;
        </div>

        {/* Challenged Assumptions & Consequences */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Assumptions Challenged</span>
            </span>
            <ul className="space-y-1.5 text-slate-300">
              {solution.killCriticAnalysis.assumptionsChallenged.map((a, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-rose-400">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Unintended Consequences</span>
            </span>
            <ul className="space-y-1.5 text-slate-300">
              {solution.killCriticAnalysis.unintendedConsequences.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-400">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Validation Requirements */}
        <div className="p-4 rounded-2xl bg-purple-900/40 border border-purple-500/30 space-y-2 text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
            Field Validation Requirements before Implementation
          </span>
          <ul className="space-y-1 text-slate-200">
            {solution.killCriticAnalysis.validationRequirements.map((v, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
