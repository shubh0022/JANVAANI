'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, PhoneCall, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function SafetyCenterPage() {
  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 space-y-8">
      <div className="bg-gradient-to-r from-red-950 via-rose-900 to-red-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4 border border-red-800/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-200 text-xs font-bold border border-red-400/30">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <span>Life-Safety Emergency Guidelines</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          Emergency Response & Safety Center
        </h1>
        <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
          JanVaani is designed for civic and public infrastructure problems (drainage, roads, sanitation, electricity). For life-threatening emergencies, immediately dial national emergency services.
        </p>

        {/* Emergency Hotline Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-red-200 uppercase font-bold block">National Emergency</span>
            <span className="text-xl font-black text-white font-mono">112</span>
          </div>
          <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-red-200 uppercase font-bold block">Ambulance</span>
            <span className="text-xl font-black text-white font-mono">108</span>
          </div>
          <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-red-200 uppercase font-bold block">Fire Department</span>
            <span className="text-xl font-black text-white font-mono">101</span>
          </div>
          <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-red-200 uppercase font-bold block">Women Helpline</span>
            <span className="text-xl font-black text-white font-mono">1091</span>
          </div>
        </div>
      </div>
    </div>
  );
}
