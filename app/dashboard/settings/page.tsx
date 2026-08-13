'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { ArrowLeft, Save, Shield, Globe, Bell, Eye, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const { user, language, setLanguage } = useApp();
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-950">Account & Privacy Settings</h1>
          <p className="text-xs text-slate-500">Manage profile identity, location precision, and notification preferences.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Profile Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-600">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-600">Primary Municipality / Ward</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-slate-600">Bio & Civic Interests</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Privacy by Design */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Privacy Controls</h3>

          <div className="space-y-2">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <div className="text-xs font-bold text-slate-900">Anonymize GPS Coordinates in Open Research</div>
                <div className="text-[11px] text-slate-500">Applies 500m differential privacy fuzzing to public research exports.</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 rounded" />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <div className="text-xs font-bold text-slate-900">Public Profile Visibility on Leaderboard</div>
                <div className="text-[11px] text-slate-500">Show badges and civic impact score to other community members.</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 rounded" />
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {saved ? (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings saved successfully!</span>
            </span>
          ) : (
            <div />
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
