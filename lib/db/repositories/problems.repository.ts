import { ObjectId } from 'mongodb';
import { getDb } from '../mongodb';
import { ProblemDocument, ProblemEventDocument, ProblemStatus } from '../schema';
import { INITIAL_PROBLEMS } from '@/lib/mock-data';

// In-Memory Seed Storage fallback for development when MongoDB Atlas is connecting or offline
let memoryProblems: ProblemDocument[] = INITIAL_PROBLEMS.map((p, idx) => ({
  _id: new ObjectId(),
  tenant_id: 'vmc_vadodara',
  case_number: p.id || `JV-2026-${String(1000 + idx).padStart(6, '0')}`,
  title: p.title,
  description: p.description,
  category_id: p.categoryId,
  category_name: p.categoryName,
  status: (p.status === 'resolved' ? 'RESOLUTION' : p.status === 'in_progress' ? 'ACTION' : p.status === 'assigned' ? 'ASSIGNED' : 'SUBMITTED') as ProblemStatus,
  priority: (p.severity === 'critical' ? 'P1_CRITICAL' : p.severity === 'high' ? 'P2_HIGH' : p.severity === 'medium' ? 'P3_MEDIUM' : 'P4_LOW'),
  location: {
    address: p.location.address,
    ward_number: p.location.ward,
    municipality: p.location.city,
    district: p.location.district || p.location.city,
    state: p.location.state,
    pincode: p.location.pincode,
    geo: {
      type: 'Point',
      coordinates: [p.location.lng, p.location.lat], // [lng, lat]
    },
  },
  reporter: {
    user_id: p.reportedBy.id,
    is_anonymous: false,
    trust_score: 85,
    display_name: p.reportedBy.name,
  },
  evidence: (p.evidence || []).map((e, i) => ({
    id: e.id || `ev_${i}`,
    type: (e.type?.toUpperCase() === 'VIDEO' ? 'VIDEO' : e.type?.toUpperCase() === 'AUDIO' ? 'AUDIO' : 'IMAGE') as any,
    url: e.url,
    hash_sha256: 'sha256_mock_hash',
    exif_stripped: true,
    ai_moderation_passed: true,
    uploaded_at: new Date(p.reportedAt || Date.now()),
  })),
  stats: {
    confirmations_count: p.civicReactions?.face_this_too || 12,
    witness_count: p.civicReactions?.witnessed || 4,
    upvotes_count: p.civicReactions?.support || 28,
    solutions_count: p.solutionsCount || 0,
    views_count: 140,
  },
  sla: {
    response_deadline: new Date(Date.now() + 48 * 3600 * 1000),
    resolution_deadline: new Date(Date.now() + 7 * 24 * 3600 * 1000),
    is_breached: false,
    escalation_level: 0,
  },
  created_at: new Date(p.reportedAt || Date.now()),
  updated_at: new Date(p.updatedAt || Date.now()),
}));

export class ProblemsRepository {
  /**
   * Find problems with filters, pagination, and multi-tenant isolation
   */
  static async findMany(params: {
    tenantId?: string;
    status?: string;
    category?: string;
    ward?: string;
    search?: string;
    limit?: number;
    skip?: number;
  }): Promise<{ items: ProblemDocument[]; total: number }> {
    const limit = Math.min(params.limit || 20, 100);
    const skip = params.skip || 0;

    try {
      const db = await getDb();
      const query: any = {};

      if (params.tenantId) query.tenant_id = params.tenantId;
      if (params.status) query.status = params.status;
      if (params.category) query.category_id = params.category;
      if (params.ward) query['location.ward_number'] = params.ward;
      if (params.search) {
        query.$text = { $search: params.search };
      }

      const [items, total] = await Promise.all([
        db.collection<ProblemDocument>('problems').find(query).sort({ created_at: -1 }).skip(skip).limit(limit).toArray(),
        db.collection('problems').countDocuments(query),
      ]);

      if (items.length > 0) return { items, total };
    } catch (e) {
      // Fallback to resilient in-memory storage
    }

    let filtered = [...memoryProblems];
    if (params.status) filtered = filtered.filter((p) => p.status === params.status);
    if (params.category) filtered = filtered.filter((p) => p.category_id === params.category);
    if (params.ward) filtered = filtered.filter((p) => p.location.ward_number.includes(params.ward!));
    if (params.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
    }

    const total = filtered.length;
    const items = filtered.slice(skip, skip + limit);
    return { items, total };
  }

