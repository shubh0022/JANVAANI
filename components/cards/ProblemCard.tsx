'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProblemCase } from '@/lib/types';
import { StatusBadge, SeverityBadge } from '../ui/StatusBadge';
import { CivicReactions } from '../ui/CivicReactions';
import { MapPin, MessageSquare, Lightbulb, Clock, Camera, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface ProblemCardProps {
  problem: ProblemCase;
  viewMode?: 'grid' | 'list';
}

export function ProblemCard({ problem, viewMode = 'grid' }: ProblemCardProps) {
  const firstPhoto = problem.evidence.find((e) => e.type === 'photo');

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-card-hover transition-all p-4 sm:p-5 group">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Thumbnail */}
          {firstPhoto ? (
            <div className="relative w-full md:w-52 h-44 shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={firstPhoto.url}
                alt={problem.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 flex gap-1">
                <SeverityBadge severity={problem.severity} />
              </div>
              <div className="absolute bottom-2 right-2 bg-slate-950/70 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                <Camera className="w-3 h-3" />
                <span>{problem.evidence.length} Evidence</span>
              </div>
            </div>
          ) : null}

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    {problem.id}
                  </span>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {problem.categoryName}
                  </span>
                </div>
                <StatusBadge status={problem.status} />
              </div>

              <Link href={`/problems/${problem.id}`} className="block group-hover:text-blue-600 transition-colors">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1 mb-1.5 flex items-center gap-1.5">
                  <span>{problem.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-blue-600" />
                </h3>
              </Link>

              <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="truncate">
                  {problem.location.ward}, {problem.location.city}, {problem.location.state}
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                {problem.description}
              </p>
            </div>

            {/* Bottom Bar */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <CivicReactions
                problemId={problem.id}
                reactions={problem.civicReactions}
                userReactions={problem.userReactions}
                compact
              />

              <div className="flex items-center gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  <span>{problem.commentsCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-purple-500" />
                  <span>{problem.solutionsCount} Solutions</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{problem.reportedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-card-hover transition-all overflow-hidden flex flex-col group">
      {/* Evidence Image Cover */}
      <div className="relative w-full h-44 bg-slate-100 overflow-hidden border-b border-slate-100">
        {firstPhoto ? (
          <img
            src={firstPhoto.url}
            alt={problem.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-xs font-medium">
            No photo attached
          </div>
        )}

        {/* Badges on image */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <SeverityBadge severity={problem.severity} />
        </div>

        <div className="absolute top-2.5 right-2.5">
          <StatusBadge status={problem.status} />
        </div>

        <div className="absolute bottom-2 left-2 bg-slate-950/75 backdrop-blur-sm text-white text-[11px] font-mono px-2 py-0.5 rounded-md">
          {problem.id}
        </div>

        <div className="absolute bottom-2 right-2 bg-slate-950/75 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
          <Camera className="w-3 h-3" />
          <span>{problem.evidence.length} Evidence</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">
              {problem.location.ward}, {problem.location.city}
            </span>
            <span className="mx-1">•</span>
            <span className="text-[11px] text-slate-400">{problem.reportedAt}</span>
          </div>

          <Link href={`/problems/${problem.id}`} className="block group-hover:text-blue-600 transition-colors mb-2">
            <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
              {problem.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-2 mb-3">
            {problem.description}
          </p>
        </div>

        {/* Action & Metric Footer */}
        <div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <CivicReactions
              problemId={problem.id}
              reactions={problem.civicReactions}
              userReactions={problem.userReactions}
              compact
            />

            <div className="flex items-center gap-2.5 text-xs text-slate-500 shrink-0">
              <div className="flex items-center gap-1" title="Comments">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                <span>{problem.commentsCount}</span>
              </div>
              <div className="flex items-center gap-1 text-purple-600 font-medium" title="Solutions proposed">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{problem.solutionsCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
