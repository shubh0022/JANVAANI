import React from 'react';
import { ProblemTimelineItem } from '@/lib/types';
import { CheckCircle2, Clock, Circle, ArrowRight } from 'lucide-react';

interface ProblemTimelineProps {
  timeline: ProblemTimelineItem[];
  currentStatus?: string;
}

const LIFECYCLE_STEPS = [
  { id: '1', name: 'Voice', icon: '🎙️' },
  { id: '2', name: 'Problem', icon: '📝' },
  { id: '3', name: 'Evidence', icon: '📷' },
  { id: '4', name: 'Validation', icon: '👥' },
  { id: '5', name: 'AI Intel', icon: '🧠' },
  { id: '6', name: 'Solution', icon: '💡' },
  { id: '7', name: 'Action', icon: '🚜' },
  { id: '8', name: 'Verification', icon: '✅' },
  { id: '9', name: 'Reward', icon: '🏆' },
];

export function ProblemTimeline({ timeline }: ProblemTimelineProps) {
  return (
    <div className="space-y-6">
      {/* Visual Product Formula Strip */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
            JanVaani 9-Step Civic Resolution Loop
          </span>
          <span className="text-[11px] text-slate-400">Live Stage Tracker</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
          {LIFECYCLE_STEPS.map((step, idx) => {
            const isCompleted = idx < (timeline.length || 3);
            const isCurrent = idx === Math.min(timeline.length, 6);

            return (
              <div
                key={step.id}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                  isCompleted
                    ? 'bg-blue-600/30 border-blue-500/50 text-blue-200'
                    : isCurrent
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/40 animate-pulse'
                    : 'bg-slate-800/60 border-slate-700/50 text-slate-500'
                }`}
              >
                <span className="text-sm mb-1">{step.icon}</span>
                <span className="text-[11px] font-semibold tracking-tight">{step.name}</span>
                <span className="text-[9px] mt-0.5 opacity-80">
                  {isCompleted ? '✓ Done' : isCurrent ? 'Active' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Action Steps List */}
      <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {timeline.map((item, idx) => {
          const isDone = item.status === 'completed';
          const isCurrent = item.status === 'current';

          return (
            <div key={idx} className="relative group">
              {/* Step indicator dot */}
              <div
                className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 bg-white ${
                  isDone
                    ? 'border-blue-600 text-blue-600'
                    : isCurrent
                    ? 'border-amber-500 text-amber-500 ring-4 ring-amber-100'
                    : 'border-slate-300 text-slate-300'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 fill-blue-600 text-white" />
                ) : isCurrent ? (
                  <Clock className="w-3.5 h-3.5 animate-spin text-amber-600" />
                ) : (
                  <Circle className="w-2.5 h-2.5" />
                )}
              </div>

              <div className="bg-slate-50 hover:bg-slate-100/80 rounded-xl p-3.5 border border-slate-200/80 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-bold text-slate-900">{item.label}</span>
                  <span className="text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-1.5">{item.details}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-blue-700 font-medium">
                  <span>Actor:</span>
                  <span className="bg-blue-50 px-2 py-0.5 rounded text-blue-800 border border-blue-200">
                    {item.actor}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
