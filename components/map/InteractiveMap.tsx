'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProblemCase } from '@/lib/types';
import { useApp } from '@/lib/store';
import { StatusBadge, SeverityBadge } from '../ui/StatusBadge';
import {
  MapPin,
  Layers,
  Flame,
  Filter,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  X,
  Compass,
} from 'lucide-react';

interface InteractiveMapProps {
  initialCity?: string;
  height?: string;
  selectedProblemId?: string;
}

export function InteractiveMap({
  initialCity = 'Vadodara',
  height = 'h-[540px]',
  selectedProblemId,
}: InteractiveMapProps) {
  const { problems } = useApp();
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [activeLayer, setActiveLayer] = useState<'all' | 'heatmap' | 'critical' | 'resolved'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePin, setActivePin] = useState<ProblemCase | null>(
    problems.find((p) => p.id === selectedProblemId) || problems[0] || null
  );
  const [zoomLevel, setZoomLevel] = useState(13);

  // Filter problems based on category and layer
  const filteredProblems = problems.filter((p) => {
    if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) return false;
    if (activeLayer === 'critical' && p.severity !== 'critical' && p.severity !== 'high') return false;
    if (activeLayer === 'resolved' && p.status !== 'resolved') return false;
    return true;
  });

  const getPinColor = (p: ProblemCase) => {
    if (p.status === 'resolved') return 'bg-emerald-500 ring-emerald-200';
    if (p.severity === 'critical') return 'bg-red-600 ring-red-300 animate-pulse';
    if (p.severity === 'high') return 'bg-rose-500 ring-rose-200';
    if (p.severity === 'medium') return 'bg-amber-500 ring-amber-200';
    return 'bg-blue-500 ring-blue-200';
  };

  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 flex flex-col`}>
      {/* Top Map Controls Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* City & Ward Hierarchy Badge */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-200/80 flex items-center gap-2">
          <Navigation className="w-4 h-4 text-blue-600 shrink-0" />
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-500">India</span>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-600">Gujarat</span>
            <span className="text-slate-300">/</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent font-bold text-blue-600 outline-none cursor-pointer"
            >
              <option value="Vadodara">Vadodara (19 Wards)</option>
              <option value="Ahmedabad">Ahmedabad (48 Wards)</option>
              <option value="Rajkot">Rajkot (18 Wards)</option>
              <option value="Surat">Surat (30 Wards)</option>
              <option value="Mumbai">Mumbai (24 Wards)</option>
              <option value="Bengaluru">Bengaluru (198 Wards)</option>
              <option value="Delhi">Delhi NCR</option>
            </select>
          </div>
        </div>

        {/* Layer Filters */}
        <div className="pointer-events-auto flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl shadow-lg border border-slate-200/80">
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeLayer === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Pins ({filteredProblems.length})
          </button>
          <button
            onClick={() => setActiveLayer('heatmap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeLayer === 'heatmap'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Heatmap</span>
          </button>
          <button
            onClick={() => setActiveLayer('critical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeLayer === 'critical'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Critical</span>
          </button>
        </div>
      </div>

      {/* Map Canvas Background (Simulated High-Tech GIS Canvas) */}
      <div className="relative flex-1 w-full h-full bg-[#0e1726] overflow-hidden select-none">
        {/* Vector Grid & GIS Lines */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Simulated Roads & Hydrographic Curves */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" preserveAspectRatio="none">
          <path d="M 0 150 Q 200 120 400 200 T 800 180 T 1200 240" fill="none" stroke="#0284c7" strokeWidth="4" />
          <path d="M 100 0 Q 300 200 250 400 T 400 600" fill="none" stroke="#334155" strokeWidth="6" />
          <path d="M 500 0 Q 450 250 650 450 T 800 600" fill="none" stroke="#475569" strokeWidth="5" />
          <path d="M 0 350 Q 300 300 600 380 T 1200 320" fill="none" stroke="#334155" strokeWidth="6" />
          {/* Vishwamitri River Curve */}
          <path d="M 280 0 C 340 180, 260 320, 310 600" fill="none" stroke="#0369a1" strokeWidth="8" strokeDasharray="6,4" />
        </svg>

        {/* Heatmap Glow Simulation */}
        {activeLayer === 'heatmap' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[25%] left-[32%] w-72 h-72 bg-red-500/25 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-[40%] left-[45%] w-80 h-80 bg-amber-500/30 rounded-full blur-3xl" />
            <div className="absolute top-[60%] left-[28%] w-60 h-60 bg-rose-500/25 rounded-full blur-3xl" />
          </div>
        )}

        {/* Ward Area Labels */}
        <div className="absolute top-[18%] left-[26%] text-[11px] font-bold text-sky-400/60 uppercase tracking-widest pointer-events-none">
          Ward 7 (Karelibaug)
        </div>
        <div className="absolute top-[38%] left-[52%] text-[11px] font-bold text-sky-400/60 uppercase tracking-widest pointer-events-none">
          Ward 4 (Sayajigunj)
        </div>
        <div className="absolute top-[58%] left-[22%] text-[11px] font-bold text-sky-400/60 uppercase tracking-widest pointer-events-none">
          Ward 9 (Akota)
        </div>
        <div className="absolute top-[65%] left-[58%] text-[11px] font-bold text-sky-400/60 uppercase tracking-widest pointer-events-none">
          Ward 12 (Manjalpur)
        </div>

        {/* Interactive Problem Pins */}
        {filteredProblems.map((p, idx) => {
          // Calculate positions roughly spread on canvas
          const positions = [
            { top: '28%', left: '34%' }, // Karelibaug
            { top: '68%', left: '62%' }, // Manjalpur
            { top: '56%', left: '26%' }, // Akota
            { top: '38%', left: '72%' }, // Kalawad
            { top: '42%', left: '48%' }, // Sayajigunj
            { top: '48%', left: '38%' }, // Alkapuri
            { top: '32%', left: '42%' }, // VIP Rd
            { top: '46%', left: '56%' }, // Khanderao Market
          ];
          const pos = positions[idx % positions.length];
          const isSelected = activePin?.id === p.id;

          return (
            <div
              key={p.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
              onClick={() => setActivePin(p)}
            >
              {/* Pulsing ring for selected pin */}
              {isSelected && (
                <div className="absolute -inset-2 bg-blue-500/40 rounded-full animate-ping" />
              )}

              {/* Pin Icon */}
              <div
                className={`relative flex items-center justify-center w-8 h-8 rounded-full text-white shadow-xl ring-4 transition-transform group-hover:scale-125 ${getPinColor(
                  p
                )} ${isSelected ? 'scale-125 ring-white' : ''}`}
              >
                <MapPin className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-slate-900 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center border border-white">
                  {p.civicReactions.face_this_too || 1}
                </span>
              </div>

              {/* Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none">
                <div className="bg-slate-950/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-xl border border-slate-800 flex items-center gap-1.5">
                  <span className="font-mono text-blue-400">{p.id}</span>
                  <span>{p.title.slice(0, 24)}...</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom Left Legend */}
        <div className="absolute bottom-3 left-3 z-20 bg-slate-950/90 backdrop-blur-md text-white px-3 py-2 rounded-xl text-[11px] border border-slate-800 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Resolved</span>
          </div>
        </div>

        {/* Bottom Right Map Controls */}
        <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-1.5">
          <button
            onClick={() => setZoomLevel((z) => Math.min(18, z + 1))}
            className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-md hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(8, z - 1))}
            className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-md hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Problem Card Overlay Drawer */}
        {activePin && (
          <div className="absolute top-16 right-3 z-30 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-200">
            {/* Top Bar */}
            <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                  {activePin.id}
                </span>
                <SeverityBadge severity={activePin.severity} />
              </div>
              <button
                onClick={() => setActivePin(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <StatusBadge status={activePin.status} />
                <span className="text-xs text-slate-500 font-medium">
                  {activePin.location.ward}, {activePin.location.city}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 line-clamp-2">
                {activePin.title}
              </h4>

              <p className="text-xs text-slate-600 line-clamp-2">
                {activePin.description}
              </p>

              {/* Photo preview if available */}
              {activePin.evidence[0] && (
                <div className="h-28 rounded-xl overflow-hidden border border-slate-100">
                  <img
                    src={activePin.evidence[0].url}
                    alt={activePin.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Assigned Authority */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Assigned Authority
                </span>
                <span className="font-semibold text-slate-800 block truncate">
                  {activePin.assignedAuthority.department}
                </span>
              </div>

              {/* CTA Link */}
              <Link
                href={`/problems/${activePin.id}`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>View Full Case & Solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
