import crypto from 'crypto';
import { ObjectId } from 'mongodb';
import { getDb } from '../mongodb';
import { ApiKeyDocument } from '../schema';

let memoryApiKeys: ApiKeyDocument[] = [
  {
    _id: new ObjectId(),
    client_id: 'client_demo_urban_research',
    organization_name: 'Centre for Urban Innovation (Demo)',
    key_name: 'Production Research Analytics Key',
    key_prefix: 'jv_live_a98f12',
    key_hash: crypto.createHash('sha256').update('jv_live_a98f12_secret_demo_token').digest('hex'),
    scopes: ['public:read', 'problems:read', 'geo:read', 'research:export'],
    tier: 'DEVELOPER',
    rate_limit: {
      requests_per_minute: 120,
      requests_per_month: 25000,
    },
    usage: {
      total_requests: 3840,
      month_requests: 1210,
      last_used_at: new Date(),
    },
    is_active: true,
    created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000),
    updated_at: new Date(),
  },
];

export class ApiKeysRepository {
  /**
   * Generate a cryptographically secure API Key
   * Format: jv_{live|test}_{12_char_prefix}_{32_char_secret}
   */
  static async createKey(params: {
    clientId: string;
    organizationName: string;
    keyName: string;
    scopes: string[];
    tier?: 'FREE' | 'DEVELOPER' | 'STARTUP' | 'ENTERPRISE' | 'GOVERNMENT';
    isLive?: boolean;
    ipAllowlist?: string[];
  }): Promise<{ apiKeyDoc: ApiKeyDocument; rawSecretKey: string }> {
    const env = params.isLive ? 'live' : 'test';
    const prefixRandom = crypto.randomBytes(6).toString('hex');
    const secretRandom = crypto.randomBytes(24).toString('hex');
    
    const keyPrefix = `jv_${env}_${prefixRandom}`;
    const rawSecretKey = `${keyPrefix}_${secretRandom}`;
    const keyHash = crypto.createHash('sha256').update(rawSecretKey).digest('hex');

    const tierLimits = {
      FREE: { rpm: 30, monthly: 1000 },
      DEVELOPER: { rpm: 120, monthly: 25000 },
      STARTUP: { rpm: 300, monthly: 100000 },
      ENTERPRISE: { rpm: 1200, monthly: 500000 },
      GOVERNMENT: { rpm: 2000, monthly: 1000000 },
    };

    const selectedTier = params.tier || 'FREE';
    const limits = tierLimits[selectedTier];

    const apiKeyDoc: ApiKeyDocument = {
      _id: new ObjectId(),
      client_id: params.clientId,
      organization_name: params.organizationName,
      key_name: params.keyName,
      key_prefix: keyPrefix,
      key_hash: keyHash,
      scopes: params.scopes,
      tier: selectedTier,
      rate_limit: {
        requests_per_minute: limits.rpm,
        requests_per_month: limits.monthly,
      },
      usage: {
        total_requests: 0,
        month_requests: 0,
        last_used_at: undefined,
      },
      ip_allowlist: params.ipAllowlist,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    try {
      const db = await getDb();
      await db.collection<ApiKeyDocument>('api_keys').insertOne(apiKeyDoc);
    } catch (e) {
      memoryApiKeys.unshift(apiKeyDoc);
    }

    return { apiKeyDoc, rawSecretKey };
  }

  /**
   * Validate raw API key header and verify active status & scopes
   */
  static async validateKey(rawKey: string): Promise<ApiKeyDocument | null> {
    if (!rawKey || !rawKey.startsWith('jv_')) return null;

    const hash = crypto.createHash('sha256').update(rawKey).digest('hex');

    try {
      const db = await getDb();
      const doc = await db.collection<ApiKeyDocument>('api_keys').findOne({ key_hash: hash, is_active: true });
      if (doc) {
        // Increment usage async
        db.collection('api_keys').updateOne(
          { _id: doc._id },
          {
            $inc: { 'usage.total_requests': 1, 'usage.month_requests': 1 },
            $set: { 'usage.last_used_at': new Date() },
          }
        ).catch(() => {});
        return doc;
      }
    } catch (e) {
      // Fallback
    }

    const memoryMatch = memoryApiKeys.find((k) => k.key_hash === hash && k.is_active);
    if (memoryMatch) {
      memoryMatch.usage.total_requests += 1;
      memoryMatch.usage.month_requests += 1;
      memoryMatch.usage.last_used_at = new Date();
      return memoryMatch;
    }

    return null;
  }

  /**
   * List keys for a developer / client application
   */
  static async listKeys(clientId: string): Promise<ApiKeyDocument[]> {
    try {
      const db = await getDb();
      const keys = await db.collection<ApiKeyDocument>('api_keys').find({ client_id: clientId }).toArray();
      if (keys.length > 0) return keys;
    } catch (e) {
      // Fallback
    }

    return memoryApiKeys.filter((k) => k.client_id === clientId || clientId === 'all');
  }

  /**
   * Revoke key
   */
  static async revokeKey(keyIdOrPrefix: string): Promise<boolean> {
    try {
      const db = await getDb();
      const query = ObjectId.isValid(keyIdOrPrefix)
        ? { _id: new ObjectId(keyIdOrPrefix) }
        : { key_prefix: keyIdOrPrefix };
      await db.collection('api_keys').updateOne(query, { $set: { is_active: false, updated_at: new Date() } });
      return true;
    } catch (e) {
      const item = memoryApiKeys.find((k) => k.key_prefix === keyIdOrPrefix || k._id?.toString() === keyIdOrPrefix);
      if (item) {
        item.is_active = false;
        return true;
      }
    }
    return false;
  }
}
