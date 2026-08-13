'use client';

import React from 'react';
import Link from 'next/link';
import { Award, CheckCircle2, ShieldCheck, ArrowRight, MessageSquare, Lightbulb } from 'lucide-react';

const EXPERTS_LIST = [
  {
    id: 'exp_01',
    name: 'Dr. Vikram Shah',
    title: 'Senior Urban Infrastructure Planner & Hydrologist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    experience: '18+ Years (IIT Roorkee Alumni)',
    location: 'Mumbai & Vadodara',
    solutionsCount: 14,
    reviewsCount: 82,
    specialization: 'Stormwater Hydraulics & Pre-cast Drainage',
  },
  {
    id: 'exp_02',
    name: 'Er. Rohan Mehta',
    title: 'Chartered Civil & Highway Engineer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    experience: '12+ Years (Ex-L&T Urban Infra)',
    location: 'Ahmedabad, Gujarat',
    solutionsCount: 9,
    reviewsCount: 54,
    specialization: 'Pavement Design & Asphalt Durability',
  },
  {
    id: 'exp_03',
    name: 'Dr. Suniti Deshmukh',
    title: 'Public Health Epidemiologist & Vector Biologist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    experience: '15+ Years (ICMR Consultant)',
    location: 'Pune, Maharashtra',
    solutionsCount: 8,
    reviewsCount: 47,
    specialization: 'Urban Vector Control & Sanitation Sanitation',
  },
];

export default function ExpertsNetworkPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Verified Civic Expert Network
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Chartered engineers, urban planners, hydrologists, and environmental scientists reviewing citizen problem statements.
          </p>
        </div>

        <Link
          href="/auth/signup"
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md transition-all"
        >
          Apply as Verified Expert
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXPERTS_LIST.map((expert) => (
          <div key={expert.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src={expert.avatar} alt={expert.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-black text-slate-950">{expert.name}</h3>
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-xs text-purple-700 font-semibold">{expert.experience}</p>
                  <p className="text-[11px] text-slate-400">{expert.location}</p>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                {expert.title}
              </p>

              <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-100 text-xs">
                <span className="text-[10px] uppercase font-bold text-purple-800 block">Core Specialization</span>
                <span className="font-semibold text-slate-900">{expert.specialization}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{expert.solutionsCount} Solutions Submitted</span>
              <span className="font-bold text-purple-700">{expert.reviewsCount} KillCritic Audits</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
