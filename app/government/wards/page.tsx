'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { Building2, ArrowLeft, MapPin, CheckCircle2, AlertTriangle, Users } from 'lucide-react';

const WARDS_DATA = [
  { id: 'ward_07', name: 'Ward 7 (Karelibaug & VIP Road)', officer: 'Er. Rajesh K. Patel', population: '84,000', activeCases: 42, resolvedCases: 180, hotspot: 'Drainage & Waterlogging' },
  { id: 'ward_12', name: 'Ward 12 (Manjalpur & GIDC)', officer: 'Er. S. K. Verma', population: '92,000', activeCases: 28, resolvedCases: 145, hotspot: 'Street Lighting & Dark Spots' },
  { id: 'ward_09', name: 'Ward 9 (Akota & Old Padra Rd)', officer: 'Dr. C. P. Solanki', population: '76,000', activeCases: 34, resolvedCases: 195, hotspot: 'Solid Waste & Bins' },
  { id: 'ward_04', name: 'Ward 4 (Sayajigunj & Station)', officer: 'Er. B. S. Dave', population: '110,000', activeCases: 51, resolvedCases: 230, hotspot: 'Traffic Congestion & Encroachment' },
];

export default function GovernmentWardsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center gap-3">
        <Link href="/government" className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-950">Ward-Level Geographic Problem Intelligence</h1>
          <p className="text-xs text-slate-500">Zonal infrastructure density, officer assignments, and localized grievance hotspots.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <InteractiveMap height="h-[580px]" initialCity="Vadodara" />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Zonal Ward Breakdown (Vadodara)
          </h3>

          <div className="space-y-3">
            {WARDS_DATA.map((w) => (
              <div key={w.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{w.name}</h4>
                  <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                    {w.activeCases} Active Cases
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div>Officer In-Charge: <strong className="text-slate-800">{w.officer}</strong></div>
                  <div>Population: <span className="text-slate-800">{w.population}</span></div>
                  <div className="text-amber-700 font-medium">Primary Hotspot: {w.hotspot}</div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-semibold">
                  <span>✓ {w.resolvedCases} Resolved this quarter</span>
                  <Link href="/map" className="text-blue-600 hover:underline">Focus Ward →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
