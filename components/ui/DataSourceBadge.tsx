'use client';

import React, { useState } from 'react';
import { TrustLevel, DataFreshness, DataProvenance } from '@/lib/data-intelligence/types';
import { getProvenanceForSource } from '@/lib/data-intelligence/registry';
import {
  ShieldCheck,
  Building2,
  Users,
  CheckCircle2,
  Sparkles,
  FlaskConical,
  AlertTriangle,
  ExternalLink,
  Info,
  Clock,
  FileText,
  X,
  MapPin,
} from 'lucide-react';

interface DataSourceBadgeProps {
  trustLevel?: TrustLevel;
  sourceId?: string;
  provenance?: Partial<DataProvenance>;
  showProvenanceOnClick?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function DataSourceBadge({
  trustLevel,
  sourceId,
  provenance,
  showProvenanceOnClick = true,
  size = 'md',
  className = '',
}: DataSourceBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Derive provenance from sourceId if provided
  const resolvedProvenance: DataProvenance = sourceId
    ? getProvenanceForSource(sourceId)
    : {
        sourceId: 'custom',
        datasetName: provenance?.datasetName || 'JanVaani Civic Dataset',
        publisher: provenance?.publisher || 'Official Source',
        publishedDate: provenance?.publishedDate || '2026',
        retrievalTimestamp: provenance?.retrievalTimestamp || new Date().toISOString(),
        freshness: provenance?.freshness || 'LIVE',
        license: provenance?.license || 'Open Data License',
        sourceUrl: provenance?.sourceUrl || 'https://data.gov.in',
        trustLevel: trustLevel || provenance?.trustLevel || 'OFFICIAL_GOV_DATA',
        methodologyNotes: provenance?.methodologyNotes,
      };

  const activeLevel: TrustLevel = trustLevel || resolvedProvenance.trustLevel;

  // Visual configs for each Trust Level
  const levelConfig: Record<
    TrustLevel,
    { label: string; icon: any; bg: string; text: string; border: string }
  > = {
    OFFICIAL_GOV_DATA: {
      label: 'Official Government Data',
      icon: Building2,
      bg: 'bg-emerald-50 text-emerald-800',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
    },
    CENSUS_OF_INDIA: {
      label: 'Census of India (Aggregate)',
      icon: Building2,
      bg: 'bg-blue-50 text-blue-800',
      text: 'text-blue-700',
      border: 'border-blue-200',
    },
    OPENSTREETMAP: {
      label: 'OpenStreetMap (ODbL)',
      icon: MapPin,
      bg: 'bg-teal-50 text-teal-800',
      text: 'text-teal-700',
      border: 'border-teal-200',
    },
    CITIZEN_REPORTED: {
      label: 'Citizen Reported (JanVaani)',
      icon: Users,
      bg: 'bg-indigo-50 text-indigo-800',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
    },
    COMMUNITY_VERIFIED: {
      label: 'Community Verified',
      icon: CheckCircle2,
      bg: 'bg-emerald-50 text-emerald-800',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
    },
    EXPERT_REVIEWED: {
      label: 'Expert Reviewed',
      icon: ShieldCheck,
      bg: 'bg-purple-50 text-purple-800',
      text: 'text-purple-700',
      border: 'border-purple-200',
    },
    AI_ANALYSIS: {
      label: 'AI Analysis (Inferred)',
      icon: Sparkles,
      bg: 'bg-amber-50 text-amber-900',
      text: 'text-amber-800',
      border: 'border-amber-300',
    },
    RESEARCH_DATA: {
      label: 'Research Dataset',
      icon: FlaskConical,
      bg: 'bg-cyan-50 text-cyan-800',
      text: 'text-cyan-700',
      border: 'border-cyan-200',
    },
    DEMO_DATA: {
      label: 'Sample / Demo Data',
      icon: AlertTriangle,
      bg: 'bg-slate-100 text-slate-800',
      text: 'text-slate-700',
      border: 'border-slate-300',
    },
  };

  const cfg = levelConfig[activeLevel] || levelConfig.OFFICIAL_GOV_DATA;
  const Icon = cfg.icon;

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-[9px] gap-1'
      : size === 'lg'
      ? 'px-3 py-1.5 text-xs gap-1.5'
      : 'px-2.5 py-1 text-[10px] gap-1.5';

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => showProvenanceOnClick && setIsOpen(!isOpen)}
        className={`inline-flex items-center font-black rounded-full border shadow-xs transition-all hover:scale-105 cursor-pointer ${cfg.bg} ${cfg.border} ${sizeClasses} ${className}`}
        title="Click to inspect dataset provenance &amp; official verification source"
      >
        <Icon className="w-3 h-3 shrink-0" />
        <span className="truncate">{cfg.label}</span>
        {showProvenanceOnClick && <Info className="w-2.5 h-2.5 opacity-60 ml-0.5" />}
      </button>

      {/* Provenance Inspector Popover */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-2xl border ${cfg.bg} ${cfg.border}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                    Data Provenance &amp; Verification Chain
                  </span>
                  <h3 className="text-base font-black text-slate-950 leading-tight">
                    {cfg.label}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Provenance Fields Table */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Dataset Name</span>
                <div className="font-extrabold text-slate-900 leading-snug">
                  {resolvedProvenance.datasetName}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Publisher</span>
                  <div className="font-bold text-slate-800 truncate mt-0.5">
                    {resolvedProvenance.publisher}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Data License</span>
                  <div className="font-bold text-slate-800 truncate mt-0.5">
                    {resolvedProvenance.license}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Freshness Status</span>
                  <div className="font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{resolvedProvenance.freshness.replace(/_/g, ' ')}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Last Sync / Checked</span>
                  <div className="font-mono text-[11px] text-slate-600 mt-0.5">
                    {new Date(resolvedProvenance.retrievalTimestamp).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </div>
                </div>
              </div>

              {resolvedProvenance.methodologyNotes && (
                <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 text-slate-700 space-y-1">
                  <span className="text-[10px] uppercase font-extrabold text-blue-900 block">
                    Methodology &amp; Usage Terms
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    {resolvedProvenance.methodologyNotes}
                  </p>
                </div>
              )}
            </div>

            {/* Actions: Verify at Source */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href={resolvedProvenance.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all"
              >
                <span>Verify at Official Source (data.gov.in)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
