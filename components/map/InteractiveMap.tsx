'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ProblemCase, Severity } from '@/lib/types';
import { useApp } from '@/lib/store';
import { StatusBadge, SeverityBadge } from '../ui/StatusBadge';
import { CIVIC_TAXONOMY } from '@/lib/taxonomy';
import {
  MapPin,
  Layers,
  Flame,
  Filter,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  X,
  Compass,
  Building2,
  Droplets,
  Zap,
  Trash2,
  Sparkles,
  Search,
  Eye,
  Shield,
  Activity,
  Calendar,
  Clock,
  ThumbsUp,
  Share2,
  LocateFixed,
  TrendingUp,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface InteractiveMapProps {
  initialCity?: string;
  height?: string;
  selectedProblemId?: string;
}

type MapTheme = 'tactical_dark' | 'municipal_vector' | 'satellite_hybrid';
type AnalyticalOverlay = 'all_pins' | 'heatmap' | 'ward_boundaries' | 'flood_drainage' | 'pothole_pqi';

// Enhanced Geo Pin Coordinates for realistic municipal mapping
interface SpatialProblemPin extends ProblemCase {
  coords: { top: string; left: string };
  pqiScore?: number;
  waterloggingRisk?: 'high' | 'medium' | 'low';
  slaHoursLeft?: number;
}

const WARDS_DATA = [
  {
    id: 'W07',
    name: 'Ward 7 (Karelibaug)',
    zone: 'East Zone',
    slaScore: 92.4,
    activeIssues: 18,
    criticalCount: 4,
    coords: { top: '24%', left: '32%' },
    polygonColor: 'border-emerald-500/60 bg-emerald-500/10',
  },
  {
    id: 'W04',
    name: 'Ward 4 (Sayajigunj)',
    zone: 'Central Zone',
    slaScore: 84.1,
    activeIssues: 26,
    criticalCount: 7,
    coords: { top: '38%', left: '52%' },
    polygonColor: 'border-blue-500/60 bg-blue-500/10',
  },
  {
    id: 'W09',
    name: 'Ward 9 (Akota)',
    zone: 'West Zone',
    slaScore: 78.5,
    activeIssues: 31,
    criticalCount: 9,
    coords: { top: '56%', left: '26%' },
    polygonColor: 'border-amber-500/60 bg-amber-500/10',
  },
  {
    id: 'W12',
    name: 'Ward 12 (Manjalpur)',
    zone: 'South Zone',
    slaScore: 94.8,
    activeIssues: 12,
    criticalCount: 2,
    coords: { top: '68%', left: '60%' },
    polygonColor: 'border-emerald-500/60 bg-emerald-500/10',
  },
  {
    id: 'W15',
    name: 'Ward 15 (Alkapuri)',
    zone: 'West Zone',
    slaScore: 96.2,
    activeIssues: 8,
    criticalCount: 1,
    coords: { top: '44%', left: '38%' },
    polygonColor: 'border-emerald-500/60 bg-emerald-500/10',
  },
];

export function InteractiveMap({
  initialCity = 'Vadodara',
  height = 'h-[620px]',
  selectedProblemId,
}: InteractiveMapProps) {
  const { problems, toggleCivicReaction } = useApp();

  // State
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [mapTheme, setMapTheme] = useState<MapTheme>('tactical_dark');
  const [activeOverlay, setActiveOverlay] = useState<AnalyticalOverlay>('all_pins');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedWard, setSelectedWard] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(13);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);

  // Selected Pin for Detailed Drawer
  const [activePin, setActivePin] = useState<SpatialProblemPin | null>(null);

  // Map problems to spatial pins
  const spatialProblems: SpatialProblemPin[] = useMemo(() => {
    const pinPositions = [
      { top: '28%', left: '34%', pqi: 42, risk: 'high', sla: 6 },
      { top: '68%', left: '62%', pqi: 68, risk: 'low', sla: 18 },
      { top: '56%', left: '26%', pqi: 35, risk: 'high', sla: 4 },
      { top: '38%', left: '72%', pqi: 75, risk: 'low', sla: 36 },
      { top: '42%', left: '48%', pqi: 52, risk: 'medium', sla: 12 },
      { top: '48%', left: '38%', pqi: 82, risk: 'low', sla: 48 },
      { top: '32%', left: '42%', pqi: 45, risk: 'high', sla: 8 },
      { top: '46%', left: '56%', pqi: 60, risk: 'medium', sla: 24 },
    ];

    return problems.map((p, idx) => {
      const extra = pinPositions[idx % pinPositions.length];
      return {
        ...p,
        coords: { top: extra.top, left: extra.left },
        pqiScore: extra.pqi,
        waterloggingRisk: extra.risk as 'high' | 'medium' | 'low',
        slaHoursLeft: extra.sla,
      };
    });
  }, [problems]);

  // Set initial active pin
  useEffect(() => {
    if (selectedProblemId) {
      const found = spatialProblems.find((p) => p.id === selectedProblemId);
      if (found) setActivePin(found);
    } else if (!activePin && spatialProblems.length > 0) {
      setActivePin(spatialProblems[0]);
    }
  }, [selectedProblemId, spatialProblems]);

  // Filtered pins
  const filteredProblems = useMemo(() => {
    return spatialProblems.filter((p) => {
      if (selectedSeverity !== 'all' && p.severity !== selectedSeverity) return false;
      if (selectedDept !== 'all' && p.categoryId !== selectedDept) return false;
      if (selectedWard !== 'all' && !p.location.ward.toLowerCase().includes(selectedWard.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [spatialProblems, selectedSeverity, selectedDept, selectedWard]);

  // Handle GPS location trigger
  const handleLocateMe = () => {
    setIsLocating(true);
    setLocationMessage('Acquiring high-precision GPS lock (±5m accuracy)...');
    setTimeout(() => {
      setIsLocating(false);
      setLocationMessage('Centering view on Ward 7 (Karelibaug, Vadodara)');
      setZoomLevel(15);
      if (spatialProblems[0]) setActivePin(spatialProblems[0]);
      setTimeout(() => setLocationMessage(null), 3000);
    }, 1000);
  };

  const getPinColor = (p: ProblemCase) => {
    if (p.status === 'resolved') return 'bg-emerald-500 ring-emerald-300 text-white';
    if (p.severity === 'critical') return 'bg-red-600 ring-red-400 text-white animate-pulse';
    if (p.severity === 'high') return 'bg-rose-500 ring-rose-300 text-white';
    if (p.severity === 'medium') return 'bg-amber-500 ring-amber-300 text-white';
    return 'bg-blue-500 ring-blue-300 text-white';
  };

  return (
    <div
      className={`relative w-full ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : `${height} rounded-3xl`
      } overflow-hidden border border-slate-200/90 shadow-xl bg-slate-950 flex flex-col select-none transition-all duration-300`}
    >
      {/* Top Map HUD & Multi-Dimensional Controls */}
      <div className="absolute top-3 left-3 right-3 z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pointer-events-none">
        {/* City Hierarchy & Ward Selector */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-xl border border-slate-700/80 text-white">
          <Navigation className="w-4 h-4 text-blue-400 shrink-0" />
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium">India / Gujarat /</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent font-extrabold text-blue-300 outline-none cursor-pointer hover:text-white transition-colors"
            >
              <option value="Vadodara" className="bg-slate-900 text-white">Vadodara (19 Wards)</option>
              <option value="Ahmedabad" className="bg-slate-900 text-white">Ahmedabad (48 Wards)</option>
              <option value="Surat" className="bg-slate-900 text-white">Surat (30 Wards)</option>
              <option value="Rajkot" className="bg-slate-900 text-white">Rajkot (18 Wards)</option>
              <option value="Mumbai" className="bg-slate-900 text-white">Mumbai (24 Wards)</option>
              <option value="Bengaluru" className="bg-slate-900 text-white">Bengaluru (198 Wards)</option>
              <option value="Delhi" className="bg-slate-900 text-white">Delhi NCR</option>
            </select>
          </div>
        </div>

        {/* Analytical Overlay Switcher Pills */}
        <div className="pointer-events-auto flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl shadow-xl border border-slate-700/80 overflow-x-auto max-w-full scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveOverlay('all_pins')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeOverlay === 'all_pins'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            📍 All Issues ({filteredProblems.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveOverlay('heatmap')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeOverlay === 'heatmap'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Heatmap</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveOverlay('ward_boundaries')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeOverlay === 'ward_boundaries'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Ward SLAs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveOverlay('flood_drainage')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeOverlay === 'flood_drainage'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Monsoon Flood Risk</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveOverlay('pothole_pqi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeOverlay === 'pothole_pqi'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Road PQI Index</span>
          </button>
        </div>

        {/* Right Tools: Theme & Fullscreen */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl shadow-xl border border-slate-700/80">
          <button
            type="button"
            onClick={() =>
              setMapTheme((t) =>
                t === 'tactical_dark'
                  ? 'municipal_vector'
                  : t === 'municipal_vector'
                  ? 'satellite_hybrid'
                  : 'tactical_dark'
              )
            }
            className="px-2.5 py-1 text-[11px] font-bold text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-1"
            title="Switch Map Visual Theme"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span className="capitalize hidden sm:inline">
              {mapTheme.replace('_', ' ')}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Geolocation Feedback Alert */}
      {locationMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-blue-600 text-white px-4 py-2 rounded-2xl text-xs font-extrabold shadow-2xl border border-blue-400 flex items-center gap-2 animate-in fade-in zoom-in-95">
          <Navigation className="w-4 h-4 animate-spin" />
          <span>{locationMessage}</span>
        </div>
      )}

      {/* Main High-Performance GIS Canvas */}
      <div
        className={`relative flex-1 w-full h-full overflow-hidden transition-colors duration-500 ${
          mapTheme === 'tactical_dark'
            ? 'bg-[#080d1a]'
            : mapTheme === 'municipal_vector'
            ? 'bg-[#141e33]'
            : 'bg-[#0b1320]'
        }`}
      >
        {/* Vector Grid & Orthophoto Coordinates */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
            backgroundSize: `${zoomLevel * 3}px ${zoomLevel * 3}px`,
          }}
        />

        {/* Procedural Municipal Street & River Network */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
          preserveAspectRatio="none"
        >
          {/* Main Arterial Road Network */}
          <path d="M 0 150 Q 200 120 400 200 T 800 180 T 1200 240" fill="none" stroke="#0284c7" strokeWidth="5" />
          <path d="M 100 0 Q 300 200 250 400 T 400 650" fill="none" stroke="#475569" strokeWidth="7" />
          <path d="M 500 0 Q 450 250 650 450 T 800 650" fill="none" stroke="#475569" strokeWidth="6" />
          <path d="M 0 350 Q 300 300 600 380 T 1200 320" fill="none" stroke="#334155" strokeWidth="6" />
          <path d="M 0 520 Q 400 480 800 540 T 1200 500" fill="none" stroke="#334155" strokeWidth="5" />

          {/* Vishwamitri River Stormwater Channel */}
          <path
            d="M 280 0 C 340 180, 250 320, 310 650"
            fill="none"
            stroke="#0284c7"
            strokeWidth="12"
            strokeLinecap="round"
            className="opacity-70"
          />
          <path
            d="M 280 0 C 340 180, 250 320, 310 650"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeDasharray="8,6"
            className="opacity-90 animate-pulse"
          />
        </svg>

        {/* HEATMAP LAYER: Gaussian Kernel Intensity Surface */}
        {activeOverlay === 'heatmap' && (
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-500">
            {/* Chronic Waterlogging Cluster */}
            <div className="absolute top-[22%] left-[30%] w-80 h-80 bg-red-600/30 rounded-full blur-3xl animate-pulse" />
            {/* Pothole Density Corridor */}
            <div className="absolute top-[38%] left-[45%] w-96 h-96 bg-amber-500/35 rounded-full blur-3xl" />
            {/* Akota Bridge Safety Hotspot */}
            <div className="absolute top-[52%] left-[24%] w-72 h-72 bg-rose-500/30 rounded-full blur-3xl" />
            {/* Manjalpur Sanitation Point */}
            <div className="absolute top-[62%] left-[58%] w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
          </div>
        )}

        {/* MONSOON FLOOD & STORMWATER DRAINAGE LAYER */}
        {activeOverlay === 'flood_drainage' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[24%] left-[28%] px-3 py-1 bg-red-950/90 border border-red-500 text-red-300 rounded-xl text-[10px] font-extrabold flex items-center gap-1.5 shadow-xl">
              <Droplets className="w-3.5 h-3.5 text-red-400" />
              <span>Severe Catchment Inundation Zone (Waterlogging &gt; 25cm)</span>
            </div>

            <div className="absolute top-[54%] left-[20%] px-3 py-1 bg-amber-950/90 border border-amber-500 text-amber-300 rounded-xl text-[10px] font-extrabold flex items-center gap-1.5 shadow-xl">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Storm Drain Choke: Sayaji Outflow</span>
            </div>
          </div>
        )}

        {/* WARD BOUNDARIES & SLA HEALTH POLYGONS */}
        {WARDS_DATA.map((w) => {
          const isCurrentWard = activePin?.location.ward.includes(w.name.split(' ')[0]);
          return (
            <div
              key={w.id}
              style={{ top: w.coords.top, left: w.coords.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
              onClick={() => setSelectedWard(w.name)}
            >
              {/* Ward Boundary Polygon Ring */}
              <div
                className={`w-36 h-28 rounded-3xl border-2 transition-all p-2 flex flex-col justify-between ${
                  w.polygonColor
                } ${
                  activeOverlay === 'ward_boundaries'
                    ? 'opacity-100 scale-105 shadow-2xl'
                    : 'opacity-40 hover:opacity-90'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black text-sky-300 uppercase">
                    {w.id}
                  </span>
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded ${
                      w.slaScore >= 90
                        ? 'bg-emerald-500 text-white'
                        : w.slaScore >= 80
                        ? 'bg-blue-500 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {w.slaScore}% SLA
                  </span>
                </div>

                <div>
                  <div className="text-[11px] font-bold text-white leading-tight truncate">
                    {w.name}
                  </div>
                  <div className="text-[9px] text-slate-300 mt-0.5">
                    {w.activeIssues} Active • {w.criticalCount} Critical
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* INTERACTIVE SPATIAL PINS */}
        {filteredProblems.map((p) => {
          const isSelected = activePin?.id === p.id;
          return (
            <div
              key={p.id}
              style={{ top: p.coords.top, left: p.coords.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group pointer-events-auto"
              onClick={() => setActivePin(p)}
            >
              {/* Active Radar Ripple Animation */}
              {isSelected && (
                <>
                  <div className="absolute -inset-4 bg-blue-500/30 rounded-full animate-ping" />
                  <div className="absolute -inset-2 bg-blue-400/50 rounded-full animate-pulse" />
                </>
              )}

              {/* Pin Physical Bubble */}
              <div
                className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-2xl ring-4 transition-all duration-300 transform group-hover:scale-130 ${getPinColor(
                  p
                )} ${isSelected ? 'scale-130 ring-white ring-offset-2 ring-offset-slate-950' : 'ring-slate-950/60'}`}
              >
                <MapPin className="w-4 h-4 stroke-[2.5]" />

                {/* Reaction Counter Badge */}
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-slate-950 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center border border-white shadow-md">
                  {p.civicReactions.face_this_too || 1}
                </span>
              </div>

              {/* Hover Tooltip Card */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover:block z-30 pointer-events-none">
                <div className="bg-slate-950/95 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-2xl border border-slate-700 flex items-center gap-2">
                  <span className="font-mono text-blue-400 font-bold">{p.id}</span>
                  <span className="max-w-[180px] truncate">{p.title}</span>
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-red-600">
                    {p.severity}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* BOTTOM LEFT: GIS LEGEND & QUICK STATS */}
        <div className="absolute bottom-3 left-3 z-30 flex flex-col sm:flex-row items-start sm:items-center gap-2">
          {/* Legend */}
          <div className="bg-slate-950/90 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl text-[11px] border border-slate-800 shadow-2xl flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-xs" />
              <span className="font-bold">Critical P0</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>High P1</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Medium P2</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Resolved P3</span>
            </div>
          </div>

          {/* Active Filter Clear Pill */}
          {(selectedSeverity !== 'all' || selectedDept !== 'all' || selectedWard !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSelectedSeverity('all');
                setSelectedDept('all');
                setSelectedWard('all');
              }}
              className="bg-blue-600/90 hover:bg-blue-600 text-white px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1 shadow-lg transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Spatial Filters</span>
            </button>
          )}
        </div>

        {/* BOTTOM RIGHT: MAP ZOOM & GEOLOCATION TOOLS */}
        <div className="absolute bottom-3 right-3 z-30 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={handleLocateMe}
            disabled={isLocating}
            className="w-9 h-9 rounded-xl bg-slate-900/90 backdrop-blur-md hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl border border-slate-700 transition-all hover:scale-105"
            title="Locate My Current Position (GPS Lock)"
          >
            <LocateFixed className={`w-4 h-4 ${isLocating ? 'animate-spin text-blue-400' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(18, z + 1))}
            className="w-9 h-9 rounded-xl bg-slate-900/90 backdrop-blur-md hover:bg-slate-800 text-white flex items-center justify-center shadow-2xl border border-slate-700 transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(8, z - 1))}
            className="w-9 h-9 rounded-xl bg-slate-900/90 backdrop-blur-md hover:bg-slate-800 text-white flex items-center justify-center shadow-2xl border border-slate-700 transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* SLIDE-OUT SPATIAL INTELLIGENCE DRAWER */}
        {activePin && (
          <div className="absolute top-14 right-3 z-40 w-80 sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-right-6 duration-200 flex flex-col max-h-[80%]">
            {/* Card Header Bar */}
            <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded-lg border border-blue-800">
                  {activePin.id}
                </span>
                <SeverityBadge severity={activePin.severity} />
              </div>
              <button
                type="button"
                onClick={() => setActivePin(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Card Body */}
            <div className="p-5 space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between">
                <StatusBadge status={activePin.status} />
                <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  {activePin.location.ward}, {activePin.location.city}
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                  {activePin.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                  {activePin.description}
                </p>
              </div>

              {/* Photo Evidence Preview */}
              {activePin.evidence && activePin.evidence[0] && (
                <div className="relative h-36 rounded-2xl overflow-hidden border border-slate-200 group">
                  <img
                    src={activePin.evidence[0].url}
                    alt={activePin.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-950/80 backdrop-blur-sm text-white text-[10px] font-bold rounded-md">
                    Verified Photo Evidence
                  </div>
                </div>
              )}

              {/* Authority & SLA Countdown HUD */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase font-extrabold text-slate-400">
                    Assigned Municipal Dept
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activePin.slaHoursLeft}h to SLA Escalation
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 truncate">
                  {activePin.assignedAuthority.department}
                </div>
              </div>

              {/* Direct Co-Sign Action Bar */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => toggleCivicReaction(activePin.id, 'face_this_too')}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors border border-blue-200"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>I Face This Too ({activePin.civicReactions.face_this_too || 0})</span>
                </button>
              </div>

              {/* Full Case CTA */}
              <Link
                href={`/problems/${activePin.id}`}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span>Open Complete Case &amp; Co-Create Fix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
