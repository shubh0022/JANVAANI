'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '@/lib/store';
import {
  ALL_LANGUAGES,
  ALL_INDIAN_LANGUAGES,
  GLOBAL_LANGUAGES,
  LanguageItem,
  LanguageCategory,
  getLanguageByCode,
} from '@/lib/languages';
import {
  Globe,
  Search,
  X,
  CheckCircle2,
  Sparkles,
  MapPin,
  Compass,
  Check,
} from 'lucide-react';

interface LanguagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType =
  | 'all'
  | 'indian'
  | 'global'
  | 'asia'
  | 'europe'
  | 'americas'
  | 'africa'
  | 'middle_east';

export function LanguagePickerModal({ isOpen, onClose }: LanguagePickerModalProps) {
  const { language, setLanguage } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('all');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Current active language item
  const currentLang = useMemo(() => getLanguageByCode(language), [language]);

  // Filtered languages
  const filteredLanguages = useMemo(() => {
    let list = ALL_LANGUAGES;

    if (activeTab === 'indian') {
      list = ALL_INDIAN_LANGUAGES;
    } else if (activeTab === 'global') {
      list = GLOBAL_LANGUAGES;
    } else if (activeTab === 'asia') {
      list = ALL_LANGUAGES.filter((l) => l.category === 'global_asia');
    } else if (activeTab === 'europe') {
      list = ALL_LANGUAGES.filter((l) => l.category === 'global_europe');
    } else if (activeTab === 'americas') {
      list = ALL_LANGUAGES.filter((l) => l.category === 'global_americas');
    } else if (activeTab === 'africa') {
      list = ALL_LANGUAGES.filter((l) => l.category === 'global_africa');
    } else if (activeTab === 'middle_east') {
      list = ALL_LANGUAGES.filter((l) => l.category === 'global_middle_east');
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase().trim();
    return ALL_LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q) ||
        l.region.toLowerCase().includes(q)
    );
  }, [searchQuery, activeTab]);

  if (!isOpen) return null;

  const handleSelectLanguage = (code: string) => {
    setLanguage(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
                  Select Platform Language
                </h2>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-300 border border-blue-400/30">
                  {ALL_LANGUAGES.length}+ Languages
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                All 22 Official 8th Schedule Indian Languages, Regional Dialects &amp; 100+ Global Country Languages
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Active Info Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Hindi, தமிழ், Español, French, 'gu', 'de'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-9 pr-8 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-xl shadow-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Current Selection Pill */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 self-stretch sm:self-auto justify-between sm:justify-end">
            <span className="text-slate-400 font-medium">Active:</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl">
              <span className="text-base leading-none">{currentLang.flag}</span>
              <span className="font-bold">{currentLang.nativeName}</span>
              <span className="text-[11px] text-blue-600 font-medium">({currentLang.name})</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        {!searchQuery && (
          <div className="flex items-center gap-1.5 p-2 sm:px-5 bg-white border-b border-slate-100 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🌐 All ({ALL_LANGUAGES.length})
            </button>
            <button
              onClick={() => setActiveTab('indian')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'indian'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              🇮🇳 All Indian Languages ({ALL_INDIAN_LANGUAGES.length})
            </button>
            <button
              onClick={() => setActiveTab('global')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'global'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🌍 Global 100+ ({GLOBAL_LANGUAGES.length})
            </button>
            <button
              onClick={() => setActiveTab('europe')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'europe'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🇪🇺 Europe
            </button>
            <button
              onClick={() => setActiveTab('asia')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'asia'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🌏 Asia-Pacific
            </button>
            <button
              onClick={() => setActiveTab('middle_east')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'middle_east'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🕌 Middle East
            </button>
            <button
              onClick={() => setActiveTab('africa')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'africa'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🌍 Africa
            </button>
            <button
              onClick={() => setActiveTab('americas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'americas'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🌎 Americas
            </button>
          </div>
        )}

        {/* Language Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {filteredLanguages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {filteredLanguages.map((langItem) => {
                const isSelected = language.toLowerCase() === langItem.code.toLowerCase();
                return (
                  <button
                    key={langItem.code}
                    onClick={() => handleSelectLanguage(langItem.code)}
                    className={`group text-left p-3 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                        : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="text-2xl leading-none shrink-0 mt-0.5">
                        {langItem.flag}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-sm font-extrabold truncate ${
                              isSelected ? 'text-blue-900' : 'text-slate-900 group-hover:text-blue-600'
                            }`}
                          >
                            {langItem.nativeName}
                          </span>
                          {langItem.direction === 'rtl' && (
                            <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-amber-100 text-amber-800 shrink-0">
                              RTL
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-semibold text-slate-700 truncate mt-0.5">
                          {langItem.name}
                        </div>

                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {langItem.region}
                        </div>

                        {langItem.isSchedule8 && (
                          <div className="mt-1 inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span>Official (Schedule 8)</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 mt-1">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-600 uppercase font-bold bg-slate-100 px-1.5 py-0.5 rounded">
                          {langItem.code}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Globe className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-800">
                No matching languages found for &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Try searching by country name, language script, or standard language code (e.g. Hindi, Tamil, German, Japanese, ar, es).
              </p>
            </div>
          )}
        </div>

        {/* Footer info banner */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              Supports all 22 Eighth Schedule Indian languages, regional dialects &amp; 100+ global languages with automated localization.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors shrink-0"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
