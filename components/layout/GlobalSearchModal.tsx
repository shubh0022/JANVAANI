'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { CIVIC_TAXONOMY } from '@/lib/taxonomy';
import {
  Search,
  X,
  MapPin,
  AlertTriangle,
  Lightbulb,
  Users,
  Trophy,
  Tag,
  ArrowRight,
} from 'lucide-react';

export function GlobalSearchModal() {
  const router = useRouter();
  const { globalSearchOpen, setGlobalSearchOpen, problems, solutions, communities, bounties } = useApp();
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setGlobalSearchOpen(!globalSearchOpen);
      }
      if (e.key === 'Escape' && globalSearchOpen) {
        setGlobalSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [globalSearchOpen, setGlobalSearchOpen]);

  if (!globalSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search Results
  const matchedProblems = problems.filter(
    (p) =>
      p.title.toLowerCase().includes(cleanQuery) ||
      p.id.toLowerCase().includes(cleanQuery) ||
      p.location.city.toLowerCase().includes(cleanQuery) ||
      p.categoryName.toLowerCase().includes(cleanQuery)
  );

  const matchedSolutions = solutions.filter(
    (s) =>
      s.title.toLowerCase().includes(cleanQuery) ||
      s.summary.toLowerCase().includes(cleanQuery) ||
      s.author.name.toLowerCase().includes(cleanQuery)
  );

  const matchedCommunities = communities.filter(
    (c) =>
      c.name.toLowerCase().includes(cleanQuery) ||
      c.location.toLowerCase().includes(cleanQuery)
  );

  const matchedBounties = bounties.filter(
    (b) =>
      b.title.toLowerCase().includes(cleanQuery) ||
      b.organization.toLowerCase().includes(cleanQuery)
  );

  const handleSelect = (url: string) => {
    setGlobalSearchOpen(false);
    setQuery('');
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            placeholder="Search problems, cases (JV-...), solutions, communities, categories, cities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setGlobalSearchOpen(false)}
            className="text-xs font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Search Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Quick Category Chips when query is empty */}
          {!cleanQuery && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Popular Categories & Tags
              </span>
              <div className="flex flex-wrap gap-2">
                {CIVIC_TAXONOMY.slice(0, 6).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setQuery(cat.name)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 transition-colors"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Problems */}
          {matchedProblems.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Problems ({matchedProblems.length})</span>
                </span>
                <Link
                  href="/problems"
                  onClick={() => setGlobalSearchOpen(false)}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  View all problems →
                </Link>
              </div>

              <div className="space-y-1.5">
                {matchedProblems.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect(`/problems/${p.id}`)}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">
                          {p.id}
                        </span>
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {p.title}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        <span>
                          {p.location.ward}, {p.location.city}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Solutions */}
          {matchedSolutions.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-2">
                <Lightbulb className="w-3.5 h-3.5 text-purple-500" />
                <span>Solutions ({matchedSolutions.length})</span>
              </span>
              <div className="space-y-1.5">
                {matchedSolutions.slice(0, 3).map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleSelect(`/solutions/${s.id}`)}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate mb-0.5">
                        {s.title}
                      </div>
                      <div className="text-[11px] text-purple-700 font-medium">
                        By {s.author.name} • {s.estimatedCost}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Communities & Bounties */}
          {matchedCommunities.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-2">
                <Users className="w-3.5 h-3.5 text-blue-500" />
                <span>Communities</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedCommunities.slice(0, 2).map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelect(`/communities/${c.slug}`)}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 cursor-pointer flex items-center gap-2.5"
                  >
                    <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">{c.name}</div>
                      <div className="text-[10px] text-slate-500">{c.membersCount} Members</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cleanQuery &&
            matchedProblems.length === 0 &&
            matchedSolutions.length === 0 &&
            matchedCommunities.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm font-medium text-slate-600">
                  No direct results found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Try searching by case ID (e.g. JV-2026-002103) or city name like Vadodara, Rajkot, Ahmedabad.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
