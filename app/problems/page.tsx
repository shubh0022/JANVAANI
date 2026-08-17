'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { CIVIC_TAXONOMY } from '@/lib/taxonomy';
import { ProblemCard } from '@/components/cards/ProblemCard';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import {
  Search,
  LayoutGrid,
  List,
  Map,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  PlusCircle,
  AlertCircle,
} from 'lucide-react';

export default function ProblemsDirectoryPage() {
  const { problems } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'split'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'urgent' | 'supported'>('recent');

  // Filter & Sort
  const filtered = problems
    .filter((p) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match =
          p.title.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) return false;
      if (selectedSeverity !== 'all' && p.severity !== selectedSeverity) return false;
      if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'urgent') return b.urgencyScore - a.urgencyScore;
      if (sortBy === 'supported')
        return (b.civicReactions.face_this_too || 0) - (a.civicReactions.face_this_too || 0);
      return 0; // Default order
    });

  return (
    <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-6">
      {/* Directory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Problems Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Search, filter, and inspect verified citizen grievances across India with full audit transparency.
          </p>
        </div>

        <Link
          href="/report"
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report a Problem</span>
        </Link>
      </div>

      {/* Control Bar: Search, Filters & View Mode */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, Case ID (JV-2026-...), street, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 outline-none focus:border-blue-500"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-end md:self-auto shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'split'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Split Map View"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 text-xs">
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-700 outline-none"
          >
            <option value="all">All Categories</option>
            {CIVIC_TAXONOMY.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Severity */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-700 outline-none"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-700 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="assigned">Assigned</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-700 outline-none"
          >
            <option value="recent">Sort: Most Recent</option>
            <option value="urgent">Sort: Highest Urgency</option>
            <option value="supported">Sort: Most Supported</option>
          </select>
        </div>
      </div>

      {/* Directory Grid / List / Split Map View */}
      {viewMode === 'split' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-4 max-h-[720px] overflow-y-auto pr-1">
            {filtered.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} viewMode="list" />
            ))}
          </div>
          <div className="lg:col-span-6 sticky top-24">
            <InteractiveMap height="h-[720px]" />
          </div>
        </div>
      ) : viewMode === 'list' ? (
        <div className="space-y-4">
          {filtered.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} viewMode="list" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} viewMode="grid" />
          ))}
        </div>
      )}
    </div>
  );
}
