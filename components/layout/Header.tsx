'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { getLanguageByCode, ALL_LANGUAGES } from '@/lib/languages';
import { LanguagePickerModal } from '@/components/ui/LanguagePickerModal';
import {
  Search,
  Globe,
  Bell,
  PlusCircle,
  Menu,
  X,
  UserCheck,
  Shield,
  Layers,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Building2,
  GraduationCap,
  Microscope,
  Award,
  Trophy,
  Compass,
  FileSpreadsheet,
  Palette,
  BrainCircuit,
  MapPin,
  ExternalLink,
  Users,
  Lightbulb,
} from 'lucide-react';

import { JanVaaniLogo } from '@/components/ui/JanVaaniLogo';

// Navigation links configuration with responsive visibility rules
const NAV_ITEMS = [
  { href: '/', label: 'Home', minBreakpoint: 'xl' },
  { href: '/explore', label: 'Explore', minBreakpoint: 'lg' },
  { href: '/problems', label: 'Problems', minBreakpoint: 'lg' },
  { href: '/map', label: 'GIS Map', minBreakpoint: 'lg' },
  { href: '/solutions', label: 'Solutions', minBreakpoint: 'xl' },
  { href: '/communities', label: 'Communities', minBreakpoint: 'xl' },
];

// Organized Hubs for the "More ▾" dropdown
const MORE_HUBS = [
  {
    category: 'Civic Core & Solutions',
    items: [
      {
        href: '/solutions',
        label: 'Community Solutions',
        desc: 'Explore, upvote & co-create citizen engineering fixes',
        icon: Lightbulb,
        color: 'text-amber-600 bg-amber-50',
      },
      {
        href: '/communities',
        label: 'Ward & City Communities',
        desc: 'Join local action groups, RWAs & neighborhood hubs',
        icon: Users,
        color: 'text-blue-600 bg-blue-50',
      },
    ],
  },
  {
    category: 'Governance & Civic Structure',
    items: [
      {
        href: '/government/representatives',
        label: 'Elected Representatives & Officers',
        desc: 'Ward Corporators, MLAs, MPs, IAS contacts & LAD funds',
        icon: UserCheck,
        color: 'text-blue-600 bg-blue-50',
      },
      {
        href: '/government',
        label: 'Government Command Portal',
        desc: 'Ward officers, department escalations & SLA tracking',
        icon: Building2,
        color: 'text-emerald-600 bg-emerald-50',
      },
      {
        href: '/categories',
        label: 'Taxonomy & Categories',
        desc: 'Severity classification matrices & department mapping',
        icon: Layers,
        color: 'text-indigo-600 bg-indigo-50',
      },
    ],
  },
  {
    category: 'Intelligence & Research',
    items: [
      {
        href: '/intelligence/10x',
        label: '10x Intelligence Hub',
        desc: 'AI duplicate detection, autopsy & policy simulator',
        icon: BrainCircuit,
        color: 'text-purple-600 bg-purple-50',
      },
      {
        href: '/research',
        label: 'Research & Open Data',
        desc: 'Open datasets, anonymized civic trends & API access',
        icon: Microscope,
        color: 'text-cyan-600 bg-cyan-50',
      },
    ],
  },
  {
    category: 'Impact & Community',
    items: [
      {
        href: '/rewards',
        label: 'Rewards & Bounties',
        desc: 'Earn citizen points, sponsor bounties & civic badges',
        icon: Trophy,
        color: 'text-amber-600 bg-amber-50',
      },
      {
        href: '/leaderboard',
        label: 'Civic Leaderboard',
        desc: 'Top problem solvers, college chapters & ward rankings',
        icon: Award,
        color: 'text-blue-600 bg-blue-50',
      },
      {
        href: '/brand',
        label: 'Brand Identity',
        desc: 'Official logos, colors, voice guidelines & design assets',
        icon: Palette,
        color: 'text-rose-600 bg-rose-50',
      },
    ],
  },
];

const ROLES: Array<{ role: UserRole; label: string; icon: React.ElementType; color: string }> = [
  { role: 'citizen', label: 'Citizen', icon: UserCheck, color: 'text-blue-600' },
  { role: 'student', label: 'Student', icon: GraduationCap, color: 'text-indigo-600' },
  { role: 'expert', label: 'Verified Expert', icon: Award, color: 'text-purple-600' },
  { role: 'officer', label: 'Govt Officer', icon: Building2, color: 'text-emerald-600' },
  { role: 'researcher', label: 'Researcher', icon: Microscope, color: 'text-cyan-600' },
  { role: 'admin', label: 'System Admin', icon: Shield, color: 'text-rose-600' },
];

