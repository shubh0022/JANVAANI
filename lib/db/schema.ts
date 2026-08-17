import { ObjectId } from 'mongodb';

export type ProblemStatus =
  | 'SUBMITTED'
  | 'VALIDATING'
  | 'VERIFIED'
  | 'ROUTED'
  | 'ASSIGNED'
  | 'ACKNOWLEDGED'
  | 'INVESTIGATION'
  | 'ACTION'
  | 'RESOLUTION'
  | 'CITIZEN_VERIFICATION'
  | 'CLOSED'
  | 'ESCALATED'
  | 'REOPENED'
  | 'REJECTED';

export type PriorityLevel = 'P1_CRITICAL' | 'P2_HIGH' | 'P3_MEDIUM' | 'P4_LOW';

export interface GeoJsonPoint {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

/**
 * 1. Problem Document Model (Collection: 'problems')
 */
export interface ProblemDocument {
  _id?: ObjectId;
  tenant_id: string; // Multi-tenant isolation ID (e.g. 'vmc_vadodara', 'national')
  case_number: string; // Human-readable Case ID (e.g. 'JV-2026-004812')
  title: string;
  description: string;
  category_id: string;
  category_name: string;
  status: ProblemStatus;
  priority: PriorityLevel;
  
  // Spatial GIS Location
  location: {
    address: string;
    ward_number: string;
    municipality: string;
    district: string;
    state: string;
    pincode: string;
    geo: GeoJsonPoint; // Indexed with 2dsphere
    fuzz_radius_meters?: number;
  };

  // Reporter Info (Privacy-Preserved)
  reporter: {
    user_id: string;
    is_anonymous: boolean;
    trust_score: number;
    display_name: string;
  };

  // Media & Evidence
  evidence: Array<{
    id: string;
    type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT';
    url: string;
    hash_sha256: string;
    exif_stripped: boolean;
    ai_moderation_passed: boolean;
    uploaded_at: Date;
  }>;

  // Community Verifications & Metrics
  stats: {
    confirmations_count: number;
    witness_count: number;
    upvotes_count: number;
    solutions_count: number;
    views_count: number;
  };

  // SLA & Department Assignment
  assignment?: {
    department_id: string;
    department_name: string;
    assigned_officer_id?: string;
    assigned_officer_name?: string;
    assigned_officer_phone?: string;
    assigned_at?: Date;
    acknowledged_at?: Date;
  };

  sla: {
    response_deadline: Date;
    resolution_deadline: Date;
    is_breached: boolean;
    breached_at?: Date;
    escalation_level: number; // 0 = normal, 1 = supervisor, 2 = commissioner
  };

  // Resolution Tracking
  resolution?: {
    resolved_at: Date;
    resolved_by_officer_id: string;
    resolution_notes: string;
    before_photo_url?: string;
    after_photo_url?: string;
    citizen_verified: boolean;
    citizen_verified_at?: Date;
  };

  created_at: Date;
  updated_at: Date;
}

/**
 * 2. Problem Event Document (Collection: 'problem_events')
 */
export interface ProblemEventDocument {
  _id?: ObjectId;
  tenant_id: string;
  problem_id: ObjectId | string;
  event_type:
    | 'STATUS_CHANGE'
    | 'ASSIGNED'
    | 'ESCALATED'
    | 'COMMENT_ADDED'
    | 'COMMUNITY_VERIFIED'
    | 'RESOLUTION_SUBMITTED'
    | 'CITIZEN_CONFIRMED';
  actor: {
    user_id: string;
    name: string;
    role: 'CITIZEN' | 'OFFICER' | 'ADMIN' | 'SUPERVISOR' | 'SYSTEM_AI';
  };
  previous_state?: any;
  new_state?: any;
  notes?: string;
  created_at: Date;
}

/**
 * 3. Developer API Key Document (Collection: 'api_keys')
 */
export interface ApiKeyDocument {
  _id?: ObjectId;
  client_id: string; // Application / Organization ID
  organization_name: string;
  key_name: string;
  key_prefix: string; // e.g. "jv_live_9f8a..." (only prefix stored in plaintext)
  key_hash: string; // SHA-256 hash of complete key
  scopes: string[]; // ['problems:read', 'problems:write', 'geo:read', 'research:export']
  tier: 'FREE' | 'DEVELOPER' | 'STARTUP' | 'ENTERPRISE' | 'GOVERNMENT';
  rate_limit: {
    requests_per_minute: number;
    requests_per_month: number;
  };
  usage: {
    total_requests: number;
    month_requests: number;
    last_used_at?: Date;
  };
  ip_allowlist?: string[];
  is_active: boolean;
  expires_at?: Date;
  created_at: Date;
  updated_at: Date;
}

/**
 * 4. API Product Catalog (Collection: 'api_products')
 */
export interface ApiProductDocument {
  _id?: ObjectId;
  slug: string; // e.g. 'civic-problems-api'
  name: string;
  tagline: string;
  description: string;
  category: 'CORE_CIVIC' | 'GEOSPATIAL' | 'ANALYTICS' | 'ENVIRONMENT' | 'MUNICIPAL';
  endpoints: Array<{
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    path: string;
    description: string;
    required_scope: string;
  }>;
  pricing_tiers: Array<{
    tier_name: string;
    monthly_price_inr: number;
    request_limit: number;
    features: string[];
  }>;
  documentation_url: string;
  is_published: boolean;
}

/**
 * 5. Webhook Subscription (Collection: 'webhooks')
 */
export interface WebhookSubscriptionDocument {
  _id?: ObjectId;
  client_id: string;
  endpoint_url: string;
  secret: string; // HMAC secret for X-JanVaani-Signature
  subscribed_events: string[]; // ['problem.created', 'problem.resolved', 'sla.breached']
  is_active: boolean;
  delivery_stats: {
    successful_deliveries: number;
    failed_deliveries: number;
    last_delivery_at?: Date;
    last_status_code?: number;
  };
  created_at: Date;
}

/**
 * 6. Audit Log Document (Collection: 'audit_logs')
 */
export interface AuditLogDocument {
  _id?: ObjectId;
  tenant_id: string;
  actor_id: string;
  actor_email: string;
  actor_role: string;
  action: string; // e.g. 'CASE_STATUS_OVERRIDE', 'API_KEY_REVOKED', 'SLA_CONFIG_UPDATE'
  target_resource: string;
  target_id: string;
  ip_address: string;
  user_agent: string;
  changes: {
    before?: any;
    after?: any;
  };
  timestamp: Date;
}

/**
 * 7. Tenant Configuration (Collection: 'tenants')
 */
export interface TenantDocument {
  _id?: ObjectId;
  tenant_id: string; // e.g. 'vmc_vadodara'
  name: string; // e.g. 'Vadodara Municipal Corporation'
  type: 'MUNICIPAL_CORPORATION' | 'SMART_CITY' | 'STATE_GOV' | 'UNIVERSITY' | 'ENTERPRISE';
  domain?: string;
  branding: {
    logo_url: string;
    primary_color: string;
    portal_title: string;
  };
  sla_config: {
    p1_response_hours: number;
    p1_resolution_hours: number;
    p2_response_hours: number;
    p2_resolution_hours: number;
    p3_response_hours: number;
    p3_resolution_hours: number;
  };
  created_at: Date;
}
