'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Eye } from 'lucide-react';

const QUEUE_ITEMS = [
  {
    id: 'MOD-101',
    type: 'Spam Duplicate Check',
    caseId: 'JV-2026-002105',
    title: 'Duplicate garbage report from same IP within 5 minutes',
    reporter: 'Anonymous User',
    riskScore: 68,
    action: 'Auto-clustered into parent report #JV-2026-002105',
  },
  {
    id: 'MOD-102',
    type: 'AI Evidence Tamper Flag',
    caseId: 'JV-2026-002099',
    title: 'Pothole image matched known stock photo online',
    reporter: 'New Account (0 pts)',
    riskScore: 92,
    action: 'Flagged for human reviewer review. Reward points blocked.',
  },
];

export default function ModerationCenterPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center gap-3">
        <Link href="/admin" className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-950">Moderation & Evidence Integrity Queue</h1>
          <p className="text-xs text-slate-500">Prevent spam, fraudulent points farming, manipulated images, and unverified allegations.</p>
        </div>
      </div>

      <div className="space-y-4">
        {QUEUE_ITEMS.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {item.id}
                </span>
                <span className="text-xs font-bold text-slate-900">{item.type}</span>
              </div>
              <span className="text-xs font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-xl border border-rose-200 self-start sm:self-auto">
                Risk Score: {item.riskScore} / 100
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Reporter: {item.reporter} • Linked Case: {item.caseId}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700">
              <strong className="text-slate-900">Recommended Action:</strong> {item.action}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs">
                Dismiss Flag
              </button>
              <button className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs">
                Enforce Penalty & Block Points
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
