'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CIVIC_TAXONOMY } from '@/lib/taxonomy';
import { Search, Tag, ArrowRight, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export default function CategoriesPage() {
  const [search, setSearch] = useState('');

  const filtered = CIVIC_TAXONOMY.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.subcategories.some((s) => s.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Civic Taxonomy
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          100+ Civic Problem Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Hierarchical classification mapping every citizen grievance directly to responsible municipal and state departments.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search categories (e.g., roads, electricity, hospital, school)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm shadow-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="space-y-8">
        {filtered.map((cat) => (
          <div
            key={cat.id}
            id={cat.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6 scroll-mt-24"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-black text-slate-900">{cat.name}</h2>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${cat.badgeBg}`}>
                    {cat.reportCount.toLocaleString()} Reports
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{cat.description}</p>
              </div>

              <Link
                href={`/report`}
                className="self-start sm:self-auto px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 transition-colors"
              >
                + Report in this Category
              </Link>
            </div>

            {/* Subcategories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.subcategories.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200/80 hover:border-blue-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-slate-900">{sub.name}</h4>
                      <span className="text-[10px] font-mono font-bold text-blue-600 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                        {sub.reportCount.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">{sub.description}</p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <Link
                      href={`/explore`}
                      className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>View reports</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
