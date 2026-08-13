'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { useApp } from '@/lib/store';
import { StatusBadge, SeverityBadge } from '@/components/ui/StatusBadge';
import { CivicReactions } from '@/components/ui/CivicReactions';
import { ProblemTimeline } from '@/components/ui/ProblemTimeline';
import { SolutionCard } from '@/components/cards/SolutionCard';
import {
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  Building2,
  Sparkles,
  Camera,
  Volume2,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Send,
  MessageSquare,
  Bookmark,
  Share2,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  PhoneCall,
  UserCheck,
} from 'lucide-react';

export default function ProblemDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { problems, solutions, voteCitizenVerification, user } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'evidence' | 'ai_analysis' | 'solutions' | 'timeline' | 'autopsy'>('overview');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 'c1',
      author: 'Amit Trivedi',
      role: 'Resident Validator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      time: '1 hour ago',
      text: 'I witnessed this yesterday during the morning rain. The entire junction was blocked for 2 hours. Good to see VMC jetting machine arriving.',
    },
    {
      id: 'c2',
      author: 'Dr. Vikram Shah',
      role: 'Civic Expert',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      time: '45 mins ago',
      text: 'The fundamental flaw here is the road resurfacing slope. Merely desilting the chamber is a temporary 2-week fix. We must install raised curb inlets.',
    },
  ]);

  const problem = problems.find((p) => p.id === id) || problems[0];
  if (!problem) return notFound();

  const linkedSolutions = solutions.filter((s) => s.problemId === problem.id);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: `c_${Date.now()}`,
        author: user.name,
        role: `${user.role} Contributor`,
        avatar: user.avatar,
        time: 'Just now',
        text: commentText.trim(),
      },
    ]);
    setCommentText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Link href="/problems" className="hover:text-blue-600 flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Problems</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span>{problem.location.state}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span>{problem.location.city}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-mono font-bold text-slate-800">{problem.id}</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-semibold text-slate-700">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-semibold text-slate-700">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                {problem.id}
              </span>
              <SeverityBadge severity={problem.severity} />
              <StatusBadge status={problem.status} />
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                {problem.categoryName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-snug">
              {problem.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="font-semibold text-slate-800">{problem.location.address}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{problem.location.ward}, {problem.location.city}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Reported {problem.reportedAt}</span>
              </div>
            </div>
          </div>

          {/* Reporter Profile Badge */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0 flex items-center gap-3">
            <img
              src={problem.reportedBy.avatar}
              alt={problem.reportedBy.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Reported By</span>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <span>{problem.reportedBy.name}</span>
                {problem.reportedBy.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
              </div>
              <span className="text-[11px] text-blue-600 font-semibold">{problem.reportedBy.role}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-t border-slate-100 pt-4 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Impact' },
            { id: 'evidence', label: `Evidence Gallery (${problem.evidence.length})` },
            { id: 'ai_analysis', label: 'AI Multi-Modal Intel' },
            { id: 'solutions', label: `Proposed Solutions (${linkedSolutions.length})` },
            { id: 'timeline', label: '9-Step Lifecycle' },
            { id: 'autopsy', label: 'Problem Autopsy' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all min-w-max ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Tab Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Problem Description */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Problem Description
                </h3>
                <p className="text-sm text-slate-800 leading-relaxed font-normal">
                  {problem.description}
                </p>
              </div>

              {/* Impact Breakdown Matrix */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Citizen Impact Assessment
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Affected People</span>
                    <span className="text-lg font-black text-slate-900">{problem.affectedPopulation.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Urgency Score</span>
                    <span className="text-lg font-black text-rose-600">{problem.urgencyScore} / 100</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Duration</span>
                    <span className="text-lg font-black text-slate-900">{problem.durationDays} Days</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Past Reports</span>
                    <span className="text-lg font-black text-blue-600">{problem.previousReportsCount} Clustered</span>
                  </div>
                </div>
              </div>

              {/* Civic Reactions Structured Signal */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card">
                <CivicReactions
                  problemId={problem.id}
                  reactions={problem.civicReactions}
                  userReactions={problem.userReactions}
                />
              </div>

              {/* Citizen Resolution Verification Polling */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-6 text-white space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                      Decentralized Citizen Verification
                    </span>
                    <h3 className="text-lg font-black text-white mt-0.5">
                      Has this civic problem been resolved on ground?
                    </h3>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>

                <p className="text-xs text-blue-100 leading-relaxed">
                  JanVaani does not rely solely on contractor sign-offs. Ground resolution requires independent citizen verification.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <button
                    onClick={() => voteCitizenVerification(problem.id, 'solved')}
                    className={`py-3 px-4 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 border ${
                      problem.citizenVerification?.userVote === 'solved'
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-300'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                    }`}
                  >
                    <span>✅ Yes, Solved</span>
                    <span className="text-[10px] opacity-80">
                      ({problem.citizenVerification?.solvedVotes || 0} votes)
                    </span>
                  </button>

                  <button
                    onClick={() => voteCitizenVerification(problem.id, 'partially_solved')}
                    className={`py-3 px-4 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 border ${
                      problem.citizenVerification?.userVote === 'partially_solved'
                        ? 'bg-amber-600 text-white border-amber-400 shadow-md ring-2 ring-amber-300'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                    }`}
                  >
                    <span>⚠️ Partially Solved</span>
                    <span className="text-[10px] opacity-80">
                      ({problem.citizenVerification?.partiallySolvedVotes || 0} votes)
                    </span>
                  </button>

                  <button
                    onClick={() => voteCitizenVerification(problem.id, 'not_solved')}
                    className={`py-3 px-4 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 border ${
                      problem.citizenVerification?.userVote === 'not_solved'
                        ? 'bg-rose-600 text-white border-rose-400 shadow-md ring-2 ring-rose-300'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                    }`}
                  >
                    <span>❌ Not Solved Yet</span>
                    <span className="text-[10px] opacity-80">
                      ({problem.citizenVerification?.notSolvedVotes || 0} votes)
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EVIDENCE GALLERY */}
          {activeTab === 'evidence' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-950">Verified Evidence Gallery</h3>
                  <p className="text-xs text-slate-500">
                    Tamper-checked photo and voice testimony submitted by citizens.
                  </p>
                </div>
                <button className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200">
                  + Add Additional Evidence
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {problem.evidence.map((ev) => (
                  <div
                    key={ev.id}
                    className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden group"
                  >
                    {ev.type === 'photo' ? (
                      <div className="relative h-48 bg-slate-200">
                        <img
                          src={ev.url}
                          alt={ev.title}
                          className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform"
                          onClick={() => setSelectedPhoto(ev.url)}
                        />
                        <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>AI Tamper Check: PASSED</span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-6 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <Volume2 className="w-6 h-6 text-blue-300" />
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                            Voice Testimonial
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold">{ev.title}</h4>
                          <p className="text-xs text-blue-200 mt-1">
                            Audio recording verified with authentic speech acoustics.
                          </p>
                        </div>
                        <button
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <span>{isPlayingAudio ? 'Pause Memo' : 'Play Voice Memo'}</span>
                        </button>
                      </div>
                    )}

                    <div className="p-3.5 space-y-1">
                      <div className="text-xs font-bold text-slate-900">{ev.title}</div>
                      <div className="text-[11px] text-slate-500 flex items-center justify-between">
                        <span>By {ev.uploaderName} ({ev.uploaderRole})</span>
                        <span>{ev.uploadedAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AI MULTI-MODAL INTEL */}
          {activeTab === 'ai_analysis' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-950">
                      JanVaani Autonomous Multi-Modal AI Analysis
                    </h3>
                    <p className="text-xs text-slate-500">
                      Automated classification, duplicate clustering, sentiment analysis & route deduction.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 text-purple-800 text-xs font-black px-3 py-1.5 rounded-xl font-mono">
                  Confidence: {problem.aiAnalysis.confidence}%
                </div>
              </div>

              {/* AI Summary */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/60 text-xs sm:text-sm text-purple-950 leading-relaxed">
                <span className="font-bold text-purple-900 block uppercase text-[11px] mb-1">
                  Executive AI Triage Summary:
                </span>
                {problem.aiAnalysis.summary}
              </div>

              {/* Intelligence Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-400 uppercase text-[10px] block">
                    Duplicate Cluster Match
                  </span>
                  <div className="font-mono font-bold text-blue-600 text-sm">
                    {problem.aiAnalysis.duplicateClusterId || 'Unique Issue'}
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Clustered with {problem.aiAnalysis.similarCasesCount} surrounding reports within 400m radius.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-400 uppercase text-[10px] block">
                    Target Government Routing
                  </span>
                  <div className="font-bold text-slate-900 text-sm">
                    {problem.aiAnalysis.routingDepartment}
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    {problem.aiAnalysis.routingRationale}
                  </p>
                </div>
              </div>

              {/* Extracted Entities */}
              <div className="space-y-2">
                <span className="font-bold text-slate-400 uppercase text-[10px] block">
                  Extracted Geographic & Infrastructure Entities
                </span>
                <div className="flex flex-wrap gap-2">
                  {problem.aiAnalysis.entities.map((entity, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200"
                    >
                      {entity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROPOSED SOLUTIONS */}
          {activeTab === 'solutions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-950">
                    Vetted Solutions ({linkedSolutions.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Proposals submitted by civil engineers, students, and citizens with KillCritic red-team audits.
                  </p>
                </div>
                <Link
                  href="/solutions"
                  className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700"
                >
                  + Propose a Solution
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {linkedSolutions.map((sol) => (
                  <SolutionCard key={sol.id} solution={sol} />
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card">
              <ProblemTimeline timeline={problem.timeline} />
            </div>
          )}

          {/* TAB 6: AUTOPSY */}
          {activeTab === 'autopsy' && problem.autopsy && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      {problem.autopsy.id}
                    </span>
                    <h3 className="text-base font-black text-slate-950">Problem Autopsy Report</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Post-resolution forensic audit identifying systemic root cause and future prevention.
                  </p>
                </div>
              </div>

              {/* Root Cause & Process Failure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                  <span className="font-bold text-rose-800 uppercase text-[10px] block">
                    Identified Root Cause
                  </span>
                  <p className="text-rose-950 font-medium leading-relaxed">
                    {problem.autopsy.rootCause}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-800 uppercase text-[10px] block">
                    Process Failure
                  </span>
                  <p className="text-amber-950 font-medium leading-relaxed">
                    {problem.autopsy.processFailure}
                  </p>
                </div>
              </div>

              {/* Prevention Recommendations */}
              <div className="space-y-2">
                <span className="font-bold text-slate-400 uppercase text-[10px] block">
                  Prevention & Engineering Recommendations
                </span>
                <div className="space-y-1.5">
                  {problem.autopsy.preventionRecommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Community Comments Thread */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>Community Discussion ({comments.length})</span>
              </h3>
            </div>

            {/* Post Comment Input */}
            <form onSubmit={handlePostComment} className="flex gap-2">
              <input
                type="text"
                placeholder="Share ground reality, updates, or helpful context..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-blue-500 outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4 divide-y divide-slate-100">
              {comments.map((comment) => (
                <div key={comment.id} className="pt-3 first:pt-0 flex items-start gap-3">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{comment.author}</span>
                        <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                          {comment.role}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{comment.time}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Authority SLA Card & Location GIS */}
        <div className="lg:col-span-4 space-y-6">
          {/* Authority SLA & Dispatch Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Responsible Authority
              </span>
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {problem.assignedAuthority.agency}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                {problem.assignedAuthority.department}
              </p>
            </div>

            {problem.assignedAuthority.officer && (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Officer</span>
                <span className="font-semibold text-slate-800">{problem.assignedAuthority.officer}</span>
              </div>
            )}

            {/* SLA Countdown Timer */}
            <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900">SLA Response Countdown</span>
                <span className="font-mono font-black text-blue-700">
                  {problem.assignedAuthority.slaHoursRemaining}h remaining
                </span>
              </div>
              <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{
                    width: `${Math.max(
                      10,
                      (problem.assignedAuthority.slaHoursRemaining / problem.assignedAuthority.slaTargetHours) *
                        100
                    )}%`,
                  }}
                />
              </div>
              <span className="text-[10px] text-blue-600 block">
                Target Resolution: {problem.assignedAuthority.slaTargetHours} Hours Standard SLA
              </span>
            </div>

            {problem.assignedAuthority.officialRemarks && (
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-1">
                <span className="text-[10px] font-bold text-amber-800 uppercase block">
                  Official Authority Remark
                </span>
                <p className="text-amber-950 italic text-[11px]">
                  &ldquo;{problem.assignedAuthority.officialRemarks}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Location Coordinates & Mini Map preview */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                GIS Geospatial Tag
              </span>
              <MapPin className="w-4 h-4 text-rose-500" />
            </div>

            <div className="h-44 bg-slate-900 rounded-2xl relative overflow-hidden border border-slate-200 flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="relative z-10 text-center text-white space-y-1">
                <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center mx-auto ring-4 ring-rose-400/40 animate-pulse">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs font-mono font-bold">
                  {problem.location.lat.toFixed(4)}° N, {problem.location.lng.toFixed(4)}° E
                </div>
                <div className="text-[10px] text-slate-300">
                  {problem.location.ward}, {problem.location.pincode}
                </div>
              </div>
            </div>

            <Link
              href="/map"
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-xs text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Open in Fullscreen GIS Map</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
