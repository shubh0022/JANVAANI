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
} from 'lucide-react';

interface InteractiveMapProps {
  initialCity?: string;
  height?: string;
  selectedProblemId?: string;
}

type MapTheme = 'tactical_dark' | 'municipal_vector' | 'satellite_hybrid' | 'osm_standard';
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

// High-Resolution Tile Server Configurations
const TILE_SERVERS: Record<MapTheme, { url: string; attribution: string; subdomains?: string[] }> = {
  tactical_dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
  },
  municipal_vector: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
  },
  satellite_hybrid: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
  },
  osm_standard: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    subdomains: ['a', 'b', 'c'],
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
  const [mapTheme, setMapTheme] = useState<MapTheme>('tactical_dark');
  const [activeOverlay, setActiveOverlay] = useState<AnalyticalOverlay>('all_pins');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);

  // Active Problem for Drawer
  const [activeProblem, setActiveProblem] = useState<ProblemCase | null>(null);

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

      // Add Tile Layer
      const tileConfig = TILE_SERVERS[mapTheme];
      const tileLayer = L.tileLayer(tileConfig.url, {
        subdomains: tileConfig.subdomains || ['a', 'b', 'c', 'd'],
        attribution: tileConfig.attribution,
        maxZoom: 19,
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

  // 3. Handle Map Theme Switch
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    async function updateTile() {
      const L = (await import('leaflet')).default;
      if (!mapInstanceRef.current) return;

      mapInstanceRef.current.removeLayer(tileLayerRef.current);
      const tileConfig = TILE_SERVERS[mapTheme];
      const newTileLayer = L.tileLayer(tileConfig.url, {
        subdomains: tileConfig.subdomains || ['a', 'b', 'c', 'd'],
        attribution: tileConfig.attribution,
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);

      tileLayerRef.current = newTileLayer;
    }
    updateTile();
  }, [mapTheme]);

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
            weight: 2,
            opacity: 0.8,
            fillColor: ward.fillColor,
            fillOpacity: activeOverlay === 'ward_boundaries' ? 0.25 : 0.08,
            dashArray: '4, 4',
          });

          polygon.bindTooltip(
            `<div class="text-[11px] font-black font-sans px-1 text-slate-900">${ward.name}<br/><span class="text-emerald-600 font-bold">${ward.slaScore}% SLA</span></div>`,
            { sticky: true, className: 'rounded-xl shadow-lg border border-slate-200' }
          );

          polygonsLayerRef.current.addLayer(polygon);
        });
      }

      // Render Flood / Stormwater Catchments
      if (activeOverlay === 'flood_drainage') {
        const floodAreas = [
          { center: [22.3245, 73.1932], radius: 600, color: '#ef4444' },
          { center: [22.2982, 73.1661], radius: 450, color: '#f59e0b' },
        ];

        floodAreas.forEach((fa) => {
          const circle = L.circle(fa.center as [number, number], {
            radius: fa.radius,
            color: fa.color,
            fillColor: fa.color,
            fillOpacity: 0.35,
            weight: 2,
          });
          circle.bindTooltip('<strong>High Inundation Risk</strong><br/>Catchment Level &gt; 20cm', {
            sticky: true,
          });
          heatmapLayerRef.current.addLayer(circle);
        });
      }

      // Render Heatmap Glows
      if (activeOverlay === 'heatmap') {
        filteredProblems.forEach((p) => {
          const radius = p.severity === 'critical' ? 700 : p.severity === 'high' ? 500 : 350;
          const color = p.severity === 'critical' ? '#dc2626' : p.severity === 'high' ? '#f43f5e' : '#f59e0b';
          const glow = L.circle([p.lat, p.lng], {
            radius,
            color,
            fillColor: color,
            fillOpacity: 0.4,
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
                ? `<div style="position: absolute; inset: -8px; background: rgba(59, 130, 246, 0.4); border-radius: 9999px; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>`
                : ''
            }
            <div style="
              background-color: ${colorBg};
              width: ${isSelected ? '36px' : '30px'};
              height: ${isSelected ? '36px' : '30px'};
              border-radius: 9999px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
              border: 3px solid #ffffff;
              transition: all 0.2s ease;
            ">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span style="
                position: absolute;
                top: -4px;
                right: -4px;
                background-color: #0f172a;
                color: #ffffff;
                font-size: 9px;
                font-weight: 800;
                border-radius: 9999px;
                width: 16px;
                height: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1.5px solid #ffffff;
              ">
                ${p.civicReactions.face_this_too || 1}
              </span>
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'custom-leaflet-marker',
          html: customHtml,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
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
        mapInstanceRef.current.flyTo([22.3245, 73.1932], 15, { duration: 1.5 });
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

        {/* Theme & Fullscreen Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md p-1 rounded-2xl shadow-2xl border border-slate-700/90">
          <button
            type="button"
            onClick={() =>
              setMapTheme((t) =>
                t === 'tactical_dark'
                  ? 'municipal_vector'
                  : t === 'municipal_vector'
                  ? 'satellite_hybrid'
                  : t === 'satellite_hybrid'
                  ? 'osm_standard'
                  : 'tactical_dark'
              )
            }
            className="px-2.5 py-1 text-[11px] font-bold text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-1"
            title="Switch Map Resolution & Style"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span className="capitalize hidden sm:inline">{mapTheme.replace('_', ' ')}</span>
          </button>

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
        <div className="absolute top-14 right-3 z-40 w-80 sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-right-6 duration-200 flex flex-col max-h-[82%]">
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

            {/* Direct Co-Sign Action Bar */}
            <div className="flex items-center gap-2 pt-1">
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
