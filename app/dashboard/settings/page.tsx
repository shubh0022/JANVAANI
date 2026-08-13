'use client';

import React, { useState } from 'react';
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
  SlidersHorizontal,
  FileCheck2,
  ShieldAlert,
  ShieldCheck,
  Moon,
  Zap,
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
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [langModalOpen, setLangModalOpen] = useState(false);

  // Profile Information State
  const [name, setName] = useState('Neha Sharma');
  const [email, setEmail] = useState('neha.sharma@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [municipalityWard, setMunicipalityWard] = useState('Karelibaug, Vadodara, Gujarat');
  const [wardNumber, setWardNumber] = useState('Ward 07 (Karelibaug & VIP Road)');
  const [pincode, setPincode] = useState('390018');
  const [bio, setBio] = useState(
    'Civic tech enthusiast, active community validator & urban sustainability advocate.'
  );
  const [verifiedResident, setVerifiedResident] = useState(true);

  // Privacy & Differential Privacy State
  const [gpsFuzzRadius, setGpsFuzzRadius] = useState<number>(500); // 500m differential privacy
  const [publicLeaderboard, setPublicLeaderboard] = useState<boolean>(true);
  const [exifScrubbing, setExifScrubbing] = useState<boolean>(true);
  const [facialBlurring, setFacialBlurring] = useState<boolean>(true);
  const [whistleblowerMode, setWhistleblowerMode] = useState<boolean>(false);
  const [zeroKnowledgeProof, setZeroKnowledgeProof] = useState<boolean>(true);
  const [searchEngineIndexing, setSearchEngineIndexing] = useState<boolean>(false);
  const [aiResearchOptIn, setAiResearchOptIn] = useState<boolean>(true);

  // Security & Authentication State
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(true);
  const [passkeyBiometrics, setPasskeyBiometrics] = useState<boolean>(true);
  const [loginAlerts, setLoginAlerts] = useState<boolean>(true);
  const [sessions, setSessions] = useState([
    {
      id: 'sess_1',
      device: 'MacBook Pro 16" (Sonoma)',
      browser: 'Chrome 128.0 (Encrypted Session)',
      location: 'Vadodara, Gujarat, India',
      ip: '103.212.144.18',
      current: true,
      lastActive: 'Active Now',
    },
    {
      id: 'sess_2',
      device: 'iPhone 15 Pro Max',
      browser: 'JanVaani iOS App v2.4 (Biometric)',
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
  const [quietHoursEnabled, setQuietHoursEnabled] = useState<boolean>(true);
  const [quietHoursStart, setQuietHoursStart] = useState('22:00');
  const [quietHoursEnd, setQuietHoursEnd] = useState('07:00');

  // Wallet & Bounty Payouts State
  const [upiId, setUpiId] = useState('neha.sharma@okhdfcbank');
  const [panNumber, setPanNumber] = useState('ABCPS1234F');
  const [autoRedeemPoints, setAutoRedeemPoints] = useState(true);

  // Data Export State
  const [isExporting, setIsExporting] = useState(false);

  const currentLangObj = getLanguageByCode(language);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(
      'Account, Profile & Privacy preferences successfully saved and synchronized across all secure nodes!'
    );
    setTimeout(() => setSavedMessage(null), 4000);
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
              complianceStandard: 'Digital Personal Data Protection (DPDP) Act 2023 & GDPR',
              dataSubject: {
                name,
                email,
                phone,
                municipalityWard,
                wardNumber,
                pincode,
                bio,
                zkpResidentVerified: verifiedResident,
              },
              privacyConfiguration: {
                differentialPrivacyRadiusMeters: gpsFuzzRadius,
                publicLeaderboardVisibility: publicLeaderboard,
                exifMetadataStripped: exifScrubbing,
                facialNumberPlateBlurring: facialBlurring,
                whistleblowerModeActive: whistleblowerMode,
                zeroKnowledgeResidentProof: zeroKnowledgeProof,
                searchEngineIndexingAllowed: searchEngineIndexing,
              },
              securityProfile: {
                webAuthnPasskeysEnabled: passkeyBiometrics,
                totpTwoFactorEnabled: twoFactorAuth,
                activeSessionsCount: sessions.length,
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
        {/* Top Header Title */}
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
                  Account &amp; Privacy Settings
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  DPDP Act 2023 Compliant
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage profile identity, location precision, differential privacy, and notification preferences.
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
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Profile Information</span>
              </button>

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
                <span>Privacy Controls</span>
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
              {/* TAB 1: PROFILE INFORMATION */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-blue-600" />
                      <span>Profile Information</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Your civic profile identity, municipal jurisdiction, and community credentials.
                    </p>
                  </div>

                  {/* Avatar & Verification Badge Header */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <img
                      src={user.avatar}
                      alt={name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-900">{name}</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Verified Local Resident</span>
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {user.levelTitle} (Level {user.level}) • {user.points} Civic Impact Points
                      </div>
                    </div>
                  </div>

                  {/* Input Fields */}
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
                      <label className="text-xs font-bold uppercase text-slate-600">
                        Primary Municipality / Ward
                      </label>
                      <input
                        type="text"
                        value={municipalityWard}
                        onChange={(e) => setMunicipalityWard(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. Karelibaug, Vadodara, Gujarat"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600">
                        Official Ward Assignment
                      </label>
                      <input
                        type="text"
                        value={wardNumber}
                        onChange={(e) => setWardNumber(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600">
                        Postal Pincode
                      </label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600">
                        Email Address (Official Verification)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600">
                        Mobile Number (SMS &amp; WhatsApp Alerts)
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-slate-600">
                      Bio &amp; Civic Interests
                    </label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g. Civic tech enthusiast, active community validator & urban sustainability advocate."
                    />
                  </div>

                  {/* Zero-Knowledge Residency Badge */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
                    <Fingerprint className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-emerald-950">
                        Zero-Knowledge Resident Proof (ZKP Verified)
                      </div>
                      <div className="text-[11px] text-emerald-800 mt-0.5">
                        Your residency in Karelibaug, Ward 07 was cryptographically verified via DigiLocker offline XML. No Aadhaar or personal address documents are ever stored on platform servers.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PRIVACY CONTROLS */}
              {activeTab === 'privacy' && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span>Privacy Controls</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Differential privacy fuzzing, media redaction, and community visibility settings.
                    </p>
                  </div>

                  {/* 1. Anonymize GPS Coordinates in Open Research Slider */}
                  <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-black text-slate-950 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span>Anonymize GPS Coordinates in Open Research</span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          Applies {gpsFuzzRadius === 0 ? '0m' : `±${gpsFuzzRadius}m`} differential privacy fuzzing to public research exports.
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-xl bg-blue-600 text-white text-xs font-black shadow-xs">
                        {gpsFuzzRadius === 0 ? 'Exact GPS (0m)' : `±${gpsFuzzRadius}m Fuzzing`}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={1500}
                      step={100}
                      value={gpsFuzzRadius}
                      onChange={(e) => setGpsFuzzRadius(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />

                    <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                      <span>0m (Precise)</span>
                      <span>250m (Neighborhood)</span>
                      <span className="text-blue-700 font-extrabold">500m (Recommended)</span>
                      <span>1000m (Ward Level)</span>
                      <span>1500m (City Zone)</span>
                    </div>
                  </div>

                  {/* 2. Public Profile Visibility on Leaderboard */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Eye className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-black text-slate-900">
                          Public Profile Visibility on Leaderboard
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Show badges and civic impact score to other community members.
                        </div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={publicLeaderboard}
                        onChange={(e) => setPublicLeaderboard(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                    </label>
                  </div>

                  {/* Advanced Media & Anonymization Toggles */}
                  <div className="space-y-3 pt-2">
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
                        <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            Whistleblower / High-Risk Civic Reporter Mode
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Submits complaints under a zero-trace pseudorandom cryptographic token (`Citizen #JV-8849`).
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

              {/* TAB 3: SECURITY, PASSKEYS & 2FA */}
              {activeTab === 'security' && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-blue-600" />
                      <span>Security, WebAuthn Passkeys &amp; 2FA</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Hardware biometric login, Two-Factor Authentication, and active session governance.
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

                  {/* Active Device Sessions */}
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
                          Ward Grievance SLA Escalations (SMS / WhatsApp)
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Get real-time notification when a reported issue is assigned to an officer or solved.
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
                          Solution Co-Creation &amp; Community Upvotes
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Alert when an expert reviews your submitted engineering proposal.
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={solutionUpvotesPush}
                        onChange={(e) => setSolutionUpvotesPush(e.target.checked)}
                        className="w-4 h-4 accent-blue-600 rounded"
                      />
                    </label>
                  </div>

                  {/* Quiet Hours Scheduler */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4 text-slate-600" />
                        <span className="text-xs font-bold text-slate-900">
                          Quiet Hours (Mute Non-Emergency Alerts)
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={quietHoursEnabled}
                        onChange={(e) => setQuietHoursEnabled(e.target.checked)}
                        className="w-4 h-4 accent-blue-600 rounded"
                      />
                    </div>

                    {quietHoursEnabled && (
                      <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase block">
                            Start Time
                          </label>
                          <input
                            type="time"
                            value={quietHoursStart}
                            onChange={(e) => setQuietHoursStart(e.target.value)}
                            className="w-full mt-1 p-2 rounded-xl border border-slate-200 bg-white font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase block">
                            End Time
                          </label>
                          <input
                            type="time"
                            value={quietHoursEnd}
                            onChange={(e) => setQuietHoursEnd(e.target.value)}
                            className="w-full mt-1 p-2 rounded-xl border border-slate-200 bg-white font-semibold"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: BOUNTY PAYOUTS & UPI */}
              {activeTab === 'bounties' && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-blue-600" />
                      <span>Civic Rewards &amp; Direct UPI Settlement</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Earned bounties for verified solution implementations and community validations are directly credited via NPCI UPI.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1">
                    <div className="text-xs font-bold text-amber-950">
                      Proof-of-Impact Verified Balance: 2,450 Civic Points (~₹2,450 Bounty Pool)
                    </div>
                    <div className="text-[11px] text-amber-800">
                      Auto-settlement occurs on the 1st of every calendar month.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600">
                        Primary UPI VPA (PhonePe / GPay / Paytm / BHIM)
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-slate-600">
                        PAN Number (TDS Exemption Compliant)
                      </label>
                      <input
                        type="text"
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: DATA RIGHTS & DELETION */}
              {activeTab === 'data_governance' && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-blue-600" />
                      <span>Data Rights, Consent Ledger &amp; Account Erasure</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Full control under Digital Personal Data Protection (DPDP) Act 2023.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Complete Data Portability Package
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Download all your reported problems, comments, solutions, and cryptographic proofs in machine-readable JSON format.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleExportData}
                        disabled={isExporting}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shrink-0"
                      >
                        {isExporting ? 'Exporting...' : 'Download JSON'}
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-rose-950">
                          Right to be Forgotten (Account Deletion &amp; Purge)
                        </div>
                        <div className="text-[11px] text-rose-800">
                          Permanently delete your profile, media files, and auth credentials. Solved civic problems will remain anonymized.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert('Account deletion request initiated with 14-day grace period.')}
                        className="px-3.5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors shrink-0"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Sticky Save Changes Button */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">
                    All edits are signed with SHA-256 integrity tokens.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
