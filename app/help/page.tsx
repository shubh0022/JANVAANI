'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, Search, ChevronDown, MessageSquare, PhoneCall, Mail } from 'lucide-react';

const FAQS = [
  { q: 'How does JanVaani ensure reports are genuine?', a: 'We employ multi-modal AI tamper-checking on photos/audio (checking EXIF GPS metadata and generative artifacts) combined with mandatory local neighborhood endorsements.' },
  { q: 'Can I report without revealing my name to the public?', a: 'Yes. In your profile and reporting settings, you can toggle "Anonymous Citizen" mode while retaining verified trust credentials.' },
  { q: 'How do civic points and rewards work?', a: 'Points are awarded for verified discoveries (+120), evidence submissions (+80), and accepted solutions (+500). Points can unlock civic badges and sponsored challenge bounties.' },
  { q: 'How does a municipal department receive my case?', a: 'JanVaani GIS engine auto-geofences the coordinates to the exact municipal corporation, zonal ward, and department (e.g. Stormwater Drainage vs Streetlight Wing) with active SLA tracking.' },
];

export default function HelpCenterPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Support & Guidance
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Help Center & FAQs
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Learn how to use JanVaani to create positive impact in your neighborhood.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card cursor-pointer space-y-2 transition-all"
          >
            <div className="flex items-center justify-between font-bold text-sm text-slate-900">
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
            </div>
            {openIdx === idx && (
              <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
