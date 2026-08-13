'use client';

import React from 'react';
import { CivicReactionType } from '@/lib/types';
import { useApp } from '@/lib/store';
import {
  Users,
  Eye,
  ThumbsUp,
  Camera,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';

interface CivicReactionsProps {
  problemId: string;
  reactions: Record<CivicReactionType, number>;
  userReactions?: CivicReactionType[];
  compact?: boolean;
}

const REACTION_CONFIG: Array<{
  type: CivicReactionType;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  activeColor: string;
  bgActive: string;
}> = [
  {
    type: 'face_this_too',
    label: 'I face this too',
    shortLabel: 'Face This',
    icon: Users,
    activeColor: 'text-blue-600 border-blue-400 bg-blue-50',
    bgActive: 'bg-blue-600 text-white',
  },
  {
    type: 'witnessed',
    label: 'I witnessed this',
    shortLabel: 'Witnessed',
    icon: Eye,
    activeColor: 'text-indigo-600 border-indigo-400 bg-indigo-50',
    bgActive: 'bg-indigo-600 text-white',
  },
  {
    type: 'support',
    label: 'I support this',
    shortLabel: 'Support',
    icon: ThumbsUp,
    activeColor: 'text-sky-600 border-sky-400 bg-sky-50',
    bgActive: 'bg-sky-600 text-white',
  },
  {
    type: 'have_evidence',
    label: 'I have evidence',
    shortLabel: 'Evidence',
    icon: Camera,
    activeColor: 'text-emerald-600 border-emerald-400 bg-emerald-50',
    bgActive: 'bg-emerald-600 text-white',
  },
  {
    type: 'can_help',
    label: 'I can help',
    shortLabel: 'Can Help',
    icon: Lightbulb,
    activeColor: 'text-amber-600 border-amber-400 bg-amber-50',
    bgActive: 'bg-amber-600 text-white',
  },
  {
    type: 'urgent',
    label: 'This is urgent',
    shortLabel: 'Urgent',
    icon: AlertTriangle,
    activeColor: 'text-rose-600 border-rose-400 bg-rose-50',
    bgActive: 'bg-rose-600 text-white',
  },
  {
    type: 'support_solution',
    label: 'Support solution',
    shortLabel: 'Solution',
    icon: Sparkles,
    activeColor: 'text-purple-600 border-purple-400 bg-purple-50',
    bgActive: 'bg-purple-600 text-white',
  },
  {
    type: 'dispute',
    label: 'Dispute claim',
    shortLabel: 'Dispute',
    icon: HelpCircle,
    activeColor: 'text-slate-600 border-slate-400 bg-slate-100',
    bgActive: 'bg-slate-700 text-white',
  },
  {
    type: 'solved',
    label: 'Problem solved',
    shortLabel: 'Solved',
    icon: CheckCircle2,
    activeColor: 'text-emerald-700 border-emerald-500 bg-emerald-100',
    bgActive: 'bg-emerald-700 text-white',
  },
];

export function CivicReactions({
  problemId,
  reactions,
  userReactions = [],
  compact = false,
}: CivicReactionsProps) {
  const { toggleCivicReaction } = useApp();

  if (compact) {
    // Show top 3 most-voted reactions + simple counter
    const sorted = REACTION_CONFIG.filter((r) => (reactions[r.type] || 0) > 0).sort(
      (a, b) => (reactions[b.type] || 0) - (reactions[a.type] || 0)
    );

    const primaryReactions = sorted.slice(0, 3);
    const totalSupport = (reactions.face_this_too || 0) + (reactions.support || 0);

    return (
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleCivicReaction(problemId, 'face_this_too');
          }}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            userReactions.includes('face_this_too')
              ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-sm'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-blue-600" />
          <span>{reactions.face_this_too || 0} Support</span>
        </button>

        {primaryReactions
          .filter((r) => r.type !== 'face_this_too')
          .map((item) => {
            const Icon = item.icon;
            const count = reactions[item.type] || 0;
            const active = userReactions.includes(item.type);
            return (
              <button
                key={item.type}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleCivicReaction(problemId, item.type);
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  active ? item.activeColor : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
                title={item.label}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{count}</span>
              </button>
            );
          })}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Citizen Civic Reactions (Structured Signal)
        </h4>
        <span className="text-xs text-slate-400">Click to endorse or verify</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2">
        {REACTION_CONFIG.map((item) => {
          const Icon = item.icon;
          const count = reactions[item.type] || 0;
          const active = userReactions.includes(item.type);

          return (
            <button
              key={item.type}
              onClick={() => toggleCivicReaction(problemId, item.type)}
              className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                active
                  ? `${item.activeColor} shadow-sm ring-1 ring-blue-400 font-semibold`
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    active ? item.bgActive : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs truncate font-medium">{item.label}</span>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  active ? 'bg-white/80' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
