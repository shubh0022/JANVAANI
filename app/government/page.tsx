'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { GOVERNMENT_DEPARTMENTS } from '@/lib/mock-data';
import { StatusBadge, SeverityBadge } from '@/components/ui/StatusBadge';
import {
  Building2,
  ShieldCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Filter,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Eye,
  UserCheck,
  FileText,
} from 'lucide-react';

export default function GovernmentPortalPage() {
  const { problems, updateProblemStatus } = useApp();
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');

  return (
    <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-8">
      {/* Official Government Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30">
                  Government & Municipal Portal
                </span>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SLA Active
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                Vadodara Municipal Corporation (VMC Command Hub)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Link
              href="/government/representatives"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm transition-colors"
            >
              🏛️ Representatives &amp; MLAs
            </Link>
            <Link
              href="/government/departments"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10 transition-colors"
            >
              Departments
            </Link>
            <Link
              href="/government/wards"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/10 transition-colors"
            >
              Ward Intel
            </Link>
          </div>
        </div>

        {/* Top KPI Metrics Bar (Matching Blueprint 15. Government Dashboard) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Active Cases</span>
            <div className="text-2xl font-black text-white font-mono mt-1">12,642</div>
            <span className="text-[10px] text-blue-300 font-semibold">Across 19 Wards</span>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">New / Triage</span>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">542</div>
            <span className="text-[10px] text-amber-300 font-semibold">Auto-routed by AI</span>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">In Progress</span>
            <div className="text-2xl font-black text-blue-400 font-mono mt-1">2,145</div>
            <span className="text-[10px] text-blue-200 font-semibold">Crews Dispatched</span>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Citizen Verified Solved</span>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1">8,155</div>
            <span className="text-[10px] text-emerald-300 font-semibold">91.4% Pass Rate</span>
          </div>
        </div>
      </div>

      {/* Department Workloads (Matching Blueprint 17. Department Dashboard) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-950">Department Workloads & SLA Compliance</h2>
            <p className="text-xs text-slate-500">Live response times across civil engineering and health divisions.</p>
          </div>
          <Link href="/government/departments" className="text-xs font-bold text-blue-600 hover:underline">
            View Full Matrix →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GOVERNMENT_DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-blue-300 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {dept.code}
                </span>
                <span className="text-xs font-black text-emerald-600 font-mono">{dept.slaRate}% SLA</span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900">{dept.name}</h4>
                <p className="text-[11px] text-slate-500">Head: {dept.headOfficer}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/80 text-center text-xs">
                <div>
                  <span className="block font-black text-slate-900 font-mono">{dept.totalCases}</span>
                  <span className="text-[9px] text-slate-400">Total</span>
                </div>
                <div>
                  <span className="block font-black text-amber-600 font-mono">{dept.inProgressCases}</span>
                  <span className="text-[9px] text-slate-400">In Progress</span>
                </div>
                <div>
                  <span className="block font-black text-emerald-600 font-mono">{dept.resolvedCases}</span>
                  <span className="text-[9px] text-slate-400">Resolved</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Management & Action Queue */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-slate-950">Official Triage & Action Queue</h2>
            <p className="text-xs text-slate-500">Authorized officers can update case status, assign crews, and log resolution evidence.</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {problems.map((p) => (
            <div key={p.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {p.id}
                  </span>
                  <SeverityBadge severity={p.severity} />
                  <StatusBadge status={p.status} />
                  <span className="text-xs text-slate-500 font-medium">{p.location.ward}, {p.location.city}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-1">{p.description}</p>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <span>Assigned Dept: {p.assignedAuthority.department}</span>
                  <span>•</span>
                  <span>SLA Remaining: {p.assignedAuthority.slaHoursRemaining}h</span>
                </div>
              </div>

              {/* Action Buttons for Officers */}
              <div className="flex items-center gap-2 shrink-0">
                {p.status !== 'in_progress' && (
                  <button
                    onClick={() => updateProblemStatus(p.id, 'in_progress', 'Field inspection crew deployed with jetting truck.')}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors"
                  >
                    Dispatch Crew
                  </button>
                )}
                {p.status !== 'resolved' && (
                  <button
                    onClick={() => updateProblemStatus(p.id, 'resolved', 'Drain desilted and cleaned on ground. Ready for citizen verification.')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    Mark Resolved ✓
                  </button>
                )}
                <Link
                  href={`/problems/${p.id}`}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
