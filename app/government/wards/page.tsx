'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { ALL_REPRESENTATIVES } from '@/lib/political-directory';
import {
  Building2,
  ArrowLeft,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Users,
  Phone,
  MessageSquare,
  Mail,
  Award,
  ExternalLink,
  ShieldCheck,
  Landmark,
} from 'lucide-react';

const DETAILED_WARDS = [
  {
    id: 'ward_07',
    number: 'Ward 07',
    name: 'Ward 7 (Karelibaug & VIP Road)',
    zone: 'East Zone',
    corporator: {
      name: 'Shri Manoj Patel',
      party: 'BJP 🪷',
      phone: '+91 98980 12345',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    },
    engineer: {
      name: 'Er. Rajesh K. Patel',
      role: 'Executive Engineer (Civil/Drainage)',
      phone: '+91 265 248 1199',
    },
    mla: {
      name: 'Keyur Rokadiya',
      constituency: 'Sayajigunj (#141)',
      phone: '+91 98795 22334',
    },
    mp: {
      name: 'Dr. Hemang Joshi',
      constituency: 'Vadodara (#20)',
    },
    population: '84,000',
    activeCases: 18,
    resolvedCases: 180,
    slaScore: 92.4,
    hotspot: 'Stormwater Drainage & Waterlogging',
  },
  {
    id: 'ward_04',
    number: 'Ward 04',
    name: 'Ward 4 (Sayajigunj & Station)',
    zone: 'Central Zone',
    corporator: {
      name: 'Smt. Seema K. Dave',
      party: 'BJP 🪷',
      phone: '+91 98254 33221',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    engineer: {
      name: 'Er. B. S. Dave',
      role: 'Executive Engineer (Traffic & Roads)',
      phone: '+91 265 236 4433',
    },
    mla: {
      name: 'Keyur Rokadiya',
      constituency: 'Sayajigunj (#141)',
      phone: '+91 98795 22334',
    },
    mp: {
      name: 'Dr. Hemang Joshi',
      constituency: 'Vadodara (#20)',
    },
    population: '110,000',
    activeCases: 26,
    resolvedCases: 230,
    slaScore: 84.1,
    hotspot: 'Traffic Congestion & Encroachment',
  },
  {
    id: 'ward_09',
    number: 'Ward 09',
    name: 'Ward 9 (Akota & Old Padra Rd)',
    zone: 'West Zone',
    corporator: {
      name: 'Shri Nitin D. Solanki',
      party: 'INC ✋',
      phone: '+91 94265 88990',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    },
    engineer: {
      name: 'Dr. C. P. Solanki',
      role: 'Executive Engineer (Sanitation & Health)',
      phone: '+91 265 238 9911',
    },
    mla: {
      name: 'Chaitanya Desai',
      constituency: 'Akota (#143)',
      phone: '+91 94270 33445',
    },
    mp: {
      name: 'Dr. Hemang Joshi',
      constituency: 'Vadodara (#20)',
    },
    population: '76,000',
    activeCases: 31,
    resolvedCases: 195,
    slaScore: 78.5,
    hotspot: 'Solid Waste & Street Lighting',
  },
  {
    id: 'ward_12',
    number: 'Ward 12',
    name: 'Ward 12 (Manjalpur & GIDC)',
    zone: 'South Zone',
    corporator: {
      name: 'Shri Kalpesh R. Shah',
      party: 'BJP 🪷',
      phone: '+91 98250 11998',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    engineer: {
      name: 'Er. S. K. Verma',
      role: 'Executive Engineer (GIDC Sector)',
      phone: '+91 265 263 2211',
    },
    mla: {
      name: 'Yogesh Patel',
      constituency: 'Manjalpur (#145)',
      phone: '+91 98251 66778',
    },
    mp: {
      name: 'Dr. Hemang Joshi',
      constituency: 'Vadodara (#20)',
    },
    population: '92,000',
    activeCases: 12,
    resolvedCases: 145,
    slaScore: 94.8,
    hotspot: 'Industrial Drainage & Street Lighting',
  },
];

export default function GovernmentWardsPage() {
  return (
    <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/government"
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-950">
                Municipal Ward Intelligence &amp; Political Representation
              </h1>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                19 Wards Active
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Ward-wise municipal corporators, designated engineers, MLAs, MPs, and localized grievance SLAs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/government/representatives"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            Full Representatives Radar →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: GIS Map View */}
        <div className="lg:col-span-7">
          <InteractiveMap height="h-[620px]" initialCity="Vadodara" />
        </div>

        {/* Right: Ward-Level Leadership & SLA Directory */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Ward Administration &amp; Political Officers (Vadodara)
            </h3>
            <span className="text-xs font-bold text-slate-500">
              {DETAILED_WARDS.length} Zonal Wards
            </span>
          </div>

          <div className="space-y-4 max-h-[580px] overflow-y-auto pr-1">
            {DETAILED_WARDS.map((w) => (
              <div
                key={w.id}
                className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card space-y-3.5 hover:shadow-md transition-all"
              >
                {/* Header with Ward Number and SLA */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {w.number}
                      </span>
                      <h4 className="text-sm font-black text-slate-900">{w.name}</h4>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {w.zone} • Population: {w.population}
                    </span>
                  </div>

                  <span
                    className={`font-black text-xs px-2 py-0.5 rounded-lg ${
                      w.slaScore >= 90
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : w.slaScore >= 80
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {w.slaScore}% SLA
                  </span>
                </div>

                {/* Elected Corporator Section */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400">
                    <span>Elected Municipal Corporator</span>
                    <span className="text-blue-600 font-extrabold">{w.corporator.party}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={w.corporator.avatar}
                        alt={w.corporator.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-300"
                      />
                      <div>
                        <div className="text-xs font-black text-slate-900">{w.corporator.name}</div>
                        <div className="text-[10px] text-slate-500">Public Helpline: {w.corporator.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={`tel:${w.corporator.phone}`}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Call Corporator"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`https://wa.me/${w.corporator.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100 transition-colors"
                        title="WhatsApp Corporator"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Administrative & MLA Details Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">
                      Ward Executive Engineer
                    </span>
                    <div className="font-bold text-slate-900 truncate mt-0.5">{w.engineer.name}</div>
                    <div className="text-[10px] text-blue-600 font-medium truncate">{w.engineer.phone}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block">
                      MLA (State Assembly)
                    </span>
                    <div className="font-bold text-slate-900 truncate mt-0.5">{w.mla.name}</div>
                    <div className="text-[10px] text-slate-500 font-medium truncate">{w.mla.constituency}</div>
                  </div>
                </div>

                {/* Hotspot & Resolution Stats */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-amber-800 font-semibold text-[11px] truncate max-w-[200px]">
                    🔥 Hotspot: {w.hotspot}
                  </div>
                  <div className="font-bold text-slate-500 text-[11px]">
                    {w.activeCases} Open • <span className="text-emerald-600">{w.resolvedCases} Solved</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
