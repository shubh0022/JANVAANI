import React from 'react';
import { ProblemStatus, Severity } from '@/lib/types';
import { Clock, CheckCircle2, AlertCircle, RefreshCw, Eye, UserCheck, ShieldAlert } from 'lucide-react';

export function StatusBadge({ status }: { status: ProblemStatus }) {
  switch (status) {
    case 'resolved':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Resolved
        </span>
      );
    case 'in_progress':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
          In Progress
        </span>
      );
    case 'investigating':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
          <Eye className="w-3.5 h-3.5" />
          Investigating
        </span>
      );
    case 'assigned':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <UserCheck className="w-3.5 h-3.5" />
          Assigned to Dept
        </span>
      );
    case 'validating':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          <Clock className="w-3.5 h-3.5" />
          Validating
        </span>
      );
    case 'reopened':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          <AlertCircle className="w-3.5 h-3.5" />
          Reopened
        </span>
      );
    case 'submitted':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
          <Clock className="w-3.5 h-3.5" />
          Submitted
        </span>
      );
  }
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  switch (severity) {
    case 'critical':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-red-100 text-red-800 border border-red-300">
          <ShieldAlert className="w-3 h-3 text-red-600" />
          Critical
        </span>
      );
    case 'high':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
          High Priority
        </span>
      );
    case 'medium':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
          Medium
        </span>
      );
    case 'low':
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
          Low
        </span>
      );
  }
}
