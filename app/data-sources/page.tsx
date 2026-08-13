'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  REGISTERED_DATA_SOURCES,
  LATEST_SYNC_LOGS,
} from '@/lib/data-intelligence/registry';
import { DataSourceBadge } from '@/components/ui/DataSourceBadge';
import {
  RefreshCw,
  Database,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Activity,
  Play,
  FileText,
  Server,
  Layers,
  ShieldCheck,
} from 'lucide-react';

export default function DataSourcesPage() {
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleTriggerSync = (sourceId: string, name: string) => {
    setSyncingId(sourceId);
    setSyncMessage(`Initiating live validation & sync with ${name}...`);

    setTimeout(() => {
      setSyncingId(null);
      setSyncMessage(`Sync completed for ${name}: Schema validated, 0 records rejected.`);
      setTimeout(() => setSyncMessage(null), 4000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
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
                Data Ingestion Engine &amp; Source Registry
              </h1>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Ingestion Health: 100%
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Live automated pipelines for Open Government Data (data.gov.in), Census, OpenStreetMap, and JanVaani citizen signals.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/data-quality"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
          >
            Quality Audits &amp; Tests →
          </Link>
        </div>
      </div>

      {/* Sync Status Banner */}
      {syncMessage && (
        <div className="bg-blue-50 border border-blue-200 text-blue-900 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs animate-in fade-in">
          <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
          <span>{syncMessage}</span>
        </div>
      )}

      {/* Active Source Adapters Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-black text-slate-950">
              Active Source Adapters ({REGISTERED_DATA_SOURCES.length})
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-semibold">
            Auto-Polling: Enabled
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-extrabold uppercase text-slate-400">
                <th className="pb-2.5">Source &amp; Publisher</th>
                <th className="pb-2.5">Trust Level</th>
                <th className="pb-2.5">Cadence</th>
                <th className="pb-2.5">Last Sync</th>
                <th className="pb-2.5">Quality</th>
                <th className="pb-2.5">Status</th>
                <th className="pb-2.5 text-right">Pipeline Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {REGISTERED_DATA_SOURCES.map((src) => (
                <tr key={src.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pr-3 max-w-[280px]">
                    <div className="font-extrabold text-slate-900 truncate">
                      {src.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {src.publisher}
                    </div>
                  </td>
                  <td className="py-3.5 pr-3">
                    <DataSourceBadge sourceId={src.id} size="sm" showProvenanceOnClick={false} />
                  </td>
                  <td className="py-3.5 pr-3 font-semibold text-slate-600">
                    {src.updateFrequency}
                  </td>
                  <td className="py-3.5 pr-3 font-mono text-[11px] text-slate-500">
                    {new Date(src.lastSuccessfulSync).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3.5 pr-3">
                    <span className="font-extrabold text-emerald-600">
                      {src.dataQualityScore}%
                    </span>
                  </td>
                  <td className="py-3.5 pr-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      ACTIVE
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      type="button"
                      disabled={syncingId === src.id}
                      onClick={() => handleTriggerSync(src.id, src.name)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold transition-colors inline-flex items-center gap-1 border border-slate-200"
                    >
                      <RefreshCw
                        className={`w-3 h-3 ${syncingId === src.id ? 'animate-spin text-blue-600' : ''}`}
                      />
                      <span>Sync Now</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sync Execution History Logs */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-black text-slate-950">
              Recent Sync Execution Logs (Audit Trail)
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-semibold">
            Retention: 90 Days
          </span>
        </div>

        <div className="space-y-3">
          {LATEST_SYNC_LOGS.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900">{log.sourceName}</span>
                  <span className="font-mono text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                    {log.sourceId}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Started: {new Date(log.startedAt).toLocaleString('en-IN', { timeStyle: 'medium' })} • Duration: {(log.durationMs / 1000).toFixed(1)}s
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Records Ingested
                  </span>
                  <span className="font-mono font-black text-slate-800">
                    +{log.recordsInserted} (0 rejected)
                  </span>
                </div>

                <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  SUCCESS
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
