'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, AlertTriangle, Users, Building2, Sparkles } from 'lucide-react';

export default function TrustCenterPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Platform Integrity Standards</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          The JanVaani Epistemic Trust Framework
        </h1>
        <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl leading-relaxed">
          JanVaani is built to prevent unverified allegations or social media trials. We enforce strict boundaries between what citizens claim, what communities confirm, what AI infers, and what authorities verify.
        </p>
      </div>

      <div className="space-y-4">
        {[
          { title: '1. Citizen Claim', desc: 'The subjective voice and observation reported by an individual citizen.' },
          { title: '2. Community Evidence', desc: 'Independently confirmed photos, videos, and "I face this too" endorsements from nearby residents.' },
          { title: '3. Platform Analysis', desc: 'Multi-modal AI classifications, duplicate clusters, and urgency scoring (clearly marked as statistical inferences).' },
          { title: '4. Expert Opinion', desc: 'Technical feasibility and risk stress-testing by verified chartered civil & urban planners.' },
          { title: '5. Official Authority Response', desc: 'Official remarks, work orders, and SLA commitments by authorized municipal officers.' },
          { title: '6. Verified Ground Outcome', desc: 'Post-intervention photographic evidence verified through decentralized citizen voting.' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0">
              {i + 1}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
