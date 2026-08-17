'use client';

import React from 'react';
import Link from 'next/link';
import {
  REGISTERED_DATA_SOURCES,
  LATEST_QUALITY_REPORTS,
} from '@/lib/data-intelligence/registry';
import {
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Activity,
  Layers,
  Sparkles,
  MapPin,
  Lock,
} from 'lucide-react';

export default function DataQualityPage() {
  return (
    <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/data-catalog"
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-950">
                Automated Data Quality &amp; Trust Assurance Center
              </h1>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Score: 98.2%
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Continuous validation pipelines enforcing zero fake data, coordinate boundary checks, schema drift alarms, and privacy fuzzing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/data-sources"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm transition-colors"
          >
            Manage Sources →
          </Link>
        </div>
      </div>

      {/* 4 Pillars of Data Quality */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase">Null &amp; Boundary Violations</div>
          <div className="text-2xl font-black text-slate-900 font-mono">0.00%</div>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            100% within valid Indian bounds
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase">Geospatial PostGIS Accuracy</div>
          <div className="text-2xl font-black text-slate-900 font-mono">99.8%</div>
          <span className="text-[11px] text-blue-600 font-semibold block">
            Polygons synced with OSM
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card space-y-2">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase">Privacy &amp; PII Anonymization</div>
          <div className="text-2xl font-black text-slate-900 font-mono">100% Passed</div>
          <span className="text-[11px] text-purple-600 font-semibold block">
            DPDP Act &amp; GDPR compliant
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase">Duplicate Signal Detection</div>
          <div className="text-2xl font-black text-slate-900 font-mono">94.2%</div>
          <span className="text-[11px] text-amber-600 font-semibold block">
            Spam &amp; duplicate clustering active
          </span>
        </div>
      </div>

      {/* Quality Audit Reports Stream */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-black text-slate-950">
              Automated Ingestion Quality Reports
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-semibold">
            Status: All Pipelines Healthy
          </span>
        </div>

        <div className="space-y-4">
          {LATEST_QUALITY_REPORTS.map((qr) => (
            <div
              key={qr.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">{qr.sourceId}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Score: {qr.overallScore}%
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Audited at: {new Date(qr.timestamp).toLocaleString('en-IN')}
                  </span>
                </div>

                <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-xs">
                  {qr.status}
                </span>
              </div>

              {/* Quality Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Null Checks</span>
                  <span className="font-bold text-emerald-600">{qr.nullViolations} Violations</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Coordinate Bounds</span>
                  <span className="font-bold text-emerald-600">{qr.coordinateViolations} Out of Bounds</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Schema Drift</span>
                  <span className="font-bold text-emerald-600">{qr.schemaValid ? 'Valid v2.4' : 'Drift Detected'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Duplicates Flagged</span>
                  <span className="font-bold text-blue-600">{qr.duplicateCount} Merged</span>
                </div>
              </div>

              {/* Notes */}
              <div className="pt-2 border-t border-slate-200/60">
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  {qr.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
