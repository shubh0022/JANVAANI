import React from 'react';
import { TopContributor } from '@/lib/types';
import { Award, Star, CheckCircle2, ShieldCheck } from 'lucide-react';

export function ContributorCard({ contributor }: { contributor: TopContributor }) {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold shadow-sm';
      case 2:
        return 'bg-gradient-to-r from-slate-200 to-slate-400 text-slate-900 font-extrabold shadow-sm';
      case 3:
        return 'bg-gradient-to-r from-amber-700 to-amber-900 text-white font-extrabold shadow-sm';
      default:
        return 'bg-slate-100 text-slate-700 font-bold border border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-card-hover transition-all p-4 flex items-center justify-between gap-3 group">
      <div className="flex items-center gap-3 min-w-0">
        {/* Rank Badge */}
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${getRankBadge(
            contributor.rank
          )}`}
        >
          #{contributor.rank}
        </div>

        {/* Avatar */}
        <div className="relative shrink-0">
          <img
            src={contributor.avatar}
            alt={contributor.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-0.5 rounded-full ring-2 ring-white">
            <CheckCircle2 className="w-3 h-3" />
          </div>
        </div>

        {/* Name & Role */}
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
            {contributor.name}
          </h4>
          <div className="text-xs text-slate-500 truncate flex items-center gap-1.5">
            <span>{contributor.role}</span>
            <span>•</span>
            <span className="text-slate-400">{contributor.location.split(',')[0]}</span>
          </div>
        </div>
      </div>

      {/* Points & Badges */}
      <div className="text-right shrink-0">
        <div className="text-sm font-extrabold text-blue-600 font-mono">
          {contributor.points.toLocaleString()} <span className="text-xs font-semibold text-slate-500">pts</span>
        </div>
        <div className="text-[11px] text-amber-600 font-semibold flex items-center justify-end gap-1">
          <Award className="w-3 h-3 text-amber-500" />
          <span>{contributor.badgesCount} Badges</span>
        </div>
      </div>
    </div>
  );
}
