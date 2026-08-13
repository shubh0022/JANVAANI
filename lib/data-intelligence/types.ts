export type TrustLevel =
  | 'OFFICIAL_GOV_DATA'
  | 'CENSUS_OF_INDIA'
  | 'OPENSTREETMAP'
  | 'CITIZEN_REPORTED'
  | 'COMMUNITY_VERIFIED'
  | 'EXPERT_REVIEWED'
  | 'AI_ANALYSIS'
  | 'RESEARCH_DATA'
  | 'DEMO_DATA';

export type DataFreshness =
  | 'LIVE'
  | 'UPDATED_TODAY'
  | 'UPDATED_THIS_WEEK'
  | 'UPDATED_THIS_MONTH'
  | 'ANNUAL_OFFICIAL'
  | 'HISTORICAL_CENSUS'
  | 'STALE'
  | 'UNKNOWN';

export interface DataSourceMetadata {
  id: string;
  name: string;
  publisher: string;
  parentMinistryOrOrg: string;
  sourceUrl: string;
  apiUrl?: string;
  license: string;
  licenseUrl: string;
  category: string;
  country: string;
  state?: string;
  district?: string;
  updateFrequency: 'REALTIME' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ANNUAL' | 'DECENNIAL';
  lastSuccessfulSync: string;
  lastChecked: string;
  status: 'ACTIVE' | 'DEGRADED' | 'MAINTENANCE' | 'OFFLINE';
  schemaVersion: string;
  dataQualityScore: number; // 0 to 100
  attribution: string;
  terms: string;
  geographicCoverage: string;
  timeCoverage: string;
  format: 'JSON / REST' | 'GeoJSON' | 'CSV' | 'XML' | 'Vector Tiles';
  recordsTotal: number;
}

export interface DataSyncLog {
  id: string;
  sourceId: string;
  sourceName: string;
  startedAt: string;
  completedAt: string;
  recordsReceived: number;
  recordsInserted: number;
  recordsUpdated: number;
  recordsRejected: number;
  errors: string[];
  status: 'SUCCESS' | 'PARTIAL' | 'FAILED';
  durationMs: number;
}

export interface DataQualityReport {
  id: string;
  sourceId: string;
  timestamp: string;
  nullViolations: number;
  coordinateViolations: number;
  duplicateCount: number;
  outOfRangeValues: number;
  schemaValid: boolean;
  overallScore: number; // 0 to 100
  status: 'PASS' | 'WARNING' | 'FAIL';
  notes: string[];
}

export interface DataProvenance {
  sourceId: string;
  datasetName: string;
  publisher: string;
  publishedDate?: string;
  retrievalTimestamp: string;
  freshness: DataFreshness;
  license: string;
  sourceUrl: string;
  trustLevel: TrustLevel;
  methodologyNotes?: string;
}
