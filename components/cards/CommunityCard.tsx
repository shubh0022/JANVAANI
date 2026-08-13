'use client';

import React from 'react';
import Link from 'next/link';
import { Community } from '@/lib/types';
import { useApp } from '@/lib/store';
import { Users, AlertCircle, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';

export function CommunityCard({ community }: { community: Community }) {
  const { toggleJoinCommunity } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-card-hover transition-all overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Banner */}
        <div className="relative h-28 w-full bg-slate-100 overflow-hidden">
          <img
            src={community.banner}
            alt={community.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />

          {community.trending && (
            <div className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
              <TrendingUp className="w-3 h-3" />
              <span>Trending</span>
            </div>
          )}

          <div className="absolute bottom-2 left-3 text-white text-xs font-semibold drop-shadow-sm">
            {community.location}
          </div>
        </div>

        {/* Avatar & Title */}
        <div className="px-5 pt-3 pb-2">
          <div className="flex items-start justify-between gap-2 -mt-8 mb-2">
            <img
              src={community.avatar}
              alt={community.name}
              className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md bg-white"
            />
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              {community.category}
            </span>
          </div>

          <Link href={`/communities/${community.slug}`} className="block group-hover:text-blue-600 transition-colors mb-1.5">
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {community.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-2 mb-4">
            {community.description}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-1 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center text-xs">
            <div>
              <span className="block font-bold text-slate-900">{community.membersCount.toLocaleString()}</span>
              <span className="text-[10px] text-slate-400">Members</span>
            </div>
            <div>
              <span className="block font-bold text-amber-600">{community.problemsCount}</span>
              <span className="text-[10px] text-slate-400">Problems</span>
            </div>
            <div>
              <span className="block font-bold text-emerald-600">{community.solutionsCount}</span>
              <span className="text-[10px] text-slate-400">Solved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer & Join Button */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-3">
        <Link
          href={`/communities/${community.slug}`}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <span>View Hub</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={() => toggleJoinCommunity(community.id)}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
            community.joined
              ? 'bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-600 border border-slate-200'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
          }`}
        >
          {community.joined ? 'Joined ✓' : '+ Join Hub'}
        </button>
      </div>
    </div>
  );
}
