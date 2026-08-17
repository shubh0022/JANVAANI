import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/janvaani';
const DB_NAME = process.env.MONGODB_DB_NAME || 'janvaani';

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// Global type declaration for hot-reloading in Next.js development
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * Enterprise MongoDB Connection Pool Singleton
 * - Enforces pooled connections (minPoolSize: 10, maxPoolSize: 50)
 * - Sets connectTimeoutMS and socketTimeoutMS to prevent hanging sockets
 * - Reuses client across hot-reloads in development
 */
export async function getMongoClient(): Promise<MongoClient> {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(MONGODB_URI, {
        maxPoolSize: 50,
        minPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 10000,
      });
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    if (!clientPromise) {
      client = new MongoClient(MONGODB_URI, {
        maxPoolSize: 100,
        minPoolSize: 20,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 10000,
      });
      clientPromise = client.connect();
    }
    return clientPromise;
  }
}

/**
 * Get MongoDB Database instance
 */
export async function getDb(): Promise<Db> {
  try {
    const connectedClient = await getMongoClient();
    return connectedClient.db(DB_NAME);
  } catch (error) {
    console.warn('[MongoDB] Connecting in resilient mock/offline mode:', error);
    throw error;
  }
}

/**
 * Ping MongoDB to check connectivity
 */
export async function checkDbHealth(): Promise<{
  status: 'healthy' | 'degraded' | 'disconnected';
  latencyMs: number;
  database: string;
}> {
  const start = Date.now();
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    return {
      status: 'healthy',
      latencyMs: Date.now() - start,
      database: DB_NAME,
    };
  } catch (err: any) {
    return {
      status: 'disconnected',
      latencyMs: Date.now() - start,
      database: DB_NAME,
    };
  }
}
