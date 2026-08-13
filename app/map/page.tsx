'use client';

import React from 'react';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { useApp } from '@/lib/store';
import { ProblemCard } from '@/components/cards/ProblemCard';
import { MapPin, Layers, Flame, Filter, Building2, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FullMapViewPage() {
  const { problems } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Interactive GIS Map Intelligence
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Geographic spatial clustering, municipal ward boundaries, and severity heatmaps across Indian cities.
          </p>
        </div>

        <Link
          href="/report"
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all"
        >
          + Report at Current Location
        </Link>
      </div>

      {/* GIS Map Component */}
      <InteractiveMap height="h-[620px]" initialCity="Vadodara" />

      {/* Nearby Problems Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>Nearby Problems in Active Ward View</span>
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            Showing {problems.length} Verified Issues
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.slice(0, 6).map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </div>
    </div>
  );
}
