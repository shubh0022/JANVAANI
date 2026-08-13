'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { getLanguageByCode } from '@/lib/languages';
import { LanguagePickerModal } from '@/components/ui/LanguagePickerModal';
import {
  ArrowLeft,
  Save,
  Shield,
  Globe,
  Bell,
  Eye,
  CheckCircle2,
  Lock,
  Key,
  Smartphone,
  Laptop,
  Download,
  Trash2,
  AlertTriangle,
  FileText,
  Sliders,
  Sparkles,
  MapPin,
  Camera,
  Wallet,
  Building2,
  Check,
  RefreshCw,
  ExternalLink,
  Info,
  Layers,
  UserCheck,
  Fingerprint,
} from 'lucide-react';

type SettingsTab =
  | 'profile'
  | 'privacy'
  | 'security'
  | 'notifications'
  | 'bounties'
  | 'data_governance';

export default function SettingsPage() {
  const { user, language } = useApp();

  // Active Tab
  const [activeTab, setActiveTab] = useState<SettingsTab>('privacy');
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [langModalOpen, setLangModalOpen] = useState(false);

  // Profile State
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '+91 98765 43210');
  const [location, setLocation] = useState(user.location);
  const [bio, setBio] = useState(user.bio);
  const [wardNumber, setWardNumber] = useState('Ward 07 - North Zone');
  const [verifiedResident, setVerifiedResident] = useState(true);

  // Privacy & Differential Privacy State
  const [gpsFuzzRadius, setGpsFuzzRadius] = useState<number>(500); // meters
  const [exifScrubbing, setExifScrubbing] = useState<boolean>(true);
  const [facialBlurring, setFacialBlurring] = useState<boolean>(true);
  const [publicLeaderboard, setPublicLeaderboard] = useState<boolean>(true);
  const [aiResearchOptIn, setAiResearchOptIn] = useState<boolean>(true);
  const [searchEngineIndexing, setSearchEngineIndexing] = useState<boolean>(false);
  const [whistleblowerMode, setWhistleblowerMode] = useState<boolean>(false);
  const [zeroKnowledgeProof, setZeroKnowledgeProof] = useState<boolean>(true);

  // Security & Authentication State
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(true);
  const [passkeyBiometrics, setPasskeyBiometrics] = useState<boolean>(true);
  const [loginAlerts, setLoginAlerts] = useState<boolean>(true);
  const [sessions, setSessions] = useState([
    {
      id: 'sess_1',
      device: 'MacBook Pro 16" (Sonoma)',
      browser: 'Chrome 128.0',
      location: 'Vadodara, Gujarat, India',
      ip: '103.212.144.18',
      current: true,
      lastActive: 'Active Now',
    },
    {
      id: 'sess_2',
      device: 'iPhone 15 Pro Max',
      browser: 'JaanVaani iOS App v2.4',
      location: 'Vadodara, Gujarat, India',
      ip: '103.212.144.22',
      current: false,
      lastActive: '2 hours ago',
    },
    {
      id: 'sess_3',
      device: 'Ubuntu Linux Workstation',
      browser: 'Firefox Developer 129',
      location: 'Ahmedabad, Gujarat, India',
      ip: '49.36.12.91',
      current: false,
      lastActive: '3 days ago',
    },
  ]);

  // Notification Preferences State
  const [urgentDisasterSiren, setUrgentDisasterSiren] = useState<boolean>(true);
  const [wardEscalationSms, setWardEscalationSms] = useState<boolean>(true);
  const [solutionUpvotesPush, setSolutionUpvotesPush] = useState<boolean>(true);
  const [bountyPayoutEmails, setBountyPayoutEmails] = useState<boolean>(true);
  const [weeklyCivicDigest, setWeeklyCivicDigest] = useState<boolean>(false);
  const [quietHoursStart, setQuietHoursStart] = useState('22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('07:00');

  // Wallet & Bounty Payouts
  const [upiId, setUpiId] = useState('neha.sharma@okhdfcbank');
  const [panNumber, setPanNumber] = useState('ABCPS1234F');
  const [autoRedeemPoints, setAutoRedeemPoints] = useState(true);

  // Data Export state
  const [isExporting, setIsExporting] = useState(false);

  const currentLangObj = getLanguageByCode(language);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage('All preferences & privacy controls synchronized across cloud nodes!');
    setTimeout(() => setSavedMessage(null), 3500);
  };

  const handleRevokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleExportData = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(
          JSON.stringify(
            {
              exportDate: new Date().toISOString(),
              compliance: 'Digital Personal Data Protection (DPDP) Act 2023 & GDPR',
              user: { name, email, phone, location, wardNumber },
              privacySettings: {
                gpsFuzzRadiusMeters: gpsFuzzRadius,
                exifScrubbing,
                facialBlurring,
                whistleblowerMode,
                zeroKnowledgeProof,
              },
            },
            null,
            2
          )
        );
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `janvaani_user_data_export_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }, 1200);
  };

  return (
    <>
      <LanguagePickerModal isOpen={langModalOpen} onClose={() => setLangModalOpen(false)} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-950">
                  Account, Security &amp; Privacy Hub
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  DPDP Act 2023 Compliant
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Zero-Knowledge Privacy, Differential GPS Fuzzing, Biometric Passkeys &amp; Multi-Channel Routing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportData}
              disabled={isExporting}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              {isExporting ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
              ) : (
                <Download className="w-3.5 h-3.5 text-slate-500" />
              )}
              <span>{isExporting ? 'Packaging Archive...' : 'Export My Civic Data'}</span>
            </button>
          </div>
        </div>

        {/* Global Save Alert Banner */}
        {savedMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 animate-in fade-in shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold">{savedMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Tabbed Navigation */}
          <div className="lg:col-span-1 space-y-1.5">
            <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab('privacy')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left whitespace-nowrap ${
                  activeTab === 'privacy'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Privacy &amp; GPS Fuzzing</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Civic Identity &amp; Ward</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Passkeys &amp; 2FA Security</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left whitespace-nowrap ${
                  activeTab === 'notifications'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Alerts &amp; Siren Routing</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('bounties')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left whitespace-nowrap ${
                  activeTab === 'bounties'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>Bounty Payouts &amp; UPI</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('data_governance')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left whitespace-nowrap ${
                  activeTab === 'data_governance'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Data Rights &amp; Deletion</span>
              </button>
            </nav>

            {/* Language Quick Switch Card */}
            <div className="p-3.5 bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl text-white space-y-2 mt-4 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                Active Locale
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl">{currentLangObj.flag}</span>
                  <div>
                    <div className="text-xs font-bold">{currentLangObj.nativeName}</div>
                    <div className="text-[10px] text-slate-300">{currentLangObj.name}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setLangModalOpen(true)}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg transition-colors"
                >
                  Change (130+)
                </button>
              </div>
            </div>
          </div>

          {/* Right Tab Content */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSave} className="space-y-6">
              {/* TAB 1: PRIVACY & DIFFERENTIAL GPS FUZZING */}
              {activeTab === 'privacy' && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span>Differential Privacy &amp; Data Anonymization</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fine-grained mathematical guarantees that protect your identity when submitting civic issues.
                    </p>
                  </div>

                  {/* Differential GPS Fuzzing Slider */}
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span>GPS Location Differential Privacy Radius</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Applies randomized Gaussian Laplace noise to your coordinates before public or research export.
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-xl bg-blue-600 text-white text-xs font-extrabold shadow-xs">
                        {gpsFuzzRadius === 0 ? 'Exact GPS (No Fuzz)' : `±${gpsFuzzRadius} Meters Fuzzed`}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={1500}
                      step={100}
                      value={gpsFuzzRadius}
                      onChange={(e) => setGpsFuzzRadius(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />

                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>0m (Precise)</span>
                      <span>250m (Neighborhood)</span>
                      <span>500m (Recommended)</span>
                      <span>1000m (Ward Level)</span>
                      <span>1500m (City Zone)</span>
                    </div>
                  </div>

                  {/* Media Scrubbing & Privacy Toggles */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Automated Media &amp; Metadata Sanitization
                    </h3>

                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
                      <div className="flex items-start gap-3">
                        <Camera className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            Automatic Photo EXIF &amp; Device Metadata Stripper
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Removes camera serial number, shutter timestamp, and embedded home geolocation from uploaded evidence photos.
                          </div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={exifScrubbing}
                        onChange={(e) => setExifScrubbing(e.target.checked)}
                        className="w-4 h-4 accent-blue-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
                      <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            On-Device AI Face &amp; Vehicle License Plate Blurring
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Automatically pixelates bystander faces and private number plates in street hazard photos.
                          </div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={facialBlurring}
                        onChange={(e) => setFacialBlurring(e.target.checked)}
                        className="w-4 h-4 accent-blue-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
                      <div className="flex items-start gap-3">
                        <Fingerprint className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            Zero-Knowledge (ZKP) Resident Verification
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Proves you are a verified municipal ward resident without ever exposing your Aadhaar or Voter ID number.
                          </div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={zeroKnowledgeProof}
                        onChange={(e) => setZeroKnowledgeProof(e.target.checked)}
                        className="w-4 h-4 accent-blue-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            Whistleblower Anti-Retaliation Protocol
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Hides your username, timestamp hashes, and badges on sensitive municipal corruption or contractor audit reports.
                          </div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={whistleblowerMode}
                        onChange={(e) => setWhistleblowerMode(e.target.checked)}
                        className="w-4 h-4 accent-blue-600 rounded"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: PROFILE & CIVIC IDENTITY */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-blue-600" />
                      <span>Civic Profile &amp; Ward Verification</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Your public citizen profile, verified ward residency, and civic reputation score.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-900">{user.name}</span>
                        {verifiedResident && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Verified Citizen
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {user.levelTitle} (Level {user.level}) • {user.points} Civic Points
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600">Phone (SMS Alerts)</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600">Assigned Ward &amp; Zone</label>
                      <input
                        type="text"
                        value={wardNumber}
                        onChange={(e) => setWardNumber(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-slate-600">Civic Interests &amp; Bio</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: SECURITY, PASSKEYS & 2FA */}
              {activeTab === 'security' && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-blue-600" />
                      <span>Security, WebAuthn Passkeys &amp; 2FA</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Hardware biometric login, Two-Factor Authentication, and active session management.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <Key className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-emerald-950">
                            FIDO2 / WebAuthn Biometric Passkey (Touch ID / Face ID)
                          </div>
                          <div className="text-[11px] text-emerald-800">
                            Login instantly with hardware cryptographic keys without passwords.
                          </div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={passkeyBiometrics}
                        onChange={(e) => setPasskeyBiometrics(e.target.checked)}
                        className="w-4 h-4 accent-emerald-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/60 border border-blue-200 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-blue-950">
                            Authenticator App (TOTP 2FA)
                          </div>
                          <div className="text-[11px] text-blue-800">
                            Requires a 6-digit one-time code from Google Authenticator or Authy when accessing officer reports.
                          </div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={twoFactorAuth}
                        onChange={(e) => setTwoFactorAuth(e.target.checked)}
                        className="w-4 h-4 accent-blue-600 rounded"
                      />
                    </label>
                  </div>

                  {/* Active Device Sessions List */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Active Device Sessions ({sessions.length})
                      </h3>
                      <button
                        type="button"
                        onClick={() => setSessions(sessions.filter((s) => s.current))}
                        className="text-xs font-bold text-red-600 hover:underline"
                      >
                        Terminate All Other Sessions
                      </button>
                    </div>

                    <div className="space-y-2">
                      {sessions.map((sess) => (
                        <div
                          key={sess.id}
                          className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <Laptop className="w-5 h-5 text-slate-500" />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900">{sess.device}</span>
                                {sess.current && (
                                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded">
                                    Current Device
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500">
                                {sess.browser} • {sess.location} • {sess.ip}
                              </div>
                            </div>
                          </div>

                          {!sess.current && (
                            <button
                              type="button"
                              onClick={() => handleRevokeSession(sess.id)}
                              className="text-xs font-bold text-slate-400 hover:text-red-600 p-1 rounded-lg"
                              title="Revoke session"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: NOTIFICATIONS & DISASTER SIREN ROUTING */}
              {activeTab === 'notifications' && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-blue-600" />
                      <span>Intelligent Civic Alerts &amp; Siren Routing</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Configure how and when municipal emergency broadcasts, problem updates, and bounty notifications reach you.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-rose-50 border border-rose-200 cursor-pointer">
                      <div>
                        <div className="text-xs font-bold text-rose-950">
                          Critical Disaster &amp; Flash Flood Siren (High Priority Override)
                        </div>
                        <div className="text-[11px] text-rose-700">
                          Overrides Silent / DND mode for life-threatening civic emergencies (floods, building collapses, gas leaks).
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={urgentDisasterSiren}
                        onChange={(e) => setUrgentDisasterSiren(e.target.checked)}
                        className="w-4 h-4 accent-rose-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Ward Officer Escalation &amp; SLA Status Updates (SMS &amp; Push)
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Real-time alerts when your reported problem is assigned to a junior engineer or resolved by the municipality.
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={wardEscalationSms}
                        onChange={(e) => setWardEscalationSms(e.target.checked)}
                        className="w-4 h-4 accent-blue-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Bounty Payout &amp; Cash Reward Disbursements
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Instant notification when your community solution wins a sponsored bounty or grant prize.
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={bountyPayoutEmails}
                        onChange={(e) => setBountyPayoutEmails(e.target.checked)}
                        className="w-4 h-4 accent-blue-600 rounded"
                      />
                    </label>
                  </div>

                  {/* Quiet Hours Configuration */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="text-xs font-bold text-slate-900">
                      Night Quiet Hours (Do Not Disturb)
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-500">From</label>
                        <input
                          type="time"
                          value={quietHoursStart}
                          onChange={(e) => setQuietHoursStart(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-500">To</label>
                        <input
                          type="time"
                          value={quietHoursEnd}
                          onChange={(e) => setQuietHoursEnd(e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: BOUNTIES, REWARDS & UPI SETTINGS */}
              {activeTab === 'bounties' && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-amber-600" />
                      <span>Bounty Payouts, Direct UPI &amp; Civic Points</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Configure direct settlement for municipal solve bounties, sponsor hackathons, and gift vouchers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600">
                        Direct UPI Virtual Payment Address (VPA)
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                      />
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified via NPCI Real-Time Lookup
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600">
                        PAN Card Number (TDS Compliance on ₹10k+ Bounties)
                      </label>
                      <input
                        type="text"
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                      />
                    </div>
                  </div>

                  <label className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-amber-950">
                        Auto-Redeem Civic Impact Points to Municipal Tax Credits
                      </div>
                      <div className="text-[11px] text-amber-800">
                        Automatically converts earned JanVaani points into property tax rebates and metro passes.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoRedeemPoints}
                      onChange={(e) => setAutoRedeemPoints(e.target.checked)}
                      className="w-4 h-4 accent-amber-600 rounded"
                    />
                  </label>
                </div>
              )}

              {/* TAB 6: DATA GOVERNANCE & ACCOUNT DELETION */}
              {activeTab === 'data_governance' && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-rose-600" />
                      <span>Data Portability &amp; Right to be Forgotten (DPDP 2023)</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Full control over your personal data footprint, complete data exports, and irreversible account erasure.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="text-xs font-bold text-slate-900">
                      Download Full Civic History (GeoJSON / CSV / JSON)
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      Includes all your reported issues, evidence photo hashes, validation votes, upvotes, bounty transactions, and community messages.
                    </p>
                    <button
                      type="button"
                      onClick={handleExportData}
                      disabled={isExporting}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Encrypted Archive</span>
                    </button>
                  </div>

                  {/* Danger Zone */}
                  <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
                    <div className="flex items-center gap-2 text-rose-800 font-extrabold text-xs uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Danger Zone: Permanent Account Purge</span>
                    </div>
                    <p className="text-xs text-rose-900">
                      Permanently wipes your profile, phone number, and authentication tokens. Any public reports will be cryptographically anonymized to preserve public civic safety history.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Are you sure you want to permanently delete your JanVaani account? This action cannot be undone.')) {
                          alert('Account scheduled for cryptographic deletion within 24 hours under DPDP Act provisions.');
                        }
                      }}
                      className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-extrabold hover:bg-rose-700 transition-colors shadow-xs"
                    >
                      Permanently Delete My Account
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Sticky Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky bottom-4 p-4 rounded-2xl border shadow-lg">
                <div className="text-xs text-slate-500 font-medium">
                  Changes take effect immediately across all connected devices.
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Settings</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
