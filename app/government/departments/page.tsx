'use client';

import React from 'react';
import Link from 'next/link';
import { GOVERNMENT_DEPARTMENTS } from '@/lib/mock-data';
import { Building2, ArrowLeft, CheckCircle2, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

export default function GovernmentDepartmentsPage() {
  return (
    <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-8">
      <div className="flex items-center gap-3">
        <Link href="/government" className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-950">Department Matrix & SLA Performance</h1>
          <p className="text-xs text-slate-500">Comprehensive overview of municipal departments, officer allocations, and budget utilizations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GOVERNMENT_DEPARTMENTS.map((dept) => (
          <div key={dept.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  {dept.code}
                </span>
                <h3 className="text-lg font-black text-slate-950 mt-2">{dept.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Head Officer: {dept.headOfficer}</p>
              </div>

              <div className="bg-emerald-50 text-emerald-700 font-mono font-black text-sm px-3 py-1.5 rounded-xl border border-emerald-200">
                {dept.slaRate}% SLA Compliance
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <div>
                <span className="text-lg font-black text-slate-900 font-mono block">{dept.totalCases}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Total Cases</span>
              </div>
              <div>
                <span className="text-lg font-black text-amber-600 font-mono block">{dept.inProgressCases}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">In Progress</span>
              </div>
              <div>
                <span className="text-lg font-black text-emerald-600 font-mono block">{dept.resolvedCases}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Resolved</span>
              </div>
              <div>
                <span className="text-lg font-black text-rose-600 font-mono block">{dept.overdueCases}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Overdue</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span>Avg Resolution Time: <strong className="text-slate-900">{dept.avgResolutionHours} Hours</strong></span>
              <span>Budget Utilized: <strong className="text-blue-600">{dept.budgetUtilized}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
