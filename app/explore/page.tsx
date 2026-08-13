'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { CIVIC_TAXONOMY } from '@/lib/taxonomy';
import { ProblemCard } from '@/components/cards/ProblemCard';
import { SolutionCard } from '@/components/cards/SolutionCard';
import {
  Compass,
  Filter,
  MapPin,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Search,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';

export default function ExplorePage() {
  const { problems, solutions } = useApp();
  const [activeTab, setActiveTab] = useState<
    'all' | 'for_you' | 'nearby' | 'trending' | 'unresolved' | 'high_priority' | 'solutions'
  >('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Filter problems
  const filteredProblems = problems.filter((p) => {
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) {
      return false;
    }
    if (selectedCity !== 'all' && p.location.city.toLowerCase() !== selectedCity.toLowerCase()) {
      return false;
    }
    if (activeTab === 'unresolved' && p.status === 'resolved') {
      return false;
    }
    if (activeTab === 'high_priority' && p.severity !== 'high' && p.severity !== 'critical') {
      return false;
    }
    if (activeTab === 'trending' && (p.civicReactions.face_this_too || 0) < 20) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Explore Civic Intelligence
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Discover real-time verified citizen problems, local neighborhood issues, and proposed solutions.
          </p>
        </div>

        {/* Quick Report CTA */}
        <Link
          href="/report"
          className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
        >
          <span>+ Report a Problem</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search problems, keywords, roads, landmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* City Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 text-slate-700 outline-none cursor-pointer w-full md:w-44"
          >
            <option value="all">All Cities (India)</option>
            <option value="vadodara">Vadodara, Gujarat</option>
            <option value="ahmedabad">Ahmedabad, Gujarat</option>
            <option value="rajkot">Rajkot, Gujarat</option>
            <option value="mumbai">Mumbai, Maharashtra</option>
            <option value="bengaluru">Bengaluru, Karnataka</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 text-slate-700 outline-none cursor-pointer w-full md:w-48"
          >
            <option value="all">All Categories</option>
            {CIVIC_TAXONOMY.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Explore Tabs (Matching Blueprint 02. Explore Page) */}
      <div className="border-b border-slate-200 overflow-x-auto pb-1">
        <div className="flex items-center gap-1 sm:gap-2 min-w-max">
          {[
            { id: 'all', label: 'All Feeds' },
            { id: 'for_you', label: 'For You' },
            { id: 'nearby', label: 'Nearby (5km)' },
            { id: 'trending', label: 'Trending' },
            { id: 'unresolved', label: 'Unresolved' },
            { id: 'high_priority', label: 'High Priority' },
            { id: 'solutions', label: 'Solutions Hub' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Feed Grid */}
      {activeTab === 'solutions' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Community & Expert Proposed Solutions ({solutions.length})
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((sol) => (
              <SolutionCard key={sol.id} solution={sol} />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Showing {filteredProblems.length} Problem Cases
            </span>
            <Link href="/map" className="text-xs font-bold text-blue-600 hover:underline">
              Switch to GIS Map View →
            </Link>
          </div>

          {filteredProblems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProblems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <Compass className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">No matching reports found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing search filters or be the first in your area to report an issue!
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedCity('all');
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
