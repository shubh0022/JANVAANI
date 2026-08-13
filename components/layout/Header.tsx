'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp, LanguageCode } from '@/lib/store';
import { UserRole } from '@/lib/types';
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
} from 'lucide-react';

import { JanVaaniLogo } from '@/components/ui/JanVaaniLogo';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/problems', label: 'Problems' },
  { href: '/map', label: 'Map GIS' },
  { href: '/categories', label: 'Categories' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/communities', label: 'Communities' },
  { href: '/rewards', label: 'Rewards' },
  { href: '/brand', label: 'Brand Identity' },
  { href: '/research', label: 'Research' },
  { href: '/government', label: 'Government' },
];

const LANGUAGES: Array<{ code: LanguageCode; label: string; native: string }> = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
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
    setLanguage,
    unreadNotificationCount,
    notifications,
    setGlobalSearchOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm">
      {/* Top Notification/Demo Announcement Strip */}
      <div className="bg-slate-900 text-white text-[11px] font-medium py-1 px-4 text-center flex items-center justify-center gap-2">
        <span className="bg-blue-600 text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wide">
          Live Civic Platform
        </span>
        <span>
          JanVaani: India&apos;s Citizen Problem & Solution Intelligence Platform • Speak. Share. Solve. Reward.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center group py-1" title="JanVaani — Citizen Problem & Solution Intelligence Platform">
              <JanVaaniLogo size="sm" showTagline={false} />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-extrabold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Global Search Button */}
            <button
              onClick={() => setGlobalSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 transition-colors border border-slate-200/80"
              title="Search JanVaani"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline font-medium">Search...</span>
              <kbd className="hidden sm:inline-block bg-white text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-300 shadow-xs">
                ⌘K
              </kbd>
            </button>

            {/* Language Picker Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setRoleDropdownOpen(false);
                  setNotifDropdownOpen(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Choose Language
                  </div>
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs font-medium flex items-center justify-between hover:bg-blue-50 hover:text-blue-700 transition-colors ${
                        language === l.code ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>{l.native}</span>
                      <span className="text-[11px] text-slate-400">{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Demo Role Switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setLangDropdownOpen(false);
                  setNotifDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
              >
                <span className="text-[10px] text-blue-300 uppercase">Role:</span>
                <span className="capitalize">{activeRole}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Switch Test Persona Role
                  </div>
                  {ROLES.map((r) => {
                    const Icon = r.icon;
                    return (
                      <button
                        key={r.role}
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
            <div className="relative">
              <button
                onClick={() => {
                  setNotifDropdownOpen(!notifDropdownOpen);
                  setLangDropdownOpen(false);
                  setRoleDropdownOpen(false);
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
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
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
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report a Problem</span>
            </Link>

            {/* Profile Avatar */}
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-slate-100 transition-colors"
              title="Dashboard"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-300"
              />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {NAV_LINKS.map((link) => (
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
              <div className="flex items-center gap-2">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                <div>
                  <div className="text-xs font-bold text-slate-900">{user.name}</div>
                  <div className="text-[10px] text-blue-600 font-semibold">{user.points} Points</div>
                </div>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-lg border border-slate-200"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
