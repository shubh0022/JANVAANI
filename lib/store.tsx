'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProblemCase,
  Solution,
  Community,
  Bounty,
  User,
  CivicReactionType,
  UserRole,
} from './types';
import {
  CURRENT_USER,
  DEMO_USERS,
  INITIAL_PROBLEMS,
  INITIAL_SOLUTIONS,
  INITIAL_COMMUNITIES,
  INITIAL_BOUNTIES,
} from './mock-data';

export type LanguageCode = 'en' | 'hi' | 'gu' | 'ta' | 'mr' | 'bn' | 'te';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'problem' | 'reward' | 'government' | 'solution' | 'bounty' | 'security';
  read: boolean;
  link: string;
}

interface AppContextType {
  user: User;
  activeRole: UserRole;
  language: LanguageCode;
  problems: ProblemCase[];
  solutions: Solution[];
  communities: Community[];
  bounties: Bounty[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  globalSearchOpen: boolean;
  setGlobalSearchOpen: (open: boolean) => void;
  setUserRole: (role: UserRole) => void;
  setLanguage: (lang: LanguageCode) => void;
  toggleCivicReaction: (problemId: string, reaction: CivicReactionType) => void;
  voteCitizenVerification: (problemId: string, vote: 'solved' | 'partially_solved' | 'not_solved') => void;
  addProblem: (problem: Partial<ProblemCase>) => ProblemCase;
  addSolution: (solution: Partial<Solution>) => Solution;
  toggleUpvoteSolution: (solutionId: string) => void;
  toggleJoinCommunity: (communityId: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateProblemStatus: (problemId: string, status: ProblemCase['status'], officialRemarks?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    title: 'Action Update: Karelibaug Waterlogging',
    message: 'Vadodara Municipal Corporation has dispatched suction jetting unit #VMC-SJ-04.',
    timestamp: '30 mins ago',
    type: 'government',
    read: false,
    link: '/problems/JV-2026-002103',
  },
  {
    id: 'notif_02',
    title: 'Civic Reward Earned! (+120 Points)',
    message: 'Your report on Karelibaug Drainage received 25+ neighborhood confirmations.',
    timestamp: '1 hour ago',
    type: 'reward',
    read: false,
    link: '/rewards',
  },
  {
    id: 'notif_03',
    title: 'New Expert Solution Proposed',
    message: 'Er. Rohan Mehta submitted a dual-chamber sump design for your reported problem.',
    timestamp: '4 hours ago',
    type: 'solution',
    read: false,
    link: '/solutions/SOL-2026-101',
  },
  {
    id: 'notif_04',
    title: 'New Active Challenge: Smart Waste Management',
    message: 'Vadodara Innovation Mission launched ₹25,000 bounty challenge.',
    timestamp: '1 day ago',
    type: 'bounty',
    read: true,
    link: '/bounties/BOUNTY-2026-01',
  },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRoleState] = useState<UserRole>('citizen');
  const [user, setUser] = useState<User>(CURRENT_USER);
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [problems, setProblems] = useState<ProblemCase[]>(INITIAL_PROBLEMS);
  const [solutions, setSolutions] = useState<Solution[]>(INITIAL_SOLUTIONS);
  const [communities, setCommunities] = useState<Community[]>(INITIAL_COMMUNITIES);
  const [bounties, setBounties] = useState<Bounty[]>(INITIAL_BOUNTIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);

  const setUserRole = (role: UserRole) => {
    setActiveRoleState(role);
    if (DEMO_USERS[role]) {
      setUser(DEMO_USERS[role]);
    } else {
      setUser({ ...CURRENT_USER, role });
    }
  };

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  const toggleCivicReaction = (problemId: string, reaction: CivicReactionType) => {
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id !== problemId) return p;
        const hasReacted = p.userReactions?.includes(reaction);
        const nextUserReactions = hasReacted
          ? p.userReactions.filter((r) => r !== reaction)
          : [...(p.userReactions || []), reaction];

        const currentCount = p.civicReactions[reaction] || 0;
        const nextCount = hasReacted ? Math.max(0, currentCount - 1) : currentCount + 1;

        return {
          ...p,
          userReactions: nextUserReactions,
          civicReactions: {
            ...p.civicReactions,
            [reaction]: nextCount,
          },
        };
      })
    );
  };

  const voteCitizenVerification = (
    problemId: string,
    vote: 'solved' | 'partially_solved' | 'not_solved'
  ) => {
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id !== problemId) return p;
        const currentVote = p.citizenVerification?.userVote;
        const verification = { ...p.citizenVerification };

        if (currentVote === vote) {
          delete verification.userVote;
          if (vote === 'solved') verification.solvedVotes = Math.max(0, verification.solvedVotes - 1);
          if (vote === 'partially_solved') verification.partiallySolvedVotes = Math.max(0, verification.partiallySolvedVotes - 1);
          if (vote === 'not_solved') verification.notSolvedVotes = Math.max(0, verification.notSolvedVotes - 1);
        } else {
          if (currentVote === 'solved') verification.solvedVotes = Math.max(0, verification.solvedVotes - 1);
          if (currentVote === 'partially_solved') verification.partiallySolvedVotes = Math.max(0, verification.partiallySolvedVotes - 1);
          if (currentVote === 'not_solved') verification.notSolvedVotes = Math.max(0, verification.notSolvedVotes - 1);

          verification.userVote = vote;
          if (vote === 'solved') verification.solvedVotes += 1;
          if (vote === 'partially_solved') verification.partiallySolvedVotes += 1;
          if (vote === 'not_solved') verification.notSolvedVotes += 1;
        }

        return {
          ...p,
          citizenVerification: verification,
        };
      })
    );
  };

  const addProblem = (newP: Partial<ProblemCase>): ProblemCase => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const caseId = `JV-${year}-00${randomNum}`;

    const created: ProblemCase = {
      id: caseId,
      title: newP.title || 'Untitled Civic Problem',
      description: newP.description || '',
      categoryId: newP.categoryId || 'infrastructure',
      categoryName: newP.categoryName || 'Infrastructure & Roads',
      categoryIcon: newP.categoryIcon || 'Hammer',
      subcategoryId: newP.subcategoryId || 'general',
      subcategoryName: newP.subcategoryName || 'General Civic Concern',
      location: newP.location || {
        address: 'Vadodara City Center',
        ward: 'Ward 1',
        city: 'Vadodara',
        district: 'Vadodara',
        state: 'Gujarat',
        pincode: '390001',
        lat: 22.3072,
        lng: 73.1812,
      },
      severity: newP.severity || 'medium',
      status: 'submitted',
      reportedBy: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        role: user.role === 'citizen' ? 'Citizen Reporter' : `${user.role} Contributor`,
        verified: user.verified,
      },
      reportedAt: 'Just now',
      updatedAt: 'Just now',
      evidence: newP.evidence || [],
      affectedPopulation: newP.affectedPopulation || 1500,
      urgencyScore: newP.urgencyScore || 70,
      durationDays: newP.durationDays || 3,
      previousReportsCount: 0,
      assignedAuthority: {
        agency: 'Vadodara Municipal Corporation',
        department: 'Civic Grievance Triage Wing',
        assignedAt: 'Pending routing',
        slaHoursRemaining: 48,
        slaTargetHours: 48,
        slaStatus: 'on_track',
      },
      aiAnalysis: newP.aiAnalysis || {
        summary: 'Newly reported issue triaged via JanVaani Multi-Modal NLP.',
        confidence: 94.0,
        similarCasesCount: 0,
        detectedUrgency: 'Medium Priority',
        routingDepartment: 'Municipal Corporation Grievance Wing',
        routingRationale: 'Auto-detected from report description and category.',
        sentiment: 'factual',
        entities: ['Civic Report', 'Vadodara'],
        safetyEmergencyFlag: false,
      },
      timeline: [
        {
          step: '1',
          label: 'Report Submitted',
          timestamp: 'Just now',
          actor: `${user.name} (${user.role})`,
          details: 'Report registered with verified evidence and location.',
          status: 'completed',
        },
        {
          step: '2',
          label: 'Community Validation',
          timestamp: 'In Progress',
          actor: 'Nearby Citizens',
          details: 'Awaiting local neighborhood endorsements.',
          status: 'current',
        },
      ],
      civicReactions: {
        face_this_too: 1,
        witnessed: 0,
        support: 1,
        have_evidence: 0,
        can_help: 0,
        urgent: newP.severity === 'critical' ? 1 : 0,
        support_solution: 0,
        dispute: 0,
        solved: 0,
      },
      userReactions: ['face_this_too'],
      commentsCount: 0,
      solutionsCount: 0,
      citizenVerification: {
        solvedVotes: 0,
        partiallySolvedVotes: 0,
        notSolvedVotes: 0,
      },
    };

    setProblems((prev) => [created, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: `Problem Registered: ${caseId}`,
      message: 'Your report has been submitted for AI triage & neighborhood validation (+120 pts).',
      timestamp: 'Just now',
      type: 'problem',
      read: false,
      link: `/problems/${caseId}`,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    setUser((u) => ({ ...u, points: u.points + 120 }));

    return created;
  };

  const addSolution = (newSol: Partial<Solution>): Solution => {
    const solId = `SOL-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const created: Solution = {
      id: solId,
      problemId: newSol.problemId || 'JV-2026-002103',
      problemTitle: newSol.problemTitle || 'Waterlogging on 7th Street, Karelibaug',
      problemLocation: newSol.problemLocation || 'Vadodara',
      title: newSol.title || 'Civic Solution Proposal',
      summary: newSol.summary || '',
      author: {
        id: user.id,
        name: user.name,
        role: user.role === 'student' ? 'student' : user.role === 'expert' ? 'expert' : 'community',
        title: user.bio || 'JanVaani Contributor',
        avatar: user.avatar,
        verified: user.verified,
      },
      submittedAt: 'Just now',
      expectedImpact: newSol.expectedImpact || 'High measurable civic outcome',
      estimatedCost: newSol.estimatedCost || '₹50,000',
      implementationTime: newSol.implementationTime || '1 Week',
      feasibilityScore: newSol.feasibilityScore || 85,
      upvotes: 1,
      commentsCount: 0,
      keySteps: newSol.keySteps || ['Site survey', 'Material deployment', 'Community verification'],
      killCriticAnalysis: newSol.killCriticAnalysis || {
        confidenceScore: 84,
        critique: 'Autonomous red-team analysis completed. Feasible civic design with manageable operational risks.',
        assumptionsChallenged: ['Assumes local municipal permission without procedural delay.'],
        unintendedConsequences: ['Requires minimal maintenance follow-up by community.'],
        validationRequirements: ['Validate with zonal assistant engineer before full build.'],
      },
      status: 'under_review',
      userUpvoted: true,
    };

    setSolutions((prev) => [created, ...prev]);
    setUser((u) => ({ ...u, points: u.points + 250 }));
    return created;
  };

  const toggleUpvoteSolution = (solutionId: string) => {
    setSolutions((prev) =>
      prev.map((s) => {
        if (s.id !== solutionId) return s;
        const userUpvoted = !s.userUpvoted;
        return {
          ...s,
          userUpvoted,
          upvotes: userUpvoted ? s.upvotes + 1 : Math.max(0, s.upvotes - 1),
        };
      })
    );
  };

  const toggleJoinCommunity = (communityId: string) => {
    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id !== communityId) return c;
        const joined = !c.joined;
        return {
          ...c,
          joined,
          membersCount: joined ? c.membersCount + 1 : c.membersCount - 1,
        };
      })
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const updateProblemStatus = (
    problemId: string,
    status: ProblemCase['status'],
    officialRemarks?: string
  ) => {
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id !== problemId) return p;
        return {
          ...p,
          status,
          updatedAt: 'Just now',
          assignedAuthority: {
            ...p.assignedAuthority,
            officialRemarks: officialRemarks || p.assignedAuthority.officialRemarks,
          },
        };
      })
    );
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        user,
        activeRole,
        language,
        problems,
        solutions,
        communities,
        bounties,
        notifications,
        unreadNotificationCount,
        globalSearchOpen,
        setGlobalSearchOpen,
        setUserRole,
        setLanguage,
        toggleCivicReaction,
        voteCitizenVerification,
        addProblem,
        addSolution,
        toggleUpvoteSolution,
        toggleJoinCommunity,
        markNotificationAsRead,
        markAllNotificationsRead,
        updateProblemStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
