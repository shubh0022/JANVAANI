'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { CIVIC_TAXONOMY } from '@/lib/taxonomy';
import {
  Mic,
  MicOff,
  Camera,
  MapPin,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Clock,
  Users,
  ShieldAlert,
  Building2,
  FileText,
  Trash2,
  Trophy,
} from 'lucide-react';

export default function ReportProblemPage() {
  const router = useRouter();
  const { addProblem, user } = useApp();

  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('7th Cross Road, Near Swaminarayan Temple, Karelibaug');
  const [ward, setWard] = useState('Ward 7');
  const [city, setCity] = useState('Vadodara');
  const [stateName, setStateName] = useState('Gujarat');
  const [pincode, setPincode] = useState('390018');
  const [categoryId, setCategoryId] = useState('infrastructure');
  const [subcategoryId, setSubcategoryId] = useState('waterlogging');
  const [evidenceFiles, setEvidenceFiles] = useState<
    Array<{ id: string; url: string; title: string; type: 'photo' | 'audio' }>
  >([
    {
      id: 'e1',
      url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop&q=80',
      title: 'Waterlogged Street Photo',
      type: 'photo',
    },
  ]);
  const [durationDays, setDurationDays] = useState(7);
  const [affectedPopulation, setAffectedPopulation] = useState(2500);
  const [urgencyScore, setUrgencyScore] = useState(85);
  const [safetyCheckPassed, setSafetyCheckPassed] = useState(true);
  const [submittedCaseId, setSubmittedCaseId] = useState<string | null>(null);

  // Voice recording simulation
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordDuration(0);
      const timer = setInterval(() => {
        setRecordDuration((d) => {
          if (d >= 8) {
            clearInterval(timer);
            setIsRecording(false);
            if (!title) setTitle('Severe Waterlogging and Blocked Storm Drain in Karelibaug');
            if (!description) {
              setDescription(
                'Water has accumulated up to 1.5 feet after heavy rain. Drains are choked with silt and debris. Resident vehicles are stranded.'
              );
            }
            return 8;
          }
          return d + 1;
        });
      }, 1000);
    } else {
      setIsRecording(false);
    }
  };

  const handleNext = () => {
    if (step < 7) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinalSubmit = () => {
    const selectedCat = CIVIC_TAXONOMY.find((c) => c.id === categoryId);
    const selectedSub = selectedCat?.subcategories.find((s) => s.id === subcategoryId);

    const created = addProblem({
      title: title || 'Reported Civic Problem',
      description: description || 'No description provided.',
      categoryId,
      categoryName: selectedCat?.name || 'Infrastructure & Roads',
      categoryIcon: selectedCat?.icon || 'Hammer',
      subcategoryId,
      subcategoryName: selectedSub?.name || 'General Concern',
      location: {
        address,
        ward,
        city,
        district: city,
        state: stateName,
        pincode,
        lat: 22.3255,
        lng: 73.1952,
      },
      severity: urgencyScore > 80 ? 'high' : urgencyScore > 50 ? 'medium' : 'low',
      affectedPopulation,
      urgencyScore,
      durationDays,
      evidence: evidenceFiles.map((f) => ({
        id: f.id,
        problemId: 'pending',
        type: f.type,
        url: f.url,
        title: f.title,
        uploaderName: user.name,
        uploaderRole: `${user.role} Contributor`,
        uploadedAt: 'Just now',
        verifiedAi: true,
        tamperCheck: 'passed',
      })),
      aiAnalysis: {
        summary: `Multi-modal analysis confirms ${title.toLowerCase()} in ${city} ${ward}. High likelihood of municipal drainage dispatch required.`,
        confidence: 96.5,
        similarCasesCount: 2,
        detectedUrgency: urgencyScore > 80 ? 'High Priority' : 'Medium Priority',
        routingDepartment: `${selectedCat?.name} Zonal Department`,
        routingRationale: `Auto-categorized based on acoustic voice signals and text entities.`,
        sentiment: 'frustrated',
        entities: [city, ward, selectedSub?.name || 'Civic issue'],
        safetyEmergencyFlag: false,
      },
    });

    setSubmittedCaseId(created.id);
  };

  // SUCCESS SCREEN
  if (submittedCaseId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 animate-in zoom-in-95">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg ring-8 ring-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Problem Registered Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
            Your Voice Has Been Recorded
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Your report is now live for neighborhood validation and has been automatically routed to the responsible municipal department.
          </p>
        </div>

        {/* Case ID Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-4 max-w-md mx-auto">
          <div className="text-xs text-slate-400 font-bold uppercase">Official Tracking Case ID</div>
          <div className="font-mono text-2xl font-black text-blue-600 bg-blue-50 py-2 rounded-xl border border-blue-100">
            {submittedCaseId}
          </div>

          <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 flex items-center justify-between text-xs text-purple-900 font-bold">
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-purple-600" />
              <span>Civic Reward Earned</span>
            </div>
            <span className="text-sm font-black text-purple-700">+120 Points</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href={`/problems/${submittedCaseId}`}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Track Problem Live Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-xs"
          >
            Go to My Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Step Progress Tracker */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Step {step} of 7: {
              step === 1 ? 'What Happened?' :
              step === 2 ? 'Location' :
              step === 3 ? 'Category' :
              step === 4 ? 'Evidence' :
              step === 5 ? 'Impact & Urgency' :
              step === 6 ? 'AI Understanding' :
              'Preview & Submit'
            }
          </span>
          <span className="text-xs text-slate-400 font-semibold">{Math.round((step / 7) * 100)}% Completed</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Step Body Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-card space-y-6">
        {/* STEP 1: WHAT HAPPENED */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                What Happened? (Speak or Type)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                You can record a voice memo in Hindi, Gujarati, Tamil, Bengali or English, or write in plain text.
              </p>
            </div>

            {/* Voice Recording Box */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-200/80 text-center space-y-4">
              <button
                type="button"
                onClick={toggleRecording}
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg transition-all transform hover:scale-105 ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse ring-8 ring-red-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
              </button>

              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-900">
                  {isRecording ? `Recording... (${recordDuration}s / 10s)` : 'Tap Microphone to Speak'}
                </div>
                <div className="text-[11px] text-slate-500">
                  {isRecording ? 'JanVaani Voice AI is listening...' : 'Auto-transcribes & extracts problem details'}
                </div>
              </div>
            </div>

            {/* Problem Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Problem Title / One-Line Summary
              </label>
              <input
                type="text"
                placeholder="e.g. Severe waterlogging and blocked storm drain on 7th Street"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:border-blue-500 outline-none"
              />
            </div>

            {/* Problem Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Detailed Description
              </label>
              <textarea
                rows={4}
                placeholder="Describe what is broken, how long it has been there, and how it impacts people in the area..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Where is This Located?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Pinpoint the exact street, municipal ward, and landmark for rapid municipal routing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Street Address / Landmark
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Municipal Ward
                </label>
                <input
                  type="text"
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  State
                </label>
                <input
                  type="text"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Pincode
                </label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* GPS Auto-detect Button */}
            <button
              type="button"
              onClick={() => {
                setAddress('7th Cross Road, Near Swaminarayan Temple, Karelibaug');
                setWard('Ward 7');
                setCity('Vadodara');
              }}
              className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs flex items-center gap-2 border border-blue-200"
            >
              <MapPin className="w-4 h-4" />
              <span>Use Current GPS Location (22.3255° N, 73.1952° E)</span>
            </button>
          </div>
        )}

        {/* STEP 3: CATEGORY */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Choose Category & Department
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select from 100+ categories or use JanVaani AI auto-selection.
              </p>
            </div>

            {/* AI Recommendation Pill */}
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 flex items-center gap-2 text-xs text-purple-900 font-semibold">
              <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
              <span>AI Suggestion: &ldquo;Infrastructure & Roads → Waterlogging & Storm Drainage&rdquo; based on description.</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CIVIC_TAXONOMY.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setCategoryId(cat.id);
                    setSubcategoryId(cat.subcategories[0]?.id || 'general');
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    categoryId === cat.id
                      ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200 text-blue-900 font-bold'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold mb-1">{cat.name}</div>
                  <div className="text-[10px] text-slate-400">{cat.subcategories.length} subcategories</div>
                </button>
              ))}
            </div>

            {/* Subcategory Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Subcategory Specifics
              </label>
              <select
                value={subcategoryId}
                onChange={(e) => setSubcategoryId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800"
              >
                {CIVIC_TAXONOMY.find((c) => c.id === categoryId)?.subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name} — {sub.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* STEP 4: EVIDENCE */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Attach Evidence (Photos & Audio)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Genuine evidence ensures high priority and faster authority mobilization.
              </p>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-3xl p-8 text-center space-y-3 bg-slate-50">
              <Upload className="w-8 h-8 text-blue-600 mx-auto" />
              <div className="text-xs font-bold text-slate-700">
                Drag & Drop Photos, Videos, or Audio Memos
              </div>
              <p className="text-[11px] text-slate-400">
                PNG, JPG, MP4, MP3 up to 25MB each (AI Tamper Verification active)
              </p>
              <button
                type="button"
                onClick={() => {
                  setEvidenceFiles((prev) => [
                    ...prev,
                    {
                      id: `e_${Date.now()}`,
                      url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80',
                      title: 'Choked Storm Drain Grate Photo',
                      type: 'photo',
                    },
                  ]);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm hover:bg-blue-700"
              >
                + Add Simulated Photo Evidence
              </button>
            </div>

            {/* Evidence Thumbnails */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {evidenceFiles.map((file) => (
                <div key={file.id} className="relative rounded-2xl overflow-hidden border border-slate-200 group">
                  <img src={file.url} alt={file.title} className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-slate-950/40 p-2 flex flex-col justify-between text-white text-[10px]">
                    <span className="bg-emerald-600 font-bold px-1.5 py-0.5 rounded self-start">
                      ✓ AI Verified
                    </span>
                    <span className="truncate">{file.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: IMPACT & URGENCY */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Impact & Urgency Assessment
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Help calculate the severity score to prioritize municipal workforce deployment.
              </p>
            </div>

            {/* Urgency Slider */}
            <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Perceived Urgency Score</span>
                <span className="font-mono text-base text-rose-600">{urgencyScore} / 100</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={urgencyScore}
                onChange={(e) => setUrgencyScore(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Minor Inconvenience</span>
                <span>Moderate Hazard</span>
                <span>Critical Public Hazard</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  How long has this issue persisted?
                </label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
                >
                  <option value={1}>Less than 24 hours</option>
                  <option value={3}>2 - 3 Days</option>
                  <option value={7}>1 Week</option>
                  <option value={14}>2 Weeks</option>
                  <option value={30}>More than 1 Month</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Estimated People Affected
                </label>
                <select
                  value={affectedPopulation}
                  onChange={(e) => setAffectedPopulation(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
                >
                  <option value={100}>50 - 200 Residents (Single Lane)</option>
                  <option value={1000}>500 - 1,500 Residents (Neighborhood)</option>
                  <option value={5000}>2,000 - 10,000 Commuters (Main Road)</option>
                  <option value={20000}>10,000+ Citizens (City Corridor)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: AI UNDERSTANDING */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                  Here&apos;s What JanVaani Understood
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Review and confirm before final registration.
                </p>
              </div>
            </div>

            <div className="bg-purple-50/70 p-5 rounded-3xl border border-purple-200 space-y-4 text-xs">
              <div>
                <span className="font-bold text-purple-900 uppercase text-[10px] block">Problem Summary</span>
                <p className="text-slate-800 font-semibold text-sm mt-0.5">{title || 'Waterlogging in Karelibaug'}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-purple-100">
                <div>
                  <span className="font-bold text-purple-900 uppercase text-[10px] block">Detected Urgency</span>
                  <span className="font-bold text-rose-700">High Priority ({urgencyScore}/100)</span>
                </div>
                <div>
                  <span className="font-bold text-purple-900 uppercase text-[10px] block">Responsible Dept</span>
                  <span className="font-bold text-slate-900">Engineering & Stormwater Drainage</span>
                </div>
              </div>

              <div className="pt-2 border-t border-purple-100">
                <span className="font-bold text-purple-900 uppercase text-[10px] block">Geographic Entities</span>
                <span className="text-slate-700">{address}, {ward}, {city}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: PREVIEW & SUBMIT */}
        {step === 7 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Preview & Submit Problem Case
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Your report will be registered with a unique tracking code (JV-2026-XXXXXX).
              </p>
            </div>

            {/* Emergency Checkbox */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 space-y-1">
                <div className="font-bold">Life-Safety Emergency Check</div>
                <p>
                  I confirm that this report does not represent an active building collapse, active fire, or violent crime requiring immediate 112 emergency response.
                </p>
              </div>
            </div>

            {/* Reporter Reward Notice */}
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 flex items-center justify-between text-xs text-blue-900 font-bold">
              <span>Eligible Civic Points on Submission:</span>
              <span className="text-sm font-black text-blue-700">+120 Points</span>
            </div>
          </div>
        )}

        {/* Step Action Buttons Footer */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>
          ) : (
            <div />
          )}

          {step < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/25"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Submit Problem & Earn +120 Pts</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
