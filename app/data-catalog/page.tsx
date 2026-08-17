'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { REGISTERED_DATA_SOURCES } from '@/lib/data-intelligence/registry';
import { DataSourceBadge } from '@/components/ui/DataSourceBadge';
import {
  Database,
  Search,
  ExternalLink,
  Download,
  Filter,
  Layers,
  CheckCircle2,
  Clock,
  Building2,
  ShieldCheck,
  FileCode,
  Tag,
  ArrowRight,
} from 'lucide-react';

export default function DataCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const set = new Set(REGISTERED_DATA_SOURCES.map((s) => s.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredSources = useMemo(() => {
    return REGISTERED_DATA_SOURCES.filter((src) => {
      if (selectedCategory !== 'all' && src.category !== selectedCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        src.name.toLowerCase().includes(q) ||
        src.publisher.toLowerCase().includes(q) ||
        src.parentMinistryOrOrg.toLowerCase().includes(q) ||
        src.category.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-md">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30">
                  Open Civic Data Infrastructure
                </span>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  OGDL &amp; ODbL Compliant
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                National Open Data Catalog &amp; Provenance Registry
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/data-sources"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10 transition-colors"
            >
              Sync Engine &amp; Health →
            </Link>
            <Link
              href="/data-quality"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm transition-colors"
            >
              Quality Audit Reports
            </Link>
          </div>
        </div>

        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
          JanVaani strictly separates <strong>Official Government Baseline Data</strong> from <strong>Citizen-Reported Signals</strong>. Every dataset listed below contains complete provenance: publisher, gazette licensing, spatial bounds, freshness status, and official verification URLs.
        </p>

        {/* Quick KPI Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Registered Public Datasets</span>
            <div className="text-xl font-black text-white font-mono mt-0.5">
              {REGISTERED_DATA_SOURCES.length} Official Feeds
            </div>
          </div>

          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Ingested Records</span>
            <div className="text-xl font-black text-blue-400 font-mono mt-0.5">
              {REGISTERED_DATA_SOURCES.reduce((acc, s) => acc + s.recordsTotal, 0).toLocaleString('en-IN')}
            </div>
          </div>

          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Average Quality Score</span>
            <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">
              {(
                REGISTERED_DATA_SOURCES.reduce((acc, s) => acc + s.dataQualityScore, 0) /
                REGISTERED_DATA_SOURCES.length
              ).toFixed(1)}%
            </div>
          </div>

          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Data Licensing</span>
            <div className="text-xl font-black text-purple-300 font-mono mt-0.5">
              OGDL-India / ODbL
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search datasets, publishers, ministries, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap capitalize ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dataset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSources.map((src) => (
          <div
            key={src.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4 flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div>
              {/* Category & Badge */}
              <div className="flex items-start justify-between gap-2">
                <DataSourceBadge sourceId={src.id} size="sm" />
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  {src.format}
                </span>
              </div>

              {/* Title and Publisher */}
              <div className="mt-3">
                <h3 className="text-base font-black text-slate-950 leading-snug">
                  {src.name}
                </h3>
                <div className="text-xs font-bold text-blue-600 mt-1">
                  🏛️ {src.publisher}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {src.parentMinistryOrOrg}
                </div>
              </div>

              {/* Spatial & Temporal Meta */}
              <div className="mt-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Geographic Coverage</span>
                  <div className="font-semibold text-slate-800 text-[11px] leading-tight mt-0.5">
                    {src.geographicCoverage}
                  </div>
                </div>

                <div className="pt-1.5 border-t border-slate-200/60 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Update Cadence</span>
                    <span className="font-bold text-slate-700">{src.updateFrequency}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Quality Score</span>
                    <span className="font-bold text-emerald-600">{src.dataQualityScore}%</span>
                  </div>
                </div>
              </div>

              {/* Licensing Tag */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>📜 {src.license}</span>
                <span className="font-mono font-bold text-slate-700">
                  {src.recordsTotal.toLocaleString('en-IN')} Records
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <a
                href={src.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-blue-200"
              >
                <span>View Official Gazette / Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {src.apiUrl && (
                <a
                  href={src.apiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                  title="Open data.gov.in REST API Endpoint"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>API</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