export function Header() {
  const pathname = usePathname();
  const {
    user,
    activeRole,
    setUserRole,
    language,
    unreadNotificationCount,
    notifications,
    setGlobalSearchOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  // Active language object
  const currentLangObj = useMemo(() => getLanguageByCode(language), [language]);

  // Auto-close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
        setRoleDropdownOpen(false);
        setNotifDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-close all menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    setRoleDropdownOpen(false);
    setNotifDropdownOpen(false);
  }, [pathname]);

  const isMoreActive = MORE_HUBS.some((group) =>
    group.items.some((item) => pathname.startsWith(item.href))
  );

  return (
    <>
      {/* Global 130+ Language Selection Modal */}
      <LanguagePickerModal
        isOpen={langModalOpen}
        onClose={() => setLangModalOpen(false)}
      />

      <header ref={navRef} className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        {/* Top Announcement Bar */}
        <div className="bg-slate-900 text-white text-[11px] font-medium py-1 px-4 text-center flex items-center justify-center gap-2">
          <span className="bg-blue-600 text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wide">
            Live Civic Platform
          </span>
          <span className="truncate">
            JanVaani: India&apos;s Citizen Problem & Solution Intelligence Platform • Speak. Share. Solve. Reward.
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
            {/* Slot 1: Brand Logo */}
            <div className="shrink-0 flex items-center">
              <Link
                href="/"
                className="flex items-center group py-1"
                title="JanVaani — Citizen Problem & Solution Intelligence Platform"
              >
                <JanVaaniLogo variant="compact" size="xs" showTagline={false} />
              </Link>
            </div>

            {/* Slot 2: Desktop Navigation Links (Center, Responsive) */}
            <nav className="hidden lg:flex items-center gap-1 shrink-0">
              {NAV_ITEMS.map((link) => {
                const isActive = pathname === link.href;
                const visibilityClass = link.minBreakpoint === 'xl' ? 'hidden xl:inline-flex' : 'inline-flex';
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${visibilityClass} px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-extrabold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* "More Hubs" Dropdown */}
              <div className="relative inline-flex">
                <button
                  type="button"
                  onClick={() => {
                    setMoreDropdownOpen(!moreDropdownOpen);
                    setRoleDropdownOpen(false);
                    setNotifDropdownOpen(false);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isMoreActive || moreDropdownOpen
                      ? 'bg-blue-50 text-blue-700 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown
                    className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                      moreDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {moreDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 grid grid-cols-2 gap-4">
                    {MORE_HUBS.map((group) => (
                      <div key={group.category} className="space-y-2">
                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1 border-b border-slate-100 pb-1">
                          {group.category}
                        </div>
                        <div className="space-y-1">
                          {group.items.map((item) => {
                            const Icon = item.icon;
                            const isItemActive = pathname === item.href;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMoreDropdownOpen(false)}
                                className={`flex items-start gap-2.5 p-2 rounded-xl transition-all ${
                                  isItemActive
                                    ? 'bg-blue-50/80 text-blue-700'
                                    : 'hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <div className={`p-1.5 rounded-lg shrink-0 ${item.color}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-bold text-slate-900 leading-tight">
                                    {item.label}
                                  </div>
                                  <div className="text-[10px] text-slate-500 leading-normal mt-0.5 line-clamp-1">
                                    {item.desc}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Slot 3: Actions Bar (Right side, Isolated & Fixed) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Global Search Button */}
              <button
                type="button"
                onClick={() => setGlobalSearchOpen(true)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 transition-colors border border-slate-200/80 shrink-0"
                title="Search JanVaani (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="hidden xl:inline font-medium">Search...</span>
                <kbd className="hidden xl:inline-block bg-white text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-300 shadow-xs">
                  ⌘K
                </kbd>
              </button>

              {/* Enhanced 130+ Language Picker Trigger Button */}
              <button
                type="button"
                onClick={() => {
                  setLangModalOpen(true);
                  setRoleDropdownOpen(false);
                  setNotifDropdownOpen(false);
                  setMoreDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all shrink-0 group hover:border-blue-300"
                title={`Selected: ${currentLangObj.name} (${currentLangObj.nativeName}) — Click to choose from 130+ languages`}
              >
                <span className="text-sm leading-none">{currentLangObj.flag}</span>
                <span className="uppercase text-[11px] font-extrabold text-slate-800">
                  {currentLangObj.code.split('-')[0]}
                </span>
                <span className="hidden sm:inline text-[10px] text-slate-400 font-medium max-w-[65px] truncate">
                  {currentLangObj.nativeName}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600" />
              </button>

              {/* Interactive Demo Role Switcher */}
              <div className="relative hidden md:block shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setRoleDropdownOpen(!roleDropdownOpen);
                    setNotifDropdownOpen(false);
                    setMoreDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
                  title="Switch Demo Role Persona"
                >
                  <span className="text-[10px] text-blue-300 uppercase font-bold hidden sm:inline">Role:</span>
                  <span className="capitalize text-[11px]">{activeRole}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                      Switch Test Persona Role
                    </div>
                    {ROLES.map((r) => {
                      const Icon = r.icon;
                      return (
                        <button
                          key={r.role}
                          type="button"
                          onClick={() => {
                            setUserRole(r.role);
                            setRoleDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs flex items-center gap-2.5 hover:bg-slate-50 transition-colors ${
                            activeRole === r.role ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${r.color}`} />
                          <span className="font-semibold">{r.label}</span>
                          {activeRole === r.role && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 ml-auto" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Notification Center Bell */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setNotifDropdownOpen(!notifDropdownOpen);
                    setRoleDropdownOpen(false);
                    setMoreDropdownOpen(false);
                  }}
                  className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                      {unreadNotificationCount}
                    </span>
                  )}
                </button>

                {notifDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 flex items-center justify-between border-b border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Notifications ({unreadNotificationCount} Unread)
                      </span>
                      <Link
                        href="/dashboard/notifications"
                        onClick={() => setNotifDropdownOpen(false)}
                        className="text-xs font-semibold text-blue-600 hover:underline"
                      >
                        View All
                      </Link>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                      {notifications.map((n) => (
                        <Link
                          key={n.id}
                          href={n.link}
                          onClick={() => setNotifDropdownOpen(false)}
                          className={`block px-4 py-3 hover:bg-slate-50 transition-colors ${
                            !n.read ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <div className="text-xs font-bold text-slate-900 mb-0.5">{n.title}</div>
                          <div className="text-xs text-slate-600 line-clamp-2">{n.message}</div>
                          <div className="text-[10px] text-slate-400 mt-1">{n.timestamp}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Primary CTA: + Report a Problem */}
              <Link
                href="/report"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden xl:inline">Report a Problem</span>
                <span className="xl:hidden">Report Problem</span>
              </Link>

              {/* Profile Avatar */}
              <Link
                href="/dashboard"
                className="flex items-center p-0.5 rounded-xl hover:ring-2 hover:ring-blue-500/30 transition-all shrink-0"
                title="Civic Dashboard"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-300 shadow-xs"
                />
              </Link>

              {/* Mobile / Tablet Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 shrink-0"
                title="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
            {/* Quick Search in Mobile */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setGlobalSearchOpen(true);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs text-slate-500 bg-slate-100 border border-slate-200"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Search problems, solutions, wards...</span>
              </div>
              <kbd className="bg-white text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-300">
                ⌘K
              </kbd>
            </button>

            {/* Language Selector in Mobile */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setLangModalOpen(true);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs font-bold text-blue-900"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>
                  Language: {currentLangObj.flag} {currentLangObj.nativeName} ({currentLangObj.name})
                </span>
              </div>
              <span className="text-[10px] text-blue-600 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                Change (130+)
              </span>
            </button>

            {/* Primary Quick Links */}
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                Navigation
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {NAV_ITEMS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      pathname === link.href
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Secondary Hubs */}
            {MORE_HUBS.map((group) => (
              <div key={group.category} className="pt-2 border-t border-slate-100">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  {group.category}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-50 text-slate-700 text-xs font-bold"
                      >
                        <div className={`p-1.5 rounded-lg shrink-0 ${item.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Role Switcher in Mobile */}
            <div className="pt-2 border-t border-slate-100">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                Active Persona Role: <span className="text-blue-600 capitalize">{activeRole}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => {
                        setUserRole(r.role);
                      }}
                      className={`p-2 rounded-xl text-xs flex items-center gap-2 border text-left transition-all ${
                        activeRole === r.role
                          ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${r.color}`} />
                      <span className="truncate">{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA & User Status */}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/report"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Report a Problem</span>
              </Link>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-slate-300" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{user.name}</div>
                    <div className="text-[10px] text-blue-600 font-semibold">{user.points} Points • {user.location}</div>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
