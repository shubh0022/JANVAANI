'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ALL_REPRESENTATIVES,
  Representative,
  RepresentativeLevel,
  getWardLeadership,
} from '@/lib/political-directory';
import {
  Building2,
  ArrowLeft,
  Search,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Award,
  ExternalLink,
  Filter,
  UserCheck,
  Landmark,
  Share2,
  FileText,
  DollarSign,
  Briefcase,
  Layers,
  ChevronDown,
} from 'lucide-react';

export default function RepresentativesDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('Gujarat');
  const [selectedDistrict, setSelectedDistrict] = useState('Vadodara');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedWardFilter, setSelectedWardFilter] = useState('Ward 07');

  // Contact Modal State
  const [activeContactModal, setActiveContactModal] = useState<Representative | null>(null);

  // Filter representatives
  const filteredReps = useMemo(() => {
    return ALL_REPRESENTATIVES.filter((rep) => {
      if (selectedState !== 'all' && rep.state !== selectedState) return false;
      if (selectedDistrict !== 'all' && rep.district !== selectedDistrict) return false;
      if (selectedLevel !== 'all' && rep.level !== selectedLevel) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        rep.name.toLowerCase().includes(q) ||
        rep.role.toLowerCase().includes(q) ||
        rep.constituencyOrWard.toLowerCase().includes(q) ||
        (rep.party && rep.party.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedState, selectedDistrict, selectedLevel]);

  // Composite 4-Tier Leadership for Selected Ward
  const wardLeadership = useMemo(() => {
    return getWardLeadership(selectedWardFilter);
  }, [selectedWardFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/government"
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-950">
                Elected Representatives &amp; Executive Officers Radar
              </h1>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                Open Civic Data
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Transparent contacts, office locations, LAD fund utilization, and SLA scorecards for Corporators, MLAs, MPs &amp; IAS Officers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/government/wards"
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-xs"
          >
            Ward GIS Intel →
          </Link>
        </div>
      </div>

      {/* 4-Tier Chain of Command for Active Ward */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-300">
                Ward Governance Chain of Command
              </div>
              <div className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{wardLeadership.wardNumber} ({wardLeadership.wardName})</span>
                <span className="text-xs text-slate-400 font-medium">• {wardLeadership.district}, {wardLeadership.state}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Switch Ward:</span>
            <select
              value={selectedWardFilter}
              onChange={(e) => setSelectedWardFilter(e.target.value)}
              className="bg-white/10 text-white font-bold px-3 py-1.5 rounded-xl border border-white/20 outline-none cursor-pointer"
            >
              <option value="Ward 07" className="bg-slate-900 text-white">Ward 7 (Karelibaug)</option>
              <option value="Ward 04" className="bg-slate-900 text-white">Ward 4 (Sayajigunj)</option>
              <option value="Ward 09" className="bg-slate-900 text-white">Ward 9 (Akota)</option>
              <option value="Ward 12" className="bg-slate-900 text-white">Ward 12 (Manjalpur)</option>
              <option value="Ward 15" className="bg-slate-900 text-white">Ward 15 (Alkapuri)</option>
            </select>
          </div>
        </div>

        {/* 4-Tier Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Level 1: Municipal Corporator */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div>
              <div className="flex items-center justify-between text-[10px] uppercase font-bold text-blue-300">
                <span>1. Municipal Corporator</span>
                <span className="text-emerald-400">Local ULB</span>
              </div>
              <div className="flex items-center gap-2.5 mt-2">
                <img
                  src={wardLeadership.corporator.avatar}
                  alt={wardLeadership.corporator.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <div>
                  <div className="text-xs font-black text-white">{wardLeadership.corporator.name}</div>
                  <div className="text-[10px] text-slate-300">{wardLeadership.corporator.party}</div>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-2 line-clamp-1">
                📍 {wardLeadership.corporator.officeAddress}
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <a
                href={`tel:${wardLeadership.corporator.contactPhone}`}
                className="text-[11px] font-bold text-blue-300 hover:text-white flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>Call Office</span>
              </a>
              <a
                href={`https://wa.me/${wardLeadership.corporator.whatsappHelpline.replace(/[^0-9]/g, '')}?text=Namaste%20Hon'ble%20Corporator,%20I%20have%20a%20ward%20civic%20grievance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Level 2: Ward Executive Engineer */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div>
              <div className="flex items-center justify-between text-[10px] uppercase font-bold text-emerald-300">
                <span>2. Ward Executive Engineer</span>
                <span className="text-emerald-400">Bureaucracy</span>
              </div>
              <div className="flex items-center gap-2.5 mt-2">
                <img
                  src={wardLeadership.wardEngineer.avatar}
                  alt={wardLeadership.wardEngineer.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <div>
                  <div className="text-xs font-black text-white">{wardLeadership.wardEngineer.name}</div>
                  <div className="text-[10px] text-slate-300">VMC Engineering Division</div>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-2 line-clamp-1">
                📍 {wardLeadership.wardEngineer.officeAddress}
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <a
                href={`tel:${wardLeadership.wardEngineer.contactPhone}`}
                className="text-[11px] font-bold text-blue-300 hover:text-white flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>Call Dept</span>
              </a>
              <a
                href={`mailto:${wardLeadership.wardEngineer.officialEmail}`}
                className="text-[11px] font-bold text-indigo-300 hover:text-white flex items-center gap-1"
              >
                <Mail className="w-3 h-3" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Level 3: Member of Legislative Assembly (MLA) */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div>
              <div className="flex items-center justify-between text-[10px] uppercase font-bold text-amber-300">
                <span>3. MLA (Vidhan Sabha)</span>
                <span className="text-amber-400">State Govt</span>
              </div>
              <div className="flex items-center gap-2.5 mt-2">
                <img
                  src={wardLeadership.mla.avatar}
                  alt={wardLeadership.mla.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <div>
                  <div className="text-xs font-black text-white">{wardLeadership.mla.name}</div>
                  <div className="text-[10px] text-slate-300">{wardLeadership.mla.constituencyOrWard}</div>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-2 line-clamp-1">
                💰 MLA-LAD Fund Spent: ₹{wardLeadership.mla.ladFundUtilizedCr} Cr ({wardLeadership.mla.ladFundUtilizationPercent}%)
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <a
                href={`tel:${wardLeadership.mla.contactPhone}`}
                className="text-[11px] font-bold text-blue-300 hover:text-white flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>Call MLA Office</span>
              </a>
              <a
                href={`https://wa.me/${wardLeadership.mla.whatsappHelpline.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Level 4: Member of Parliament (MP) */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div>
              <div className="flex items-center justify-between text-[10px] uppercase font-bold text-purple-300">
                <span>4. MP (Lok Sabha)</span>
                <span className="text-purple-400">National</span>
              </div>
              <div className="flex items-center gap-2.5 mt-2">
                <img
                  src={wardLeadership.mp.avatar}
                  alt={wardLeadership.mp.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <div>
                  <div className="text-xs font-black text-white">{wardLeadership.mp.name}</div>
                  <div className="text-[10px] text-slate-300">{wardLeadership.mp.constituencyOrWard}</div>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-2 line-clamp-1">
                💰 MPLADS Utilized: ₹{wardLeadership.mp.ladFundUtilizedCr} Cr ({wardLeadership.mp.ladFundUtilizationPercent}%)
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <a
                href={`tel:${wardLeadership.mp.contactPhone}`}
                className="text-[11px] font-bold text-blue-300 hover:text-white flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>Call MP Desk</span>
              </a>
              <a
                href={`mailto:${wardLeadership.mp.officialEmail}`}
                className="text-[11px] font-bold text-indigo-300 hover:text-white flex items-center gap-1"
              >
                <Mail className="w-3 h-3" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Corporator, MLA, MP, IAS officer name, constituency..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Cascading State & District Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none cursor-pointer"
            >
              <option value="Gujarat">State: Gujarat</option>
              <option value="Maharashtra">State: Maharashtra</option>
              <option value="Karnataka">State: Karnataka</option>
              <option value="Delhi">State: Delhi NCR</option>
              <option value="all">All India (States &amp; UTs)</option>
            </select>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none cursor-pointer"
            >
              <option value="Vadodara">District: Vadodara</option>
              <option value="Ahmedabad">District: Ahmedabad</option>
              <option value="Surat">District: Surat</option>
              <option value="Rajkot">District: Rajkot</option>
              <option value="Mumbai">District: Mumbai</option>
              <option value="Bengaluru Urban">District: Bengaluru</option>
              <option value="all">All Districts</option>
            </select>
          </div>
        </div>

        {/* Level Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: `All Public Officials (${filteredReps.length})` },
            { id: 'corporator', label: 'Municipal Corporators & Wards' },
            { id: 'mla', label: 'MLAs (State Assembly)' },
            { id: 'mp', label: 'MPs (Lok Sabha / Rajya Sabha)' },
            { id: 'officer', label: 'Executive Officers (IAS / IPS / Engineers)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedLevel(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedLevel === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Representatives Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReps.map((rep) => (
          <div
            key={rep.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
          >
            {/* Top Profile Header */}
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rep.avatar}
                    alt={rep.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm sm:text-base font-black text-slate-950">
                        {rep.name}
                      </h3>
                      {rep.partySymbol && <span>{rep.partySymbol}</span>}
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 block leading-tight">
                      {rep.role}
                    </span>
                    {rep.party && (
                      <span className="text-[10px] text-slate-400 font-medium">
                        {rep.party}
                      </span>
                    )}
                  </div>
                </div>

                <span
                  className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    rep.level === 'mp'
                      ? 'bg-purple-100 text-purple-800'
                      : rep.level === 'mla'
                      ? 'bg-amber-100 text-amber-800'
                      : rep.level === 'corporator'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {rep.level}
                </span>
              </div>

              {/* Jurisdiction Badge */}
              <div className="mt-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                <div className="font-bold text-slate-800 truncate">
                  🏛️ {rep.constituencyOrWard}
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  📍 {rep.officeAddress}
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Public Calling: {rep.publicCallingHours}</span>
                </div>
              </div>

              {/* Accountability & Expose Scorecard */}
              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[9px] font-bold uppercase text-slate-400">SLA Resolved</div>
                  <div className="text-xs font-black text-emerald-600 mt-0.5">
                    {rep.grievancesResolvedRate}%
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[9px] font-bold uppercase text-slate-400">Citizen Rating</div>
                  <div className="text-xs font-black text-amber-600 mt-0.5">
                    ⭐ {rep.citizenRating}
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[9px] font-bold uppercase text-slate-400">Open Backlog</div>
                  <div className="text-xs font-black text-rose-600 mt-0.5">
                    {rep.openGrievanceCount} Cases
                  </div>
                </div>
              </div>

              {/* LAD Fund Transparency if available */}
              {rep.ladFundAllocatedCr && (
                <div className="mt-3 p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                    <span>LAD Fund Spent ({rep.ladFundUtilizationPercent}%)</span>
                    <span className="text-blue-700 font-extrabold">
                      ₹{rep.ladFundUtilizedCr} Cr / ₹{rep.ladFundAllocatedCr} Cr
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${rep.ladFundUtilizationPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Key Initiatives List */}
              <div className="mt-3">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  Key Focus Initiatives
                </span>
                <ul className="text-[11px] text-slate-600 space-y-0.5 list-disc list-inside">
                  {rep.keyInitiatives.slice(0, 2).map((init, i) => (
                    <li key={i} className="truncate">{init}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Contact Action Strip */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <a
                href={`tel:${rep.contactPhone}`}
                className="flex-1 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                title={`Call ${rep.contactPhone}`}
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Call</span>
              </a>

              <a
                href={`https://wa.me/${rep.whatsappHelpline.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(rep.name)},%20I%20am%20a%20citizen%20from%20${encodeURIComponent(rep.constituencyOrWard)}%20reporting%20a%20civic%20grievance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-emerald-200"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`mailto:${rep.officialEmail}?subject=Civic%20Grievance%20via%20JanVaani%20Portal&body=To%20Hon'ble%20${encodeURIComponent(rep.name)},%0A%0AI%20am%20writing%20to%20bring%20to%20your%20notice%20an%20urgent%20civic%20issue%20in%20${encodeURIComponent(rep.constituencyOrWard)}.`}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title={`Email ${rep.officialEmail}`}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
