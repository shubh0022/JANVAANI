'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { useApp } from '@/lib/store';
import { ProblemCard } from '@/components/cards/ProblemCard';
import {
  Users,
  MapPin,
  MessageSquare,
  Sparkles,
  Award,
  Send,
  CheckCircle2,
  ArrowLeft,
  Share2,
} from 'lucide-react';

export default function CommunityDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { communities, problems, toggleJoinCommunity, user } = useApp();

  const [activeTab, setActiveTab] = useState<'feed' | 'problems' | 'polls'>('feed');
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 'p1',
      author: 'Neha Sharma',
      role: 'Civic Champion',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      time: '2 hours ago',
      content:
        'Great news! The desilting work in Karelibaug Ward 7 is scheduled today. Anyone near Swaminarayan Temple please verify after 5 PM.',
      likes: 24,
    },
    {
      id: 'p2',
      author: 'Er. Rajesh Patel',
      role: 'Govt Liaison',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      time: '5 hours ago',
      content:
        'VMC has issued notice to telecom providers regarding incomplete paver blocks on VIP Road. Reinstatement must be finished within 48 hours.',
      likes: 38,
    },
  ]);

  const community =
    communities.find((c) => c.slug === id || c.id === id) || communities[0];
  if (!community) return notFound();

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    setPosts((prev) => [
      {
        id: `p_${Date.now()}`,
        author: user.name,
        role: `${user.role} Contributor`,
        avatar: user.avatar,
        time: 'Just now',
        content: postText.trim(),
        likes: 1,
      },
      ...prev,
    ]);
    setPostText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link href="/communities" className="hover:text-blue-600 flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Communities</span>
        </Link>
        <button className="flex items-center gap-1 font-semibold hover:text-slate-900">
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Hub</span>
        </button>
      </div>

      {/* Community Banner & Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        <div className="relative h-44 sm:h-56 w-full bg-slate-900">
          <img
            src={community.banner}
            alt={community.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-4 left-6 text-white text-xs font-semibold flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>{community.location}</span>
          </div>
        </div>

        {/* Profile Bar */}
        <div className="px-6 pb-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 mb-4">
            <div className="flex items-end gap-4">
              <img
                src={community.avatar}
                alt={community.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-xl bg-white"
              />
              <div className="pb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {community.category}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-950 mt-1">
                  {community.name}
                </h1>
              </div>
            </div>

            <button
              onClick={() => toggleJoinCommunity(community.id)}
              className={`px-6 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
                community.joined
                  ? 'bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-600 border border-slate-200'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
              }`}
            >
              {community.joined ? 'Joined Member ✓' : '+ Join Community'}
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            {community.description}
          </p>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-100 max-w-lg text-center">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-lg font-black text-slate-900">{community.membersCount.toLocaleString()}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Members</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-lg font-black text-amber-600">{community.problemsCount}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Problems</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-lg font-black text-emerald-600">{community.solutionsCount}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Solved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'feed'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Community Discussions ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('problems')}
            className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'problems'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Area Problems ({problems.length})
          </button>
        </div>

        {activeTab === 'feed' ? (
          <div className="space-y-6 max-w-3xl">
            {/* Create Post */}
            <form
              onSubmit={handlePost}
              className="bg-white p-4 rounded-3xl border border-slate-200 shadow-card space-y-3"
            >
              <textarea
                rows={2}
                placeholder="Share a neighborhood update, organize a cleanup, or start a poll..."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-blue-500"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">Posting as {user.name}</span>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Update</span>
                </button>
              </div>
            </form>

            {/* Posts Stream */}
            <div className="space-y-4">
              {posts.map((p) => (
                <div key={p.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={p.avatar} alt={p.author} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{p.author}</div>
                        <span className="text-[10px] text-blue-600 font-semibold">{p.role}</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400">{p.time}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{p.content}</p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <button className="flex items-center gap-1 hover:text-blue-600 font-semibold">
                      <span>👍</span>
                      <span>{p.likes} Support</span>
                    </button>
                    <button className="hover:text-blue-600 font-semibold">Reply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {problems.map((prob) => (
              <ProblemCard key={prob.id} problem={prob} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
