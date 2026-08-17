import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Globe, Heart, Award, Sparkles, PhoneCall } from 'lucide-react';
import { JanVaaniLogo } from '@/components/ui/JanVaaniLogo';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      {/* Emergency Notice Ribbon */}
      <div className="bg-gradient-to-r from-red-950 via-rose-900 to-red-950 border-b border-red-800/60 py-3 px-4 sm:px-6">
        <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs">
          <div className="flex items-center gap-2 text-rose-200">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-bold">Life-Safety Emergency Notice:</span>
            <span className="text-rose-100/90">
              JanVaani is a civic problem & intelligence platform and does NOT replace emergency services.
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono font-bold text-white shrink-0">
            <span className="bg-red-800/80 px-2 py-0.5 rounded border border-red-700">Police: 112 / 100</span>
            <span className="bg-red-800/80 px-2 py-0.5 rounded border border-red-700">Ambulance: 108</span>
            <span className="bg-red-800/80 px-2 py-0.5 rounded border border-red-700">Fire: 101</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="inline-block py-1">
              <JanVaaniLogo size="sm" colorMode="dark" showTagline={true} />
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              India&apos;s Citizen Problem & Solution Intelligence Platform. Empowering citizens to report real-world issues, validate with evidence, discover solutions, and collaborate with authorities for transparent resolution.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Civic Network Active Across 28 States & 8 Union Territories</span>
            </div>
          </div>

          {/* Col 1: Discovery */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Discovery & Map
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/explore" className="hover:text-white transition-colors">Explore Feed</Link></li>
              <li><Link href="/problems" className="hover:text-white transition-colors">Problems Directory</Link></li>
              <li><Link href="/map" className="hover:text-white transition-colors">Interactive GIS Map</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">100+ Categories</Link></li>
              <li><Link href="/report" className="hover:text-white transition-colors">Report a Problem</Link></li>
            </ul>
          </div>

          {/* Col 2: Solutions & Intel */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Solutions & AI
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/solutions" className="hover:text-white transition-colors">Solutions Directory</Link></li>
              <li><Link href="/bounties" className="hover:text-white transition-colors">Civic Bounties</Link></li>
              <li><Link href="/intelligence/killcritic" className="hover:text-white transition-colors">KillCritic Red-Team</Link></li>
              <li><Link href="/intelligence/10x" className="hover:text-white transition-colors">10X Think Engine</Link></li>
              <li><Link href="/intelligence/autopsy" className="hover:text-white transition-colors">Problem Autopsy</Link></li>
              <li><Link href="/intelligence/policy" className="hover:text-white transition-colors">Policy Intelligence</Link></li>
            </ul>
          </div>

          {/* Col 3: Government & Research */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Governance & Research
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/government" className="hover:text-white transition-colors">Government Portal</Link></li>
              <li><Link href="/government/departments" className="hover:text-white transition-colors">Department SLA Dashboard</Link></li>
              <li><Link href="/government/wards" className="hover:text-white transition-colors">Ward Level Intelligence</Link></li>
              <li><Link href="/research" className="hover:text-white transition-colors">Research Lab</Link></li>
              <li><Link href="/research/datasets" className="hover:text-white transition-colors">Open Datasets</Link></li>
              <li><Link href="/research/api" className="hover:text-white transition-colors">Research API Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} JanVaani Platform. All rights reserved.</span>
            <Link href="/trust" className="hover:text-slate-300">Trust & Verification</Link>
            <Link href="/safety" className="hover:text-slate-300">Safety Center</Link>
            <Link href="/help" className="hover:text-slate-300">Help Center</Link>
            <Link href="/about" className="hover:text-slate-300">About Us</Link>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span>Built for Citizen Impact</span>
            <span>•</span>
            <span className="text-blue-400 font-semibold">Speak. Share. Solve. Reward.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
