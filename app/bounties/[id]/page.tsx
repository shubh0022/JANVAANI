'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  Trophy,
  Award,
  Clock,
  Users,
  CheckCircle2,
  ArrowLeft,
  FileText,
  Upload,
  Send,
  Building2,
  Sparkles,
} from 'lucide-react';

export default function BountyDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { bounties, user } = useApp();

  const [submissionTitle, setSubmissionTitle] = useState('');
  const [submissionText, setSubmissionText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const bounty = bounties.find((b) => b.id === id) || bounties[0];
  if (!bounty) return notFound();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionTitle || !submissionText) return;
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link href="/bounties" className="hover:text-blue-600 flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Bounties</span>
        </Link>
        <span className="font-mono text-amber-600 font-bold">{bounty.id}</span>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={bounty.orgLogo}
              alt={bounty.organization}
              className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm"
            />
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {bounty.organization}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 mt-0.5">
                {bounty.title}
              </h1>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-lg sm:text-xl px-4 py-2 rounded-2xl shadow-md self-start sm:self-auto flex items-center gap-1">
            <Trophy className="w-5 h-5" />
            <span>{bounty.currency}{bounty.rewardAmount.toLocaleString()} Prize</span>
          </div>
        </div>

        {/* Target Problem */}
        <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs">
          <span className="text-amber-800 font-bold uppercase text-[10px] block">Problem Statement</span>
          <p className="text-amber-950 font-semibold text-sm mt-0.5">{bounty.problemTitle}</p>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {bounty.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <Clock className="w-4 h-4 text-amber-500 mx-auto mb-1" />
            <div className="font-bold text-slate-900 text-xs">{bounty.daysLeft} Days Left</div>
            <div className="text-[10px] text-slate-400">Deadline: {bounty.deadline}</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <Users className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <div className="font-bold text-slate-900 text-xs">{bounty.participantsCount} Registered</div>
            <div className="text-[10px] text-slate-400">Student & Expert Teams</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center col-span-2 sm:col-span-1">
            <Sparkles className="w-4 h-4 text-purple-500 mx-auto mb-1" />
            <div className="font-bold text-slate-900 text-xs">{bounty.category}</div>
            <div className="text-[10px] text-slate-400">Category Scope</div>
          </div>
        </div>
      </div>

      {/* Requirements & Judging Criteria */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Eligibility & Requirements
          </h3>
          <div className="space-y-2">
            {bounty.requirements.map((req, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Judging Criteria
          </h3>
          <div className="space-y-2">
            {bounty.judgingCriteria.map((c, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submission Portal */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <h3 className="text-base font-black text-slate-950">Submit Your Challenge Entry</h3>

        {isSubmitted ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-emerald-950">Entry Submitted Successfully</h4>
            <p className="text-xs text-emerald-800">
              Your solution proposal is registered under evaluation with the judging committee.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-600">Proposal Title</label>
              <input
                type="text"
                placeholder="e.g. Decentralized Organic Waste Composting Micro-Units"
                value={submissionTitle}
                onChange={(e) => setSubmissionTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-600">Technical Solution Document / CAD / Code Link</label>
              <textarea
                rows={4}
                placeholder="Detail your engineering approach, budget model, and deployment plan..."
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">Submitting as {user.name}</span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Submit Entry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
