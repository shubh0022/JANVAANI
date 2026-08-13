'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { BountyCard } from '@/components/cards/BountyCard';
import { Trophy, Award, Search, Sparkles, Clock, Users, ArrowRight } from 'lucide-react';

export default function BountiesDirectoryPage() {
  const { bounties } = useApp();
  const [search, setSearch] = useState('');

  const filtered = bounties.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.organization.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Active Civic Bounties & Challenges
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Organizations and municipalities publish sponsored challenges: &ldquo;Help Solve This Real-World Problem.&rdquo;
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search challenges..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((bounty) => (
          <BountyCard key={bounty.id} bounty={bounty} />
        ))}
      </div>
    </div>
  );
}
