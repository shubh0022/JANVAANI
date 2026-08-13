'use client';

import React from 'react';
import Link from 'next/link';
import {
  Code2,
  ArrowLeft,
  ExternalLink,
  Layers,
  Database,
  ShieldCheck,
  Server,
  MapPin,
  Cpu,
  Lock,
} from 'lucide-react';

const OPEN_SOURCE_STACK = [
  {
    category: 'Frontend & UI Framework',
    items: [
      {
        name: 'Next.js 14 (App Router)',
        repo: 'https://github.com/vercel/next.js',
        license: 'MIT',
        purpose: 'Server-side rendering, API routes, edge middleware, and modular layout architecture.',
      },
      {
        name: 'React 18 & TypeScript',
        repo: 'https://github.com/facebook/react',
        license: 'MIT',
        purpose: 'Type-safe reactive component tree and immutable state management.',
      },
      {
        name: 'Tailwind CSS',
        repo: 'https://github.com/tailwindlabs/tailwindcss',
        license: 'MIT',
        purpose: 'Design system tokens, responsive utilities, and fluid modern layouts.',
      },
      {
        name: 'Lucide Icons',
        repo: 'https://github.com/lucide-icons/lucide',
        license: 'ISC',
        purpose: 'Consistent, accessible SVG icon system across all civic dashboards.',
      },
    ],
  },
  {
    category: 'Geospatial & Mapping (GIS)',
    items: [
      {
        name: 'Leaflet & MapLibre GL Ecosystem',
        repo: 'https://github.com/Leaflet/Leaflet',
        license: 'BSD-2-Clause',
        purpose: 'High-definition raster & vector map tile rendering with custom HTML pins and multi-layer HUD overlays.',
      },
      {
        name: 'OpenStreetMap (OSM) & Overpass',
        repo: 'https://www.openstreetmap.org',
        license: 'Open Database License (ODbL) 1.0',
        purpose: 'All-India administrative boundaries, roads, wards, and spatial feature datasets.',
      },
      {
        name: 'PostGIS & GeoJSON',
        repo: 'https://github.com/postgis/postgis',
        license: 'GPLv2',
        purpose: 'Spatial indexing (R-Tree), proximity calculations, bounding box searches, and polygon containment.',
      },
    ],
  },
  {
    category: 'Open Government Data & Protocols',
    items: [
      {
        name: 'Open Government Data Platform India (data.gov.in)',
        repo: 'https://data.gov.in',
        license: 'Open Government Data License (OGDL) - India',
        purpose: 'Official baseline datasets: CPCB Air Quality, MoRTH Highway Statistics, Swachh Bharat Urban, and Jal Shakti Groundwater assessments.',
      },
      {
        name: 'Office of the Registrar General (Census of India)',
        repo: 'https://censusindia.gov.in',
        license: 'OGDL-India',
        purpose: 'Official 2011 Primary Census Abstract demographic aggregates.',
      },
    ],
  },
  {
    category: 'Security, Privacy & Cryptography',
    items: [
      {
        name: 'WebAuthn / FIDO2 Standard',
        repo: 'https://www.w3.org/TR/webauthn-2/',
        license: 'W3C Open Standard',
        purpose: 'Hardware-backed biometric resident login with zero password storage.',
      },
      {
        name: 'Differential Privacy Engine',
        repo: 'https://github.com/google/differential-privacy',
        license: 'Apache 2.0',
        purpose: '500m Gaussian/Laplacian noise fuzzing on public export coordinates to protect citizen homes.',
      },
    ],
  },
];

export default function TechnologyStackPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/about"
          className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-950">
              Open-Source Technology Stack &amp; Attribution
            </h1>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              FOSS First
            </span>
          </div>
          <p className="text-xs text-slate-500">
            JanVaani is built upon world-class open-source software, open standards, and official Indian public data licenses.
          </p>
        </div>
      </div>

      {/* Tech Categories */}
      <div className="space-y-6">
        {OPEN_SOURCE_STACK.map((group, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4"
          >
            <h2 className="text-base font-black text-slate-950 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-600" />
              <span>{group.category}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.items.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-black text-slate-900">{item.name}</h3>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                        {item.license}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.purpose}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60">
                    <a
                      href={item.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>View Repository &amp; License</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
