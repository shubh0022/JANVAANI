'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { Bell, CheckCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead, markAllNotificationsRead } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-950">Notification Center</h1>
            <p className="text-xs text-slate-500">Real-time alerts on your problem cases, government dispatches, and rewards.</p>
          </div>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-700 flex items-center gap-1.5"
        >
          <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Mark All Read</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-card divide-y divide-slate-100 overflow-hidden">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markNotificationAsRead(n.id)}
            className={`p-5 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors ${
              !n.read ? 'bg-blue-50/40' : ''
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">{n.title}</span>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                )}
              </div>
              <p className="text-xs text-slate-600">{n.message}</p>
              <div className="text-[10px] text-slate-400 font-medium">{n.timestamp}</div>
            </div>

            <Link
              href={n.link}
              className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 shrink-0 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
