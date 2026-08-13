export type UserRole =
  | 'citizen'
  | 'student'
  | 'expert'
  | 'researcher'
  | 'ngo'
  | 'moderator'
  | 'admin'
  | 'officer'
  | 'policymaker';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar: string;
  location: string;
  bio: string;
  points: number;
  badgesCount: number;
  level: number;
  levelTitle: string;
  verified: boolean;
  joinedDate: string;
}

export type Severity = 'low' | 'medium' | 'high' | 'critical';

export type ProblemStatus =
  | 'draft'
  | 'submitted'
  | 'validating'
  | 'verified'
  | 'assigned'
  | 'investigating'
  | 'in_progress'
  | 'resolved'
  | 'reopened';

export type CivicReactionType =
  | 'face_this_too'
  | 'witnessed'
  | 'support'
  | 'have_evidence'
  | 'can_help'
  | 'urgent'
  | 'support_solution'
  | 'dispute'
  | 'solved';

export interface Evidence {
  id: string;
  problemId: string;
  type: 'photo' | 'video' | 'audio' | 'document';
  url: string;
  title: string;
  description?: string;
  uploaderName: string;
  uploaderRole: string;
  uploadedAt: string;
  location?: string;
  verifiedAi?: boolean;
  tamperCheck?: 'passed' | 'flagged' | 'inconclusive';
}

export interface ProblemTimelineItem {
  step: string;
  label: string;
  timestamp: string;
  actor: string;
  details: string;
  status: 'completed' | 'current' | 'pending';
}

export interface ProblemAutopsy {
  id: string;
  caseId: string;
  problemTitle: string;
  resolvedOn: string;
  timeline: {
    firstReport: string;
    escalation: string;
    investigation: string;
    intervention: string;
    resolution: string;
    verification: string;
  };
  rootCause: string;
  processFailure: string;
  recurrenceRisk: 'low' | 'medium' | 'high';
  preventionRecommendations: string[];
  systemicPolicyRecommendation: string;
}

export interface ProblemCase {
  id: string; // e.g. JV-2026-002103
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  subcategoryId: string;
  subcategoryName: string;
  location: {
    address: string;
    ward: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    lat: number;
    lng: number;
  };
  severity: Severity;
  status: ProblemStatus;
  reportedBy: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    verified: boolean;
  };
  reportedAt: string;
  updatedAt: string;
  evidence: Evidence[];
  affectedPopulation: number;
  urgencyScore: number; // 0-100
  durationDays: number;
  previousReportsCount: number;
  assignedAuthority: {
    department: string;
    agency: string;
    officer?: string;
    assignedAt: string;
    slaHoursRemaining: number;
    slaTargetHours: number;
    slaStatus: 'on_track' | 'warning' | 'breached';
    officialRemarks?: string;
  };
  aiAnalysis: {
    summary: string;
    confidence: number;
    duplicateClusterId?: string;
    similarCasesCount: number;
    detectedUrgency: string;
    routingDepartment: string;
    routingRationale: string;
    sentiment: 'frustrated' | 'urgent' | 'factual' | 'collaborative';
    entities: string[];
    safetyEmergencyFlag: boolean;
  };
  timeline: ProblemTimelineItem[];
  civicReactions: Record<CivicReactionType, number>;
  userReactions: CivicReactionType[];
  commentsCount: number;
  solutionsCount: number;
  citizenVerification: {
    solvedVotes: number;
    partiallySolvedVotes: number;
    notSolvedVotes: number;
    userVote?: 'solved' | 'partially_solved' | 'not_solved';
  };
  autopsy?: ProblemAutopsy;
}

export interface Solution {
  id: string;
  problemId: string;
  problemTitle: string;
  problemLocation: string;
  title: string;
  summary: string;
  author: {
    id: string;
    name: string;
    role: 'expert' | 'student' | 'community' | 'organization';
    title: string;
    avatar: string;
    verified: boolean;
    organization?: string;
  };
  submittedAt: string;
  expectedImpact: string;
  estimatedCost: string;
  implementationTime: string;
  feasibilityScore: number; // 0-100
  upvotes: number;
  commentsCount: number;
  keySteps: string[];
  killCriticAnalysis: {
    confidenceScore: number;
    critique: string;
    assumptionsChallenged: string[];
    unintendedConsequences: string[];
    validationRequirements: string[];
  };
  status: 'submitted' | 'under_review' | 'accepted' | 'implemented' | 'rejected';
  userUpvoted?: boolean;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  banner: string;
  avatar: string;
  category: string;
  location: string;
  membersCount: number;
  problemsCount: number;
  solutionsCount: number;
  moderators: string[];
  trending: boolean;
  joined?: boolean;
}

export interface Bounty {
  id: string;
  title: string;
  organization: string;
  orgLogo: string;
  problemId?: string;
  problemTitle: string;
  location: string;
  rewardAmount: number;
  currency: string;
  deadline: string;
  daysLeft: number;
  participantsCount: number;
  category: string;
  description: string;
  requirements: string[];
  judgingCriteria: string[];
  status: 'active' | 'judging' | 'completed';
  winner?: {
    name: string;
    solutionTitle: string;
    awardedAt: string;
  };
}

export interface CivicBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  category: string;
  earnedDate?: string;
  unlocked: boolean;
}

export interface TopContributor {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  location: string;
  role: string;
  points: number;
  badgesCount: number;
  problemsReported: number;
  verificationsCount: number;
  solutionsCount: number;
}

export interface ResearchDataset {
  id: string;
  title: string;
  description: string;
  category: string;
  recordsCount: number;
  geographicScope: string;
  timeRange: string;
  privacyMeasures: string[];
  downloadFormats: string[];
  sizeMb: number;
  lastUpdated: string;
}

export interface GovernmentDepartment {
  id: string;
  name: string;
  code: string;
  headOfficer: string;
  totalCases: number;
  newCases: number;
  inProgressCases: number;
  resolvedCases: number;
  overdueCases: number;
  avgResolutionHours: number;
  slaRate: number;
  budgetUtilized: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  target: string;
  ipAddress: string;
  status: 'success' | 'warning' | 'flagged';
  details: string;
}

export interface PolicyInsightItem {
  id: string;
  title: string;
  region: string;
  category: string;
  observedData: string;
  aiInference: string;
  hypothesis: string;
  policyRecommendation: string;
  impactScore: number;
  urgency: 'high' | 'medium' | 'critical';
  confidence: number;
}
