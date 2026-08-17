'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { SolutionCard } from '@/components/cards/SolutionCard';
import {
  Lightbulb,
  Sparkles,
  PlusCircle,
  Search,
  Filter,
  GraduationCap,
  Award,
  Users,
  Building2,
  CheckCircle2,
} from 'lucide-react';

export default function SolutionsDirectoryPage() {
  const { solutions, addSolution, problems, user } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | 'expert' | 'student' | 'organization' | 'community'>('all');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Solution Modal State
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newCost, setNewCost] = useState('₹45,000');
  const [newTime, setNewTime] = useState('1 Week');
  const [newTargetProblemId, setNewTargetProblemId] = useState(problems[0]?.id || '');

  const filtered = solutions.filter((s) => {
    if (activeFilter !== 'all' && s.author.role !== activeFilter) return false;
    if (
      search &&
      !s.title.toLowerCase().includes(search.toLowerCase()) &&
      !s.summary.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleCreateSolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSummary) return;

    const targetProblem = problems.find((p) => p.id === newTargetProblemId) || problems[0];

    addSolution({
      problemId: targetProblem?.id,
      problemTitle: targetProblem?.title,
      problemLocation: `${targetProblem?.location.city}`,
      title: newTitle,
      summary: newSummary,
      estimatedCost: newCost,
      implementationTime: newTime,
      feasibilityScore: 88,
    });

    setIsModalOpen(false);
    setNewTitle('');
    setNewSummary('');
  };

  return (
    <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Civic Solutions Hub
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Citizen, Student & Expert engineering proposals with KillCritic autonomous red-team stress audits.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-auto px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Propose a Solution</span>
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card">
          <div className="text-[10px] font-bold uppercase text-slate-400">Total Solutions</div>
          <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">{solutions.length}</div>
          <span className="text-[10px] text-purple-600 font-semibold">Across all domains</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card">
          <div className="text-[10px] font-bold uppercase text-slate-400">AI Red-Team Verified</div>
          <div className="text-2xl font-black text-emerald-600 font-mono mt-0.5">86%</div>
          <span className="text-[10px] text-slate-500 font-medium">Passed stress tests</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card">
          <div className="text-[10px] font-bold uppercase text-slate-400">Student Prototypes</div>
          <div className="text-2xl font-black text-blue-600 font-mono mt-0.5">14</div>
          <span className="text-[10px] text-slate-500 font-medium">Eligible for grants</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card">
          <div className="text-[10px] font-bold uppercase text-slate-400">Pilot Implementations</div>
          <div className="text-2xl font-black text-amber-600 font-mono mt-0.5">6</div>
          <span className="text-[10px] text-slate-500 font-medium">Adopted by municipalities</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {['all', 'engineering', 'frugal', 'policy', 'student'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                activeFilter === tab
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab === 'all' ? 'All Solutions' : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search solutions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((sol) => (
          <SolutionCard key={sol.id} solution={sol} />
        ))}
      </div>

      {/* Propose Solution Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-black text-slate-950">Propose a Civic Solution</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSolution} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-600">Select Target Problem</label>
                <select
                  value={newTargetProblemId}
                  onChange={(e) => setNewTargetProblemId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
                >
                  {problems.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id} — {p.title} ({p.location.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-600">Solution Title</label>
                <input
                  type="text"
                  placeholder="e.g. Modular Dual-Chamber Sump with Silt Trap"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-slate-600">Executive Summary & Engineering Design</label>
                <textarea
                  rows={4}
                  placeholder="Explain how this solves the problem, materials required, and implementation process..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-600">Estimated Cost</label>
                  <input
                    type="text"
                    value={newCost}
                    onChange={(e) => setNewCost(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-600">Estimated Timeline</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-[11px] text-purple-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <span>KillCritic AI will automatically red-team your submission against budget, durability & safety risks.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md"
                >
                  Submit Solution (+250 Pts)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