  /**
   * Find problem by ID or Case Number
   */
  static async findById(idOrCase: string): Promise<ProblemDocument | null> {
    try {
      const db = await getDb();
      const query = ObjectId.isValid(idOrCase)
        ? { $or: [{ _id: new ObjectId(idOrCase) }, { case_number: idOrCase }] }
        : { case_number: idOrCase };
      const doc = await db.collection<ProblemDocument>('problems').findOne(query);
      if (doc) return doc;
    } catch (e) {
      // Fallback
    }

    return memoryProblems.find((p) => p.case_number === idOrCase || p._id?.toString() === idOrCase) || null;
  }

  /**
   * Geospatial Near query: Find problems within radius (in meters)
   */
  static async findNearby(params: {
    longitude: number;
    latitude: number;
    maxDistanceMeters?: number;
    limit?: number;
  }): Promise<ProblemDocument[]> {
    const maxDistance = params.maxDistanceMeters || 5000;
    const limit = Math.min(params.limit || 50, 200);

    try {
      const db = await getDb();
      const items = await db
        .collection<ProblemDocument>('problems')
        .find({
          'location.geo': {
            $nearSphere: {
              $geometry: {
                type: 'Point',
                coordinates: [params.longitude, params.latitude],
              },
              $maxDistance: maxDistance,
            },
          },
        })
        .limit(limit)
        .toArray();

      if (items.length > 0) return items;
    } catch (e) {
      // Fallback
    }

    return memoryProblems.slice(0, limit);
  }

  /**
   * Insert new problem with auto-generated case number & audit event
   */
  static async create(doc: Omit<ProblemDocument, '_id' | 'case_number' | 'created_at' | 'updated_at'>): Promise<ProblemDocument> {
    const now = new Date();
    const caseNumber = `JV-2026-${String(Math.floor(100000 + Math.random() * 900000))}`;

    const newProblem: ProblemDocument = {
      ...doc,
      _id: new ObjectId(),
      case_number: caseNumber,
      created_at: now,
      updated_at: now,
    };

    try {
      const db = await getDb();
      await db.collection<ProblemDocument>('problems').insertOne(newProblem);

      // Record Problem Event
      await db.collection<ProblemEventDocument>('problem_events').insertOne({
        tenant_id: newProblem.tenant_id,
        problem_id: newProblem._id!,
        event_type: 'STATUS_CHANGE',
        actor: {
          user_id: newProblem.reporter.user_id,
          name: newProblem.reporter.display_name,
          role: 'CITIZEN',
        },
        new_state: newProblem.status,
        notes: 'Initial citizen problem submission registered.',
        created_at: now,
      });
    } catch (e) {
      // Fallback in-memory
      memoryProblems.unshift(newProblem);
    }

    return newProblem;
  }

  /**
   * Update Problem status along with official department lifecycle note
   */
  static async updateStatus(
    idOrCase: string,
    newStatus: ProblemStatus,
    actor: { id: string; name: string; role: any },
    notes?: string
  ): Promise<ProblemDocument | null> {
    const now = new Date();

    try {
      const db = await getDb();
      const query = ObjectId.isValid(idOrCase)
        ? { $or: [{ _id: new ObjectId(idOrCase) }, { case_number: idOrCase }] }
        : { case_number: idOrCase };

      const result = await db.collection<ProblemDocument>('problems').findOneAndUpdate(
        query,
        { $set: { status: newStatus, updated_at: now } },
        { returnDocument: 'after' }
      );

      if (result) {
        await db.collection<ProblemEventDocument>('problem_events').insertOne({
          tenant_id: result.tenant_id,
          problem_id: result._id!,
          event_type: 'STATUS_CHANGE',
          actor: {
            user_id: actor.id,
            name: actor.name,
            role: actor.role,
          },
          new_state: newStatus,
          notes: notes || `Case status updated to ${newStatus}`,
          created_at: now,
        });

        return result;
      }
    } catch (e) {
      // Fallback in-memory
    }

    const item = memoryProblems.find((p) => p.case_number === idOrCase || p._id?.toString() === idOrCase);
    if (item) {
      item.status = newStatus;
      item.updated_at = now;
      return item;
    }
    return null;
  }
}
