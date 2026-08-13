'use client';

import React from 'react';
import Link from 'next/link';
import { Bounty } from '@/lib/types';
import { Trophy, Clock, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function BountyCard({ bounty }: { bounty: Bounty }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-amber-300 hover:shadow-card-hover transition-all p-5 flex flex-col justify-between group">
      <div>
        {/* Top Org Banner & Prize */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={bounty.orgLogo}
              alt={bounty.organization}
              className="w-10 h-10 rounded-xl object-cover border border-slate-200"
            />
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-900 truncate block">
                {bounty.organization}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {bounty.location}
              </span>
            </div>
          </div>

          {/* Reward Amount Badge */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-sm sm:text-base px-3 py-1 rounded-xl shadow-sm flex items-center gap-1 shrink-0">
            <span>{bounty.currency}</span>
            <span>{bounty.rewardAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/bounties/${bounty.id}`} className="block group-hover:text-blue-600 transition-colors mb-2">
          <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug flex items-center gap-1">
            <span>{bounty.title}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 shrink-0" />
          </h3>
        </Link>

        <p className="text-xs text-slate-600 line-clamp-2 mb-4">
          {bounty.description}
        </p>

        {/* Requirements snippet */}
        <div className="space-y-1.5 mb-4">
          {bounty.requirements.slice(0, 2).map((req, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold text-slate-700">{bounty.daysLeft} days left</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{bounty.participantsCount} Innovators</span>
          </div>
        </div>

        <Link
          href={`/bounties/${bounty.id}`}
          className="bg-slate-900 hover:bg-blue-600 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs transition-colors"
        >
          View Challenge
        </Link>
      </div>
    </div>
  );
}
