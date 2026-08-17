import { getDb } from './mongodb';

/**
 * Initialize all critical MongoDB Indexes for JanVaani Enterprise Platform
 * - Geospatial 2dsphere index for location proximity queries
 * - Multi-tenant compound indexes
 * - Text search indexes for Atlas Search / Regex fallback
 * - Unique constraints
 * - TTL indexes for session pruning
 */
export async function initializeDatabaseIndexes(): Promise<{
  success: boolean;
  indexesCreated: string[];
  errors?: string[];
}> {
  const indexesCreated: string[] = [];
  const errors: string[] = [];

  try {
    const db = await getDb();

    // 1. Problems Collection Indexes
    const problemsCol = db.collection('problems');

    // Geospatial index for Nearby API (GET /v1/problems/nearby)
    await problemsCol.createIndex(
      { 'location.geo': '2dsphere' },
      { name: 'idx_problems_geo_2dsphere' }
    );
    indexesCreated.push('problems.location.geo (2dsphere)');

    // Compound index for Multi-Tenant Status queries
    await problemsCol.createIndex(
      { tenant_id: 1, status: 1, created_at: -1 },
      { name: 'idx_problems_tenant_status_created' }
    );
    indexesCreated.push('problems.tenant_id_status_created');

    // Compound index for Ward Level GIS Analytics
    await problemsCol.createIndex(
      { tenant_id: 1, 'location.ward_number': 1, status: 1 },
      { name: 'idx_problems_ward_status' }
    );
    indexesCreated.push('problems.ward_status');

    // Compound index for Department SLA tracking
    await problemsCol.createIndex(
      { tenant_id: 1, 'assignment.department_id': 1, 'sla.is_breached': 1 },
      { name: 'idx_problems_dept_sla' }
    );
    indexesCreated.push('problems.dept_sla');

    // Text search index for global search
    await problemsCol.createIndex(
      { title: 'text', description: 'text', category_name: 'text', 'location.address': 'text' },
      { name: 'idx_problems_text_search' }
    );
    indexesCreated.push('problems.text_search');

    // Unique Case Number index
    await problemsCol.createIndex(
      { case_number: 1 },
      { unique: true, name: 'idx_problems_case_number_unique' }
    );
    indexesCreated.push('problems.case_number (unique)');

    // 2. Problem Events Collection Indexes
    const eventsCol = db.collection('problem_events');
    await eventsCol.createIndex(
      { problem_id: 1, created_at: 1 },
      { name: 'idx_events_problem_history' }
    );
    indexesCreated.push('problem_events.problem_id_created');

    // 3. API Keys Collection Indexes
    const apiKeysCol = db.collection('api_keys');
    await apiKeysCol.createIndex(
      { key_hash: 1 },
      { unique: true, name: 'idx_api_keys_hash_unique' }
    );
    await apiKeysCol.createIndex(
      { client_id: 1, is_active: 1 },
      { name: 'idx_api_keys_client_active' }
    );
    indexesCreated.push('api_keys.key_hash (unique)');

    // 4. API Usage Logs TTL Index (90-day retention)
    const apiLogsCol = db.collection('api_logs');
    await apiLogsCol.createIndex(
      { timestamp: 1 },
      { expireAfterSeconds: 90 * 24 * 60 * 60, name: 'idx_api_logs_ttl_90d' }
    );
    indexesCreated.push('api_logs.timestamp (TTL 90d)');

    // 5. Audit Logs Index
    const auditCol = db.collection('audit_logs');
    await auditCol.createIndex(
      { tenant_id: 1, timestamp: -1 },
      { name: 'idx_audit_tenant_timestamp' }
    );
    indexesCreated.push('audit_logs.tenant_timestamp');

    return {
      success: true,
      indexesCreated,
    };
  } catch (err: any) {
    errors.push(err.message || String(err));
    return {
      success: false,
      indexesCreated,
      errors,
    };
  }
}
