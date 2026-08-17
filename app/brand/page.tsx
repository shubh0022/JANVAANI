'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  JanVaaniLogo,
  JanVaaniSymbol,
  LogoColorMode,
  LogoVariant,
} from '@/components/ui/JanVaaniLogo';
import {
  Sparkles,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Award,
  Smartphone,
  Layers,
  Palette,
  Type,
  Grid,
  FileText,
  Building2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

const BRAND_COLORS = [
  {
    name: 'Civic Blue',
    role: 'Primary Brand Color',
    hex: '#0066FF',
    rgb: '0, 102, 255',
    hsl: '216°, 100%, 50%',
    usage: 'Dominant identity, UI primary buttons, active links, primary symbol ring arc, microphone icon.',
    bg: 'bg-[#0066FF]',
    text: 'text-white',
  },
  {
    name: 'Deep Navy',
    role: 'Brand Base & Primary Typography',
    hex: '#0A1F44',
    rgb: '10, 31, 68',
    hsl: '218°, 74%, 15%',
    usage: 'Wordmark "Jan", primary headings, dark surfaces, official documentation typography.',
    bg: 'bg-[#0A1F44]',
    text: 'text-white',
  },
  {
    name: 'Growth Green',
    role: 'Community & Resolution Accent',
    hex: '#16A34A',
    rgb: '22, 163, 74',
    hsl: '142°, 76%, 36%',
    usage: 'Speech-tail section of symbol, "Share." tagline word, resolved status, verified badges.',
    bg: 'bg-[#16A34A]',
    text: 'text-white',
  },
  {
    name: 'Action Orange',
    role: 'Action & Energy Accent',
    hex: '#FF7A00',
    rgb: '255, 122, 0',
    hsl: '29°, 100%, 50%',
    usage: 'Symbol right-side accent arc, dot over "i", "Solve." tagline word, urgent actions.',
    bg: 'bg-[#FF7A00]',
    text: 'text-slate-950',
  },
  {
    name: 'Intelligence Purple',
    role: 'AI & Research Accent',
    hex: '#8B5CF6',
    rgb: '139, 92, 246',
    hsl: '258°, 90%, 66%',
    usage: 'Reserved exclusively for "Reward.", AI Multi-Modal Triage, KillCritic, and Research Lab.',
    bg: 'bg-[#8B5CF6]',
    text: 'text-white',
  },
  {
    name: 'Light Background',
    role: 'Canvas & Surface Background',
    hex: '#F8FAFC',
    rgb: '248, 250, 252',
    hsl: '210°, 40%, 98%',
    usage: 'Default page surface, subtle cards, spacious civic background.',
    bg: 'bg-[#F8FAFC]',
    text: 'text-slate-900 border border-slate-300',
  },
];

export default function BrandIdentityPage() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(id);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 space-y-16">
      {/* 01. Brand Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 shadow-xs">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Official Visual Identity System & Design Guidelines</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
          JanVaani Brand Identity System
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          The comprehensive design standards, vector logo lockups, color tokens, clear-space geometry, and typography specifications for India&apos;s National Citizen Problem & Solution Intelligence Platform.
        </p>
      </div>

      {/* 02. PRIMARY LOGO HERO SHOWCASE */}
      <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
              Official Master Lockup
            </span>
            <h2 className="text-xl font-black text-slate-950 mt-1">
              Primary Horizontal Logo
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Default light surface reproduction</span>
        </div>

        {/* Master Logo Canvas */}
        <div className="p-8 sm:p-14 bg-gradient-to-b from-white to-slate-50/50 rounded-2xl border border-slate-200/80 flex items-center justify-center min-h-[220px]">
          <JanVaaniLogo size="2xl" showTagline={true} showSecondaryLine={true} />
        </div>

        {/* Breakdown of elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1">
            <span className="font-bold text-blue-900 uppercase text-[10px] block">1. The Symbol</span>
            <p className="text-slate-700">
              Microphone inside circular speech-bubble with green tail and orange action arc.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-900 uppercase text-[10px] block">2. The Wordmark</span>
            <p className="text-slate-700">
              &ldquo;Jan&rdquo; in Deep Navy (`#0A1F44`) + &ldquo;Vaani&rdquo; in Civic Blue (`#0066FF`) with Orange dot accent.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1">
            <span className="font-bold text-purple-900 uppercase text-[10px] block">3. The 4-Pillar Tagline</span>
            <p className="text-slate-700 font-semibold">
              <span className="text-[#0066FF]">Speak.</span> <span className="text-[#16A34A]">Share.</span> <span className="text-[#FF7A00]">Solve.</span> <span className="text-[#8B5CF6]">Reward.</span>
            </p>
          </div>
        </div>
      </div>

      {/* 03. LOGO SUITE BOARD (ALL CONTROLLED VARIATIONS) */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            Complete Controlled Logo Suite
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Precision variations designed for all digital, dark mode, print, and compact UI contexts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Var A: Dark Mode Master */}
          <div className="bg-[#0A1F44] rounded-3xl p-8 text-white space-y-4 shadow-xl border border-blue-950 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 bg-white/10 px-2 py-0.5 rounded">
                Variation A • Dark Background
              </span>
              <div className="py-8 flex items-center justify-center">
                <JanVaaniLogo size="xl" colorMode="dark" showTagline={true} />
              </div>
            </div>
            <p className="text-xs text-slate-300 border-t border-white/10 pt-3">
              Optimized for dark mode mobile interfaces, nighttime command center dashboards, and black backgrounds.
            </p>
          </div>

          {/* Var B: Stacked Vertical Logo */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Variation B • Stacked Vertical
              </span>
              <div className="py-6 flex items-center justify-center">
                <JanVaaniLogo variant="stacked" size="lg" showTagline={true} showSecondaryLine={true} />
              </div>
            </div>
            <p className="text-xs text-slate-500 border-t border-slate-100 pt-3">
              Designed for square posters, certificates, splash screens, and center-aligned document covers.
            </p>
          </div>

          {/* Var C: Deep Navy Monochrome */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Variation C • Deep Navy Monochrome
              </span>
              <div className="py-8 flex items-center justify-center">
                <JanVaaniLogo size="lg" colorMode="navy" showTagline={true} />
              </div>
            </div>
            <p className="text-xs text-slate-500 border-t border-slate-100 pt-3">
              Single-color navy lockup for single-plate spot printing, newspaper publications, and formal memos.
            </p>
          </div>

          {/* Var D: White Reversed Monochrome */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-4 shadow-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                Variation D • White Reversed
              </span>
              <div className="py-8 flex items-center justify-center">
                <JanVaaniLogo size="lg" colorMode="white" showTagline={true} />
              </div>
            </div>
            <p className="text-xs text-slate-400 border-t border-white/10 pt-3">
              Pure 100% white knockout for dark imagery, photography overlays, and merchandise embroidery.
            </p>
          </div>
        </div>
      </div>

      {/* 04. SUBMARK & ICON SYSTEM */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            Official Submark & App Icon System
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            The standalone microphone + speech bubble symbol maintains instant recognition down to 16×16 px.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
          {/* Full Color Submark */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-between gap-3">
            <JanVaaniSymbol colorMode="full" size={54} />
            <span className="text-[10px] font-bold text-slate-700">Full Color Symbol (Preferred)</span>
          </div>

          {/* Dark Mode */}
          <div className="p-4 rounded-2xl bg-[#0A1F44] border border-slate-800 text-white flex flex-col items-center justify-between gap-3">
            <JanVaaniSymbol colorMode="dark" size={54} />
            <span className="text-[10px] font-bold text-slate-200">Dark Mode</span>
          </div>

          {/* Blue Monochrome */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col items-center justify-between gap-3">
            <JanVaaniSymbol colorMode="full" size={54} />
            <span className="text-[10px] font-bold text-blue-700">Civic Blue</span>
          </div>

          {/* Navy Monochrome */}
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-between gap-3">
            <JanVaaniSymbol colorMode="navy" size={54} />
            <span className="text-[10px] font-bold text-[#0A1F44]">Navy Mono</span>
          </div>

          {/* White Mono */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-white flex flex-col items-center justify-between gap-3">
            <JanVaaniSymbol colorMode="white" size={54} />
            <span className="text-[10px] font-bold text-white">White Mono</span>
          </div>

          {/* Black Mono */}
          <div className="p-4 rounded-2xl bg-white border border-slate-300 flex flex-col items-center justify-between gap-3">
            <JanVaaniSymbol colorMode="black" size={54} />
            <span className="text-[10px] font-bold text-black">Black Mono</span>
          </div>

          {/* iOS / Android App Icon Container */}
          <div className="p-4 rounded-2xl bg-gradient-to-tr from-slate-900 to-blue-950 border border-slate-800 text-white flex flex-col items-center justify-between gap-3 shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg">
              <JanVaaniSymbol colorMode="full" size={40} />
            </div>
            <span className="text-[10px] font-bold text-slate-200">App Icon Tile</span>
          </div>
        </div>
      </div>

      {/* 05. BRAND COLOR PALETTE SPECIFICATION */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            Restrained Civic Brand Color Palette
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Semantic tokens calibrated for maximum contrast, WCAG 2.1 AAA accessibility, and trustworthy public authority.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRAND_COLORS.map((color) => (
            <div
              key={color.hex}
              className="rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-xs flex flex-col justify-between"
            >
              <div className={`h-24 ${color.bg} p-4 flex items-start justify-between ${color.text}`}>
                <span className="font-mono font-bold text-xs uppercase tracking-wider">{color.name}</span>
                <button
                  onClick={() => copyToClipboard(color.hex, color.hex)}
                  className="bg-black/20 hover:bg-black/30 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-mono flex items-center gap-1"
                >
                  {copiedHex === color.hex ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{color.hex}</span>
                </button>
              </div>

              <div className="p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono text-[11px] text-slate-500 border-b border-slate-100 pb-2">
                  <span>RGB: {color.rgb}</span>
                  <span>HSL: {color.hsl}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Role & Placement</span>
                  <p className="text-slate-700 font-medium">{color.role}</p>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">{color.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 06. SYMBOLISM & MEANING MATRIX */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
            Semantic Symbolism
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Why Every Geometric Element Exists
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-blue-300 font-black uppercase text-[10px]">🎙️ Microphone</span>
            <div className="font-bold text-white text-sm">Citizen Voice</div>
            <p className="text-slate-300 leading-relaxed">
              Every citizen has an inherent voice to speak about ground reality in their native tongue.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-sky-300 font-black uppercase text-[10px]">⭕ Circular Ring</span>
            <div className="font-bold text-white text-sm">Unity & Community</div>
            <p className="text-slate-300 leading-relaxed">
              Continuous collective action, neighborhood togetherness, and unbroken civic collaboration.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-emerald-300 font-black uppercase text-[10px]">💬 Speech Tail</span>
            <div className="font-bold text-white text-sm">Public Dialogue</div>
            <p className="text-slate-300 leading-relaxed">
              Transforming private complaints into open, verifiable, transparent public dialogue.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-emerald-400 font-black uppercase text-[10px]">🌿 Green Section</span>
            <div className="font-bold text-white text-sm">Growth & Hope</div>
            <p className="text-slate-300 leading-relaxed">
              Positive resolution, verified outcomes, community building, and measurable progress.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-400 font-black uppercase text-[10px]">
            <span>⚡ Orange Segment & Dot</span>
            <div className="font-bold text-white text-sm mt-1">Action & Energy</div>
            <p className="text-slate-300 leading-relaxed">
              Urgency, authority mobilization, engineering action, and solution implementation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-400 font-black uppercase text-[10px]">
            <span>🔷 Civic Blue</span>
            <div className="font-bold text-white text-sm mt-1">Trust & Technology</div>
            <p className="text-slate-300 leading-relaxed">
              Institutional integrity, AI reliability, spatial precision, and democratic governance.
            </p>
          </div>
        </div>
      </div>

      {/* 07. CLEAR SPACE & MINIMUM SIZE RULES */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            Clear Space & Minimum Size Specifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Guarantees readability and prevents visual crowding across small digital viewports and massive signage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Grid className="w-4 h-4 text-blue-600" />
              <span>Clear Space Formula (X-Rule)</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              The minimum clear space surrounding the master logo lockup equals <strong>X = 0.5 × Microphone Height</strong> (approx 16px). No typography, boundary borders, or external graphics may intrude into this exclusion zone.
            </p>
            <div className="p-4 bg-white rounded-xl border border-dashed border-blue-400 text-center font-mono text-[11px] text-blue-600 font-bold">
              [ 16px Clear Space Exclusion Zone ]
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Minimum Size Thresholds</span>
            </h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center justify-between border-b border-slate-200 pb-1">
                <span>Primary Horizontal Logo (Digital)</span>
                <strong className="font-mono text-slate-900">120 px width (24 px height)</strong>
              </li>
              <li className="flex items-center justify-between border-b border-slate-200 pb-1">
                <span>Stacked Vertical Logo (Digital)</span>
                <strong className="font-mono text-slate-900">80 px width (96 px height)</strong>
              </li>
              <li className="flex items-center justify-between border-b border-slate-200 pb-1">
                <span>Standalone Submark Icon</span>
                <strong className="font-mono text-slate-900">16 × 16 px (Favicon)</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Print Minimum (Any Lockup)</span>
                <strong className="font-mono text-slate-900">0.75 in / 20 mm width</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
