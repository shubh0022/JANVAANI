'use client';

import React from 'react';
import Link from 'next/link';
import { Solution } from '@/lib/types';
import { useApp } from '@/lib/store';
import {
  ThumbsUp,
  ShieldAlert,
  Sparkles,
  DollarSign,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export function SolutionCard({ solution }: { solution: Solution }) {
  const { toggleUpvoteSolution } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-purple-300 hover:shadow-card-hover transition-all p-5 flex flex-col justify-between group">
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                solution.author.role === 'expert'
                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                  : solution.author.role === 'student'
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              {solution.author.role.toUpperCase()} SOLUTION
            </span>

            <span className="text-xs text-slate-400 font-mono">
              {solution.id}
            </span>
          </div>

          {/* KillCritic Score Badge */}
          <div className="flex items-center gap-1 bg-slate-900 text-purple-300 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>KillCritic: {solution.killCriticAnalysis.confidenceScore}%</span>
          </div>
        </div>

        {/* Linked Problem context */}
        <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
          <span>Target Problem:</span>
          <Link
            href={`/problems/${solution.problemId}`}
            className="text-blue-600 font-semibold hover:underline truncate max-w-[280px]"
          >
            {solution.problemTitle}
          </Link>
        </div>

        {/* Title */}
        <Link href={`/solutions/${solution.id}`} className="block group-hover:text-purple-700 transition-colors mb-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 leading-snug flex items-center gap-1.5">
            <span>{solution.title}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-purple-600 shrink-0" />
          </h3>
        </Link>

        {/* Summary */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4">
          {solution.summary}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-700">
            <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Estimated Cost</span>
              <span className="font-semibold">{solution.estimatedCost}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <Clock className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">Timeline</span>
              <span className="font-semibold">{solution.implementationTime}</span>
            </div>
          </div>
        </div>

        {/* KillCritic Red-Team Snippet */}
        <div className="bg-purple-50/70 border border-purple-200/60 rounded-xl p-3 mb-4 text-xs text-purple-900">
          <div className="flex items-center gap-1 font-bold text-[11px] uppercase tracking-wider text-purple-800 mb-1">
            <AlertTriangle className="w-3.5 h-3.5 text-purple-600" />
            <span>KillCritic Red-Team Stress Check</span>
          </div>
          <p className="text-slate-700 line-clamp-2 italic text-[11px]">
            &ldquo;{solution.killCriticAnalysis.critique}&rdquo;
          </p>
        </div>
      </div>

      {/* Author & Upvote Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={solution.author.avatar}
            alt={solution.author.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
              <span>{solution.author.name}</span>
              {solution.author.verified && (
                <CheckCircle2 className="w-3 h-3 text-blue-500 shrink-0" />
              )}
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              {solution.author.title}
            </div>
          </div>
        </div>

        {/* Upvote CTA */}
        <button
          onClick={() => toggleUpvoteSolution(solution.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            solution.userUpvoted
              ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300'
              : 'bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700'
          }`}
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${solution.userUpvoted ? 'fill-white' : ''}`} />
          <span>{solution.upvotes} Upvotes</span>
        </button>
      </div>
    </div>
  );
}
