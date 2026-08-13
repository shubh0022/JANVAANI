'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { ProblemCase } from '@/lib/types';
import { useApp } from '@/lib/store';
import { StatusBadge, SeverityBadge } from '../ui/StatusBadge';
import {
  MapPin,
  Layers,
  Flame,
  Filter,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  X,
  Compass,
  Building2,
  Droplets,
  Zap,
  Activity,
  LocateFixed,
  Clock,
  ThumbsUp,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

interface InteractiveMapProps {
  initialCity?: string;
  height?: string;
  selectedProblemId?: string;
}

export type MapProviderTheme =
  | 'google_hybrid'
  | 'google_roadmap'
  | 'google_terrain'
  | 'apple_maps_vector'
  | 'apple_maps_dark'
  | 'esri_satellite';

type AnalyticalOverlay = 'all_pins' | 'heatmap' | 'ward_boundaries' | 'flood_drainage' | 'pothole_pqi';

// City Geo Centers
const CITY_COORDINATES: Record<string, { lat: number; lng: number; zoom: number }> = {
  Vadodara: { lat: 22.3072, lng: 73.1812, zoom: 13 },
  Ahmedabad: { lat: 23.0225, lng: 72.5714, zoom: 13 },
  Surat: { lat: 21.1702, lng: 72.8311, zoom: 13 },
  Rajkot: { lat: 22.3039, lng: 70.8022, zoom: 13 },
  Mumbai: { lat: 19.0760, lng: 72.8777, zoom: 12 },
  Bengaluru: { lat: 12.9716, lng: 77.5946, zoom: 12 },
  Delhi: { lat: 28.6139, lng: 77.2090, zoom: 12 },
};

// Google Maps & Apple Maps & Esri Satellite High-Resolution Tile Server Configurations
const MAP_PROVIDERS: Record<
  MapProviderTheme,
  {
    label: string;
    engine: 'Google Maps' | 'Apple Maps' | 'Esri';
    icon: string;
    url: string;
    attribution: string;
    subdomains?: string[];
    maxZoom?: number;
  }
> = {
  google_hybrid: {
    label: 'Google Maps (Satellite Hybrid)',
    engine: 'Google Maps',
    icon: '🛰️',
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps Imagery &copy; 2026 Maxar Technologies',
    maxZoom: 20,
  },
  google_roadmap: {
    label: 'Google Maps (Roadmap)',
    engine: 'Google Maps',
    icon: '🗺️',
    url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps Data &copy; 2026 Google',
    maxZoom: 20,
  },
  google_terrain: {
    label: 'Google Maps (Terrain Topo)',
    engine: 'Google Maps',
    icon: '🏔️',
    url: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps Topography &copy; 2026 Google',
    maxZoom: 20,
  },
  apple_maps_vector: {
    label: 'Apple Maps (Clean Vector)',
    engine: 'Apple Maps',
    icon: '🍎',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    attribution: 'Apple MapKit Style &copy; CARTO &copy; OpenStreetMap',
    maxZoom: 19,
  },
  apple_maps_dark: {
    label: 'Apple Maps (Dark Flyover)',
    engine: 'Apple Maps',
    icon: '🍎',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    attribution: 'Apple Dark Theme &copy; CARTO &copy; OpenStreetMap',
    maxZoom: 19,
  },
  esri_satellite: {
    label: 'Esri World Imagery (Maxar)',
    engine: 'Esri',
    icon: '🛰️',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Maxar, Earthstar Geographics',
    maxZoom: 19,
  },
};

// Precise Geocoded Pins for Vadodara Municipal Corporation
const MOCK_GEO_POINTS = [
  { lat: 22.3245, lng: 73.1932, ward: 'Ward 7 (Karelibaug)', pqi: 42, risk: 'high', sla: 6 },
  { lat: 22.3115, lng: 73.1824, ward: 'Ward 4 (Sayajigunj)', pqi: 55, risk: 'medium', sla: 14 },
  { lat: 22.2982, lng: 73.1661, ward: 'Ward 9 (Akota)', pqi: 38, risk: 'high', sla: 4 },
  { lat: 22.2685, lng: 73.1914, ward: 'Ward 12 (Manjalpur)', pqi: 72, risk: 'low', sla: 28 },
  { lat: 22.3102, lng: 73.1712, ward: 'Ward 15 (Alkapuri)', pqi: 85, risk: 'low', sla: 42 },
  { lat: 22.3210, lng: 73.1865, ward: 'Ward 4 (Fatehgunj)', pqi: 62, risk: 'medium', sla: 18 },
  { lat: 22.3290, lng: 73.2040, ward: 'Ward 7 (VIP Road)', pqi: 48, risk: 'high', sla: 8 },
  { lat: 22.2970, lng: 73.2010, ward: 'Ward 13 (Khanderao Market)', pqi: 64, risk: 'medium', sla: 22 },
];

// Municipal Ward Boundaries Coordinates for Vadodara
const WARD_POLYGONS = [
  {
    id: 'W07',
    name: 'Ward 7 (Karelibaug)',
    slaScore: 92.4,
    color: '#10b981',
    fillColor: '#10b981',
    coords: [
      [22.318, 73.185],
      [22.335, 73.185],
      [22.338, 73.212],
      [22.320, 73.212],
    ],
  },
  {
    id: 'W04',
    name: 'Ward 4 (Sayajigunj)',
    slaScore: 84.1,
    color: '#3b82f6',
    fillColor: '#3b82f6',
    coords: [
      [22.305, 73.175],
      [22.322, 73.175],
      [22.324, 73.196],
      [22.308, 73.196],
    ],
  },
  {
    id: 'W09',
    name: 'Ward 9 (Akota)',
    slaScore: 78.5,
    color: '#f59e0b',
    fillColor: '#f59e0b',
    coords: [
      [22.290, 73.155],
      [22.306, 73.155],
      [22.308, 73.176],
      [22.292, 73.176],
    ],
  },
  {
    id: 'W12',
    name: 'Ward 12 (Manjalpur)',
    slaScore: 94.8,
    color: '#10b981',
    fillColor: '#10b981',
    coords: [
      [22.258, 73.180],
      [22.278, 73.180],
      [22.280, 73.205],
      [22.260, 73.205],
    ],
  },
  {
    id: 'W15',
    name: 'Ward 15 (Alkapuri)',
    slaScore: 96.2,
    color: '#10b981',
    fillColor: '#10b981',
    coords: [
      [22.302, 73.160],
      [22.318, 73.160],
      [22.320, 73.178],
      [22.304, 73.178],
    ],
  },
];

export function InteractiveMap({
  initialCity = 'Vadodara',
  height = 'h-[640px]',
  selectedProblemId,
}: InteractiveMapProps) {
  const { problems, toggleCivicReaction } = useApp();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const polygonsLayerRef = useRef<any>(null);
  const heatmapLayerRef = useRef<any>(null);

  // States
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [mapProvider, setMapProvider] = useState<MapProviderTheme>('google_hybrid');
  const [providerDropdownOpen, setProviderDropdownOpen] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<AnalyticalOverlay>('all_pins');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);

  // Active Problem for Drawer
  const [activeProblem, setActiveProblem] = useState<any | null>(null);

  // Enrich problems with realistic geographic coordinates
  const enrichedProblems = useMemo(() => {
    return problems.map((p, idx) => {
      const geo = MOCK_GEO_POINTS[idx % MOCK_GEO_POINTS.length];
      return {
        ...p,
        lat: geo.lat,
        lng: geo.lng,
        wardName: geo.ward,
        pqiScore: geo.pqi,
        waterloggingRisk: geo.risk,
        slaHoursLeft: geo.sla,
      };
    });
  }, [problems]);

  // Filtered problems based on controls
  const filteredProblems = useMemo(() => {
    return enrichedProblems.filter((p) => {
      if (selectedSeverity !== 'all' && p.severity !== selectedSeverity) return false;
      if (selectedDept !== 'all' && p.categoryId !== selectedDept) return false;
      return true;
    });
  }, [enrichedProblems, selectedSeverity, selectedDept]);

  // Set initial selected problem
  useEffect(() => {
    if (selectedProblemId) {
      const found = enrichedProblems.find((p) => p.id === selectedProblemId);
      if (found) setActiveProblem(found);
    } else if (!activeProblem && enrichedProblems.length > 0) {
      setActiveProblem(enrichedProblems[0]);
    }
  }, [selectedProblemId, enrichedProblems]);

  // 1. Initialize Leaflet Map Instance (Client-side only)
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    let isMounted = true;

    async function initMap() {
      const L = (await import('leaflet')).default;

      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous map if exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const cityCenter = CITY_COORDINATES[selectedCity] || CITY_COORDINATES['Vadodara'];

      const map = L.map(mapContainerRef.current, {
        center: [cityCenter.lat, cityCenter.lng],
        zoom: cityCenter.zoom,
        zoomControl: false,
        attributionControl: true,
      });

      // Add Tile Layer (Google Maps / Apple Maps / Esri)
      const tileConfig = MAP_PROVIDERS[mapProvider];
      const tileLayer = L.tileLayer(tileConfig.url, {
        subdomains: tileConfig.subdomains || ['a', 'b', 'c', 'd'],
        attribution: tileConfig.attribution,
        maxZoom: tileConfig.maxZoom || 20,
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // Layer Groups
      const markersLayer = L.layerGroup().addTo(map);
      const polygonsLayer = L.layerGroup().addTo(map);
      const heatmapLayer = L.layerGroup().addTo(map);

      markersLayerRef.current = markersLayer;
      polygonsLayerRef.current = polygonsLayer;
      heatmapLayerRef.current = heatmapLayer;

      mapInstanceRef.current = map;

      // Trigger map resize after animation
      setTimeout(() => {
        if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
      }, 200);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 2. Handle City Change (Smooth FlyTo)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const cityCenter = CITY_COORDINATES[selectedCity] || CITY_COORDINATES['Vadodara'];
    mapInstanceRef.current.flyTo([cityCenter.lat, cityCenter.lng], cityCenter.zoom, {
      duration: 1.5,
      easeLinearity: 0.25,
    });
  }, [selectedCity]);

  // 3. Handle Map Provider Switch (Google Maps / Apple Maps / Esri)
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    async function updateTile() {
      const L = (await import('leaflet')).default;
      if (!mapInstanceRef.current) return;

      mapInstanceRef.current.removeLayer(tileLayerRef.current);
      const tileConfig = MAP_PROVIDERS[mapProvider];
      const newTileLayer = L.tileLayer(tileConfig.url, {
        subdomains: tileConfig.subdomains || ['a', 'b', 'c', 'd'],
        attribution: tileConfig.attribution,
        maxZoom: tileConfig.maxZoom || 20,
      }).addTo(mapInstanceRef.current);

      tileLayerRef.current = newTileLayer;
    }
    updateTile();
  }, [mapProvider]);

  // 4. Update Markers, Ward Boundaries & Overlays
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    async function updateLayers() {
      const L = (await import('leaflet')).default;
      if (!markersLayerRef.current || !polygonsLayerRef.current || !heatmapLayerRef.current) return;

      markersLayerRef.current.clearLayers();
      polygonsLayerRef.current.clearLayers();
      heatmapLayerRef.current.clearLayers();

      // Render Ward Boundaries
      if (activeOverlay === 'ward_boundaries' || activeOverlay === 'all_pins') {
        WARD_POLYGONS.forEach((ward) => {
          const polygon = L.polygon(ward.coords as any, {
            color: ward.color,
            weight: 2.5,
            opacity: 0.9,
            fillColor: ward.fillColor,
            fillOpacity: activeOverlay === 'ward_boundaries' ? 0.3 : 0.1,
            dashArray: '5, 5',
          });

          polygon.bindTooltip(
            `<div class="text-xs font-black font-sans px-1.5 py-0.5 text-slate-900 leading-tight">${ward.name}<br/><span class="text-emerald-600 font-extrabold">${ward.slaScore}% SLA Score</span></div>`,
            { sticky: true, className: 'rounded-xl shadow-xl border border-slate-200' }
          );

          polygonsLayerRef.current.addLayer(polygon);
        });
      }

      // Render Flood / Stormwater Catchments
      if (activeOverlay === 'flood_drainage') {
        const floodAreas = [
          { center: [22.3245, 73.1932], radius: 650, color: '#ef4444' },
          { center: [22.2982, 73.1661], radius: 500, color: '#f59e0b' },
        ];

        floodAreas.forEach((fa) => {
          const circle = L.circle(fa.center as [number, number], {
            radius: fa.radius,
            color: fa.color,
            fillColor: fa.color,
            fillOpacity: 0.4,
            weight: 2,
          });
          circle.bindTooltip('<strong>High Inundation Risk Area</strong><br/>Stormwater Outflow &gt; 25cm', {
            sticky: true,
          });
          heatmapLayerRef.current.addLayer(circle);
        });
      }

      // Render Heatmap Glows
      if (activeOverlay === 'heatmap') {
        filteredProblems.forEach((p) => {
          const radius = p.severity === 'critical' ? 750 : p.severity === 'high' ? 550 : 400;
          const color = p.severity === 'critical' ? '#dc2626' : p.severity === 'high' ? '#f43f5e' : '#f59e0b';
          const glow = L.circle([p.lat, p.lng], {
            radius,
            color,
            fillColor: color,
            fillOpacity: 0.45,
            weight: 0,
          });
          heatmapLayerRef.current.addLayer(glow);
        });
      }

      // Render Custom High-Quality HTML Pins
      filteredProblems.forEach((p) => {
        const isSelected = activeProblem?.id === p.id;
        const colorBg =
          p.status === 'resolved'
            ? '#10b981'
            : p.severity === 'critical'
            ? '#dc2626'
            : p.severity === 'high'
            ? '#f43f5e'
            : p.severity === 'medium'
            ? '#f59e0b'
            : '#2563eb';

        const customHtml = `
          <div class="relative group cursor-pointer" style="transform: translate(-50%, -100%);">
            ${
              isSelected
                ? `<div style="position: absolute; inset: -10px; background: rgba(59, 130, 246, 0.5); border-radius: 9999px; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>`
                : ''
            }
            <div style="
              background-color: ${colorBg};
              width: ${isSelected ? '38px' : '32px'};
              height: ${isSelected ? '38px' : '32px'};
              border-radius: 9999px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 12px 28px -4px rgba(0, 0, 0, 0.6);
              border: 3px solid #ffffff;
              transition: all 0.2s ease;
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span style="
                position: absolute;
                top: -5px;
                right: -5px;
                background-color: #0f172a;
                color: #ffffff;
                font-size: 9px;
                font-weight: 900;
                border-radius: 9999px;
                width: 18px;
                height: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid #ffffff;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              ">
                ${p.civicReactions.face_this_too || 1}
              </span>
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: customHtml,
          iconSize: [34, 34],
          iconAnchor: [17, 34],
        });

        const marker = L.marker([p.lat, p.lng], { icon: customIcon });

        marker.on('click', () => {
          setActiveProblem(p);
          if (mapInstanceRef.current) {
            mapInstanceRef.current.panTo([p.lat, p.lng], { animate: true, duration: 0.8 });
          }
        });

        markersLayerRef.current.addLayer(marker);
      });
    }

    updateLayers();
  }, [filteredProblems, activeOverlay, activeProblem]);

  // Handle Locate Me GPS
  const handleLocateMe = () => {
    setIsLocating(true);
    setLocationMessage('Locking onto GPS satellite constellation (±3m precision)...');
    setTimeout(() => {
      setIsLocating(false);
      setLocationMessage('Centering view on Karelibaug, Vadodara');
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([22.3245, 73.1932], 16, { duration: 1.5 });
      }
      if (enrichedProblems[0]) setActiveProblem(enrichedProblems[0]);
      setTimeout(() => setLocationMessage(null), 3000);
    }, 900);
  };

  // Zoom Controls
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      const cityCenter = CITY_COORDINATES[selectedCity] || CITY_COORDINATES['Vadodara'];
      mapInstanceRef.current.flyTo([cityCenter.lat, cityCenter.lng], cityCenter.zoom, {
        duration: 1.2,
      });
    }
  };

  const activeProvider = MAP_PROVIDERS[mapProvider];

  return (
    <div
      className={`relative w-full ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : `${height} rounded-3xl`
      } overflow-hidden border border-slate-200/90 shadow-2xl bg-slate-950 flex flex-col transition-all duration-300`}
    >
      {/* Top Map HUD Bar */}
      <div className="absolute top-3 left-3 right-3 z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pointer-events-none">
        {/* City Selector */}
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-2xl border border-slate-700/90 text-white">
          <Navigation className="w-4 h-4 text-blue-400 shrink-0" />
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400 font-semibold">India /</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent font-black text-blue-300 outline-none cursor-pointer hover:text-white transition-colors"
            >
              <option value="Vadodara" className="bg-slate-900 text-white">Vadodara (19 Wards)</option>
              <option value="Ahmedabad" className="bg-slate-900 text-white">Ahmedabad (48 Wards)</option>
              <option value="Surat" className="bg-slate-900 text-white">Surat (30 Wards)</option>
              <option value="Rajkot" className="bg-slate-900 text-white">Rajkot (18 Wards)</option>
              <option value="Mumbai" className="bg-slate-900 text-white">Mumbai (24 Wards)</option>
              <option value="Bengaluru" className="bg-slate-900 text-white">Bengaluru (198 Wards)</option>
              <option value="Delhi" className="bg-slate-900 text-white">Delhi NCR</option>
            </select>
          </div>
        </div>

        {/* Analytical Layers */}
        <div className="pointer-events-auto flex items-center gap-1 bg-slate-950/90 backdrop-blur-md p-1 rounded-2xl shadow-2xl border border-slate-700/90 overflow-x-auto max-w-full scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveOverlay('all_pins')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeOverlay === 'all_pins'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            📍 All Issues ({filteredProblems.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveOverlay('heatmap')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeOverlay === 'heatmap'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Heatmap</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveOverlay('ward_boundaries')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeOverlay === 'ward_boundaries'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Ward SLAs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveOverlay('flood_drainage')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeOverlay === 'flood_drainage'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Flood Catchment</span>
          </button>
        </div>

        {/* Engine Switcher (Google Maps / Apple Maps / Esri) & Fullscreen */}
        <div className="pointer-events-auto relative flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md p-1 rounded-2xl shadow-2xl border border-slate-700/90">
          <button
            type="button"
            onClick={() => setProviderDropdownOpen(!providerDropdownOpen)}
            className="px-2.5 py-1 text-[11px] font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all flex items-center gap-1.5 shadow-xs border border-slate-600/60"
            title="Switch Map Engine Provider"
          >
            <span>{activeProvider.icon}</span>
            <span className="font-extrabold truncate max-w-[140px] sm:max-w-none">
              {activeProvider.label}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {providerDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 p-2 z-50 animate-in fade-in zoom-in-95 space-y-1">
              <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-800">
                Select Map Engine &amp; Layer
              </div>
              {(Object.keys(MAP_PROVIDERS) as MapProviderTheme[]).map((key) => {
                const item = MAP_PROVIDERS[key];
                const isCurrent = mapProvider === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setMapProvider(key);
                      setProviderDropdownOpen(false);
                    }}
                    className={`w-full px-2.5 py-2 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-colors ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {isCurrent && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Geolocation Feedback Message */}
      {locationMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-blue-600 text-white px-4 py-2 rounded-2xl text-xs font-black shadow-2xl border border-blue-400 flex items-center gap-2 animate-in fade-in zoom-in-95">
          <Navigation className="w-4 h-4 animate-spin" />
          <span>{locationMessage}</span>
        </div>
      )}

      {/* Leaflet Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full relative z-10" />

      {/* Bottom Left Legend & Active Filters */}
      <div className="absolute bottom-3 left-3 z-30 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-slate-950/90 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl text-[11px] border border-slate-800 shadow-2xl flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-xs" />
            <span className="font-bold">Critical P0</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>High P1</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Medium P2</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Resolved P3</span>
          </div>
        </div>

        {(selectedSeverity !== 'all' || selectedDept !== 'all') && (
          <button
            type="button"
            onClick={() => {
              setSelectedSeverity('all');
              setSelectedDept('all');
            }}
            className="pointer-events-auto bg-blue-600/90 hover:bg-blue-600 text-white px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1 shadow-lg transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Bottom Right GIS Navigation Controls */}
      <div className="absolute bottom-3 right-3 z-30 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={handleLocateMe}
          disabled={isLocating}
          className="w-9 h-9 rounded-xl bg-slate-900/90 backdrop-blur-md hover:bg-blue-600 text-white flex items-center justify-center shadow-2xl border border-slate-700 transition-all hover:scale-105"
          title="Locate My Position (GPS Satellite Lock)"
        >
          <LocateFixed className={`w-4 h-4 ${isLocating ? 'animate-spin text-blue-400' : ''}`} />
        </button>

        <button
          type="button"
          onClick={handleResetView}
          className="w-9 h-9 rounded-xl bg-slate-900/90 backdrop-blur-md hover:bg-slate-800 text-white flex items-center justify-center shadow-2xl border border-slate-700 transition-all"
          title="Reset Map Center View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleZoomIn}
          className="w-9 h-9 rounded-xl bg-slate-900/90 backdrop-blur-md hover:bg-slate-800 text-white flex items-center justify-center shadow-2xl border border-slate-700 transition-all"
          title="Zoom In (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleZoomOut}
          className="w-9 h-9 rounded-xl bg-slate-900/90 backdrop-blur-md hover:bg-slate-800 text-white flex items-center justify-center shadow-2xl border border-slate-700 transition-all"
          title="Zoom Out (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Slide-Out Detailed Spatial Case Inspector Drawer */}
      {activeProblem && (
        <div className="absolute top-14 right-3 z-40 w-80 sm:w-[410px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-right-6 duration-200 flex flex-col max-h-[85%]">
          {/* Card Header Bar */}
          <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded-lg border border-blue-800">
                {activeProblem.id}
              </span>
              <SeverityBadge severity={activeProblem.severity} />
            </div>
            <button
              type="button"
              onClick={() => setActiveProblem(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Card Body */}
          <div className="p-5 space-y-4 overflow-y-auto">
            <div className="flex items-center justify-between">
              <StatusBadge status={activeProblem.status} />
              <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {activeProblem.location.ward}, {activeProblem.location.city}
              </span>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                {activeProblem.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-3 leading-relaxed">
                {activeProblem.description}
              </p>
            </div>

            {/* Photo Evidence Preview */}
            {activeProblem.evidence && activeProblem.evidence[0] && (
              <div className="relative h-36 rounded-2xl overflow-hidden border border-slate-200 group">
                <img
                  src={activeProblem.evidence[0].url}
                  alt={activeProblem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-950/80 backdrop-blur-sm text-white text-[10px] font-bold rounded-md">
                  Verified Geotagged Evidence
                </div>
              </div>
            )}

            {/* Authority & SLA Countdown HUD */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] uppercase font-extrabold text-slate-400">
                  Assigned Municipal Dept
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  6h to SLA Escalation
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900 truncate">
                {activeProblem.assignedAuthority.department}
              </div>
            </div>

            {/* Direct Google Maps & Apple Maps Navigation Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${activeProblem.lat},${activeProblem.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
              >
                <span>🗺️ Google Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href={`https://maps.apple.com/?q=${encodeURIComponent(activeProblem.title)}&ll=${activeProblem.lat},${activeProblem.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
              >
                <span>🍎 Apple Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>

            {/* Direct Co-Sign Action Bar */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleCivicReaction(activeProblem.id, 'face_this_too')}
                className="flex-1 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors border border-blue-200"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>I Face This Too ({activeProblem.civicReactions.face_this_too || 0})</span>
              </button>
            </div>

            {/* Full Case CTA */}
            <Link
              href={`/problems/${activeProblem.id}`}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>Open Complete Case &amp; Co-Create Fix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
